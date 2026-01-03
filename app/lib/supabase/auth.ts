import { revalidatePath } from "next/cache";
import supabaseClient from "../supabaseClient";
import { createClient } from "./server";

export const signUpNewUser = async (formData: FormData) => {
	"use server";
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
	"use server";
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

export async function signOut() {
	var supabaseServerClient = await createClient();
	const { error } = await supabaseServerClient.auth.signOut();

	if (error) {
		console.log(error);
	}
}

export async function getUser() {
	var supabaseServerClient = await createClient();
	const {
		data: { user },
	} = await supabaseServerClient.auth.getUser();
	let metadata = user?.user_metadata;
	return metadata;
}

export async function isUserSignedIn(): Promise<boolean> {
	const user = await getUser();
	if (user) return true;
	return false;
}

export async function getSession() {
	var supabaseServerClient = await createClient();
	const { data } = await supabaseServerClient.auth.getSession();
	console.log(data);
}
