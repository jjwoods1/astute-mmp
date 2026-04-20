import { createClient, SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

type GlobalWithSupabase = typeof globalThis & {
  __supabaseServer?: SupabaseClient;
};

const globalWithSupabase = globalThis as GlobalWithSupabase;

export const supabaseServer: SupabaseClient =
  globalWithSupabase.__supabaseServer ??
  createClient(url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

if (process.env.NODE_ENV !== "production") {
  globalWithSupabase.__supabaseServer = supabaseServer;
}
