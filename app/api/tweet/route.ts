import xClient from "@/app/lib/xClient";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	try {
		const { text } = await request.json();

		if (!text || text.length > 280) {
			return NextResponse.json(
				{ error: "Invalid tweet text" },
				{ status: 400 }
			);
		}

		const client = await xClient();

		const tweetResponse = await client.posts.create({ text });
		console.log("Tweet posted:", tweetResponse);

		return NextResponse.json({ success: true, data: tweetResponse });
	} catch (error) {
		console.error("Tweet error:", error);
		return NextResponse.json(
			{ error: "Failed to post tweet" },
			{ status: 500 }
		);
	}
}
