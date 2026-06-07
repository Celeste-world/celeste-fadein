import Stripe from "https://esm.sh/stripe@14?target=denonext";
import { createClient } from "npm:@supabase/supabase-js@2";

type ProductKey =
  | "harbor_light_monthly"
  | "voyage_fuel_50"
  | "special_ticket_10"
  | "special_ticket_20"
  | "deep_sea_ticket"
  | "tide_letter_monthly";

type BillingProduct = {
  name: string;
  mode: "payment" | "subscription";
  amount: number;
  currency: "jpy";
  ticketType?: "special" | "deep_sea";
  durationMinutes?: number;
  expiresInDays?: number;
  fuelBonus?: number;
  supportBonus?: number;
};

const BILLING_PRODUCTS: Record<ProductKey, BillingProduct> = {
  harbor_light_monthly: {
    name: "港の維持灯",
    mode: "subscription",
    amount: 480,
    currency: "jpy",
    supportBonus: 30,
  },

  voyage_fuel_50: {
    name: "航海燃料",
    mode: "payment",
    amount: 580,
    currency: "jpy",
    fuelBonus: 50,
  },

  special_ticket_10: {
    name: "Special Voyage Ticket 10分",
    mode: "payment",
    amount: 180,
    currency: "jpy",
    ticketType: "special",
    durationMinutes: 10,
    expiresInDays: 15,
  },

  special_ticket_20: {
    name: "Special Voyage Ticket 20分",
    mode: "payment",
    amount: 320,
    currency: "jpy",
    ticketType: "special",
    durationMinutes: 20,
    expiresInDays: 15,
  },

  deep_sea_ticket: {
    name: "Deep Sea Ticket",
    mode: "payment",
    amount: 480,
    currency: "jpy",
    ticketType: "deep_sea",
    durationMinutes: 20,
    expiresInDays: 15,
  },

  tide_letter_monthly: {
    name: "潮の便り",
    mode: "subscription",
    amount: 680,
    currency: "jpy",
  },
};

const ALLOWED_SUBSCRIPTION_STATUSES = new Set([
  "active",
  "trialing",
  "past_due",
  "canceled",
  "incomplete",
  "expired",
]);

function requiredEnv(name: string): string {
  const value = Deno.env.get(name);

  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }

  return value;
}

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

function unixToIso(value: number | null | undefined): string | null {
  if (!value) {
    return null;
  }

  return new Date(value * 1000).toISOString();
}

function addDays(date: Date, days: number): string {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next.toISOString();
}

function getJstMonthKey(date = new Date()): string {
  const formatter = new Intl.DateTimeFormat("ja-JP", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
  });

  const parts = formatter.formatToParts(date);
  const year = parts.find((part) => part.type === "year")?.value;
  const month = parts.find((part) => part.type === "month")?.value;

  if (!year || !month) {
    throw new Error("Could not create JST month_key.");
  }

  return `${year}-${month}`;
}

function normalizeSubscriptionStatus(status: string | null | undefined): string {
  const value = String(status || "incomplete");

  if (ALLOWED_SUBSCRIPTION_STATUSES.has(value)) {
    return value;
  }

  if (value === "incomplete_expired") {
    return "expired";
  }

  if (value === "unpaid" || value === "paused") {
    return "past_due";
  }

  return "incomplete";
}

function getStringId(value: unknown): string | null {
  if (!value) {
    return null;
  }

  if (typeof value === "string") {
    return value;
  }

  if (typeof value === "object" && "id" in value) {
    const id = (value as { id?: unknown }).id;
    return typeof id === "string" ? id : null;
  }

  return null;
}

function getEventStripeIds(event: Stripe.Event) {
  const object = event.data.object as any;

  const stripeCustomerId = getStringId(object.customer);
  const stripeCheckoutSessionId =
    event.type.startsWith("checkout.session") ? object.id : null;
  const stripePaymentIntentId =
    getStringId(object.payment_intent) ||
    (event.type.startsWith("payment_intent") ? object.id : null);
  const stripeSubscriptionId =
    getStringId(object.subscription) ||
    (event.type.startsWith("customer.subscription") ? object.id : null);

  return {
    stripeCustomerId,
    stripeCheckoutSessionId,
    stripePaymentIntentId,
    stripeSubscriptionId,
  };
}

