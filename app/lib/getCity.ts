export const getCity = async (lat: number, lon: number) => {
	try {
		const result = await fetch(
			`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
		);
		const data = await result.json();

		if (data) return data;
	} catch (error) {
		console.log(error);
	}
};
