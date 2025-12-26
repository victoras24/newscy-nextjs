"use client";

import { useEffect, useRef, useState } from "react";
import NewsCard from "./NewsCard";
import { supabaseBrowser } from "../lib/supabaseBrowser";

export const LoadMore = () => {
	const [page, setPage] = useState<number>(1);
	const [hasMore, setHasMore] = useState<boolean>(true);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [posts, setPosts] = useState<any[]>([]);

	const ref = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const handleIntersect = (entries: IntersectionObserverEntry[]) => {
			entries.forEach(async (entry) => {
				if (entry.isIntersecting && !isLoading && hasMore) {
					const supabase = supabaseBrowser();
					setIsLoading(true);
					const from = page * 10;
					const to = from + 10 - 1;

					console.log("from", from);
					console.log("to", to);

					const { data } = await supabase
						.from("articles")
						.select("*")
						.range(from, to)
						.order("date", { ascending: false });

					if (data) {
						setPosts((prev: any) => [...prev, ...data]);
						console.log("Leeength", data.length);
						if (data.length < 10) {
							setHasMore(false);
						}
						setPage((prev) => (prev += 1));
						console.log("pagee", page);
						setIsLoading(false);
					}
				}
			});
		};

		const options = {
			root: null,
			rootMargin: "0px",
		};

		const observer = new IntersectionObserver(handleIntersect, options);

		if (ref.current !== null) {
			observer.observe(ref.current);
		}

		return () => observer.disconnect();
	}, [posts]);

	return (
		<div>
			{posts &&
				posts.map((article: any, index: number) => {
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
			{hasMore && <span ref={ref}>Load more...</span>}
		</div>
	);
};
