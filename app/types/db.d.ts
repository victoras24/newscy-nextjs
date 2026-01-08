export interface Article {
	original_title: string;
	rewritten_title: string;
	summary: string;
	url: string;
	category: string;
	source: string;
	date: string;
	id: string;
	image_id: string;
	image_search_query: string;
	image_url: string;
	full_article: string;
	large_img_url: string;
}

export interface ArticleImage {
	id: string;
	url: string;
	photographer: string;
	photographer_url: string;
	alt: string;
	large_img_url: string;
}

export interface SavedArticle {
	id: string;
	userId: string;
	articleId: string;
}
