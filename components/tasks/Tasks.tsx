"use client";
import React, { useState } from "react";
import { CheckSquare, AlertCircle, User } from "lucide-react";
import TaskDetailModal from "./TaskDetailModal";
import TaskTable from "./TaskTable";
import { ITask } from "@/lib/types";
import { SummaryCard } from "@/components/base/general/SummaryCard";
import PaymentModal from "./modals/PaymentModal";
import MaterialModal from "./modals/MaterialModal";

export default function Tasks({ tasks }: { tasks: ITask[] }) {
	const [selectedTask, setSelectedTask] = useState<ITask | undefined>(
		undefined
	);
	const [isTaskDetailOpen, setIsTaskDetailOpen] = useState(false);
	const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
	const [isMaterialModalOpen, setIsMaterialModalOpen] = useState(false);

	const inProgressTasks = tasks.filter((task) => task.status === "Active");
	const awaitingApprovalTasks = tasks.filter(
		(task) => task.status === "Reviewing"
	);
	const completedTasks = tasks.filter((task) => task.status === "Completed");

	return (
		<div className="flex flex-1 flex-col">
			<div className="flex-1 space-y-6 p-6 mb-10">
				{/* Task Summary */}
				<div className="grid gap-3 md:grid-cols-3">
					<SummaryCard
						title="In Progress"
						content={inProgressTasks.length}
						icon={<User className="h-5 w-5 text-blue-600" />}
					/>
					<SummaryCard
						title="Awaiting Approval"
						content={awaitingApprovalTasks.length}
						icon={
							<AlertCircle className="h-5 w-5 text-yellow-600" />
						}
					/>
					<SummaryCard
						title="Completed"
						content={completedTasks.length}
						icon={
							<CheckSquare className="h-5 w-5 text-green-600" />
						}
					/>
				</div>

				{/* In Progress Tasks */}
				<TaskTable
					icon={<User className="h-5 w-5 text-blue-600" />}
					title="Tasks In Progress"
					desc="Tasks currently assigned to you"
					taskList={inProgressTasks}
					end="No tasks in progress"
					setSelectedTask={setSelectedTask}
					setIsTaskDetailOpen={setIsTaskDetailOpen}
				/>
				<TaskTable
					icon={<AlertCircle className="h-5 w-5 text-yellow-600" />}
					title="Awaiting Approval"
					desc="Tasks completed and waiting for manager approval"
					taskList={awaitingApprovalTasks}
					end="No tasks in progress"
					setSelectedTask={setSelectedTask}
					setIsTaskDetailOpen={setIsTaskDetailOpen}
				/>
				<TaskTable
					icon={<CheckSquare className="h-5 w-5 text-green-600" />}
					title="Completed Tasks"
					desc="Tasks that have been approved and completed"
					taskList={completedTasks}
					end="No completed tasks"
					setSelectedTask={setSelectedTask}
					setIsTaskDetailOpen={setIsTaskDetailOpen}
				/>

				{/* Modals */}
				<TaskDetailModal
					isTaskDetailOpen={isTaskDetailOpen}
					setIsTaskDetailOpen={setIsTaskDetailOpen}
					selectedTask={selectedTask}
					setIsPaymentModalOpen={setIsPaymentModalOpen}
					setIsMaterialModalOpen={setIsMaterialModalOpen}
				/>
				<PaymentModal
					isPaymentModalOpen={isPaymentModalOpen}
					setIsPaymentModalOpen={setIsPaymentModalOpen}
					selectedTask={selectedTask}
				/>
				<MaterialModal
					isMaterialModalOpen={isMaterialModalOpen}
					setIsMaterialModalOpen={setIsMaterialModalOpen}
					selectedTask={selectedTask}
				/>
			</div>
		</div>
	);
}
