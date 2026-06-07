import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
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
  priceEnv: string;
  ticketType?: "special" | "deep_sea";
  durationMinutes?: number;
};

const BILLING_PRODUCTS: Record<ProductKey, BillingProduct> = {
  harbor_light_monthly: {
    name: "港の維持灯",
    mode: "subscription",
    amount: 480,
    currency: "jpy",
    priceEnv: "STRIPE_PRICE_HARBOR_LIGHT_MONTHLY",
  },

  voyage_fuel_50: {
    name: "航海燃料",
    mode: "payment",
    amount: 580,
    currency: "jpy",
    priceEnv: "STRIPE_PRICE_VOYAGE_FUEL_50",
  },

  special_ticket_10: {
    name: "Special Voyage Ticket 10分",
    mode: "payment",
    amount: 180,
    currency: "jpy",
    priceEnv: "STRIPE_PRICE_SPECIAL_TICKET_10",
    ticketType: "special",
    durationMinutes: 10,
  },

  special_ticket_20: {
    name: "Special Voyage Ticket 20分",
    mode: "payment",
    amount: 320,
    currency: "jpy",
    priceEnv: "STRIPE_PRICE_SPECIAL_TICKET_20",
    ticketType: "special",
    durationMinutes: 20,
  },

  deep_sea_ticket: {
    name: "Deep Sea Ticket",
    mode: "payment",
    amount: 480,
    currency: "jpy",
    priceEnv: "STRIPE_PRICE_DEEP_SEA_TICKET",
    ticketType: "deep_sea",
    durationMinutes: 20,
  },

  tide_letter_monthly: {
    name: "潮の便り",
    mode: "subscription",
    amount: 680,
    currency: "jpy",
    priceEnv: "STRIPE_PRICE_TIDE_LETTER_MONTHLY",
  },
};

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json",
    },
  });
}

function requiredEnv(name: string): string {
  const value = Deno.env.get(name);

  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }

  return value;
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

function normalizeBaseUrl(value: string): string {
  return value.replace(/\/+$/, "");
}

