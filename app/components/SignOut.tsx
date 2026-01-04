"use client";

import { signOut } from "../lib/supabase/auth";

export const SignOut = () => {
	return (
		<button
			onClick={async () => {
				await signOut();
				window.location.reload(); // Refresh to show updated auth state
			}}
		>
			Sign out
		</button>
	);
};
