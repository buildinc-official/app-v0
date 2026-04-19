import type { Metadata } from "next";
import { Comfortaa, Nunito, Quicksand } from "next/font/google";
import "./globals.css";
import AsyncAppLayout from "@/components/base/layout/AsyncAppLayout";
import { getSiteUrl } from "@/lib/siteUrl";

const siteUrl = getSiteUrl();
const siteDescription =
	"A real estate inventory management app built with Next.js and Supabase";

export const metadata: Metadata = {
	metadataBase: siteUrl,
	// Avoid the default "Page | BuildInc" pipe in the tab; use an en dash instead.
	title: {
		default: "BuildInc",
		template: "%s – BuildInc",
	},
	description: siteDescription,
	openGraph: {
		type: "website",
		url: siteUrl,
		siteName: "BuildInc",
		title: "BuildInc",
		description: siteDescription,
		locale: "en_GB",
	},
	twitter: {
		card: "summary_large_image",
		title: "BuildInc",
		description: siteDescription,
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			suppressHydrationWarning
		>
			<body className={`font-quicksand antialiased text-md`}>
				<AsyncAppLayout>{children}</AsyncAppLayout>
			</body>
		</html>
	);
}
