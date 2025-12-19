export const postFacebook = async (message: string, url: string) => {
	const token = process.env.NEXT_FACEBOOK_ACCESS_TOKEN;
	try {
		const result = await fetch(
			`https://graph.facebook.com/v24.0/879209251948743/feed?message=${message}&link=${url}&access_token=${token}`,
			{ method: "POST" }
		);
		const data = await result.json();

		if (data) return data;
	} catch (error) {
		console.log(error);
	}
};
