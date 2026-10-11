"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "../server";
import { redirect } from "next/navigation";

const getBaseRoute = () => {
	return process.env.NODE_ENV === "development"
		? process.env.NEXT_LOCAL_ROUTE
		: process.env.NEXT_BASE_ROUTE;
};

export const signUpNewUser = async (formData: FormData) => {
	const supabaseServerClient = await createClient();

	const rawFormData = {
		name: formData.get("name"),
		email: formData.get("email"),
		password: formData.get("password"),
		confirmPassword: formData.get("confirm-password"),
	};

	if (rawFormData.password !== rawFormData.confirmPassword) {
		console.log("Passwords do not match");
		return;
	}

	const { error } = await supabaseServerClient.auth.signUp({
		email: rawFormData.email as string,
		password: rawFormData.password as string,
		options: {
			emailRedirectTo: `${getBaseRoute()}/auth/callback`,
			data: { full_name: rawFormData.name as string },
		},
	});

	if (error) {
		console.log(error.message);
		return;
	}

	revalidatePath("/");
};

export const signInWithEmail = async (formData: FormData) => {
	const supabaseServerClient = await createClient();
	const rawFormData = {
		email: formData.get("email"),
		password: formData.get("password"),
	};

	const { error } = await supabaseServerClient.auth.signInWithPassword({
		email: rawFormData.email as string,
		password: rawFormData.password as string,
	});

	if (error) {
		console.log(error.message);
		return;
	}

	revalidatePath("/");
	redirect("/");
};

export async function signInWithGoogleAuth() {
	const route = getBaseRoute();

	const supabaseServerClient = await createClient();

	const { data, error } = await supabaseServerClient.auth.signInWithOAuth({
		provider: "google",
		options: {
			redirectTo: `${route}/auth/callback`,
		},
	});

	if (error) {
		console.log(error);
		return;
	}

	if (data.url) {
		redirect(data.url);
	}
}

export async function signOut() {
	const supabaseServerClient = await createClient();
	const { error } = await supabaseServerClient.auth.signOut();

	if (error) {
		console.log(error);
	}
}
