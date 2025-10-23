import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
} from "@/components/base/ui/card";
import { Label } from "@/components/base/ui/label";
import { Progress } from "@/components/base/ui/progress";
import { TabsContent } from "@/components/base/ui/tabs";
import {
	getProjectMembersByProjectId,
	getProjectMembersByProjectIdFromStore,
} from "@/lib/middleware/projectMembers";
import { IProject } from "@/lib/types";
import React from "react";

export const Overview = ({ projectData }: { projectData: IProject }) => {
	// Find the supervisor and get their name
	const supervisor = getProjectMembersByProjectIdFromStore(
		projectData.id
	).find((m) => m.memberInfo?.role === "Supervisor");
	const supervisorName = supervisor?.name || "Not assigned";

	// Calculate budget percentage safely
	const budgetUsed =
		projectData.budget && projectData.spent
			? Math.round((projectData.spent / projectData.budget) * 100)
			: 0;

	return (
		<TabsContent
			value="overview"
			className="space-y-6"
		>
			<div className="grid gap-6 lg:grid-cols-2">
				<Card className="shadow-sm">
					<CardHeader>
						<CardTitle>Project Details</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="space-y-2">
							<Label className="text-sm font-medium text-slate-600">
								Description
							</Label>
							<p className="text-sm">{projectData.description}</p>
						</div>
						<div className="grid grid-cols-2 gap-4">
							<div className="space-y-1">
								<Label className="text-sm font-medium text-slate-600">
									Start Date
								</Label>
								<p className="text-sm">
									{new Date(
										projectData.startDate ?? new Date()
									).toLocaleDateString()}
								</p>
							</div>
							<div className="space-y-1">
								<Label className="text-sm font-medium text-slate-600">
									End Date
								</Label>
								<p className="text-sm">
									{new Date(
										projectData.endDate ?? new Date()
									).toLocaleDateString()}
								</p>
							</div>
							<div className="space-y-1">
								<Label className="text-sm font-medium text-slate-600">
									Location
								</Label>
								<p className="text-sm">
									{projectData.location}
								</p>
							</div>
							<div className="space-y-1">
								<Label className="text-sm font-medium text-slate-600">
									Project Manager
								</Label>
								<p className="text-sm">{supervisorName}</p>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card className="shadow-sm">
					<CardHeader>
						<CardTitle>Progress Overview</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="space-y-2">
							<div className="flex justify-between text-sm">
								<span>Overall Progress</span>
								<span>{projectData.progress}%</span>
							</div>
							<Progress
								value={projectData.progress}
								className="h-3"
							/>
						</div>
						<div className="space-y-2">
							<div className="flex justify-between text-sm">
								<span>Budget Used</span>
								<span>{budgetUsed}%</span>
							</div>
							<Progress
								value={budgetUsed}
								className="h-3"
							/>
						</div>
					</CardContent>
				</Card>
			</div>
		</TabsContent>
	);
};
