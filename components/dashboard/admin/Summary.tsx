import { SummaryCard } from "@/components/base/general/SummaryCard";
import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
} from "@/components/base/ui/card";
import { useOrganisationStore } from "@/lib/store/organisationStore";
import { useProjectStore } from "@/lib/store/projectStore";
import {
	FolderOpen,
	Building2,
	AlertTriangle,
	CheckSquare,
} from "lucide-react";
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
	return (
		<div className="grid gap-6 grid-cols-1  sm:grid-cols-2 xl:grid-cols-4">
			{/* Active Projects */}
			<SummaryCard
				title="Active Projects"
				content={`${activeProjects.length}`}
				icon={<FolderOpen className="h-4 w-4 text-blue-600" />}
			/>

			{/* Organisations */}
			<SummaryCard
				title="Organisations"
				content={`${organisations.length}`}
				icon={<Building2 className="h-4 w-4 text-blue-600" />}
			/>
			{/* Budget Alerts */}
			<SummaryCard
				title="Budget Alerts"
				content="?"
				icon={<AlertTriangle className="h-4 w-4 text-amber-600" />}
			/>
			{/* Pending Approvals */}
			<SummaryCard
				title="Pending Approvals"
				content="?"
				icon={<CheckSquare className="h-4 w-4 text-green-600" />}
			/>
		</div>
	);
};

export default Summary;
