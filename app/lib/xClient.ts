import {
	Client,
	OAuth2,
	generateCodeVerifier,
	generateCodeChallenge,
} from "@xdevplatform/xdk";

const xClient = async () => {
	const oauth2 = new OAuth2({
		clientId: `${process.env.NEXT_X_API_APP_ID}`,
		clientSecret: `${process.env.NEXT_X_API_CLIENT_SECRET}`,
		redirectUri: "https://example.com",
		scope: ["tweet.read", "users.read", "offline.access"],
	});

	console.log(oauth2);

	const state = "example-state";
	const codeVerifier = generateCodeVerifier();
	const codeChallenge = await generateCodeChallenge(codeVerifier);
	oauth2.setPkceParameters(codeVerifier, codeChallenge);
	const authUrl = await oauth2.getAuthorizationUrl(state);

	const tokens = await oauth2.exchangeCode(authCode, codeVerifier);

	const client = new Client({ accessToken: tokens.access_token });

	const response = await client.users.getMe();
	const me = response.data;
	console.log(me);
};

export default xClient;
