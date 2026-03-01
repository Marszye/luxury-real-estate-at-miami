import { createClient, type SupabaseClient } from "@supabase/supabase-js"

/**
 * Server-side Supabase client using the service role key.
 * Use ONLY in API routes / server code. Bypasses RLS for 100% lead capture.
 * Never expose this client to the browser.
 */
function getServerSupabase(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !serviceRoleKey) {
    return null
  }

  return createClient(url, serviceRoleKey, {
    auth: { persistSession: false },
  })
}

/** Cached server client for the current process */
let serverClient: SupabaseClient | null | undefined

/**
 * Returns the Supabase server client (service role). Use in API routes only.
 * Ensures RLS is bypassed so leads are always persisted.
 */
export function getSupabaseServerClient(): SupabaseClient | null {
  if (serverClient === undefined) {
    serverClient = getServerSupabase()
  }
  return serverClient
}
