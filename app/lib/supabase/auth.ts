import { revalidatePath } from "next/cache";
import supabaseClient from "../supabaseClient";

export const signUpNewUser = async (formData: FormData) => {
	"use server";
	console.log(formData);

	const rawFormData = {
		email: formData.get("emailId"),
		password: formData.get("passwordId"),
	};

	const { data, error } = await supabaseClient.auth.signUp({
		email: rawFormData.email as string,
		password: rawFormData.password as string,
		options: {
			emailRedirectTo: "/",
		},
	});

	if (data) {
		revalidatePath("/");
		console.log(data);
	} else if (error) {
		console.log(error);
	}
};

export const signInWithEmail = async (formData: FormData) => {
	"use server";

	const rawFormData = {
		email: formData.get("emailId"),
		password: formData.get("passwordId"),
	};

	const { data, error } = await supabaseClient.auth.signInWithPassword({
		email: rawFormData.email as string,
		password: rawFormData.password as string,
	});

	if (data) {
		revalidatePath("/");
		console.log(data);
	} else if (error) {
		console.log(error);
	}
};
