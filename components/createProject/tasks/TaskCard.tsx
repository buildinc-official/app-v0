import { Button } from "@/components/base/ui/button";
import { Card } from "@/components/base/ui/card";
import { cn } from "@/lib/functions/utils";
import { Input } from "@/components/base/ui/input";
import { Label } from "@/components/base/ui/label";
import { Textarea } from "@/components/base/ui/textarea";
import {
	getTaskSectionTheme,
	TASK_EXPANDED_PANEL_CLASS,
	TASK_TAB_ROW_CLASS,
} from "@/lib/constants/phaseColorThemes";
import { taskCreationFunctions } from "@/lib/functions/projectCreation";
import { IProjectCreationData, ITaskTemplate } from "@/lib/types";
import {
	ChevronDown,
	ChevronRight,
	Clock,
	Copy,
	IndianRupee,
	Trash2,
} from "lucide-react";
import React, { useState } from "react";
import TaskMaterials from "./TaskMaterials";

const TaskCard = ({
	task,
	phaseId,
	setProjectData,
}: {
	task: ITaskTemplate;
	phaseId: string;
	setProjectData: React.Dispatch<React.SetStateAction<IProjectCreationData>>;
}) => {
	const { updateTask, duplicateTask, removeTask, addTask } =
		taskCreationFunctions();
	const [expanded, setExpanded] = useState(false);
	const [editingTitle, setEditingTitle] = useState(false);

	const materialCost =
		task.materials?.reduce(
			(sum, m) => sum + (m.plannedQuantity ?? 1) * (m.unitCost ?? 1),
			0,
		) || 0;

	const fieldClass =
		"border-border/60 bg-background/80 shadow-sm ring-1 ring-border/30 focus-visible:ring-2 focus-visible:ring-ring";

	const taskTheme = getTaskSectionTheme();

	return (
		<Card
			className={cn(
				"overflow-hidden p-4 transition-[background-color,box-shadow,border-color] sm:p-5 bg-blue-50 dark:bg-blue-950",
				// taskTheme.card,
				taskTheme.cardHover,
			)}
		>
			<div
				className={cn(
					"flex cursor-pointer items-center justify-between gap-3",
					TASK_TAB_ROW_CLASS,
				)}
				onClick={() => setExpanded((prev) => !prev)}
			>
				<div className="flex min-w-0 items-center gap-3">
					{expanded ? (
						<ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
					) : (
						<ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
					)}
					{editingTitle ? (
						<Input
							autoFocus
							className={cn(
								"h-8 text-sm font-medium",
								fieldClass,
							)}
							value={task.name}
							onChange={(e) =>
								updateTask(
									phaseId,
									task.id,
									{ name: e.target.value },
									setProjectData,
								)
							}
							onBlur={() => setEditingTitle(false)}
							onKeyDown={(e) => {
								if (e.key === "Enter") setEditingTitle(false);
							}}
						/>
					) : (
						<span
							className="font-semibold text-foreground"
							onClick={(e) => {
								e.stopPropagation(); // prevent expand toggle
								setEditingTitle(true);
							}}
						>
							{task.name || "Unnamed Task"}
						</span>
					)}
				</div>

				<div className="flex shrink-0 items-center gap-2 text-sm text-muted-foreground sm:gap-3">
					<span>
						{task.estimatedDuration
							? `${task.estimatedDuration} Days`
							: "No Duration"}
					</span>
					<span className="font-semibold tabular-nums text-foreground">
						₹{task.plannedBudget?.toLocaleString("en-IN")}
					</span>
					<Button
						variant="outline"
						size="icon"
						className={cn(
							"h-9 w-9 shrink-0",
							taskTheme.outlineIcon,
							"dark:text-white dark:[&_svg]:!text-white dark:[&_svg]:!stroke-white",
						)}
						onClick={(e) => {
							e.stopPropagation();
							duplicateTask(phaseId, task.id, setProjectData);
						}}
						aria-label="Duplicate task"
					>
						<Copy className="h-4 w-4" aria-hidden />
					</Button>
					<Button
						variant="destructive"
						size="icon"
						className="h-9 w-9 shrink-0"
						onClick={(e) => {
							e.stopPropagation();
							removeTask(phaseId, task.id, setProjectData);
						}}
						aria-label="Remove task"
					>
						<Trash2 className="h-4 w-4" />
					</Button>
				</div>
			</div>

			{/* Expanded Content */}
			{expanded && (
				<div className={TASK_EXPANDED_PANEL_CLASS}>
					{/* Description */}
					<div className="space-y-1">
						<Label className="font-semibold text-muted-foreground">
							Description
						</Label>
						<Textarea
							className={cn("min-h-[80px] resize-y", fieldClass)}
							value={task.description}
							placeholder="Task details..."
							onChange={(e) =>
								updateTask(
									phaseId,
									task.id,
									{ description: e.target.value },
									setProjectData,
								)
							}
						/>
					</div>

					{/* Dates + Budget */}
					<div className="grid gap-4 md:grid-cols-2">
						<div className="space-y-1">
							<Label className="font-semibold text-muted-foreground">
								Estimated Duration (Days)
							</Label>
							<div className="relative">
								<Clock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
								<Input
									type="number"
									className={cn("pl-10", fieldClass)}
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
											setProjectData,
										);
									}}
									onBlur={(e) => {
										const val = e.target.value.trim();
										if (val === "" || isNaN(Number(val))) {
											updateTask(
												phaseId,
												task.id,
												{ estimatedDuration: 0 },
												setProjectData,
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
								<IndianRupee className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
								<Input
									type="text"
									className={cn("pl-10", fieldClass)}
									value={
										task.plannedBudget === undefined ||
										task.plannedBudget === null
											? ""
											: new Intl.NumberFormat(
													"en-IN",
												).format(task.plannedBudget)
									}
									onChange={(e) => {
										const raw = e.target.value.replace(
											/,/g,
											"",
										);
										if (raw === "") {
											updateTask(
												phaseId,
												task.id,
												{ plannedBudget: undefined },
												setProjectData,
											);
										} else {
											const num = parseInt(raw, 10);
											if (!isNaN(num)) {
												updateTask(
													phaseId,
													task.id,
													{ plannedBudget: num },
													setProjectData,
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
												setProjectData,
											);
										}
									}}
								/>
							</div>
							{task.plannedBudget < materialCost && (
								<p className="text-sm text-destructive">
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

export default TaskCard;
