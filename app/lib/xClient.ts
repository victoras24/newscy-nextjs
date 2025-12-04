import { Client, OAuth1Config, OAuth1, ClientConfig } from "@xdevplatform/xdk";

const xClient = async () => {
	const oauth1Config: OAuth1Config = {
		apiKey: process.env.NEXT_X_API_KEY!,
		apiSecret: process.env.NEXT_X_API_KEY_SECRET!,
		accessToken: process.env.NEXT_X_ACCESS_TOKEN!,
		accessTokenSecret: process.env.NEXT_X_ACCESS_TOKEN_SECRET!,
		callback: "",
	};

	const oauth1: OAuth1 = new OAuth1(oauth1Config);
	const config: ClientConfig = {
		oauth1: oauth1,
	};
	const client: Client = new Client(config);

	return client;
};

export default xClient;
