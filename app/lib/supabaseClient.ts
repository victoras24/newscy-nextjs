import { createClient } from "@supabase/supabase-js";

const supabaseClient = createClient(
	process.env.NEXT_SUPABASE_URL!,
	process.env.NEXT_SUPABASE_ANON_KEY!
);

export default supabaseClient;
