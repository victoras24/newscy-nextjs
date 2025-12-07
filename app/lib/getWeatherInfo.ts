export const getWeatherInfo = async (lat: number, lon: number) => {
	try {
		const result = await fetch(
			`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,weather_code`
		);
		const data = await result.json();

		if (data) return data;
	} catch (error) {
		console.log(error);
	}
};
