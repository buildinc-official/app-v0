"use client";
import { useState } from "react";
import { Card } from "@/components/base/ui/card";
import { Button } from "@/components/base/ui/button";
import { Input } from "@/components/base/ui/input";
import { Label } from "@/components/base/ui/label";
import { Textarea } from "@/components/base/ui/textarea";
import {
	ChevronDown,
	ChevronRight,
	Plus,
	Trash2,
	Copy,
	Clock,
	IndianRupee,
} from "lucide-react";
import { taskCreationFunctions } from "@/lib/functions/projectCreation";
import {
	Draggable,
	DraggableProvidedDragHandleProps,
	Droppable,
} from "@hello-pangea/dnd";
import TaskMaterials from "./TaskMaterials";
import {
	IPhaseTemplate,
	IProjectCreationData,
	ITaskTemplate,
} from "@/lib/types";

const TaskList = ({
	phase,
	setProjectData,
}: {
	phase: IPhaseTemplate;
	setProjectData: React.Dispatch<React.SetStateAction<IProjectCreationData>>;
}) => {
	const { updateTask, duplicateTask, removeTask, addTask } =
		taskCreationFunctions();
	return (
		<div className="space-y-2 mt-4">
			<h4 className="text-sm font-bold">Tasks</h4>
			{phase.tasks && (
				<Droppable
					droppableId={phase.id}
					type="task"
				>
					{(provided) => (
						<div
							{...provided.droppableProps}
							ref={provided.innerRef}
							className="space-y-2"
						>
							{phase.tasks.map((task, index) => (
								<Draggable
									key={task.id}
									draggableId={task.id}
									index={index}
								>
									{(provided) => (
										<div
											ref={provided.innerRef}
											{...provided.draggableProps}
										>
											<TaskCard
												task={task}
												phaseId={phase.id}
												setProjectData={setProjectData}
												dragHandleProps={
													provided.dragHandleProps
												}
											/>
										</div>
									)}
								</Draggable>
							))}
							{provided.placeholder}
						</div>
					)}
				</Droppable>
			)}
			<Button
				className="bg-muted-foreground/30 w-full"
				onClick={() => addTask(phase.id, setProjectData)}
			>
				{" "}
				<Plus className="" />
				Add Task{" "}
			</Button>
		</div>
	);
};

