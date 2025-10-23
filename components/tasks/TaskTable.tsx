import { Badge } from "@/components/base/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/base/ui/card";
import { getProjectNameFromPhaseId } from "@/lib/functions/tasks";
import { getStatusColor } from "@/lib/functions/utils";
import { getTaskMaterialsFromStore } from "@/lib/middleware/materials";
import { ITask } from "@/lib/types";
import { Calendar, Clock, Package } from "lucide-react";
import React from "react";

const TaskTable = ({
	icon,
	title,
	desc,
	taskList,
	end,
	setSelectedTask,
	setIsTaskDetailOpen,
}: {
	icon: React.ReactNode;
	title: string;
	desc: string;
	taskList: ITask[];
	end: string;
	setSelectedTask: React.Dispatch<React.SetStateAction<ITask | undefined>>;
	setIsTaskDetailOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	return (
		<Card className="shadow-sm">
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					{icon}
					{title}
				</CardTitle>
				<CardDescription>{desc}</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				{taskList.length > 0 ? (
					taskList.map((task) => (
						<TaskCard
							key={task.id}
							task={task}
							setSelectedTask={setSelectedTask}
							setIsTaskDetailOpen={setIsTaskDetailOpen}
						/>
					))
				) : (
					<p className="text-slate-500 text-center py-8">{end}</p>
				)}
			</CardContent>
		</Card>
	);
};

const TaskCard = ({
	task,
	setSelectedTask,
	setIsTaskDetailOpen,
}: {
	task: ITask;
	showCompleteButton?: boolean;
	setSelectedTask: React.Dispatch<React.SetStateAction<ITask | undefined>>;
	setIsTaskDetailOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	const materials = getTaskMaterialsFromStore(task.id);

	const projectName = getProjectNameFromPhaseId(task.phaseId);
	return (
		<div
			className="p-4 border rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
			onClick={() => {
				setSelectedTask(task);
				setIsTaskDetailOpen(true);
			}}
		>
			<div className="flex flex-col items-start justify-between mb-2 md:flex-row">
				<h3 className="font-semibold text-lg">{task.name}</h3>
				<div className="flex gap-2 mt-2 md:mt-0">
					<Badge
						className={getStatusColor(task.status)}
						variant="secondary"
					>
						{task.status
							.replace("-", " ")
							.replace(/\b\w/g, (l: string) => l.toUpperCase())}
					</Badge>
				</div>
			</div>

			<p className="text-slate-600 mb-3 text-sm">{task.description}</p>

			<div className="grid gap-4 text-sm  mb-3 grids-cols-1 md:grid-cols-2 w-fit">
				<div className="flex items-center gap-1">
					<Calendar className="h-4 w-4 mb-1 text-black" />
					Due Date:{" "}
					<p className=" text-muted-foreground">
						{task.endDate
							? new Date(task.endDate).toLocaleDateString()
							: "N/A"}
					</p>
				</div>

				<div className="flex items-center gap-1">
					<Clock className="h-4 w-4 mb-1 text-black" />
					Estimated Duration:{" "}
					<p className=" text-muted-foreground">
						{task.estimatedDuration} Days
					</p>
				</div>

				{materials && materials.length > 0 && (
					<div className="flex items-center gap-1">
						<Package className="h-4 w-4" />
						Materials:
						<p className=" text-muted-foreground">
							{materials.length}
						</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default TaskTable;
