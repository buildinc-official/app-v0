"use client";

import { useEffect } from "react";
import { RouteErrorFrame } from "@/components/base/layout/RouteErrorFrame";

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		console.error("[app/error]", error);
	}, [error]);

	return (
		<RouteErrorFrame
			variant="fullscreen"
			title="Something went wrong"
			description="An unexpected error occurred. You can try again, or return home. If this keeps happening, contact support."
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
	);
}
