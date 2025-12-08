const CurrentDate: React.FC = () => {
	const today = new Date();

	const formattedDate = new Intl.DateTimeFormat("en-US", {
		weekday: "long",
		month: "long",
		day: "numeric",
	}).format(today);

	return (
		<div className="py-5 text-xl text-neutral-500 font-medium">
			{formattedDate}
		</div>
	);
};

export default CurrentDate;
