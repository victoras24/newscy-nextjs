export const postFacebook = async (message: string) => {
	try {
		const result = await fetch(
			`https://graph.facebook.com/v24.0/879209251948743/feed?message=${message}&access_token=${process.env.NEXT_FACEBOOK_ACCESS_TOKEN}`,
			{ method: "POST" }
		);
		const data = await result.json();

		if (data) return data;
	} catch (error) {
		console.log(error);
	}
};
