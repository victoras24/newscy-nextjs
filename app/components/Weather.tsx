import { getWeatherInfo } from "../lib/getWeatherInfo";

const Weather: React.FC = () => {
	const weather = getWeatherInfo()?.then((data) => console.log(data));
	return (
		<div className="flex flex-col gap-2 max-w-sm rounded-xl overflow-hidden shadow-lg m-5 p-5 bg-white">
			<div className="flex justify-between">
				<h2 className="text-2xl font-bold">City</h2>
				<span>icon</span>
			</div>
			<h1 className="text-6xl font-bold">42 C</h1>
			<div className="max-w-sm rounded-md overflow-hidden shadow-md p-2 bg-neutral-100">
				<span>if any warning</span>
			</div>
			<div className="flex gap-3">
				<span>temp</span>
				<span>temp</span>
				<span>temp</span>
				<span>temp</span>
				<span>temp</span>
				<span>temp</span>
			</div>
		</div>
	);
};

export default Weather;
