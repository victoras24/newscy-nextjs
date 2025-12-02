import News from "@/app/page";

const CategoryPage = async ({
	params,
}: {
	params: Promise<{ category: string }>;
}) => {
	const { category } = await params;
	return <News categoryFilter={category} />;
};

export default CategoryPage;
