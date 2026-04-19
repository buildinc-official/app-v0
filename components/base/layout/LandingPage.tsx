import Link from "next/link";
import { BuildIncLogo } from "@/components/base/brand/BuildIncLogo";
import { SUPPORT_EMAIL, supportMailto } from "@/lib/constants/contact";
import { Button } from "@/components/base/ui/button";
import {
	Users,
	FolderKanban,
	ListTodo,
	BadgeCheck,
	BarChart3,
	ArrowRight,
	Package,
} from "lucide-react";

const features = [
	{
		icon: Users,
		title: "Organisations that scale",
		description:
			"Bring clients, contractors, and internal teams into one workspace with clear membership and access.",
	},
	{
		icon: FolderKanban,
		title: "Projects broken into phases",
		description:
			"Structure work the way sites evolve—from planning through execution—with phases and tasks everyone can follow.",
	},
	{
		icon: ListTodo,
		title: "Tasks tied to the plan",
		description:
			"Assign work, track progress, and keep context next to tasks so nothing falls through between handoffs.",
	},
	{
		icon: BadgeCheck,
		title: "Approvals built in",
		description:
			"Route decisions through approvals so sign-offs are visible, timely, and auditable.",
	},
	{
		icon: BarChart3,
		title: "Statistics & visibility",
		description:
			"See how portfolios and initiatives perform with reporting that supports operational and leadership views.",
	},
	{
		icon: Package,
		title: "Materials & inventory",
		description:
			"Connect what you are building to what you need on site—inventory awareness alongside project execution.",
	},
] as const;

const steps = [
	{
		step: "01",
		title: "Set up your organisation",
		body: "Create spaces for teams and partners, then add the projects you already run today.",
	},
	{
		step: "02",
		title: "Model work in phases & tasks",
		body: "Break projects into phases, load tasks, and keep daily updates where your people already collaborate.",
	},
	{
		step: "03",
		title: "Run approvals and review impact",
		body: "Move work forward with structured approvals and use statistics to steer timelines and resources.",
	},
] as const;