async function stripePost(
  path: string,
  params: URLSearchParams,
): Promise<any> {
  const stripeSecretKey = requiredEnv("STRIPE_SECRET_KEY");

  const response = await fetch(`https://api.stripe.com/v1${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${stripeSecretKey}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params,
  });

  const data = await response.json();

  if (!response.ok) {
    const message =
      data?.error?.message ||
      data?.error?.type ||
      "Stripe API request failed.";

    throw new Error(message);
  }

  return data;
}

async function createStripeCustomer(email: string | null, userId: string) {
  const params = new URLSearchParams();

  if (email) {
    params.set("email", email);
  }

  params.set("metadata[user_id]", userId);

  return await stripePost("/customers", params);
}

async function createCheckoutSession(args: {
  mode: "payment" | "subscription";
  stripeCustomerId: string;
  stripePriceId: string;
  productKey: ProductKey;
  userId: string;
  appBaseUrl: string;
}) {
  const params = new URLSearchParams();

  params.set("mode", args.mode);
  params.set("customer", args.stripeCustomerId);
  params.set("line_items[0][price]", args.stripePriceId);
  params.set("line_items[0][quantity]", "1");

  params.set("success_url", `${args.appBaseUrl}/account/?checkout=success`);
  params.set("cancel_url", `${args.appBaseUrl}/pricing/?checkout=cancel`);

  params.set("metadata[user_id]", args.userId);
  params.set("metadata[product_key]", args.productKey);
  params.set("metadata[provider]", "stripe");

  if (args.mode === "payment") {
    params.set("payment_intent_data[metadata][user_id]", args.userId);
    params.set("payment_intent_data[metadata][product_key]", args.productKey);
    params.set("payment_intent_data[metadata][provider]", "stripe");
  }

  if (args.mode === "subscription") {
    params.set("subscription_data[metadata][user_id]", args.userId);
    params.set("subscription_data[metadata][product_key]", args.productKey);
    params.set("subscription_data[metadata][provider]", "stripe");
  }

  return await stripePost("/checkout/sessions", params);
}

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: corsHeaders,
    });
  }

  if (req.method !== "POST") {
    return jsonResponse({ error: "Method not allowed." }, 405);
  }

  try {
    const supabaseUrl = requiredEnv("SUPABASE_URL");
    const serviceRoleKey = requiredEnv("SUPABASE_SERVICE_ROLE_KEY");
    const appBaseUrl = normalizeBaseUrl(requiredEnv("APP_BASE_URL"));

    const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });

    const authHeader = req.headers.get("Authorization") || "";
    const jwt = authHeader.replace("Bearer ", "").trim();

    if (!jwt) {
      return jsonResponse({ error: "ログインが必要です。" }, 401);
    }

    const { data: userData, error: userError } =
      await supabaseAdmin.auth.getUser(jwt);

    if (userError || !userData.user) {
      return jsonResponse({ error: "ログイン情報を確認できませんでした。" }, 401);
    }

    const user = userData.user;

    const body = await req.json().catch(() => ({}));
    const productKey = String(body.product_key || "") as ProductKey;
    const product = BILLING_PRODUCTS[productKey];

    if (!product) {
      return jsonResponse({ error: "商品情報を確認できませんでした。" }, 400);
    }

    const stripePriceId = requiredEnv(product.priceEnv);

    if (product.ticketType) {
      let ticketQuery = supabaseAdmin
        .from("voyage_tickets")
        .select("id")
        .eq("user_id", user.id)
        .eq("ticket_type", product.ticketType)
        .eq("status", "available")
        .limit(1);

      if (product.ticketType === "special") {
        ticketQuery = ticketQuery.eq("duration_minutes", product.durationMinutes);
      }

      const { data: existingTickets, error: ticketError } = await ticketQuery;

      if (ticketError) {
        console.error("ticket check error:", ticketError);
        return jsonResponse(
          { error: "航海券の確認に失敗しました。" },
          500,
        );
      }

      if (existingTickets && existingTickets.length > 0) {
        return jsonResponse(
          {
            error:
              "同じ航海券をすでに持っています。その航海券を使うと、また購入できるようになります。",
          },
          409,
        );
      }
    }

    if (product.mode === "subscription") {
      const { data: existingSubscriptions, error: subscriptionError } =
        await supabaseAdmin
          .from("user_subscriptions")
          .select("id")
          .eq("user_id", user.id)
          .eq("product_key", productKey)
          .in("status", ["active", "trialing"])
          .limit(1);

      if (subscriptionError) {
        console.error("subscription check error:", subscriptionError);
        return jsonResponse(
          { error: "月額プランの確認に失敗しました。" },
          500,
        );
      }

      if (existingSubscriptions && existingSubscriptions.length > 0) {
        return jsonResponse(
          { error: "この月額プランはすでに有効です。" },
          409,
        );
      }
    }

    const { data: existingCustomer, error: customerSelectError } =
      await supabaseAdmin
        .from("billing_customers")
        .select("id,user_id,stripe_customer_id,email")
        .eq("user_id", user.id)
        .maybeSingle();

    if (customerSelectError) {
      console.error("billing customer select error:", customerSelectError);
      return jsonResponse(
        { error: "顧客情報の確認に失敗しました。" },
        500,
      );
    }

    let stripeCustomerId = existingCustomer?.stripe_customer_id || "";

    if (!stripeCustomerId) {
      const stripeCustomer = await createStripeCustomer(
        user.email || null,
        user.id,
      );

      stripeCustomerId = stripeCustomer.id;
    }

    const { error: customerUpsertError } = await supabaseAdmin
      .from("billing_customers")
      .upsert(
        {
          user_id: user.id,
          stripe_customer_id: stripeCustomerId,
          email: user.email || null,
          updated_at: new Date().toISOString(),
        },
        {
          onConflict: "user_id",
        },
      );

    if (customerUpsertError) {
      console.error("billing customer upsert error:", customerUpsertError);
      return jsonResponse(
        { error: "顧客情報を保存できませんでした。" },
        500,
      );
    }

    const session = await createCheckoutSession({
      mode: product.mode,
      stripeCustomerId,
      stripePriceId,
      productKey,
      userId: user.id,
      appBaseUrl,
    });

    if (product.mode === "payment") {
      const monthKey = getJstMonthKey();

      const { error: purchaseInsertError } = await supabaseAdmin
        .from("billing_purchases")
        .insert({
          user_id: user.id,
          product_key: productKey,
          amount: product.amount,
          currency: product.currency,
          status: "pending",
          stripe_customer_id: stripeCustomerId,
          stripe_checkout_session_id: session.id,
          stripe_price_id: stripePriceId,
          month_key: monthKey,
          provider: "stripe",
          provider_product_id: stripePriceId,
        });

      if (purchaseInsertError) {
        console.error("billing purchase insert error:", purchaseInsertError);
        return jsonResponse(
          { error: "購入記録を保存できませんでした。" },
          500,
        );
      }
    }

    return jsonResponse({
      url: session.url,
    });
  } catch (error) {
    console.error("create-stripe-checkout-session error:", error);

    return jsonResponse(
      {
        error:
          error instanceof Error
            ? error.message
            : "Checkout Session を作成できませんでした。",
      },
      500,
    );
  }
});
