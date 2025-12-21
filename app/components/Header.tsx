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
		.limit(7);

	const uniqueData = [...new Set(data)];

	const categories = uniqueData?.map(({ category }, index) => {
		return (
			<Link key={index} href={`/category/${category}`}>
				<Button variant={"link"}>{category}</Button>
			</Link>
		);
	});

	return (
		<>
			<Bar variant={"primary"}>
				<CurrentDate />
				<Weather />
				<ModeToggle />
			</Bar>
			<div className="flex justify-center aling-center">
				<h1 className="my-4 text-4xl font-bold tracking-tight text-heading md:text-5xl lg:text-6xl">
					Cyprus News Today
				</h1>
			</div>
			<Bar variant={"outline"}>
				<Link href={"/"}>
					<Button variant={"link"}>Home</Button>
				</Link>
				{categories}
			</Bar>
		</>
	);
};
