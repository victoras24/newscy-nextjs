import supabaseClient from "@/app/lib/supabaseClient";
import { createClient } from "pexels";

const client = createClient(`${process.env.NEXT_PEXEL_API}`);

const getImageByKeyWords = async (query: string) => {
	try {
		const imageData = await client.photos.search({
			query,
			per_page: 1,
		});

		if ("error" in imageData || imageData.photos.length === 0) {
			return null;
		}

		const imageObj = imageData.photos[0];

		const columns = {
			url: imageObj.src.tiny,
			photographer: imageObj.photographer,
			photographer_url: imageObj.photographer_url,
			alt: imageObj.alt,
		};

		const { data, error } = await supabaseClient
			.from("images")
			.insert(columns)
			.select()
			.single();

		if (data) {
			return data;
		}

		if (error) {
			console.log(error);
		}
	} catch (error) {
		console.log(error);
	}
};

export default getImageByKeyWords;