async function recordBillingEvent(
  supabaseAdmin: ReturnType<typeof createClient>,
  event: Stripe.Event,
) {
  const ids = getEventStripeIds(event);

  const payload = JSON.parse(JSON.stringify(event));

  const { data, error } = await supabaseAdmin
    .from("billing_events")
    .insert({
      stripe_event_id: event.id,
      event_type: event.type,
      status: "received",
      payload,
      stripe_customer_id: ids.stripeCustomerId,
      stripe_checkout_session_id: ids.stripeCheckoutSessionId,
      stripe_payment_intent_id: ids.stripePaymentIntentId,
      stripe_subscription_id: ids.stripeSubscriptionId,
    })
    .select("id,status")
    .single();

  if (!error) {
    return {
      alreadyExists: false,
      alreadyProcessed: false,
      row: data,
    };
  }

  if (error.code !== "23505") {
    throw error;
  }

  const { data: existing, error: selectError } = await supabaseAdmin
    .from("billing_events")
    .select("id,status")
    .eq("stripe_event_id", event.id)
    .maybeSingle();

  if (selectError) {
    throw selectError;
  }

  return {
    alreadyExists: true,
    alreadyProcessed: existing?.status === "processed",
    row: existing,
  };
}

async function updateBillingEventStatus(
  supabaseAdmin: ReturnType<typeof createClient>,
  stripeEventId: string,
  status: "processed" | "failed" | "ignored",
  errorMessage: string | null = null,
) {
  const { error } = await supabaseAdmin
    .from("billing_events")
    .update({
      status,
      error_message: errorMessage,
      processed_at: new Date().toISOString(),
    })
    .eq("stripe_event_id", stripeEventId);

  if (error) {
    console.error("billing_events update error:", error);
  }
}

async function recalculateMonthlyAllowance(
  supabaseAdmin: ReturnType<typeof createClient>,
  userId: string,
  monthKey: string,
) {
  const { data: allowance, error: allowanceError } = await supabaseAdmin
    .from("monthly_log_allowances")
    .select("id,base_limit,support_bonus,fuel_bonus,total_limit,consumed_count")
    .eq("user_id", userId)
    .eq("month_key", monthKey)
    .maybeSingle();

  if (allowanceError) {
    throw allowanceError;
  }

  const { count: fuelCount, error: fuelCountError } = await supabaseAdmin
    .from("billing_purchases")
    .select("id", { count: "exact", head: true })
    .eq("user_id", userId)
    .eq("product_key", "voyage_fuel_50")
    .eq("status", "granted")
    .eq("month_key", monthKey);

  if (fuelCountError) {
    throw fuelCountError;
  }

  const { data: activeSupport, error: supportError } = await supabaseAdmin
    .from("user_subscriptions")
    .select("id")
    .eq("user_id", userId)
    .eq("product_key", "harbor_light_monthly")
    .in("status", ["active", "trialing"])
    .limit(1);

  if (supportError) {
    throw supportError;
  }

  const baseLimit = allowance?.base_limit ?? 10;
  const supportBonus = activeSupport && activeSupport.length > 0 ? 30 : 0;
  const fuelBonus = (fuelCount || 0) * 50;
  const totalLimit = baseLimit + supportBonus + fuelBonus;

  if (allowance?.id) {
    const { error: updateError } = await supabaseAdmin
      .from("monthly_log_allowances")
      .update({
        support_bonus: supportBonus,
        fuel_bonus: fuelBonus,
        total_limit: totalLimit,
        updated_at: new Date().toISOString(),
      })
      .eq("id", allowance.id);

    if (updateError) {
      throw updateError;
    }

    return;
  }

  const { error: insertError } = await supabaseAdmin
    .from("monthly_log_allowances")
    .insert({
      user_id: userId,
      month_key: monthKey,
      base_limit: 10,
      support_bonus: supportBonus,
      fuel_bonus: fuelBonus,
      total_limit: totalLimit,
      consumed_count: 0,
    });

  if (insertError) {
    throw insertError;
  }
}

async function markPurchaseGranted(
  supabaseAdmin: ReturnType<typeof createClient>,
  purchaseId: string,
  args: {
    stripePaymentIntentId: string | null;
    providerPurchaseId: string | null;
    providerProductId: string | null;
  },
) {
  const { error } = await supabaseAdmin
    .from("billing_purchases")
    .update({
      status: "granted",
      granted_at: new Date().toISOString(),
      stripe_payment_intent_id: args.stripePaymentIntentId,
      provider_purchase_id: args.providerPurchaseId,
      provider_product_id: args.providerProductId,
    })
    .eq("id", purchaseId);

  if (error) {
    throw error;
  }
}

