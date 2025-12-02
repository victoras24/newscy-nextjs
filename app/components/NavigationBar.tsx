import Link from "next/link";
import supabaseClient from "../lib/supabaseClient";

export const NavigationBar: React.FC = () => {
	async function loadCategories() {
		const { data } = await supabaseClient.from("articles").select("category");
		const dataArray = data?.map((d) => {
			return d.category.split("/")[0];
		});
		const uniqueArray = [...new Set(dataArray)];

		return uniqueArray?.map((category, index) => {
			return (
				<NavigationSection
					key={index}
					text={`${category}`}
					navigate={`/category/${category}`}
				/>
			);
		});
	}
	loadCategories();
	return (
		<div className="bg-white md:w-screen md:p-2 border-b border-gray-300 sticky top-0">
			<div className="flex justify-center items-center mb-3">
				<h1>A LOGO MAYBE</h1>
			</div>
			<div className="flex justify-center items-center md:gap-6">
				<NavigationSection text="Home" navigate={"/"} />
				<NavigationSection text="Saved" navigate={"/saved"} />
				{loadCategories()}
			</div>
		</div>
	);
};

const NavigationSection: React.FC<{ text: string; navigate: string }> = ({
	text,
	navigate,
}) => {
	return (
		<Link
			className="text-gray-500 text-sm font-semibold hover:text-black cursor-pointer"
			href={navigate}
		>
			{text}
		</Link>
	);
};
