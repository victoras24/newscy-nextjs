import News from "@/app/page";

const CategoryPage = async ({
	params,
}: {
	params: Promise<{ category: string }>;
}) => {
	const { category } = await params;
	return <News categoryFilter={decodeURIComponent(category)} login={false} />;
};

export default CategoryPage;