async function ensureTicketGranted(
  supabaseAdmin: ReturnType<typeof createClient>,
  purchase: any,
  product: BillingProduct,
) {
  if (!product.ticketType || !product.durationMinutes) {
    return;
  }

  const { data: existingTicket, error: existingTicketError } = await supabaseAdmin
    .from("voyage_tickets")
    .select("id")
    .eq("billing_purchase_id", purchase.id)
    .maybeSingle();

  if (existingTicketError) {
    throw existingTicketError;
  }

  if (existingTicket?.id) {
    return;
  }

  const expiresAt = addDays(new Date(), product.expiresInDays || 15);

  const { error: insertError } = await supabaseAdmin
    .from("voyage_tickets")
    .insert({
      user_id: purchase.user_id,
      ticket_type: product.ticketType,
      source: "purchase",
      duration_minutes: product.durationMinutes,
      status: "available",
      expires_at: expiresAt,
      billing_purchase_id: purchase.id,
    });

  if (insertError) {
    throw insertError;
  }
}

async function processCompletedPaymentSession(
  supabaseAdmin: ReturnType<typeof createClient>,
  session: Stripe.Checkout.Session,
) {
  const sessionId = session.id;
  const productKey = String(session.metadata?.product_key || "") as ProductKey;
  const userId = String(session.metadata?.user_id || "");

  if (!productKey || !BILLING_PRODUCTS[productKey]) {
    throw new Error("checkout.session.completed に product_key がありません。");
  }

  if (!userId) {
    throw new Error("checkout.session.completed に user_id がありません。");
  }

  const product = BILLING_PRODUCTS[productKey];

  if (product.mode !== "payment") {
    return;
  }

  const stripePaymentIntentId = getStringId(session.payment_intent);

  const { data: purchase, error: purchaseError } = await supabaseAdmin
    .from("billing_purchases")
    .select("*")
    .eq("stripe_checkout_session_id", sessionId)
    .maybeSingle();

  if (purchaseError) {
    throw purchaseError;
  }

  if (!purchase) {
    const monthKey = getJstMonthKey();

    const { data: insertedPurchase, error: insertError } = await supabaseAdmin
      .from("billing_purchases")
      .insert({
        user_id: userId,
        product_key: productKey,
        amount: product.amount,
        currency: product.currency,
        status: "pending",
        stripe_customer_id: getStringId(session.customer),
        stripe_checkout_session_id: sessionId,
        stripe_payment_intent_id: stripePaymentIntentId,
        month_key: monthKey,
        provider: "stripe",
        provider_purchase_id: stripePaymentIntentId,
      })
      .select("*")
      .single();

    if (insertError) {
      throw insertError;
    }

    return await grantPurchase(supabaseAdmin, insertedPurchase, session);
  }

  return await grantPurchase(supabaseAdmin, purchase, session);
}

async function grantPurchase(
  supabaseAdmin: ReturnType<typeof createClient>,
  purchase: any,
  session: Stripe.Checkout.Session,
) {
  const productKey = String(purchase.product_key || "") as ProductKey;
  const product = BILLING_PRODUCTS[productKey];

  if (!product) {
    throw new Error(`Unknown product_key: ${productKey}`);
  }

  const stripePaymentIntentId = getStringId(session.payment_intent);
  const providerProductId = purchase.provider_product_id || purchase.stripe_price_id || null;

  if (purchase.status !== "granted") {
    await markPurchaseGranted(supabaseAdmin, purchase.id, {
      stripePaymentIntentId,
      providerPurchaseId: stripePaymentIntentId,
      providerProductId,
    });
  }

  const grantedPurchase = {
    ...purchase,
    status: "granted",
  };

  if (productKey === "voyage_fuel_50") {
    const monthKey = purchase.month_key || getJstMonthKey();
    await recalculateMonthlyAllowance(
      supabaseAdmin,
      purchase.user_id,
      monthKey,
    );
    return;
  }

  if (product.ticketType) {
    await ensureTicketGranted(supabaseAdmin, grantedPurchase, product);
  }
}

