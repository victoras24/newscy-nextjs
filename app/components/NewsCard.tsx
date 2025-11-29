import "../style/_newsCard.scss";

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
	console.log(imageUrl);
	return (
		<div>
			<hr className="h-px my-2 bg-gray-200 border-0 mx-4" />
			<div className="flex justify-between items-center bg-neutral-primary-soft p-4 rounded-xl md:flex-row">
				<div className="">
					<img
						className="news-card__image object-cover w-full rounded-xl mr-4"
						src={imageUrl}
						alt=""
					/>
				</div>
				<div className="flex flex-col justify-items-end items-end md:pl-4 leading-normal ">
					<h5>{category}</h5>
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
			<div className="p-4">{summary}</div>
		</div>
	);
};

export default NewsCard;
