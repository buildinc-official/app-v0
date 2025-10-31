import { Avatar, AvatarFallback } from "@/components/base/ui/avatar";
import { Badge } from "@/components/base/ui/badge";
import { TabsContent } from "@/components/base/ui/tabs";
import { getTaskMaterialsFromStore } from "@/lib/middleware/materials";
import { getAllProfilesFromStore } from "@/lib/middleware/profiles";
import { usePhaseStore } from "@/lib/store/phaseStore";
import { useTaskStore } from "@/lib/store/taskStore";
import { IPhase, ITask, status } from "@/lib/types";
import {
	Calendar,
	CheckCircle,
	ChevronDown,
	ChevronUp,
	Clock,
	Loader,
	Package,
	WatchIcon,
} from "lucide-react";
import React, { useMemo, useState } from "react";

export const PhaseBoard = ({
	projectId,
	isTaskDetailOpen,
	setIsTaskDetailOpen,
	setSelectedTask,
}: {
	projectId: string;
	isTaskDetailOpen: boolean;
	setIsTaskDetailOpen: React.Dispatch<React.SetStateAction<boolean>>;
	setSelectedTask: React.Dispatch<React.SetStateAction<ITask | null>>;
}) => {
	const allPhases = usePhaseStore((state) => state.phases);

	const phases = useMemo(
		() => Object.values(allPhases).filter((p) => p.projectId === projectId),
		[allPhases, projectId]
	);

	const [expandedPhases, setExpandedPhases] = useState<
		Record<string, boolean>
	>({});

	const togglePhase = (phaseId: string, status: status) => {
		const uniqueKey = `${phaseId}-${status}`;
		setExpandedPhases((prev) => ({
			...prev,
			[uniqueKey]: !prev[uniqueKey],
		}));
	};

	const phasesByStatus: Record<status, IPhase[]> = {
		Inactive: [],
		Pending: [],
		Active: [],
		Reviewing: [],
		Completed: [],
	};
	phases?.forEach((phase) => {
		if (phase.status.includes("Pending")) {
			phasesByStatus.Pending.push(phase);
		}
		if (phase.status.includes("Active")) {
			phasesByStatus.Active.push(phase);
		}
		if (phase.status.includes("Reviewing")) {
			phasesByStatus.Reviewing.push(phase);
		}
		if (phase.status.includes("Completed")) {
			phasesByStatus.Completed.push(phase);
		}
		if (phase.status.includes("Inactive")) {
			phasesByStatus.Inactive.push(phase);
		}
	});

	return (
		<TabsContent
			value="kanban"
			className="space-y-6"
		>
			{/* Kanban Board */}
			<div className="flex gap-6 overflow-x-auto pb-4">
				<KanbanColumn
					title="Inactive"
					status="Inactive"
					icon={Clock}
					titleColor="bg-gray-800"
					cardColor="bg-gray-800"
					phases={phasesByStatus.Inactive}
					expandedPhases={expandedPhases}
					togglePhase={togglePhase}
					isTaskDetailOpen={isTaskDetailOpen}
					setIsTaskDetailOpen={setIsTaskDetailOpen}
					setSelectedTask={setSelectedTask}
				/>
				<KanbanColumn
					title="Pending"
					status="Pending"
					icon={Clock}
					titleColor="bg-orange-800"
					cardColor="bg-orange-800"
					phases={phasesByStatus.Pending}
					expandedPhases={expandedPhases}
					togglePhase={togglePhase}
					isTaskDetailOpen={isTaskDetailOpen}
					setIsTaskDetailOpen={setIsTaskDetailOpen}
					setSelectedTask={setSelectedTask}
				/>
				<KanbanColumn
					title="In Progress"
					status="Active"
					icon={Loader}
					titleColor="bg-blue-800"
					cardColor="bg-blue-800"
					phases={phasesByStatus.Active}
					expandedPhases={expandedPhases}
					togglePhase={togglePhase}
					isTaskDetailOpen={isTaskDetailOpen}
					setIsTaskDetailOpen={setIsTaskDetailOpen}
					setSelectedTask={setSelectedTask}
				/>
				<KanbanColumn
					title="Awaiting Approval"
					status="Reviewing"
					icon={WatchIcon}
					titleColor="bg-gray-700"
					cardColor="bg-gray-700"
					phases={phasesByStatus.Reviewing}
					expandedPhases={expandedPhases}
					togglePhase={togglePhase}
					isTaskDetailOpen={isTaskDetailOpen}
					setIsTaskDetailOpen={setIsTaskDetailOpen}
					setSelectedTask={setSelectedTask}
				/>
				<KanbanColumn
					title="Completed"
					status="Completed"
					icon={CheckCircle}
					titleColor="bg-secondary"
					cardColor="bg-secondary"
					phases={phasesByStatus.Completed}
					expandedPhases={expandedPhases}
					togglePhase={togglePhase}
					isTaskDetailOpen={isTaskDetailOpen}
					setIsTaskDetailOpen={setIsTaskDetailOpen}
					setSelectedTask={setSelectedTask}
				/>
			</div>
		</TabsContent>
	);
};

