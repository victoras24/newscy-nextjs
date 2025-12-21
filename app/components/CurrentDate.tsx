const CurrentDate: React.FC = () => {
	const today = new Date();

	const formattedDate = new Intl.DateTimeFormat("en-US", {
		weekday: "long",
		month: "long",
		day: "numeric",
	}).format(today);

	return <span>{formattedDate}</span>;
};

export default CurrentDate;
