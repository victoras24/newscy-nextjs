import supabaseClient from "./lib/supabaseClient";
import NewsCard from "./components/NewsCard";
import { LoadMore } from "./components/LoadMore";
import { SignupForm } from "./components/SignUpForm";
import { LoginForm } from "./components/LoginForm";
import { getUser } from "./lib/supabase/auth";
import { SignOut } from "./components/SignOut";
import { ArticlesTable } from "./components/SavedArticlesTable/columns";

const News: React.FC<{
	categoryFilter: string;
	login: boolean;
}> = async ({ categoryFilter, login }) => {
	const PAGE_SIZE = 10;
	const user = await getUser();
	console.log(user);

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
								userId={user?.sub}
							/>
						);
					})}
				</div>
			);
		}
	}

	async function LoadSavedArticles() {
		if (!user) return null;

		const { data, error } = await supabaseClient
			.from("saved")
			.select(`
			article:articles (
				id,
				rewritten_title,
				category,
				summary,
				date,
				image_url
			)
			`)
			.eq("userId", user.sub);

		if (data) {
			return data;
		}

		if (error) {
			console.error(error);
			return null;
		}

	}
	
	const newsNode = await LoadNews();
	const savedArticles = await LoadSavedArticles();
	const cleanedSavedArticles = savedArticles?.map((article) => {
		return article.article
	})
	
	return (
		<>
			<div className="grid grid-cols-1 md:grid-cols-12 md:gap-4 ">
				<div className="md:col-span-8">
					{newsNode} {!categoryFilter && <LoadMore pageSize={PAGE_SIZE} />}
				</div>
				<div className="md:col-span-4">
					{user ? (
						<div>					
							<div className="flex gap-3">		
								<p>{user.email}</p>
								<SignOut />
							</div>
							<ArticlesTable data={cleanedSavedArticles as any} />
						</div>
					) : login ? (
						<LoginForm />
					) : (
						<SignupForm />
					)}
				</div>
			</div>
		</>
	);
};

export default News;
