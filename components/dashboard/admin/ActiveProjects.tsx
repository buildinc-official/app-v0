import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "@/components/base/ui/card";
import { FolderOpen } from "lucide-react";
import React from "react";
import { Badge } from "@/components/base/ui/badge";
import { Progress } from "@/components/base/ui/progress";
import { useProjectStore } from "@/lib/store/projectStore";

const ActiveProjects = () => {
	const projects = useProjectStore((state) => state.projects);
	const activeProjects = Object.values(projects).filter(
		(project) => project.status === "Active"
	);
	return (
		<Card className="shadow-sm">
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					<FolderOpen className="h-5 w-5 text-blue-600" />
					Active Projects
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4 max-h-[420px] overflow-y-auto">
				{activeProjects.length > 0 ? (
					activeProjects.map((project) => {
						return (
							<ProjectShowcase
								key={project.id}
								name={project.name}
								percentage={
									(project.completedTasks > 0
										? project.completedTasks
										: 1 / project.totalTasks > 0
										? project.totalTasks
										: 1) * 100
								}
								duedate={
									project.endDate &&
									project.endDate instanceof Date
										? project.endDate.toDateString()
										: "Not Set"
								}
							/>
						);
					})
				) : (
					<div className="text-muted-foreground flex w-full items-center justify-center">
						No active projects yet
					</div>
				)}
			</CardContent>
		</Card>
	);
};

const ProjectShowcase = ({
	name,
	percentage,
	duedate,
}: {
	name: string;
	percentage: number;
	duedate: string;
}) => {
	return (
		<div className="space-y-2 z-30">
			<div className="flex items-center justify-between">
				<span className="font-medium">{name}</span>
				<Badge variant="secondary">{percentage}%</Badge>
			</div>
			<Progress
				value={percentage}
				className="h-2 z-30"
			/>
			<p className="text-sm text-slate-600">Due Date: {duedate}</p>
		</div>
	);
};
export default ActiveProjects;
