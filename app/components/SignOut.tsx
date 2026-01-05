import { signOut } from "../lib/supabase/actions/auth";

export const SignOut = () => {
	return (
		<button
			onClick={async () => {
				await signOut();
				window.location.reload();
			}}
		>
			Sign out
		</button>
	);
};
