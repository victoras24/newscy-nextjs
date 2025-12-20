import "../style/_newsCard.scss";
import { Badge } from "./badge";
import { Card } from "./Card";

interface NewsCardProps {
	category: string;
	rewritten_title: string;
	summary: string;
	date: string;
	url: string;
	imageUrl: string;
}

const NewsCard: React.FC<NewsCardProps> = ({
	category,
	rewritten_title,
	summary,
	date,
	url,
	imageUrl,
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
					<Badge variant="secondary">{category}</Badge>
					<a
						href={url}
						target="_blank"
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
