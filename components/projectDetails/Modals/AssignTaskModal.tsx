import { Avatar, AvatarFallback } from "@/components/base/ui/avatar";
import { Button } from "@/components/base/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
} from "@/components/base/ui/dialog";
import { IProjectProfile, IProject, ITask, IPhase } from "@/lib/types";
import { projectDetails } from "@/lib/functions/projectDetails";
import React, { Dispatch, SetStateAction } from "react";

type Props = {
	isAssignTaskOpen: boolean;
	setIsAssignTaskOpen: Dispatch<SetStateAction<boolean>>;
	selectedTask: ITask | null;
	setSelectedTask: Dispatch<SetStateAction<ITask | null>>;
	teamMembers: IProjectProfile[];
	projectData: IProject;

	updateprojectDetails: (project: IProject) => void;
	currentUserId: string;
};

const AssignTaskModal = ({
	isAssignTaskOpen,
	setIsAssignTaskOpen,
	selectedTask,
	setSelectedTask,
	teamMembers,
	projectData,
	currentUserId,
}: Props) => {
	const { assignTask } = projectDetails();

	const handleAdd = (member: IProjectProfile) => {
		if (!selectedTask) return;
		assignTask(
			selectedTask.id,
			selectedTask.phaseId,
			member.id,
			currentUserId,
			projectData
		);
		setIsAssignTaskOpen(false);
		setSelectedTask(null);
	};
	return (
		<Dialog
			open={isAssignTaskOpen}
			onOpenChange={setIsAssignTaskOpen}
		>
			<DialogContent className="sm:max-w-[400px]">
				<DialogHeader>
					<DialogTitle>Assign Task</DialogTitle>
					<DialogDescription>
						Assign "{selectedTask?.name}" to a team member
					</DialogDescription>
				</DialogHeader>
				<div className="space-y-4">
					<div className="space-y-3">
						{teamMembers
							.sort((a, b) => {
								const roleOrder = {
									Admin: 0,
									Supervisor: 1,
									Employee: 2,
								};
								return (
									(roleOrder[
										a.memberInfo
											?.role as keyof typeof roleOrder
									] ?? 3) -
									(roleOrder[
										b.memberInfo
											?.role as keyof typeof roleOrder
									] ?? 3)
								);
							})
							.map((member) => (
								<div
									key={member.id}
									className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-slate-50 cursor-pointer"
									onClick={() => handleAdd(member)}
								>
									<Avatar>
										<AvatarFallback>
											{member.name[0]}
										</AvatarFallback>
									</Avatar>
									<div className="flex-1">
										<p className="font-medium">
											{member.name}
										</p>
										<p className="text-sm text-slate-600">
											{member.memberInfo?.role}
										</p>
									</div>
								</div>
							))}
					</div>
				</div>
				<DialogFooter>
					<Button
						variant="outline"
						onClick={() => setIsAssignTaskOpen(false)}
					>
						Cancel
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default AssignTaskModal;
