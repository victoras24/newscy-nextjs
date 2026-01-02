"use client";

import { Button } from "./button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "./Card";
import { Field, FieldGroup, FieldLabel } from "./field";
import { Input } from "./input";

export default function SignupFormUI(props: any) {
	console.log(props);
	return (
		<Card {...props}>
			<CardHeader>
				<CardTitle>Create an account</CardTitle>
				<CardDescription>
					Enter your information below to create your account
				</CardDescription>
			</CardHeader>

			<CardContent>
				<FieldGroup>
					<Field>
						<FieldLabel htmlFor="name">Full Name</FieldLabel>
						<Input id="name" name="name" type="text" required />
					</Field>

					<Field>
						<FieldLabel htmlFor="emailId">Email</FieldLabel>
						<Input id="emailId" name="emailId" type="email" required />
					</Field>

					<Field>
						<FieldLabel htmlFor="passwordId">Password</FieldLabel>
						<Input id="passwordId" name="passwordId" type="password" required />
					</Field>

					<Button type="submit">Create Account</Button>
				</FieldGroup>
			</CardContent>
		</Card>
	);
}
