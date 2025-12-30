import { createBrowserClient } from "@supabase/ssr";

export const supabaseBrowser = () =>
	createBrowserClient(
		process.env.NEXT_SUPABASE_URL!,
		process.env.NEXT_SUPABASE_ANON_KEY!
	);
