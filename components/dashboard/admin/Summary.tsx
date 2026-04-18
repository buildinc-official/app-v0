import { SummaryCard } from "@/components/base/general/SummaryCard";
import { useOrganisationStore } from "@/lib/store/organisationStore";
import { useProjectStore } from "@/lib/store/projectStore";
import { FolderOpen, Building2, CheckSquare } from "lucide-react";
import React from "react";

const Summary = () => {
	const organisations = Object.values(
		useOrganisationStore((state) => state.organisations),
	);
	const projects = useProjectStore((state) => state.projects);
	const activeProjects = Object.values(projects).filter(
		(project) => project.status === "Active",
	);
	const pendingApprovals = Object.values(projects).filter(
		(project) => project.status === "Pending",
	);
	return (
		<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
			<SummaryCard
				title="Active Projects"
				content={
					<span className="tabular-nums">{activeProjects.length}</span>
				}
				icon={
					<span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary ring-1 ring-primary/20">
						<FolderOpen className="h-5 w-5" aria-hidden />
					</span>
				}
				className="border-border/60 bg-background/80 shadow-sm ring-1 ring-border/40 backdrop-blur-sm"
			/>

			<SummaryCard
				title="Organisations"
				content={
					<span className="tabular-nums">{organisations.length}</span>
				}
				icon={
					<span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary/15 text-secondary ring-1 ring-secondary/25">
						<Building2 className="h-5 w-5" aria-hidden />
					</span>
				}
				className="border-border/60 bg-background/80 shadow-sm ring-1 ring-border/40 backdrop-blur-sm"
			/>

			<SummaryCard
				title="Pending Approvals"
				content={
					<span className="tabular-nums">{pendingApprovals.length}</span>
				}
				icon={
					<span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-700 ring-1 ring-emerald-500/20 dark:text-emerald-400">
						<CheckSquare className="h-5 w-5" aria-hidden />
					</span>
				}
				className="border-border/60 bg-background/80 shadow-sm ring-1 ring-border/40 backdrop-blur-sm sm:col-span-2 lg:col-span-1"
			/>
		</div>
	);
};

export default Summary;
