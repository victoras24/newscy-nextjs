import { getWeatherInfo } from "../lib/getWeatherInfo";
import { weatherIcons } from "../helper/weatherIcons";
import { getLatLon } from "../helper/getLatLon";
import { getCity } from "../lib/getCity";

interface WeatherDataProps {
	elevation: number;
	generationtime_ms: number;
	hourly: { time: string[]; temperature_2m: number[]; weather_code: number[] };
	hourly_units: { time: string; temperature_2m: string };
	latitude: number;
	longitude: number;
	timezone: string;
	timezone_abbreviation: string;
	utc_offset_seconds: number;
}

const Weather: React.FC = async () => {
	const geolocation = getLatLon();
	const lat = geolocation.lat | 34.7768;
	const lon = geolocation.lon | 32.4245;

	const city = await getCity(lat, lon); // better to fetch data from google api
	const data = await getWeatherInfo(lat, lon);

	function WeatherIcon(code: any) {
		const Icon = weatherIcons[code] || weatherIcons[0];
		return <Icon size={48} />;
	}

	const getTime = () => {
		const dateNow = new Date(Date.now());
		if (dateNow.getMinutes() >= 30) {
			dateNow.setHours(dateNow.getHours() + 1);
		}

		dateNow.setMinutes(0, 0, 0);

		const dateNowString = dateNow.toISOString().replace(":00.000Z", "");
		return dateNowString;
	};

	const time = getTime();

	let timeTemperatureWeatherCodeMap = new Map<
		string,
		{ time: string; temperature: number; weatherCode: number }
	>();

	if (data)
		for (let i = 0; i < data.hourly.time.length; i++) {
			timeTemperatureWeatherCodeMap.set(data.hourly.time[i], {
				time: data.hourly.time[i],
				temperature: data.hourly.temperature_2m[i],
				weatherCode: data.hourly.weather_code[i],
			});
		}

	const cleanData = timeTemperatureWeatherCodeMap.get(time);

	return (
		<div className="flex items-center gap-2 max-w-sm rounded-xl overflow-hidden shadow-lg my-3 p-3 bg-white">
			<span>{WeatherIcon(cleanData?.weatherCode)}</span>
			<div className="flex flex-col justify-between items-center">
				<h2 className="text-md font-bold">Paphos</h2>
				<h1 className="text-xl font-bold">
					{cleanData?.temperature}
					{data?.hourly_units.temperature_2m}
				</h1>
			</div>
		</div>
	);
};

export default Weather;
