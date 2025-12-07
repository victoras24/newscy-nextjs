type coordination = {
	lat: number;
	lon: number;
};

export const getLatLon = () => {
	let coordinations: coordination = {} as coordination;
	if ("geolocation" in navigator) {
		navigator.geolocation.getCurrentPosition(
			(success) => {
				coordinations.lat = success.coords.latitude;
				coordinations.lon = success.coords.longitude;
			},
			(error) => {
				console.log(error.message);
			}
		);
	} else {
		console.log("Geolocation is not supported in the browser");
	}
	return coordinations;
};
