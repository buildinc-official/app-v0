import Image from "next/image";
import { cn } from "@/lib/functions/utils";

/** Intrinsic pixels of the brand PNG (portrait). */
const INTRINSIC_W = 373;
const INTRINSIC_H = 468;

const TARGET_HEIGHT_PX = { sm: 28, md: 36, lg: 56, xl: 72 } as const;

/** Served from /public — filename bumps caches when the asset is replaced. */
export const BUILDINC_LOGO_SRC = "/buildinc-mark.png" as const;

export function BuildIncLogo({
	className,
	size = "md",
	priority = false,
}: {
	className?: string;
	size?: keyof typeof TARGET_HEIGHT_PX;
	priority?: boolean;
}) {
	const h = TARGET_HEIGHT_PX[size];
	const w = Math.round((h * INTRINSIC_W) / INTRINSIC_H);
	return (
		<Image
			src={BUILDINC_LOGO_SRC}
			alt=""
			width={w}
			height={h}
			className={cn("shrink-0 object-contain object-left", className)}
			sizes={`${w}px`}
			priority={priority}
		/>
	);
}
