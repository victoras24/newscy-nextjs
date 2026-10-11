"use client";

import { useEffect, useRef, useState } from "react";
import NewsCard from "./NewsCard";
import { supabaseBrowser } from "../lib/supabaseBrowser";
import { Article } from "../types/db";

export const LoadMore: React.FC<{
	pageSize: number;
	userId?: string;
	savedArticleIds?: string[];
}> = ({ pageSize, userId, savedArticleIds = [] }) => {
	const [hasMore, setHasMore] = useState<boolean>(true);
	const [posts, setPosts] = useState<Article[]>([]);

	const ref = useRef<HTMLSpanElement | null>(null);
	const page = useRef<number>(1);
	const isLoading = useRef<boolean>(false);

	useEffect(() => {
		if (!hasMore) return;

		const loadNextPage = async () => {
			if (isLoading.current) return;
			isLoading.current = true;

			try {
				const supabase = supabaseBrowser();
				const from = page.current * pageSize;
				const to = from + pageSize - 1;

				const { data, error } = await supabase
					.from("articles")
					.select("*")
					.order("date", { ascending: false })
					.range(from, to);

				if (error || !data) {
					if (error) console.error(error);
					setHasMore(false);
					return;
				}

				page.current += 1;
				setPosts((prev) => [...prev, ...data]);
				if (data.length < pageSize) {
					setHasMore(false);
				}
			} finally {
				isLoading.current = false;
			}
		};

		const observer = new IntersectionObserver((entries) => {
			if (entries.some((entry) => entry.isIntersecting)) {
				loadNextPage();
			}
		});
		if (ref.current !== null) {
			observer.observe(ref.current);
		}

		return () => observer.disconnect();
	}, [posts, hasMore, pageSize]);

	return (
		<div>
			{posts.map((article) => {
				return (
					<NewsCard
						key={article.id}
						id={article.id}
						category={article.category}
						rewritten_title={article.rewritten_title}
						summary={article.summary}
						date={article.date}
						imageUrl={article.image_url}
						userId={userId}
						isArticleSaved={savedArticleIds.includes(article.id)}
					/>
				);
			})}
			{hasMore && <span ref={ref}>Load more...</span>}
		</div>
	);
};