const KanbanColumn = ({
	title,
	status,
	icon: Icon,
	titleColor,
	cardColor,
	phases,

	expandedPhases,
	togglePhase,
	isTaskDetailOpen,
	setIsTaskDetailOpen,
	setSelectedTask,
}: {
	title: string;
	status: status;
	icon: React.ComponentType<{ className?: string }>;
	titleColor: string;
	cardColor: string;
	phases: IPhase[];
	expandedPhases: Record<string, boolean>;
	togglePhase: (phaseId: string, status: status) => void;
	isTaskDetailOpen: boolean;
	setIsTaskDetailOpen: React.Dispatch<React.SetStateAction<boolean>>;
	setSelectedTask: React.Dispatch<React.SetStateAction<ITask | null>>;
}) => {
	const tasks = useTaskStore((state) => state.tasks);
	const totalTasks = phases.reduce((acc, phase) => {
		phase.taskIds.forEach((taskId) => {
			const task = Object.values(tasks).find((t) => t.id === taskId);
			if (task && task.status === status) {
				acc += 1;
			}
		});
		return acc;
	}, 0);

	return (
		<div className="flex-1 min-w-80 ">
			<div className={`p-4 rounded-t-lg ${titleColor}`}>
				<div className="flex items-center gap-2 text-white">
					<Icon className="h-5 w-5" />
					<h3 className="font-semibold">{title}</h3>
					<Badge
						variant="secondary"
						className="bg-white/20 text-white"
					>
						{totalTasks}
					</Badge>
				</div>
			</div>
			<div
				className={` p-4 rounded-b-lg min-h-96 space-y-3 ${cardColor}`}
			>
				{phases.map((phase) => {
					return (
						<PhaseCard
							key={phase.id}
							status={status}
							phase={phase}
							expandedPhases={expandedPhases}
							togglePhase={togglePhase}
							isTaskDetailOpen={isTaskDetailOpen}
							setIsTaskDetailOpen={setIsTaskDetailOpen}
							setSelectedTask={setSelectedTask}
						/>
					);
				})}
			</div>
		</div>
	);
};

