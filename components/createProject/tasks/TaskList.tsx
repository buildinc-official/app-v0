"use client";
import { Button } from "@/components/base/ui/button";
import { getTaskSectionTheme } from "@/lib/constants/phaseColorThemes";
import { taskCreationFunctions } from "@/lib/functions/projectCreation";
import { cn } from "@/lib/functions/utils";
import { IPhaseTemplate, IProjectCreationData } from "@/lib/types";
import { Plus } from "lucide-react";
import TaskCard from "./TaskCard";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const TaskList = ({
	phase,
	setProjectData,
}: {
	phase: IPhaseTemplate;
	setProjectData: React.Dispatch<React.SetStateAction<IProjectCreationData>>;
}) => {
	const { addTask } = taskCreationFunctions();
	const taskTheme = getTaskSectionTheme();
	return (
		<div className="space-y-5">
			{phase.tasks && (
				<div>
					<div className="space-y-4">
						<DragDropContext
							onDragEnd={(result) => {
								const { source, destination } = result;
								if (
									!destination ||
									(destination.droppableId ===
										source.droppableId &&
										destination.index === source.index)
								)
									return;

								setProjectData((prev) => {
									// assume prev.phases is an array of phases
									const newPhases = prev.phases.map((p) => {
										if (p.id !== phase.id) return p;
										const newTasks = Array.from(p.tasks);
										const [moved] = newTasks.splice(
											source.index,
											1
										);
										newTasks.splice(
											destination.index,
											0,
											moved
										);
										return { ...p, tasks: newTasks };
									});
									return { ...prev, phases: newPhases };
								});
							}}
						>
							<Droppable droppableId={phase.id}>
								{(provided) => (
									<div
										ref={provided.innerRef}
										{...provided.droppableProps}
										className="space-y-4"
									>
										{phase.tasks.map((task, index) => (
											<Draggable
												key={task.id ?? index}
												draggableId={`${phase.id}-${
													task.id ?? index
												}`}
												index={index}
											>
												{(providedDraggable) => (
													<div
														ref={
															providedDraggable.innerRef
														}
														{...providedDraggable.draggableProps}
														{...providedDraggable.dragHandleProps}
													>
														<TaskCard
															task={task}
															phaseId={phase.id}
															setProjectData={
																setProjectData
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
						</DragDropContext>
					</div>
				</div>
			)}
			<Button
				type="button"
				variant="default"
				className={cn(
					"h-12 w-full text-base font-medium shadow-sm",
					taskTheme.primaryAction,
				)}
				onClick={() => addTask(phase.id, setProjectData)}
			>
				<Plus className="mr-2 h-4 w-4" aria-hidden />
				Add task
			</Button>
		</div>
	);
};

export default TaskList;
