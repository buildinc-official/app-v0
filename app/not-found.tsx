import type { Metadata } from "next";
import Link from "next/link";
import { RouteErrorFrame } from "@/components/base/layout/RouteErrorFrame";

export const metadata: Metadata = {
	title: "Page not found",
	description: "This page does not exist or has been moved.",
};

export default function NotFound() {
	return (
		<RouteErrorFrame
			variant="fullscreen"
			title="Page not found"
			description="This page doesn't exist, or you don't have access to it. Check the link or go back to the home page."
			primaryHref="/"
			primaryLabel="Go to home"
		>
			<p className="text-sm text-white/85">
				Looking for the app?{" "}
				<Link
					href="/auth/login"
					className="font-medium text-white underline underline-offset-2 hover:text-white"
				>
					Log in
				</Link>
			</p>
		</RouteErrorFrame>
	);
}