async function processSubscriptionObject(
  supabaseAdmin: ReturnType<typeof createClient>,
  subscription: Stripe.Subscription,
  forcedStatus?: string,
) {
  const existing = await supabaseAdmin
    .from("user_subscriptions")
    .select("id,user_id,product_key")
    .eq("stripe_subscription_id", subscription.id)
    .maybeSingle();

  if (existing.error) {
    throw existing.error;
  }

  const metadata = subscription.metadata || {};
  const userId = String(metadata.user_id || existing.data?.user_id || "");
  const productKey = String(metadata.product_key || existing.data?.product_key || "") as ProductKey;

  if (!userId || !productKey) {
    console.warn("subscription metadata is missing:", subscription.id);
    return;
  }

  const status = normalizeSubscriptionStatus(forcedStatus || subscription.status);
  const item = subscription.items?.data?.[0];
  const stripePriceId = item?.price?.id || null;

  const row = {
    user_id: userId,
    product_key: productKey,
    status,
    stripe_customer_id: getStringId(subscription.customer),
    stripe_subscription_id: subscription.id,
    stripe_price_id: stripePriceId,
    provider: "stripe",
    provider_subscription_id: subscription.id,
    provider_product_id: stripePriceId,
    current_period_start: unixToIso(subscription.current_period_start),
    current_period_end: unixToIso(subscription.current_period_end),
    cancel_at_period_end: Boolean(subscription.cancel_at_period_end),
    canceled_at: unixToIso(subscription.canceled_at),
  };

  const { error: upsertError } = await supabaseAdmin
    .from("user_subscriptions")
    .upsert(row, {
      onConflict: "stripe_subscription_id",
    });

  if (upsertError) {
    throw upsertError;
  }

  if (productKey === "harbor_light_monthly") {
    await recalculateMonthlyAllowance(
      supabaseAdmin,
      userId,
      getJstMonthKey(),
    );
  }
}

async function processCompletedSubscriptionSession(
  stripe: Stripe,
  supabaseAdmin: ReturnType<typeof createClient>,
  session: Stripe.Checkout.Session,
) {
  const subscriptionId = getStringId(session.subscription);

  if (!subscriptionId) {
    throw new Error("checkout.session.completed に subscription がありません。");
  }

  const subscription = await stripe.subscriptions.retrieve(subscriptionId);

  await processSubscriptionObject(supabaseAdmin, subscription);
}

async function handleStripeEvent(
  stripe: Stripe,
  supabaseAdmin: ReturnType<typeof createClient>,
  event: Stripe.Event,
) {
  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;

      if (session.mode === "payment") {
        await processCompletedPaymentSession(supabaseAdmin, session);
        return;
      }

      if (session.mode === "subscription") {
        await processCompletedSubscriptionSession(stripe, supabaseAdmin, session);
        return;
      }

      return;
    }

    case "customer.subscription.created":
    case "customer.subscription.updated": {
      const subscription = event.data.object as Stripe.Subscription;
      await processSubscriptionObject(supabaseAdmin, subscription);
      return;
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;
      await processSubscriptionObject(supabaseAdmin, subscription, "canceled");
      return;
    }

    default:
      console.log("Ignored Stripe event:", event.type);
      return;
  }
}

Deno.serve(async (request: Request) => {
  if (request.method !== "POST") {
    return jsonResponse({ error: "Method not allowed." }, 405);
  }

  const stripeSecretKey = requiredEnv("STRIPE_SECRET_KEY");
  const webhookSecret = requiredEnv("STRIPE_WEBHOOK_SECRET");
  const supabaseUrl = requiredEnv("SUPABASE_URL");
  const serviceRoleKey = requiredEnv("SUPABASE_SERVICE_ROLE_KEY");

  const stripe = new Stripe(stripeSecretKey, {
    apiVersion: "2024-11-20",
  });

  const cryptoProvider = Stripe.createSubtleCryptoProvider();

  const signature = request.headers.get("Stripe-Signature");

  if (!signature) {
    return jsonResponse({ error: "Missing Stripe-Signature header." }, 400);
  }

  const rawBody = await request.text();

  let event: Stripe.Event;

  try {
    event = await stripe.webhooks.constructEventAsync(
      rawBody,
      signature,
      webhookSecret,
      undefined,
      cryptoProvider,
    );
  } catch (error) {
    console.error("Stripe signature verification failed:", error);

    return jsonResponse(
      {
        error:
          error instanceof Error
            ? error.message
            : "Stripe署名検証に失敗しました。",
      },
      400,
    );
  }

  const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });

  try {
    const recorded = await recordBillingEvent(supabaseAdmin, event);

    if (recorded.alreadyProcessed) {
      return jsonResponse({
        received: true,
        duplicate: true,
        status: "already_processed",
      });
    }

    await handleStripeEvent(stripe, supabaseAdmin, event);

    await updateBillingEventStatus(
      supabaseAdmin,
      event.id,
      "processed",
      null,
    );

    return jsonResponse({
      received: true,
      processed: true,
      event_type: event.type,
    });
  } catch (error) {
    console.error("stripe-webhook processing error:", error);

    await updateBillingEventStatus(
      supabaseAdmin,
      event.id,
      "failed",
      error instanceof Error ? error.message : "Webhook処理に失敗しました。",
    );

    return jsonResponse(
      {
        received: true,
        processed: false,
        error:
          error instanceof Error
            ? error.message
            : "Webhook処理に失敗しました。",
      },
      500,
    );
  }
});
