import News from "@/app/page";

const LoginPage = async ({
	params,
}: {
	params: Promise<{ category: string }>;
}) => {
	const { category } = await params;
	return <News categoryFilter={category} login={true} />;
};

export default LoginPage;
