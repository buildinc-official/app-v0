import { Button } from "@/components/base/ui/button";
import {
	DialogHeader,
	DialogFooter,
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
} from "@/components/base/ui/dialog";
import { Tabs } from "@/components/base/ui/tabs";
import { CheckCircle } from "lucide-react";
import React, { useState } from "react";
import { getTaskMaterialsFromStore } from "@/lib/middleware/materials";
import { TabsTriggerList } from "@/components/base/general/TabsTriggerList";
import {
	getProjectNameFromPhaseId,
	handleTaskCompletion,
	requestMaterial,
	requestPayment,
} from "@/lib/functions/tasks";
import { ITask } from "@/lib/types";
import TaskDetails from "./TaskDetails";
import TaskMaterials from "./TaskMaterials";
import { set } from "date-fns";

const TaskDetailModal = ({
	isTaskDetailOpen,
	setIsTaskDetailOpen,
	selectedTask,
	setIsPaymentModalOpen,
	setIsMaterialModalOpen,
}: {
	isTaskDetailOpen: boolean;
	setIsTaskDetailOpen: (open: boolean) => void;
	selectedTask: ITask | undefined;
	setIsPaymentModalOpen: (open: boolean) => void;
	setIsMaterialModalOpen: (open: boolean) => void;
}) => {
	const [completionNotes, setCompletionNotes] = useState("");
	const [materialUsage, setMaterialUsage] = useState<any>({});
	const materials = getTaskMaterialsFromStore(selectedTask?.id || "");
	const projectName = getProjectNameFromPhaseId(selectedTask?.phaseId || "");

	const values =
		materials && materials.length > 0
			? [
					{ value: "details", label: "Task Details" },
					{ value: "materials", label: "Materials" },
			  ]
			: [{ value: "details", label: "Task Details" }];

	return (
		<Dialog
			open={isTaskDetailOpen}
			onOpenChange={setIsTaskDetailOpen}
		>
			<DialogContent className="sm:max-w-[700px] h-[550px] grid grid-rows-[auto_auto_1fr_auto] p-0 gap-0 overflow-hidden">
				{/* Header */}
				<DialogHeader className="px-6 pt-4 pb-2 row-span-1">
					<DialogTitle>{selectedTask?.name}</DialogTitle>
					<DialogDescription>
						Task details and actions
					</DialogDescription>
				</DialogHeader>

				{/* Tabs Container */}
				<div className="row-span-1 min-h-0">
					{selectedTask && (
						<Tabs
							defaultValue="details"
							className="w-full h-full"
						>
							<div className="sticky top-0 bg-background z-10 px-6 pt-2 pb-0">
								<TabsTriggerList triggers={values} />
							</div>

							<div className="px-6 py-0 overflow-y-auto max-h-[calc(550px-180px)]">
								<TaskDetails
									selectedTask={selectedTask}
									projectName={projectName}
									completionNotes={completionNotes}
									setCompletionNotes={setCompletionNotes}
								/>

								{materials && materials.length > 0 && (
									<TaskMaterials materials={materials} />
								)}
							</div>
						</Tabs>
					)}
				</div>

				<DialogFooter className="px-6 py-4 border-t self-end">
					<div className="flex flex-col w-full gap-4">
						<div className="flex gap-2 w-full items-center justify-center">
							<Button
								variant="default"
								onClick={() => {
									setIsTaskDetailOpen(false);
									setIsPaymentModalOpen(true);
								}}
								className="w-full"
							>
								Request Payment
							</Button>
							{materials && materials.length > 0 && (
								<Button
									variant="default"
									onClick={() => {
										setIsTaskDetailOpen(false);
										setIsMaterialModalOpen(true);
									}}
									className="w-full"
								>
									Request Material
								</Button>
							)}
						</div>
						<div className="flex gap-2 w-full items-center justify-center">
							<Button
								variant="secondary"
								onClick={() => {
									handleTaskCompletion(selectedTask?.id!);
									setIsTaskDetailOpen(false);
								}}
								className="w-full"
							>
								<CheckCircle className="mr-2 h-4 w-4" />
								Mark as Complete
							</Button>
						</div>
					</div>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default TaskDetailModal;
