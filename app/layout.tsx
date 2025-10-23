import type { Metadata } from "next";
import { Comfortaa, Geist, Nunito, Quicksand } from "next/font/google";
import "./globals.css";
import { AppLayout } from "@/components/base/layout/AppLayout";
import { Toaster } from "sonner";
import AsyncAppLayout from "@/components/base/layout/AsyncAppLayout";

const defaultUrl = process.env.VERCEL_URL
	? `https://${process.env.VERCEL_URL}`
	: "http://localhost:3000";

export const metadata: Metadata = {
	metadataBase: new URL(defaultUrl),
	title: "BuildInc",
	description:
		"A real estate inventory management app built with Next.js and Supabase",
};

// const geistSans = Geist({
// 	variable: "--font-geist-sans",
// 	display: "swap",
// 	subsets: ["latin"],
// });

const comfortaa = Comfortaa({
	variable: "--font-comfortaa",
	display: "swap",
	subsets: ["latin"],
	weight: ["700", "700"],
});
const nunito = Nunito({
	variable: "--font-nunito",
	display: "swap",
	subsets: ["latin"],
});

const quicksand = Quicksand({
	variable: "--font-quicksand",
	display: "swap",
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
});

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
