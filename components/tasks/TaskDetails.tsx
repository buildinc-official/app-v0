import { Badge } from "@/components/base/ui/badge";
import { Label } from "@/components/base/ui/label";
import { TabsContent } from "@/components/base/ui/tabs";
import { getStatusColor, RupeeIcon } from "@/lib/functions/utils";
import { ITask } from "@/lib/types";
import React from "react";

type Props = {};

const TaskDetails = ({
	selectedTask,
	projectName,
	completionNotes,
	setCompletionNotes,
}: {
	selectedTask: ITask;
	projectName: string;
	completionNotes: string;
	setCompletionNotes: React.Dispatch<React.SetStateAction<string>>;
}) => {
	function completeTask(id: string): void {
		throw new Error("Function not implemented.");
	}

	return (
		<TabsContent
			value="details"
			className="space-y-4"
		>
			<div className="space-y-2">
				<Label className="text-sm font-medium text-slate-600">
					Description
				</Label>
				<p className="text-sm">{selectedTask.description}</p>
			</div>
			<div className="grid grid-cols-2 gap-4">
				<div className="space-y-1">
					<Label className="text-sm font-medium text-slate-600">
						Project
					</Label>
					<p className="text-sm font-medium ">{projectName}</p>
				</div>

				<div className="space-y-1 flex flex-col">
					<Label className="text-sm font-medium text-slate-600">
						Status
					</Label>
					<Badge
						className={`w-fit ${getStatusColor(
							selectedTask.status
						)}`}
						variant="secondary"
					>
						{selectedTask.status
							.replace("-", " ")
							.replace(/\b\w/g, (l: string) => l.toUpperCase())}
					</Badge>
				</div>
				<div className="space-y-1">
					<Label className="text-sm font-medium text-slate-600">
						Estimated Days
					</Label>
					<p className="text-sm">
						{selectedTask.estimatedDuration} Days
					</p>
				</div>
				<div className="space-y-1">
					<Label className="text-sm font-medium text-slate-600">
						Due Date
					</Label>
					<p className="text-sm">
						{selectedTask.endDate
							? new Date(
									selectedTask.endDate
							  ).toLocaleDateString()
							: "N/A"}
					</p>
				</div>

				{/* {selectedTask?.plannedBudget && (
					<div>
						<Label className="text-sm font-medium text-slate-600">
							Budget
						</Label>
						<p className="text-sm">
							{selectedTask.plannedBudget
								? selectedTask.plannedBudget.toFixed()
								: "0.00"}{" "}
							<RupeeIcon />
						</p>
					</div>
				)} */}

				<div>
					<Label className="text-sm font-medium text-slate-600">
						Payment Done:
					</Label>
					<p className="text-sm">
						{selectedTask?.spent.toFixed(2)} <RupeeIcon />
					</p>
				</div>
			</div>

			{selectedTask.completionNotes && (
				<div className="space-y-1">
					<Label className="text-sm font-medium text-slate-600">
						Completion Notes
					</Label>
					<p className="text-sm bg-slate-50 p-3 rounded">
						{selectedTask.completionNotes}
					</p>
				</div>
			)}

			{selectedTask.approvedBy && (
				<div className="space-y-1">
					<Label className="text-sm font-medium text-slate-600">
						Approved By
					</Label>
					<p className="text-sm">
						{selectedTask.approvedBy} on{" "}
						{selectedTask.completedDate
							? new Date(
									selectedTask.completedDate
							  ).toLocaleDateString()
							: "N/A"}
					</p>
				</div>
			)}
		</TabsContent>
	);
};

export default TaskDetails;
