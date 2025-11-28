import "../style/_newsCard.scss";

interface NewsCardProps {
	category: string;
	title: string;
	summary: string;
	date: string;
}

const NewsCard: React.FC<NewsCardProps> = ({
	category,
	title,
	summary,
	date,
}) => {
	return (
		<div>
			<hr className="h-px my-2 bg-gray-200 border-0 mx-4" />
			<div className="flex justify-between items-center bg-neutral-primary-soft p-4 rounded-xl md:flex-row mb-3">
				<div className="">
					<img
						className="news-card__image object-cover w-full rounded-xl mr-4"
						src="https://cyprus-mail.com/image/s640x515/fill/webp/path/wp-content/uploads/2025/11/feature-charalambos-main-The-Landmark-hotel-and-luxury-residence-complex-in-Nicosia-will-host-EU-delegates.jpg"
						alt=""
					/>
				</div>
				<div className="flex flex-col justify-items-end items-end md:pl-4 leading-normal ">
					<h5>{category}</h5>
					<h5 className="mb-2 text-lg font-medium text-end hover:cursor-pointer hover:underline underline-offset-2">
						{title}
					</h5>
					<span className="text-sm">{date}</span>
				</div>
			</div>
		</div>
	);
};

export default NewsCard;
