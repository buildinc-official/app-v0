"use client";
import { Button } from "@/components/base/ui/button";
import { taskCreationFunctions } from "@/lib/functions/projectCreation";
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
	const { updateTask, duplicateTask, removeTask, addTask } =
		taskCreationFunctions();
	return (
		<div className="space-y-2 mt-4">
			{phase.tasks && (
				<div className="">
					<div className="space-y-2">
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
										className="space-y-2"
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
				className="w-full mt-4 bg-secondary/50 text-secondary-foreground hover:bg-muted hover:text-black dark:bg-muted dark:hover:bg-secondary/50 dark:text-white"
				onClick={() => addTask(phase.id, setProjectData)}
			>
				<Plus className="" />
				Add Task{" "}
			</Button>
		</div>
	);
};

export default TaskList;
