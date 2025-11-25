import "./globals.css";
import { NavigationBar } from "./components/NavigationBar";

export default function RootLayout({
	children,
	className,
}: Readonly<{
	children: React.ReactNode;
	className: string;
}>) {
	return (
		<html>
			<body>
				<div className={`min-h-screen flex flex-col flex-1 ${className}`}>
					<NavigationBar />
					<main className="flex-1 md:px-50">{children}</main>
				</div>
			</body>
		</html>
	);
}
