import supabaseClient from "./lib/supabaseClient";
import NewsCard from "./components/NewsCard";
import { LoadMore } from "./components/LoadMore";
import { SignupForm } from "./components/SignUpForm";
import { LoginForm } from "./components/LoginForm";

const News: React.FC<{
	categoryFilter: string;
	login: boolean;
}> = ({ categoryFilter, login }) => {
	const PAGE_SIZE = 10;

	async function LoadNews() {
		const { data } = categoryFilter
			? await supabaseClient
					.from("articles")
					.select("*")
					.like("category", `%${categoryFilter}%`)
			: await supabaseClient
					.from("articles")
					.select("*")
					.range(0, PAGE_SIZE - 1)
					.order("date", { ascending: false });

		if (data) {
			return (
				<div>
					{data.map((article, index) => {
						return (
							<NewsCard
								key={index}
								id={article.id}
								category={article.category}
								rewritten_title={article.rewritten_title}
								summary={article.summary}
								date={article.date}
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
				<div className="md:col-span-8">
					{LoadNews()} {!categoryFilter && <LoadMore pageSize={PAGE_SIZE} />}
				</div>
				<div className="md:col-span-4">
					{login ? <LoginForm /> : <SignupForm />}
				</div>
			</div>
		</>
	);
};

export default News;
