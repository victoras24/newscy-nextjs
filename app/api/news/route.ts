import { NextResponse } from "next/server";
import Perplexity from "@perplexity-ai/perplexity_ai";
import supabaseClient from "@/app/lib/supabaseClient";
import getImageByKeyWords from "@/app/lib/pexelClient";

export async function GET() {
	const client = new Perplexity({
		apiKey: process.env.NEXT_PURPLE_API_KEY,
	});
	const query = `Find the most important Cyprus news from the last 24 hours.

For each article:
- Extract the original title
- Create a rewritten, more engaging title  
- Write a 1–2 sentence summary
- Provide the original source URL
- Categorize the story
- Identify the source publication
- Generate image search keywords (3-5 words that would find a relevant photo)

IMAGE SEARCH GUIDELINES:
- Focus on the main subject (e.g., "electric car" not just "car")
- Include location if relevant (e.g., "Cyprus landscape")
- Include action if relevant (e.g., "protest", "construction")
- Be specific but not too narrow
- Use English terms that work well with stock photo databases

Return only 5-7 most important distinct stories.

JSON format:
[
  {
    "original_title": "",
    "rewritten_title": "",
    "summary": "",
    "url": "",
    "category": "",
    "source": "",
    "image_search_query": ""
  }
]`;

	try {
		const response = await client.chat.completions.create({
			model: "sonar",
			messages: [
				{
					role: "system",
					content: `You produce structured news summaries with image search keywords. 
For each article, generate 3-5 specific keywords that would find a relevant image on Unsplash.
Focus on the main subject, location, and action.`,
				},
				{
					role: "user",
					content: query,
				},
			],
			response_format: {
				type: "json_schema",
				json_schema: {
					name: "news_articles",
					schema: {
						type: "array",
						items: {
							type: "object",
							properties: {
								original_title: { type: "string" },
								rewritten_title: { type: "string" },
								summary: { type: "string" },
								url: { type: "string" },
								category: { type: "string" },
								source: { type: "string" },
								image_search_query: { type: "string" },
							},
							required: [
								"original_title",
								"rewritten_title",
								"summary",
								"url",
								"category",
								"source",
								"image_search_query",
							],
						},
					},
				},
			},
			search_recency_filter: "week",
			search_domain_filter: [
				"pafospress.com",
				"philenews.com",
				"sigmalive.com",
				"kathimerini.com.cy",
			],
		});

		const articles = response.choices[0].message.content;

		if (typeof articles === "string") {
			const articlesArray = JSON.parse(articles);

			for (const article of articlesArray) {
				const image = await getImageByKeyWords(article.image_search_query);
				if (image) {
					article.image_id = image.id;
					article.image_url = image.url;
				} else {
					article.image_id = null;
					article.image_url = null;
				}
			}

			const { data, error } = await supabaseClient
				.from("articles")
				.insert(articlesArray)
				.select();

			if (data) {
				return NextResponse.json({
					success: true,
					articles: articlesArray,
					data: data,
				});
			} else if (error) {
				return Response.json({
					success: false,
					message: error.message,
					cause: error.cause,
					code: error.code,
				});
			}
		} else {
			return NextResponse.json({ message: "its not string" }); // need to think how to handle it.
		}
	} catch (error: any) {
		return NextResponse.json(
			{ error: error.message || "Unknown error" },
			{ status: 500 }
		);
	}
}
