import { Card, CardContent, CardHeader } from "@/components/base/ui/card";
import { phaseCreationFunctions } from "@/lib/functions/projectCreation";
import { IProjectCreationData, IProjectTemplate } from "@/lib/types";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { IndianRupee, Layers } from "lucide-react";
import TaskList from "./TaskList";
import { SetStateAction, useState } from "react";
import { RupeeIcon } from "@/lib/functions/utils";

const Tasks = ({
	projectData,
	setProjectData,
	validationErrors,
	setValidationErrors,
}: {
	projectData: IProjectCreationData;
	setProjectData: React.Dispatch<React.SetStateAction<IProjectCreationData>>;
	validationErrors: Record<string, string>;
	setValidationErrors: React.Dispatch<
		React.SetStateAction<Record<string, string>>
	>;
}) => {
	const { getTotalPhaseBudget } = phaseCreationFunctions();
	return (
		<div className="space-y-6">
			{Object.keys(validationErrors).length > 0 && (
				<div className="p-3 bg-rose-50 border border-rose-200 rounded">
					<ul className="space-y-1 text-sm text-rose-800">
						{Object.entries(validationErrors).map(([key, msg]) => (
							<li
								key={key}
								className="flex items-start justify-between"
							>
								<span className="mr-2">
									<strong className="capitalize">
										{key}:
									</strong>{" "}
									{msg}
								</span>
								<button
									type="button"
									className="text-xs text-rose-600 ml-2"
									onClick={() =>
										setValidationErrors((prev) => {
											const next = { ...prev };
											delete next[key];
											return next;
										})
									}
								>
									Dismiss
								</button>
							</li>
						))}
					</ul>
				</div>
			)}
			{projectData.phases && projectData.phases.length > 0 ? (
				<div>
					{projectData.phases.map((phase, index) => {
						return (
							<Card
								key={index}
								className="mb-4"
							>
								<CardHeader className="flex flex-row items-center justify-between bg-secondary text-secondary-foreground rounded-t-lg">
									<h3 className="text-lg font-semibold">
										Phase {index + 1}:{" "}
										{phase.name || "Unnamed Phase"}
									</h3>
									<div className="flex items-center space-x-4 font-medium">
										{(() => {
											const tasksTotal =
												phase.tasks?.reduce(
													(sum, t) =>
														sum +
														(t?.plannedBudget ?? 0),
													0
												) ?? 0;
											return (
												<>
													{/* <span className="text-sm">
														Tasks:{" "}
														{tasksTotal.toLocaleString(
															"en-IN"
														)}{" "}
														<RupeeIcon />
													</span> */}
													{tasksTotal >
														phase.budget && (
														<span className="text-amber-600 text-sm mr-2">
															⚠️ Tasks budget
															exceed phase budget
														</span>
													)}
												</>
											);
										})()}
										{phase.budget.toLocaleString("en-IN")}
										<RupeeIcon />
									</div>
								</CardHeader>
								<CardContent className="bg-primary">
									<TaskList
										phase={phase}
										setProjectData={setProjectData}
									/>
								</CardContent>
							</Card>
						);
					})}
				</div>
			) : (
				<div className="w-full h-10 bg-black">No Phases Added Yet</div>
			)}
			<BudgetTotal
				totalBudget={getTotalPhaseBudget(projectData)}
				projectData={projectData}
			/>
		</div>
	);
};

const BudgetTotal = ({
	totalBudget,
	projectData,
}: {
	totalBudget: number;
	projectData: IProjectCreationData;
}) => {
	return (
		<div className="mt-6 p-4 bg-secondary rounded-lg text-secondary-foreground">
			<div className="flex items-center justify-between">
				<span className="font-medium">Total Phase Budget:</span>
				<span className="text-lg font-bold flex ">
					{totalBudget.toLocaleString("en-IN")}{" "}
					<IndianRupee className="h-4 w-4 mt-1 ml-1" />
				</span>
			</div>
			{totalBudget > projectData.budget && (
				<div className="mt-2 text-sm text-amber-600">
					⚠️ Total budget doesn&apos;t match project budget ($
					{projectData.budget.toLocaleString()})
				</div>
			)}
		</div>
	);
};

export default Tasks;
