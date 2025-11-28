import { NextResponse } from "next/server";
import Perplexity from "@perplexity-ai/perplexity_ai";
import type { NextApiRequest, NextApiResponse } from "next";
import supabaseClient from "@/app/lib/supabaseClient";

export async function GET() {
	const client = new Perplexity({
		apiKey: process.env.NEXT_PURPLE_API_KEY,
	});

	try {
		const response = await client.chat.completions.create({
			model: "sonar",
			messages: [
				{
					role: "system",
					content:
						"You produce structured news summaries based on real sources.",
				},
				{
					role: "user",
					content: `
                  Find the most important and distinct Cyprus news from the last 24 hours.

                  Focus on:
                  - News specifically about Cyprus or directly affecting Cyprus
                  - Stories from reputable Cypriot news sources

              DEDUPLICATION RULES:
              - If multiple sources cover the same event, select the most authoritative source
              - Look for unique angles or developments in each story
              - Avoid including the same news event multiple times
              - Prioritize stories with significant impact

              For each unique story:
              - Extract the original title exactly as published
              - Create a compelling rewritten title (max 80 characters)
              - Write a concise 1-2 sentence summary highlighting key facts
              - Provide the direct source URL
              - Categorize: politics, crime, economy, society, sports, environment, health, education
              - Name the source publication

              Return maximum 6 distinct stories in JSON format.
    `,
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
							},
							required: [
								"original_title",
								"rewritten_title",
								"summary",
								"url",
								"category",
								"source",
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

		const articles = response.search_results;
		// return NextResponse.json(articles);
		articles?.forEach(async (article) => {
			const { title, url, date, last_updated, snippet, source } = article;
			const { error, data } = await supabaseClient
				.from("articles")
				.insert({ title, url, date, last_updated, snippet, source })
				.select();
			if (error) {
				console.error("Database error:", error);
				return NextResponse.json(
					{ error: "Failed to save articles to database" },
					{ status: 500 }
				);
			}

			console.log("Saved to DB:", data);

			return NextResponse.json({
				success: true,
				articles: data,
			});
		});
	} catch (error: any) {
		return NextResponse.json(
			{ error: error.message || "Unknown error" },
			{ status: 500 }
		);
	}
}

export async function getNewsDataFromDb() {
	try {
		const data = await supabaseClient.from("articles").select;
		return NextResponse.json({ success: true, articles: data });
	} catch (error) {
		return NextResponse.json({ error: error }, { status: 500 });
	}
}
