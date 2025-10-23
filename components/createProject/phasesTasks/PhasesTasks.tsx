import {
	Card,
	CardHeader,
	CardContent,
	CardDescription,
	CardTitle,
} from "@/components/base/ui/card";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import TemplateSelectModal from "./TemplateSelectModal";
import PhaseTable from "./PhaseTable";
import { phaseCreationFunctions } from "@/lib/functions/projectCreation";
import { IProjectCreationData, IProjectTemplate } from "@/lib/types";
import { IndianRupee, Layers, Plus } from "lucide-react";
import { Button } from "@/components/base/ui/button";

const PhasesTasks = ({
	projectData,
	setProjectData,
	customTemplates,
	validationErrors,
	setValidationErrors,
}: {
	projectData: IProjectCreationData;
	setProjectData: React.Dispatch<React.SetStateAction<IProjectCreationData>>;
	customTemplates: IProjectTemplate[];
	validationErrors: Record<string, string>;
	setValidationErrors: React.Dispatch<
		React.SetStateAction<Record<string, string>>
	>;
}) => {
	const { addPhase, getTotalPhaseBudget, handlePhaseDragEnd } =
		phaseCreationFunctions();

	return (
		<div className="space-y-6">
			<TemplateSelectModal
				projectData={projectData}
				setProjectData={setProjectData}
				customTemplates={customTemplates}
			/>

			<Card className="shadow-sm">
				<CardHeader>
					<div className="flex items-center justify-between flex-col sm:flex-row">
						<div>
							<CardTitle className="flex justify-center sm:justify-start">
								Project Phases
							</CardTitle>
							<CardDescription>
								<p className="mt-2">
									Organize your project into phases and manage
									tasks within each phase
								</p>
							</CardDescription>
						</div>
						<div className="flex gap-2">
							{/* <Button
					variant="outline"
					onClick={selectAllPhases}
				>
					Select All
				</Button> */}
							<Button
								variant="secondary"
								onClick={() => addPhase(setProjectData)}
							>
								<Plus className="mr-2 h-4 w-4" />
								Add Phase
							</Button>
						</div>
					</div>
				</CardHeader>

				<CardContent>
					{projectData.phases.length === 0 ? (
						<div className="text-center py-12">
							<Layers className="h-12 w-12 text-slate-400 mx-auto mb-4" />
							<h3 className="text-lg font-medium text-slate-600 mb-2">
								No phases added yet
							</h3>
							<p className="text-slate-500 mb-4">
								Add phases to organize your project timeline
							</p>
						</div>
					) : (
						<DragDropContext
							onDragEnd={(result) =>
								handlePhaseDragEnd(
									result,
									projectData,
									setProjectData
								)
							}
						>
							<Droppable droppableId="phases">
								{(provided) => (
									<div
										ref={provided.innerRef}
										{...provided.droppableProps}
										className="space-y-4"
									>
										{projectData.phases.map(
											(phase, index) => (
												<PhaseTable
													validationErrors={
														validationErrors
													}
													setValidationErrors={
														setValidationErrors
													}
													key={phase.id}
													phase={phase}
													index={index}
													projectData={projectData}
													setProjectData={
														setProjectData
													}
												/>
											)
										)}
										{provided.placeholder}
									</div>
								)}
							</Droppable>
						</DragDropContext>
					)}

					{/* Budget Total */}
					{projectData.phases.length > 0 && (
						<div className="mt-6 p-4 bg-slate-50 rounded-lg">
							<div className="flex items-center justify-between">
								<span className="font-medium">
									Total Budget:
								</span>
								<span className="text-lg font-bold flex ">
									{getTotalPhaseBudget(
										projectData
									).toLocaleString("en-IN")}{" "}
									<IndianRupee className="h-4 w-4 mt-1 ml-1" />
								</span>
							</div>
							{getTotalPhaseBudget(projectData) >
								projectData.budget && (
								<div className="mt-2 text-sm text-amber-600">
									⚠️ Total budget doesn't match project budget
									($
									{projectData.budget.toLocaleString()})
								</div>
							)}
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
};

export default PhasesTasks;
