import { Bookmark, BookmarkCheck, BookMarked, Ellipsis, Icon } from "lucide-react";
import "../style/_newsCard.scss";
import { Badge } from "./badge";
import { Card } from "./Card";
import { BookmarkComponent } from "./bookmark";

interface NewsCardProps {
	id: string;
	category: string;
	rewritten_title: string;
	summary: string;
	date: string;
	imageUrl: string;
	userId: string;
}

const NewsCard: React.FC<NewsCardProps> = ({
	id,
	category,
	rewritten_title,
	summary,
	date,
	imageUrl,
	userId
}) => {
	
	return (
		<Card>
			<div className="flex justify-between items-center bg-neutral-primary-soft px-4 rounded-xl md:flex-row">
				<img
					className="news-card__image object-cover w-full rounded mr-4"
					src={imageUrl}
					alt="Article image"
				/>
				<div className="flex flex-col justify-items-end items-end md:pl-4 leading-normal ">
					<div className="flex items-center gap-2">
						<Badge variant="secondary">{category}</Badge>
						<BookmarkComponent userId={userId} articleId={id}/>
					</div>	
					<a
						href={`/article/${id}`}
						className="mb-2 text-lg font-medium text-end hover:cursor-pointer hover:underline underline-offset-2"
					>
						{rewritten_title}
					</a>
					<span className="text-sm">{date}</span>
				</div>
			</div>
			<div className="px-4">{summary}</div>
		</Card>
	);
};

export default NewsCard;
