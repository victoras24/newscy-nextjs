import supabaseClient from "@/app/lib/supabaseClient";
import { Metadata } from "next";

type Props = {
	params: Promise<{ article: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { article } = await params;
	const { data } = await supabaseClient
		.from("articles")
		.select("*")
		.eq("id", article)
		.single();

	if (!data) {
		return {
			title: "Article Not Found",
		};
	}

	return {
		title: data.rewritten_title,
		description: data.summary,
		openGraph: {
			title: data.rewritten_title,
			description: data.summary,
			images: [
				{
					url: data.large_img_url,
					width: 1200,
					height: 630,
					alt: data.rewritten_title,
				},
			],
			url: `${process.env.NEXT_BASE_ROUTE}/articles/${data.id}`,
			type: "article",
		},
		twitter: {
			card: "summary_large_image",
			title: data.rewritten_title,
			description: data.summary,
			images: [data.large_img_url],
		},
	};
}

const Article = async ({ params }: Props) => {
	const { article } = await params;
	const { data } = await supabaseClient
		.from("articles")
		.select("*")
		.eq("id", article)
		.single();

	if (!data) {
		return <div>Article not found</div>;
	}

	return (
		<div className="flex flex-col gap-8">
			<h1 className="text-4xl font-bold tracking-tight text-heading md:text-5xl lg:text-6xl text-center">
				{data.rewritten_title}
			</h1>
			<div>
				<picture>
					<img
						className="w-full"
						src={data.large_img_url}
						alt={data.rewritten_title}
					/>
				</picture>
			</div>
			{data.full_article?.split("\n\n").map((paragraph: string, i: number) => (
				<p key={i} className="leading-relaxed">
					{paragraph}
				</p>
			))}
		</div>
	);
};

export default Article;
