// Server-side Supabase utilities
// For now, we don't need server-side auth in this public website
// If needed in the future, install @supabase/ssr

export async function createClient() {
  throw new Error('Server-side Supabase client not configured');
}
