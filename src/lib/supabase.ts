import type { SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

/** True when the build was given Supabase credentials. Without them the
 * forms fall back to opening a pre-filled email (see src/lib/leads.ts)
 * instead of crashing the whole app, which is what an eager
 * `createClient(undefined, …)` used to do. */
export const backendConfigured = Boolean(supabaseUrl && supabaseAnonKey);

let clientPromise: Promise<SupabaseClient> | null = null;

/** Loads the Supabase SDK on first use. It is ~40 KB gzipped and only
 * needed when someone submits a form, so it stays out of the initial
 * bundle every visitor downloads. */
export function getSupabase(): Promise<SupabaseClient | null> {
  if (!backendConfigured) return Promise.resolve(null);
  clientPromise ??= import('@supabase/supabase-js').then(({ createClient }) =>
    createClient(supabaseUrl!, supabaseAnonKey!),
  );
  return clientPromise;
}
