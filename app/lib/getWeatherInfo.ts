export const getWeatherInfo = () => {
	try {
		const result = fetch(
			"https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m"
		)
			.then((res) => res.json())
			.then((data) => data);

		if (result) return result;
	} catch (error) {
		console.log(error);
	}
};
