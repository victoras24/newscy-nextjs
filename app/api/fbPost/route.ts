import { postFacebook } from "@/app/lib/postFacebook";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	try {
		const { text } = await request.json();

		if (!text || text.length > 280) {
			return NextResponse.json(
				{ error: "Invalid text or length" },
				{ status: 400 }
			);
		}

		const facebookResponse = await postFacebook(text);
		console.log("Facebook post posted:", facebookResponse);

		return NextResponse.json({ success: true, data: facebookResponse });
	} catch (error) {
		console.error("Tweet error:", error);
		return NextResponse.json(
			{ error: "Failed to post tweet" },
			{ status: 500 }
		);
	}
}
