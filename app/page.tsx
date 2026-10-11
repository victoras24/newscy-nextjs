import supabaseClient from "./lib/supabaseClient";
import NewsCard from "./components/NewsCard";
import { LoadMore } from "./components/LoadMore";
import { SignupForm } from "./components/SignUpForm";
import { LoginForm } from "./components/LoginForm";
import { getUser } from "./lib/supabase/auth";
import { SignOut } from "./components/SignOut";
import { ArticlesTable } from "./components/SavedArticlesTable/columns";
import { AvatarComponent } from "./components/AvatarComponent";
import fallbackNews from "./data/fallbackNews.json";
import { Article } from "./types/db";

const News: React.FC<{
	categoryFilter: string;
	login: boolean;
}> = async ({ categoryFilter, login }) => {
	const PAGE_SIZE = 10;
	const user = await getUser();

	async function LoadSavedArticles() {
		if (!user) return null;

		const { data, error } = await supabaseClient
			.from("saved")
			.select(
				`
      article:articles (
        id,
        rewritten_title,
        category,
        summary,
        date,
        image_url
      )
    `
			)
			.eq("userId", user.sub);

		if (error) console.log(error);

		return data ?? null;
	}

	const savedArticles = await LoadSavedArticles();
	// a saved row whose article was deleted comes back with a null article
	const cleanedSavedArticles = (savedArticles ?? [])
		.map((item) => item.article as unknown as Article | null)
		.filter((article): article is Article => article !== null);
	const savedArticleIds = cleanedSavedArticles.map((article) => article.id);

	const isArticleSaved = (articleId: string) => {
		return savedArticleIds.includes(articleId);
	};

	async function LoadNews() {
		const { data } = categoryFilter
			? await supabaseClient
					.from("articles")
					.select("*")
					.like("category", `%${categoryFilter}%`)
					.order("date", { ascending: false })
			: await supabaseClient
					.from("articles")
					.select("*")
					.order("date", { ascending: false })
					.range(0, PAGE_SIZE - 1);

		const fallbackArticles = categoryFilter
			? fallbackNews.filter((article) =>
					article.category.includes(categoryFilter)
				)
			: fallbackNews;
		const articles = data?.length ? data : fallbackArticles;

		return (
			<div>
				{articles.map((article) => (
					<NewsCard
						key={article.id}
						id={article.id}
						category={article.category}
						rewritten_title={article.rewritten_title}
						summary={article.summary}
						date={article.date}
						imageUrl={article.image_url}
						userId={user?.sub}
						isArticleSaved={isArticleSaved(article.id)}
					/>
				))}
			</div>
		);
	}

	const newsNode = await LoadNews();

	return (
		<>
			<div className="grid grid-cols-1 md:grid-cols-12 md:gap-4 ">
				<div className="md:col-span-8">
					{newsNode}
					{!categoryFilter && (
						<LoadMore
							pageSize={PAGE_SIZE}
							userId={user?.sub}
							savedArticleIds={savedArticleIds}
						/>
					)}
				</div>
				<div className="md:col-span-4">
					{user ? (
						<div>
							<div className="flex gap-3 items-center">
								<AvatarComponent
									image={user.avatar_url ?? user.picture}
									fallback={(user.email ?? "?").charAt(0).toUpperCase()}
								/>
								<p>{user.email}</p>
								<SignOut />
							</div>
							<ArticlesTable data={cleanedSavedArticles} />
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
