import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  // Using the environment variables defined in your .env file
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  );
}
