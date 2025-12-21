import supabaseClient from "./lib/supabaseClient";
import NewsCard from "./components/NewsCard";
import { LoginForm } from "./components/LoginForm";

const News: React.FC<{ categoryFilter: string }> = ({ categoryFilter }) => {
	async function LoadNews() {
		const { data } = categoryFilter
			? await supabaseClient
					.from("articles")
					.select("*")
					.like("category", `%${categoryFilter}%`)
			: await supabaseClient
					.from("articles")
					.select("*")
					.order("date", { ascending: false });
		if (data) {
			return (
				<div>
					{data.map((article, index) => {
						return (
							<NewsCard
								key={index}
								category={article.category}
								rewritten_title={article.rewritten_title}
								summary={article.summary}
								date={article.date}
								url={article.url}
								imageUrl={article.image_url}
							/>
						);
					})}
				</div>
			);
		}
	}

	return (
		<>
			<div className="grid grid-cols-1 md:grid-cols-12 md:gap-4 ">
				<div className="md:col-span-8">{LoadNews()}</div>
				<div className="md:col-span-4">
					<LoginForm />
				</div>
			</div>
		</>
	);
};

export default News;
