"use client";

import { Quicksand } from "next/font/google";
import { useEffect } from "react";
import "./globals.css";
import { RouteErrorFrame } from "@/components/base/layout/RouteErrorFrame";

const quicksand = Quicksand({
	subsets: ["latin"],
	display: "swap",
});

export default function GlobalError({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		console.error("[app/global-error]", error);
	}, [error]);

	return (
		<html
			lang="en"
			suppressHydrationWarning
		>
			<body
				className={`${quicksand.className} bg-background antialiased text-md text-foreground`}
			>
				<RouteErrorFrame
					title="Something went wrong"
					description="BuildInc hit a serious error loading this page. Try again, or go home. If the problem continues, contact support."
					primaryHref="/"
					primaryLabel="Go to home"
					onRetry={reset}
					retryLabel="Try again"
				>
					{error.digest ? (
						<p className="font-mono text-xs text-white/60">
							Reference: {error.digest}
						</p>
					) : null}
				</RouteErrorFrame>
			</body>
		</html>
	);
}
