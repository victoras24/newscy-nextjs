import { getWeatherInfo } from "../lib/getWeatherInfo";
import { weatherIcons } from "../helper/weatherIcons";

const Weather: React.FC = async () => {
	const lat = 34.7768;
	const lon = 32.4245;

	const data = await getWeatherInfo(lat, lon);

	function WeatherIcon(code?: number) {
		const Icon = (code !== undefined && weatherIcons[code]) || weatherIcons[0];
		return <Icon size={33} />;
	}

	const getTime = () => {
		const dateNow = new Date();
		if (dateNow.getMinutes() >= 30) {
			dateNow.setUTCHours(dateNow.getUTCHours() + 1);
		}

		dateNow.setUTCMinutes(0, 0, 0);

		const dateNowString = dateNow.toISOString().replace(":00.000Z", "");
		return dateNowString;
	};

	const time = getTime();

	const timeTemperatureWeatherCodeMap = new Map<
		string,
		{ time: string; temperature: number; weatherCode: number }
	>();

	if (data?.hourly)
		for (let i = 0; i < data.hourly.time.length; i++) {
			timeTemperatureWeatherCodeMap.set(data.hourly.time[i], {
				time: data.hourly.time[i],
				temperature: data.hourly.temperature_2m[i],
				weatherCode: data.hourly.weather_code[i],
			});
		}

	const cleanData = timeTemperatureWeatherCodeMap.get(time);

	return (
		<div className="flex items-center">
			<span>{WeatherIcon(cleanData?.weatherCode)}</span>
			<span>{cleanData?.temperature}</span>
			<span>{data?.hourly_units?.temperature_2m}</span>
		</div>
	);
};

export default Weather;
