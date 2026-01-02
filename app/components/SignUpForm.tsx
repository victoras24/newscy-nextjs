"use server";

import { signUpNewUser } from "../lib/supabase/auth";
import SignupFormUI from "./SignupFormUi";

export async function SignupForm({ ...props }) {
	return (
		// <Card {...props}>
		// 	<CardHeader>
		// 		<CardTitle>Create an account</CardTitle>
		// 		<CardDescription>
		// 			Enter your information below to create your account
		// 		</CardDescription>
		// 	</CardHeader>
		// 	<CardContent>
		<form action={signUpNewUser}>
			<SignupFormUI {...props} />
		</form>
		// 	</CardContent>
		// </Card>
	);
}