const PhaseCard = ({
	status,
	phase,
	expandedPhases,
	togglePhase,
	isTaskDetailOpen,
	setIsTaskDetailOpen,
	setSelectedTask,
}: {
	status: status;
	phase: IPhase;
	expandedPhases: Record<string, boolean>;
	togglePhase: (phaseId: string, status: status) => void;
	isTaskDetailOpen: boolean;
	setIsTaskDetailOpen: React.Dispatch<React.SetStateAction<boolean>>;
	setSelectedTask: React.Dispatch<React.SetStateAction<ITask | null>>;
}) => {
	const taskDict = useTaskStore((state) => state.tasks);

	// ✅ Filter *outside* the hook using useMemo
	const phaseTasks = useMemo(
		() => Object.values(taskDict).filter((t) => t.phaseId === phase.id),
		[taskDict, phase.id]
	);
	const uniqueKey = `${phase.id}-${status}`;
	const isExpanded = expandedPhases[uniqueKey] || false;
	const thisPhaseTasks = phaseTasks.filter((task) => task.status === status);
	return (
		<div
			key={phase.id}
			className="bg-background rounded-lg border"
		>
			<div
				className="p-3 border-b cursor-pointer flex items-center justify-between"
				onClick={() => togglePhase(phase.id, status)}
			>
				<div className="flex items-center gap-2">
					{isExpanded ? (
						<ChevronUp className="h-4 w-4" />
					) : (
						<ChevronDown className="h-4 w-4" />
					)}
					<h4 className="font-medium text-sm">{phase.name}</h4>
				</div>
				<div className="text-xs text-gray-500">
					{thisPhaseTasks.length}
				</div>
			</div>

			{isExpanded && (
				<div className="p-2 space-y-2">
					{phaseTasks.map((task) => {
						if (task.status == status) {
							return (
								<TaskCard
									key={task.id}
									task={task}
									isTaskDetailOpen={isTaskDetailOpen}
									setIsTaskDetailOpen={setIsTaskDetailOpen}
									setSelectedTask={setSelectedTask}
								/>
							);
						}
					})}
				</div>
			)}
		</div>
	);
};
const TaskCard = ({
	task,
	isTaskDetailOpen,
	setIsTaskDetailOpen,
	setSelectedTask,
}: {
	task: ITask;
	isTaskDetailOpen: boolean;
	setIsTaskDetailOpen: React.Dispatch<React.SetStateAction<boolean>>;
	setSelectedTask: React.Dispatch<React.SetStateAction<ITask | null>>;
}) => {
	const getTaskColor = (): string => {
		switch (task.status) {
			case "Inactive":
				return "bg-gray-300 border-gray-200 ";
			case "Pending":
				return "bg-orange-100 border-orange-200 ";
			case "Active":
				return "bg-blue-100 border-blue-200 ";
			case "Reviewing":
				return "bg-gray-100 border-gray-200 ";
			case "Completed":
				return "bg-green-100 border-green-200 ";
			default:
				return "bg-white border-gray-200 ";
		}
	};
	const materials = getTaskMaterialsFromStore(task.id);

	const assigneeDetails = getAllProfilesFromStore().find(
		(profile) => profile.id === task.assignedTo
	);
	return (
		<div
			className={`${getTaskColor()} p-3  border rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer`}
			onClick={() => {
				setSelectedTask(task);
				setIsTaskDetailOpen(true);
			}}
		>
			<div className="flex items-start justify-between mb-2">
				<h4 className="font-medium text-sm">{task.name}</h4>
				<div className="flex items-center justify-between mt-0.5 text-xs text-muted-foreground">
					{task.estimatedDuration} Days
				</div>
			</div>

			<p className="text-xs text-slate-600 mb-3 line-clamp-2">
				{task.description}
			</p>

			<div className="space-y-2">
				{materials.length > 0 && (
					<div className="flex items-center gap-1 text-xs text-slate-500">
						<Package className="h-3 w-3" />
						{materials.length} material
						{materials.length !== 1 ? "s" : ""}
					</div>
				)}

				{task.assignedTo && (
					<div className="flex items-center gap-2">
						<Avatar className="h-6 w-6">
							<AvatarFallback className="text-xs">
								{assigneeDetails?.name
									? assigneeDetails.name[0]
									: task.assignedTo[0]}
							</AvatarFallback>
						</Avatar>
						<span className="text-xs text-slate-600">
							{assigneeDetails?.name || task.assignedTo}
						</span>
					</div>
				)}

				{task.status !== "Inactive" && task.status !== "Pending" && (
					<div className="flex items-center gap-1 text-xs text-slate-500">
						<Calendar className="h-3 w-3" />
						{task.estimatedDuration
							? new Date(
									Date.now() +
										task.estimatedDuration *
											24 *
											60 *
											60 *
											1000
							  ).toLocaleDateString()
							: "No due date"}
					</div>
				)}
			</div>
		</div>
	);
};
