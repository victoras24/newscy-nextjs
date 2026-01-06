"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "../server";
import { redirect } from "next/navigation";

export const signUpNewUser = async (formData: FormData) => {
	var supabaseServerClient = await createClient();

	const rawFormData = {
		email: formData.get("email"),
		password: formData.get("password"),
	};

	console.log(rawFormData);

	const { data, error } = await supabaseServerClient.auth.signUp({
		email: rawFormData.email as string,
		password: rawFormData.password as string,
		options: {
			emailRedirectTo: "/",
		},
	});

	if (data) {
		revalidatePath("/");
		console.log(data);
	}
	if (error) {
		console.log(error.message);
		console.log(error);
	}
};

export const signInWithEmail = async (formData: FormData) => {
	var supabaseServerClient = await createClient();
	const rawFormData = {
		email: formData.get("email"),
		password: formData.get("password"),
	};

	const { data, error } = await supabaseServerClient.auth.signInWithPassword({
		email: rawFormData.email as string,
		password: rawFormData.password as string,
	});

	if (data) {
		revalidatePath("/");
		console.log(data);
	}

	if (error) {
		console.log(error.message);
	}
};

export async function signInWithGoogleAuth() {
	let route;

	const env = process.env.NODE_ENV;

	if (env == "development") {
		route = process.env.NEXT_LOCAL_ROUTE;
	} else if (env == "production") {
		route = process.env.NEXT_BASE_ROUTE;
	}

	var supabaseServerClient = await createClient();

	const { data, error } = await supabaseServerClient.auth.signInWithOAuth({
		provider: "google",
		options: {
			redirectTo: `${route}/auth/callback`,
		},
	});

	if (data.url) {
		redirect(data.url);
	}

	if (error) {
		console.log(error);
	}
}

export async function signOut() {
	var supabaseServerClient = await createClient();
	const { error } = await supabaseServerClient.auth.signOut();

	if (error) {
		console.log(error);
	}
}
