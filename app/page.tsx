import CurrentDate from "./components/CurrentDate";
import Weather from "./components/Weather";
import supabaseClient from "./lib/supabaseClient";
import NewsCard from "./components/NewsCard";

const News: React.FC = () => {
	async function LoadNews() {
		const { data } = await supabaseClient.from("articles").select("*");

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
							/>
						);
					})}
				</div>
			);
		}
	}

	return (
		<>
			<div className="flex justify-between">
				<CurrentDate />
				<Weather />
			</div>
			<div className="grid grid-cols-1 md:grid-cols-12 md:gap-4">
				<div className="bg-white rounded-xl md:col-span-6">
					<div>
						<h2 className="p-4">News</h2>
					</div>
					{LoadNews()}
				</div>
				<div className="bg-white rounded-xl md:col-span-3">Something</div>
				<div className="bg-white rounded-xl md:col-span-3">Something</div>
			</div>
		</>
	);
};

export default News;