export function LandingPage() {
	return (
		<div className="flex min-h-screen flex-col bg-background text-foreground select-text [-webkit-tap-highlight-color:transparent] [&_a]:cursor-pointer [&_button]:cursor-pointer">
			<header className="sticky top-0 z-50 border-b border-white/10 bg-secondary text-secondary-foreground shadow-sm backdrop-blur-sm">
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
						className="flex items-center gap-2 sm:gap-4"
						aria-label="Primary"
					>
						<a
							href="#features"
							className="hidden text-sm font-medium text-white/80 transition hover:text-white sm:inline"
						>
							Features
						</a>
						<a
							href="#how-it-works"
							className="hidden text-sm font-medium text-white/80 transition hover:text-white sm:inline"
						>
							How it works
						</a>
						<Button
							variant="ghost"
							size="sm"
							className="text-white hover:bg-white/10 hover:text-white"
							asChild
						>
							<Link href="/auth/login">Log in</Link>
						</Button>
						<Button
							size="sm"
							className="bg-white font-medium text-secondary shadow-sm hover:bg-white/90"
							asChild
						>
							<Link href="/auth/sign-up">Sign up</Link>
						</Button>
					</nav>
				</div>
			</header>

			<main>
				<section
					className="relative overflow-hidden bg-secondary px-4 py-20 text-secondary-foreground sm:px-6 sm:py-28"
					aria-labelledby="hero-heading"
				>
					<div
						className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-primary/25 blur-3xl"
						aria-hidden
					/>
					<div
						className="pointer-events-none absolute -bottom-32 -left-24 h-72 w-72 rounded-full bg-primary/15 blur-3xl"
						aria-hidden
					/>
					<div className="relative mx-auto max-w-4xl text-center">
						<div className="mb-6 flex justify-center">
							<BuildIncLogo
								size="xl"
								className="drop-shadow-md"
							/>
						</div>
						<p className="text-sm font-medium uppercase tracking-widest text-white/70">
							Construction &amp; real estate operations
						</p>
						<h1
							id="hero-heading"
							className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl"
						>
							Work smarter. Build faster.
						</h1>
						<p className="mx-auto mt-6 max-w-2xl cursor-default text-lg text-white/90 sm:text-xl">
							When your projects outgrow chats and spreadsheets,
							BuildInc brings everything into one place—with a
							workflow designed for modern construction teams.
						</p>
						<div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
							<Button
								size="lg"
								className="min-w-[10rem] bg-white text-secondary shadow-lg hover:bg-white/95"
								asChild
							>
								<Link href="/auth/sign-up">
									Get started free
									<ArrowRight className="h-4 w-4" />
								</Link>
							</Button>
							<Button
								size="lg"
								variant="outline"
								className="min-w-[10rem] border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white"
								asChild
							>
								<Link href="/auth/login">Log in</Link>
							</Button>
						</div>
					</div>
				</section>

				<section
					id="features"
					className="scroll-mt-20 border-b border-border px-4 py-16 sm:px-6 sm:py-24"
					aria-labelledby="features-heading"
				>
					<div className="mx-auto max-w-6xl">
						<div className="mx-auto max-w-2xl text-center">
							<h2
								id="features-heading"
								className="text-3xl font-bold tracking-tight text-secondary sm:text-4xl"
							>
								Everything your projects need in one platform
							</h2>
							<p className="mt-4 text-muted-foreground sm:text-lg">
								From portfolio structure to day-to-day
								execution, BuildInc mirrors how construction and
								property teams actually work—across
								organisations, projects and jobs.
							</p>
						</div>
						<ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
							{features.map(
								({ icon: Icon, title, description }) => (
									<li
										key={title}
										className="rounded-xl border border-border bg-card/50 p-6 shadow-sm transition hover:border-primary/40 hover:shadow-md"
									>
										<div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/20 text-secondary">
											<Icon
												className="h-5 w-5"
												aria-hidden
											/>
										</div>
										<h3 className="mt-4 text-lg font-semibold text-foreground">
											{title}
										</h3>
										<p className="mt-2 text-sm leading-relaxed text-muted-foreground">
											{description}
										</p>
									</li>
								),
							)}
						</ul>
					</div>
				</section>

				<section
					id="how-it-works"
					className="scroll-mt-20 bg-muted/40 px-4 py-16 sm:px-6 sm:py-24"
					aria-labelledby="how-heading"
				>
					<div className="mx-auto max-w-6xl">
						<div className="mx-auto max-w-2xl text-center">
							<h2
								id="how-heading"
								className="text-3xl font-bold tracking-tight text-secondary sm:text-4xl"
							>
								How teams use BuildInc
							</h2>
							<p className="mt-4 text-muted-foreground sm:text-lg">
								A simple flow from setup to insight—whether you
								manage one or multiple projects.
							</p>
						</div>
						<ol className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
							{steps.map(({ step, title, body }) => (
								<li
									key={step}
									className="flex flex-col rounded-xl border border-border bg-background p-6 shadow-sm"
								>
									<span className="text-4xl font-black tabular-nums text-primary/40">
										{step}
									</span>
									<h3 className="mt-4 text-lg font-semibold">
										{title}
									</h3>
									<p className="mt-2 text-sm leading-relaxed text-muted-foreground">
										{body}
									</p>
								</li>
							))}
						</ol>
					</div>
				</section>

				<section
					className="bg-secondary px-4 py-16 text-center text-secondary-foreground sm:px-6 sm:py-20"
					aria-labelledby="cta-heading"
				>
					<div className="mx-auto max-w-2xl">
						<h2
							id="cta-heading"
							className="text-2xl font-bold sm:text-3xl"
						>
							Ready to upgrade your next project?
						</h2>
						<p className="mt-4 text-white/90">
							Create an account and invite your organisation. You
							can start structuring projects and phases in
							minutes.
						</p>
						<div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
							<Button
								size="lg"
								className="min-w-[10rem] bg-white text-secondary hover:bg-white/95"
								asChild
							>
								<Link href="/auth/sign-up">Sign up</Link>
							</Button>
							<Button
								size="lg"
								variant="outline"
								className="min-w-[10rem] border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white"
								asChild
							>
								<Link href="/auth/login">Log in</Link>
							</Button>
						</div>
					</div>
				</section>
			</main>

			<footer className="border-t border-border bg-background px-4 py-10 sm:px-6">
				<div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-6">
					<nav
						className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-medium text-muted-foreground"
						aria-label="Legal, support, and policies"
					>
						<Link
							href="/privacy"
							className="transition hover:text-foreground"
						>
							Privacy Policy
						</Link>
						<Link
							href="/terms"
							className="transition hover:text-foreground"
						>
							Terms of Service
						</Link>
						<Link
							href="/cookies"
							className="transition hover:text-foreground"
						>
							Cookie notice
						</Link>
						<a
							href={supportMailto}
							className="transition hover:text-foreground"
						>
							Support
						</a>
					</nav>
					<p className="text-center text-sm text-muted-foreground">
						Questions?{" "}
						<a
							href={supportMailto}
							className="font-medium text-foreground underline underline-offset-2 transition hover:text-primary"
						>
							{SUPPORT_EMAIL}
						</a>
					</p>
					<p className="text-center text-sm text-muted-foreground">
						&copy; {new Date().getFullYear()} BuildInc. Built for
						construction and real estate teams.
					</p>
				</div>
			</footer>
		</div>
	);
}
