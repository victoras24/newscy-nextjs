import CurrentDate from "./CurrentDate";
import { ModeToggle } from "./theme-mode";
import Weather from "./Weather";

export const InfoBar: React.FC = () => {
	return (
		<div className="flex justify-between items-center md:my-4 py-1 px-3 bg-foreground text-background">
			<CurrentDate />
			<Weather />
			<ModeToggle />
		</div>
	);
};
