import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const ADMIN_USER_ID = "72667f4c-ae4e-46fa-ab6f-468cb198e6ad";

const corsHeaders = {
  "Access-Control-Allow-Origin": "https://celeste.world",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
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

function getDisplayName(user: any): string {
  const meta = user?.user_metadata || {};
  const appMeta = user?.app_metadata || {};

  return (
    meta.display_name ||
    meta.full_name ||
    meta.name ||
    meta.preferred_username ||
    appMeta.display_name ||
    ""
  );
}

function getAvatarUrl(user: any): string {
  const meta = user?.user_metadata || {};

  return (
    meta.avatar_url ||
    meta.picture ||
    ""
  );
}

function getProvider(user: any): string {
  const appMeta = user?.app_metadata || {};

  if (Array.isArray(appMeta.providers) && appMeta.providers.length > 0) {
    return String(appMeta.providers[0] || "");
  }

  return String(appMeta.provider || "");
}

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: corsHeaders,
    });
  }

  if (req.method !== "GET" && req.method !== "POST") {
    return jsonResponse({ error: "Method not allowed." }, 405);
  }

  try {
    const supabaseUrl = requiredEnv("SUPABASE_URL");
    const serviceRoleKey = requiredEnv("SUPABASE_SERVICE_ROLE_KEY");

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

    const currentUser = userData.user;

    if (currentUser.id !== ADMIN_USER_ID) {
      return jsonResponse({ error: "Forbidden." }, 403);
    }

    const url = new URL(req.url);
    const q = (url.searchParams.get("q") || "").trim().toLowerCase();

    const users: any[] = [];
    let page = 1;
    const perPage = 100;

    while (true) {
      const { data, error } = await supabaseAdmin.auth.admin.listUsers({
        page,
        perPage,
      });

      if (error) {
        console.error("admin list users error:", error);
        return jsonResponse(
          { error: "ユーザー一覧を取得できませんでした。" },
          500,
        );
      }

      const pageUsers = data?.users || [];

      users.push(...pageUsers);

      if (pageUsers.length < perPage) {
        break;
      }

      page += 1;

      if (page > 20) {
        break;
      }
    }

    const mappedUsers = users.map((user) => {
      const displayName = getDisplayName(user);
      const avatarUrl = getAvatarUrl(user);
      const provider = getProvider(user);

      return {
        user_id: user.id,
        email: user.email || "",
        display_name: displayName,
        avatar_url: avatarUrl,
        provider,
        created_at: user.created_at || null,
        last_sign_in_at: user.last_sign_in_at || null,
      };
    });

    const filteredUsers = q
      ? mappedUsers.filter((user) => {
          return (
            String(user.user_id || "").toLowerCase().includes(q) ||
            String(user.email || "").toLowerCase().includes(q) ||
            String(user.display_name || "").toLowerCase().includes(q)
          );
        })
      : mappedUsers;

    return jsonResponse({
      users: filteredUsers,
      count: filteredUsers.length,
    });
  } catch (error) {
    console.error("admin-list-users error:", error);

    return jsonResponse(
      {
        error:
          error instanceof Error
            ? error.message
            : "ユーザー一覧を取得できませんでした。",
      },
      500,
    );
  }
});
