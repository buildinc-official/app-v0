import type { Metadata } from "next";
import { Comfortaa, Nunito, Quicksand } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import AsyncAppLayout from "@/components/base/layout/AsyncAppLayout";
import { logout } from "@/components/base/header/UserDropdown";

const defaultUrl = process.env.VERCEL_URL
	? `https://${process.env.VERCEL_URL}`
	: "http://localhost:3000";

export const metadata: Metadata = {
	metadataBase: new URL(defaultUrl),
	title: "BuildInc",
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
				<Toaster position="top-right" />
				<AsyncAppLayout>{children}</AsyncAppLayout>
			</body>
		</html>
	);
}
