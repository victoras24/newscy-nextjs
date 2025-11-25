export const NavigationBar: React.FC = () => {
	return (
		<div className="bg-white md:w-screen md:p-2 border-b border-gray-300 sticky top-0">
			<div className="flex justify-center items-center mb-3">
				<h1>A LOGO MAYBE</h1>
			</div>
			<div className="flex justify-center items-center md:gap-6">
				<NavigationSection text="Home" />
				<NavigationSection text="Saved" />
				<NavigationSection text="Category 1" />
				<NavigationSection text="Category 2" />
				<NavigationSection text="Category 3" />
				<NavigationSection text="Category 4" />
				<NavigationSection text="Category 5" />
			</div>
		</div>
	);
};

const NavigationSection: React.FC<{ text: string }> = ({ text }) => {
	return (
		<div className="text-gray-500 text-sm font-semibold hover:text-black cursor-pointer">
			{text}
		</div>
	);
};
