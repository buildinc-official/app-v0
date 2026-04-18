import type { Metadata } from "next";
import { Comfortaa, Nunito, Quicksand } from "next/font/google";
import "./globals.css";
import AsyncAppLayout from "@/components/base/layout/AsyncAppLayout";

const defaultUrl = process.env.VERCEL_URL
	? `https://${process.env.VERCEL_URL}`
	: "http://localhost:3000";

export const metadata: Metadata = {
	metadataBase: new URL(defaultUrl),
	// Avoid the default "Page | BuildInc" pipe in the tab; use an en dash instead.
	title: {
		default: "BuildInc",
		template: "%s – BuildInc",
	},
	description:
		"A real estate inventory management app built with Next.js and Supabase",
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
