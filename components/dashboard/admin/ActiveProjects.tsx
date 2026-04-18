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
		(project) => project.status === "Active",
	);
	return (
		<Card className="border-border/60 bg-background/80 shadow-sm ring-1 ring-border/40 backdrop-blur-sm">
			<CardHeader className="space-y-1 pb-4 sm:pb-6">
				<CardTitle className="flex items-center gap-3 text-lg sm:text-xl">
					<span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary ring-1 ring-primary/20">
						<FolderOpen className="h-5 w-5" aria-hidden />
					</span>
					Active projects
				</CardTitle>
				<CardDescription>
					Progress and due dates for everything currently in motion.
				</CardDescription>
			</CardHeader>
			<CardContent className="max-h-[min(420px,70vh)] space-y-0 overflow-y-auto overscroll-contain px-4 pb-6 sm:px-6">
				{activeProjects.length > 0 ? (
					activeProjects.map((project, i) => {
						return (
							<div
								key={project.id}
								className={
									i > 0
										? "border-t border-border/50 pt-4 sm:pt-5"
										: ""
								}
							>
								<ProjectShowcase
									name={project.name}
									percentage={
										project.progress
											? Math.round(project.progress)
											: 0
									}
									duedate={
										project.endDate &&
										project.endDate instanceof Date
											? project.endDate.toDateString()
											: "Not Set"
									}
								/>
							</div>
						);
					})
				) : (
					<div className="text-muted-foreground flex min-h-[8rem] w-full items-center justify-center rounded-lg border border-dashed border-border/60 bg-muted/20 px-4 py-8 text-center text-sm">
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
		<div className="space-y-3">
			<div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
				<span className="min-w-0 break-words font-medium leading-snug">
					{name}
				</span>
				<Badge
					variant="secondary"
					className="w-fit shrink-0 tabular-nums"
				>
					{percentage}%
				</Badge>
			</div>
			<Progress value={percentage} className="h-2.5" />
			<p className="text-sm text-muted-foreground">
				Due date: <span className="text-foreground">{duedate}</span>
			</p>
		</div>
	);
};
export default ActiveProjects;
