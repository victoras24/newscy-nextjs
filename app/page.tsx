"use client";
import { useEffect, useState } from "react";
import CurrentDate from "./components/CurrentDate";
import NewsCard from "./components/NewsCard";
import Weather from "./components/Weather";

const News: React.FC = () => {
	const [articles, setArticles] = useState([]);

	// useEffect(() => {
	// 	const loadNews = async () => {
	// 		const response = await fetch("/api/news");
	// 		const data = await response.json();
	// 		setArticles(data.results);
	// 	};

	// 	loadNews();
	// 	console.log(articles);
	// }, []);

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
					<NewsCard />
					<NewsCard />
					<NewsCard />
					<NewsCard />
					<NewsCard />
				</div>
				<div className="bg-white rounded-xl md:col-span-3">Something</div>
				<div className="bg-white rounded-xl md:col-span-3">Something</div>
			</div>
		</>
	);
};

export default News;
