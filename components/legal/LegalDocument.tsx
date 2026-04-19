import Link from "next/link";
import type { ReactNode } from "react";
import { BuildIncLogo } from "@/components/base/brand/BuildIncLogo";

export function LegalDocument({
	title,
	lastUpdated,
	children,
}: {
	title: string;
	lastUpdated: string;
	children: ReactNode;
}) {
	return (
		<div className="min-h-svh bg-background text-foreground">
			<header className="sticky top-0 z-10 border-b border-white/10 bg-secondary text-secondary-foreground shadow-sm backdrop-blur-sm">
				<div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
					<Link
						href="/"
						className="flex items-center gap-2 font-semibold text-white"
					>
						<BuildIncLogo
							size="md"
							priority
						/>
						<span className="text-lg tracking-tight">BuildInc</span>
					</Link>
					<nav
						className="flex flex-wrap items-center justify-end gap-x-4 gap-y-1 text-xs font-medium text-white/85 sm:text-sm"
						aria-label="Legal"
					>
						<Link
							href="/privacy"
							className="transition hover:text-white"
						>
							Privacy
						</Link>
						<Link
							href="/terms"
							className="transition hover:text-white"
						>
							Terms
						</Link>
						<Link
							href="/cookies"
							className="transition hover:text-white"
						>
							Cookies
						</Link>
					</nav>
				</div>
			</header>

			<main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
				<h1 className="text-3xl font-bold tracking-tight text-secondary sm:text-4xl">
					{title}
				</h1>
				<p className="mt-2 text-sm text-muted-foreground">
					Last updated: {lastUpdated}
				</p>
				<div className="mt-10 space-y-8 text-sm leading-relaxed text-muted-foreground [&_a]:font-medium [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-2 [&_h2]:scroll-mt-24 [&_h2]:text-base [&_h2]:font-semibold [&_h2]:text-foreground [&_li]:mt-1.5 [&_ol]:list-decimal [&_ol]:pl-5 [&_p+p]:mt-4 [&_strong]:font-semibold [&_strong]:text-foreground [&_ul]:list-disc [&_ul]:pl-5">
					{children}
				</div>
			</main>
		</div>
	);
}
