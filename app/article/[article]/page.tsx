import supabaseClient from "@/app/lib/supabaseClient";
import Head from "next/head";

const Article = async ({
	params,
}: {
	params: Promise<{ article: string }>;
}) => {
	const { article } = await params;
	const { data } = await supabaseClient
		.from("articles")
		.select("*")
		.eq("id", article)
		.single();

	if (data)
		return (
			<>
				<Head>
					<meta property="og:title" content={data.rewritten_title} />
					<meta property="og:description" content={data.summary} />
					<meta property="og:image" content={data.image_url} />
					<meta
						property="og:url"
						content={`${process.env.NEXT_BASE_ROUTE}/articles/${data.id}`}
					/>
				</Head>
				<div className="flex flex-col gap-8">
					<h1 className="text-4xl font-bold tracking-tight text-heading md:text-5xl lg:text-6xl text-center">
						{data.rewritten_title}
					</h1>
					<div>
						<picture>
							<img className="w-full" src={data.image_url} />
						</picture>
					</div>
					{data.full_article
						?.split("\n\n")
						.map((paragraph: string, i: number) => (
							<p key={i} className="leading-relaxed">
								{paragraph}
							</p>
						))}
				</div>
			</>
		);
};

export default Article;
