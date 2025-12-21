import Link from "next/link";
import supabaseClient from "../lib/supabaseClient";
import { Bar } from "./Bar";
import { Button } from "./button";
import CurrentDate from "./CurrentDate";
import { ModeToggle } from "./theme-mode";
import Weather from "./Weather";

export const Header: React.FC = async () => {
	const { data } = await supabaseClient
		.from("unique_categories")
		.select("category")
		.order("category", { ascending: true })
		.limit(10);

	const uniqueData = [...new Set(data)];

	const categories = uniqueData?.map(({ category }, index) => {
		return (
			<Link key={index} href={`/category/${category}`}>
				<Button variant={"link"}>{category}</Button>
			</Link>
		);
	});

	return (
		<div className="md:mb-8">
			<Bar variant={"primary"}>
				<CurrentDate />
				<Weather />
				<ModeToggle />
			</Bar>
			<div className="flex justify-center aling-center">
				<Link
					className="my-4 text-4xl font-bold tracking-tight text-heading md:text-5xl lg:text-6xl hover:cursor-pointer"
					href={"/"}
				>
					Cyprus News Today
				</Link>
			</div>
			{/* create side nav and add it there for mobile view */}
			<Bar variant={"outline"} className="hidden md:flex">
				<Link href={"/"}>
					<Button variant={"link"}>Home</Button>
				</Link>
				{categories}
			</Bar>
		</div>
	);
};
