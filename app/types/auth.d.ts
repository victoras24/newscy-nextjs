export interface GoogleAuthUser {
	avatar_url: string;
	email: string;
	email_verified: boolean;
	full_name: string;
	iss: string;
	name: string;
	phone_verified: boolean;
	picture: string;
	provider_id: string;
	sub: string;
}

export interface AuthRedirectData {
	provider: string;
	url: string;
}