const TaskCard = ({
	task,
	phaseId,
	setProjectData,
	dragHandleProps,
}: {
	task: ITaskTemplate;
	phaseId: string;
	setProjectData: React.Dispatch<React.SetStateAction<IProjectCreationData>>;
	dragHandleProps: DraggableProvidedDragHandleProps | null;
}) => {
	const { updateTask, duplicateTask, removeTask, addTask } =
		taskCreationFunctions();
	const [expanded, setExpanded] = useState(false);
	const [editingTitle, setEditingTitle] = useState(false);

	const materialCost =
		task.materials?.reduce(
			(sum, m) => sum + (m.plannedQuantity ?? 1) * (m.unitCost ?? 1),
			0
		) || 0;

	return (
		<Card className="p-3 shadow-sm border bg-slate-50">
			{/* Summary Header (Drag Handle Zone) */}
			<div
				className="flex justify-between items-center cursor-pointer"
				onClick={() => setExpanded((prev) => !prev)}
				{...dragHandleProps}
			>
				<div className="flex items-center gap-2">
					{/* <GripVertical className="h-4 w-4 text-slate-400" /> */}
					{expanded ? (
						<ChevronDown className="h-4 w-4 text-slate-500" />
					) : (
						<ChevronRight className="h-4 w-4 text-slate-500" />
					)}
					{editingTitle ? (
						<Input
							autoFocus
							className="h-6 text-sm font-medium bg-muted focus-visible:ring-0 focus-visible:border-muted-foreground"
							value={task.name}
							onChange={(e) =>
								updateTask(
									phaseId,
									task.id,
									{ name: e.target.value },
									setProjectData
								)
							}
							onBlur={() => setEditingTitle(false)}
							onKeyDown={(e) => {
								if (e.key === "Enter") setEditingTitle(false);
							}}
						/>
					) : (
						<span
							className="font-bold text-slate-800"
							onClick={(e) => {
								e.stopPropagation(); // prevent expand toggle
								setEditingTitle(true);
							}}
						>
							{task.name || "Unnamed Task"}
						</span>
					)}
				</div>

				<div className="flex items-center gap-3 text-sm text-slate-600">
					<span>
						{task.estimatedDuration
							? `${task.estimatedDuration} Days`
							: "No Duration"}
					</span>
					<span className="font-semibold">
						₹{task.plannedBudget?.toLocaleString("en-IN")}
					</span>
					<Button
						variant="ghost"
						size="icon"
						onClick={(e) => {
							e.stopPropagation();
							duplicateTask(phaseId, task.id, setProjectData);
						}}
					>
						<Copy className="h-4 w-4 text-blue-600" />
					</Button>
					<Button
						variant="ghost"
						size="icon"
						onClick={(e) => {
							e.stopPropagation();
							removeTask(phaseId, task.id, setProjectData);
						}}
					>
						<Trash2 className="h-4 w-4 text-red-600" />
					</Button>
				</div>
			</div>

			{/* Expanded Content */}
			{expanded && (
				<div className="mt-4 space-y-4">
					{/* Description */}
					<div className="space-y-1">
						<Label className="font-semibold text-muted-foreground">
							Description
						</Label>
						<Textarea
							className="bg-muted focus-visible:ring-0 focus-visible:border-muted-foreground"
							value={task.description}
							placeholder="Task details..."
							onChange={(e) =>
								updateTask(
									phaseId,
									task.id,
									{ description: e.target.value },
									setProjectData
								)
							}
						/>
					</div>

					{/* Dates + Budget */}
					<div className="grid gap-4 md:grid-cols-2">
						<div className="space-y-1">
							<Label className="font-semibold text-muted-foreground">
								Estimated Duration
							</Label>
							<div className="relative">
								<Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 " />
								<Input
									type="number"
									className="pl-10 bg-muted focus-visible:ring-0 focus-visible:border-muted-foreground"
									value={
										task.estimatedDuration === undefined
											? ""
											: task.estimatedDuration
									}
									onChange={(e) => {
										const val = e.target.value;
										updateTask(
											phaseId,
											task.id,
											{
												estimatedDuration:
													val === ""
														? undefined
														: parseInt(val),
											},
											setProjectData
										);
									}}
									onBlur={(e) => {
										const val = e.target.value.trim();
										if (val === "" || isNaN(Number(val))) {
											updateTask(
												phaseId,
												task.id,
												{ estimatedDuration: 0 },
												setProjectData
											);
										}
									}}
								/>
							</div>
						</div>

						<div className="space-y-1">
							<Label className="font-semibold text-muted-foreground">
								Planned Budget
							</Label>
							<div className="relative">
								<IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 " />
								<Input
									type="text"
									className="pl-10 bg-muted focus-visible:ring-0 focus-visible:border-muted-foreground"
									value={
										task.plannedBudget === undefined ||
										task.plannedBudget === null
											? ""
											: new Intl.NumberFormat(
													"en-IN"
											  ).format(task.plannedBudget)
									}
									onChange={(e) => {
										const raw = e.target.value.replace(
											/,/g,
											""
										);
										if (raw === "") {
											updateTask(
												phaseId,
												task.id,
												{ plannedBudget: undefined },
												setProjectData
											);
										} else {
											const num = parseInt(raw, 10);
											if (!isNaN(num)) {
												updateTask(
													phaseId,
													task.id,
													{ plannedBudget: num },
													setProjectData
												);
											}
										}
									}}
									onBlur={(e) => {
										const raw = e.target.value
											.replace(/,/g, "")
											.trim();
										if (raw === "" || isNaN(Number(raw))) {
											updateTask(
												phaseId,
												task.id,
												{ plannedBudget: 0 },
												setProjectData
											);
										}
									}}
								/>
							</div>
							{task.plannedBudget < materialCost && (
								<p className="text-amber-600 text-sm">
									⚠️ Budget lower than material cost (₹
									{materialCost.toLocaleString("en-IN")})
								</p>
							)}
						</div>
					</div>

					<TaskMaterials
						phaseId={phaseId}
						task={task}
						setProjectData={setProjectData}
					/>
				</div>
			)}
		</Card>
	);
};

export default TaskList;
