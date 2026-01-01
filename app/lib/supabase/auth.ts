import supabaseClient from "../supabaseClient";

export class Auth {
	loading: boolean = false;
	/**
	 *
	 */
	constructor() {}

	signUpNewUser = async (email: string, password: string) => {
		this.setIsLoading(true);
		const { data, error } = await supabaseClient.auth.signUp({
			email: email,
			password: password,
			options: {
				emailRedirectTo: "/",
			},
		});
		if (data) {
			this.setIsLoading(false);
			console.log(data);
		} else if (error) {
			this.setIsLoading(false);
			console.log(error);
		}
	};

	signInWithEmail = async (email: string, password: string) => {
		this.setIsLoading(true);
		const { data, error } = await supabaseClient.auth.signInWithPassword({
			email: email,
			password: password,
		});
		if (data) {
			this.setIsLoading(false);
			console.log(data);
		} else if (error) {
			this.setIsLoading(false);
			console.log(error);
		}
	};

	setIsLoading = (isLoading: boolean) => {
		this.loading = isLoading;
	};
}
