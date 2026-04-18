import React from "react";
import { IProfile, ITask } from "@/lib/types";

import { SummaryCard } from "@/components/base/general/SummaryCard";
import { CheckSquare, Clock } from "lucide-react";
import DashboardQuickActions from "./DashboardQuickActions";

const Dashboard = ({
	profile,
	tasks,
}: {
	profile: IProfile;
	tasks: ITask[];
}) => {
	const inProgressTasks = tasks.filter((task) => task.status === "Active");
	const awaitingApprovalTasks = tasks.filter(
		(task) => task.status === "Reviewing",
	);
	const today = new Date().toLocaleDateString(undefined, {
		weekday: "long",
		month: "short",
		day: "numeric",
	});

	return (
		<div className="flex min-h-0 flex-1 flex-col">
			<div className="mx-auto w-full max-w-6xl flex-1 space-y-6 px-4 pb-24 pt-4 sm:space-y-8 sm:px-6 sm:pb-12 sm:pt-6">
				<section className="relative overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br from-primary/12 via-background/90 to-background p-5 shadow-sm ring-1 ring-border/40 sm:p-8">
					<div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary/20 blur-3xl" />
					<div className="relative space-y-2">
						<p
							className="text-xs font-medium uppercase tracking-wider text-muted-foreground"
							suppressHydrationWarning
						>
							{today}
						</p>
						<h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
							Welcome back{profile?.name ? `, ${profile.name}` : ""}
						</h1>
						<p className="max-w-xl text-sm text-muted-foreground sm:text-base">
							Here is a snapshot of your tasks and shortcuts to get
							things done.
						</p>
					</div>
				</section>

				<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
					<SummaryCard
						title="Tasks in progress"
						content={
							<span className="tabular-nums">
								{inProgressTasks.length}
							</span>
						}
						icon={
							<span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary ring-1 ring-primary/20">
								<CheckSquare className="h-5 w-5" aria-hidden />
							</span>
						}
						className="border-border/60 bg-background/80 shadow-sm ring-1 ring-border/40 backdrop-blur-sm"
					/>

					<SummaryCard
						title="Tasks awaiting approval"
						content={
							<span className="tabular-nums">
								{awaitingApprovalTasks.length}
							</span>
						}
						icon={
							<span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/15 text-amber-700 ring-1 ring-amber-500/25 dark:text-amber-400">
								<Clock className="h-5 w-5" aria-hidden />
							</span>
						}
						className="border-border/60 bg-background/80 shadow-sm ring-1 ring-border/40 backdrop-blur-sm"
					/>
				</div>

				<DashboardQuickActions />
			</div>
		</div>
	);
};

export default Dashboard;
