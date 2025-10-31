import { SummaryCard } from "@/components/base/general/SummaryCard";
import { useOrganisationStore } from "@/lib/store/organisationStore";
import { useProjectStore } from "@/lib/store/projectStore";
import { FolderOpen, Building2, CheckSquare } from "lucide-react";
import React from "react";

type Props = {};

const Summary = (props: Props) => {
	const organisations = Object.values(
		useOrganisationStore((state) => state.organisations)
	);
	const projects = useProjectStore((state) => state.projects);
	const activeProjects = Object.values(projects).filter(
		(project) => project.status === "Active"
	);
	const pendingApprovals = Object.values(projects).filter(
		(project) => project.status === "Pending"
	);
	return (
		<div className="grid gap-6 grid-cols-1  lg:grid-cols-3">
			{/* Active Projects */}
			<SummaryCard
				title="Active Projects"
				content={`${activeProjects.length}`}
				icon={<FolderOpen className="h-4 w-4 text-blue-600" />}
			/>

			{/* Organisations */}
			<SummaryCard
				title="Organisations"
				content={organisations.length}
				icon={<Building2 className="h-4 w-4 text-blue-600" />}
			/>
			{/* Budget Alerts
			<SummaryCard
				title="Budget Alerts"
				content={`${pendingApprovals.length}`}
				icon={<AlertTriangle className="h-4 w-4 text-amber-600" />}
			/> */}
			{/* Pending Approvals */}
			<SummaryCard
				title="Pending Approvals"
				content={pendingApprovals.length}
				icon={<CheckSquare className="h-4 w-4 text-green-600" />}
			/>
		</div>
	);
};

export default Summary;
