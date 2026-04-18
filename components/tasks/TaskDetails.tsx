import { Badge } from "@/components/base/ui/badge";
import { Label } from "@/components/base/ui/label";
import { TabsContent } from "@/components/base/ui/tabs";
import { taskStatusBadgeVariant } from "@/lib/functions/taskStatusUi";
import { RupeeIcon } from "@/lib/functions/utils";
import { ITask } from "@/lib/types";
import React from "react";

const TaskDetails = ({
	selectedTask,
	projectName,
}: {
	selectedTask: ITask;
	projectName: string;
}) => {
	return (
		<TabsContent value="details" className="mt-0 space-y-5">
			<div className="space-y-2">
				<Label className="text-sm font-medium text-muted-foreground">
					Description
				</Label>
				<p className="text-sm leading-relaxed">
					{selectedTask.description?.trim()
						? selectedTask.description
						: "No description."}
				</p>
			</div>

			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
				<div className="space-y-1.5">
					<Label className="text-sm font-medium text-muted-foreground">
						Project
					</Label>
					<p className="text-sm font-medium">{projectName || "—"}</p>
				</div>

				<div className="space-y-1.5">
					<Label className="text-sm font-medium text-muted-foreground">
						Status
					</Label>
					<div>
						<Badge
							variant={taskStatusBadgeVariant(selectedTask.status)}
							className="capitalize"
						>
							{selectedTask.status}
						</Badge>
					</div>
				</div>

				<div className="space-y-1.5">
					<Label className="text-sm font-medium text-muted-foreground">
						Estimated days
					</Label>
					<p className="text-sm tabular-nums">
						{selectedTask.estimatedDuration ?? 0}
					</p>
				</div>

				<div className="space-y-1.5">
					<Label className="text-sm font-medium text-muted-foreground">
						Due date
					</Label>
					<p className="text-sm tabular-nums">
						{selectedTask.endDate
							? new Date(selectedTask.endDate).toLocaleDateString()
							: "—"}
					</p>
				</div>

				<div className="space-y-1.5 sm:col-span-2">
					<Label className="text-sm font-medium text-muted-foreground">
						Payment recorded
					</Label>
					<p className="text-sm tabular-nums">
						{(selectedTask.spent ?? 0).toFixed(2)} <RupeeIcon />
					</p>
				</div>
			</div>

			{selectedTask.completionNotes ? (
				<div className="space-y-2">
					<Label className="text-sm font-medium text-muted-foreground">
						Completion notes
					</Label>
					<p className="rounded-lg border border-border/60 bg-muted/30 p-3 text-sm">
						{selectedTask.completionNotes}
					</p>
				</div>
			) : null}

			{selectedTask.approvedBy ? (
				<div className="space-y-1.5">
					<Label className="text-sm font-medium text-muted-foreground">
						Approved by
					</Label>
					<p className="text-sm">
						{selectedTask.approvedBy}
						{selectedTask.completedDate
							? ` · ${new Date(selectedTask.completedDate).toLocaleDateString()}`
							: ""}
					</p>
				</div>
			) : null}
		</TabsContent>
	);
};

export default TaskDetails;
