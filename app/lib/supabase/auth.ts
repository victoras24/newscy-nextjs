import { createClient } from "./server";

export async function getUser() {
	const supabaseServerClient = await createClient();
	const {
		data: { user },
	} = await supabaseServerClient.auth.getUser();
	const metadata = user?.user_metadata;
	return metadata;
}

export async function isUserSignedIn(): Promise<boolean> {
	const user = await getUser();
	if (user) return true;
	return false;
}

export async function getSession() {
	const supabaseServerClient = await createClient();
	const { data } = await supabaseServerClient.auth.getSession();
	console.log(data);
}
