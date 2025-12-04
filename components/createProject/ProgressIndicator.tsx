import React, { Dispatch, SetStateAction } from "react";
import { Button } from "@/components/base/ui/button";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import { IProjectCreationData } from "@/lib/types";

type ProgressIndicatorProps = {
	currentStep: number;
	steps: string[];
	totalSteps: number;
	setCurrentStep: Dispatch<SetStateAction<number>>;
	projectData: IProjectCreationData;
	setValidationErrors: Dispatch<SetStateAction<Record<string, string>>>;
};

const ProgressIndicator = ({
	currentStep,
	setCurrentStep,
	projectData,
	steps,
	totalSteps,
	setValidationErrors,
}: ProgressIndicatorProps) => {
	const validateStep = (step: number) => {
		const errors: Record<string, string> = {};

		if (step === 1) {
			if (!projectData.name.trim())
				errors.name = "Project name is required";
			if (!projectData.description.trim())
				errors.description = "Description is required";
			if (!projectData.organisationId)
				errors.organisation = "Organisation is required";
			if (!projectData.supervisor)
				errors.supervisor = "Supervisor is required";
			if (!projectData.budget || projectData.budget <= 0)
				errors.budget = "Budget is required";
			if (!projectData.startDate)
				errors.startDate = "Start date is required";
			if (!projectData.endDate) errors.endDate = "End date is required";
			if (
				projectData.startDate &&
				projectData.endDate &&
				projectData.endDate <= projectData.startDate
			)
				errors.endDate = "End date must be after start date";
		}

		if (step === 2) {
			if (!projectData.phases || projectData.phases.length === 0)
				errors.phases = "At least one phase with tasks is required";
		}

		if (step === 3) {
			if (step === 3) {
				// Ensure phases exist
				if (!projectData.phases || projectData.phases.length === 0) {
					errors.phases = "At least one phase with tasks is required";
				} else {
					projectData.phases.forEach((phase, pIdx) => {
						const phaseBudget = Number(phase?.budget ?? 0);

						// Phase budget required
						if (!phase?.budget || phaseBudget <= 0) {
							errors[`phase_${pIdx}_budget`] = `Phase ${
								pIdx + 1
							} budget is required`;
						}

						// Tasks must exist
						if (!phase.tasks || phase.tasks.length === 0) {
							errors[`phase_${pIdx}_tasks`] = `Phase ${
								pIdx + 1
							} must have at least one task`;
							return;
						}

						// Sum task budgets and validate each task budget
						let tasksTotal = 0;
						phase.tasks.forEach((task, tIdx) => {
							const taskBudget = Number(task?.plannedBudget ?? 0);
							if (!task?.plannedBudget || taskBudget <= 0) {
								errors[
									`phase_${pIdx}_task_${tIdx}_budget`
								] = `Task ${tIdx + 1} in phase ${
									pIdx + 1
								} requires a valid budget`;
							}
							tasksTotal += taskBudget;
						});

						// Compare totals and add warning/error if tasks exceed phase budget
						if (phaseBudget > 0 && tasksTotal > phaseBudget) {
							errors[
								`phase_${pIdx + 1}`
							] = `Total task budgets (${tasksTotal.toLocaleString(
								"en-IN"
							)}) exceed phase budget (${phaseBudget.toLocaleString(
								"en-IN"
							)})`;
						}
					});
				}
			}
			// Check each task's materials total and compare with the task planned budget
			if (projectData.phases && projectData.phases.length > 0) {
				projectData.phases.forEach((phase, pIdx) => {
					phase?.tasks?.forEach((task, tIdx) => {
						const taskBudget = Number(task?.plannedBudget ?? 0);
						const materials = Array.isArray(task?.materials)
							? task!.materials
							: [];

						// Compute total material cost (supporting unitCost|cost and quantity|qty)
						const materialTotal = materials.reduce((sum, m) => {
							const unitCost = Number(
								m?.unitCost ?? m?.unitCost ?? 0
							);
							const qty = Number(m?.plannedQuantity ?? 1);
							return sum + unitCost * qty;
						}, 0);

						// If planned budget is higher than material cost, add an error (as requested)
						if (taskBudget < materialTotal) {
							errors[
								`Error`
							] = `Planned budget (${taskBudget.toLocaleString(
								"en-IN"
							)}) for task ${tIdx + 1} in phase ${
								pIdx + 1
							} exceeds total material cost (${materialTotal.toLocaleString(
								"en-IN"
							)})`;
						}
					});
				});
			}
		}

		setValidationErrors(errors);
		return Object.keys(errors).length === 0;
	};

	const nextStep = () => {
		if (!validateStep(currentStep)) return;
		if (currentStep < totalSteps) setCurrentStep(currentStep + 1);
	};

	const prevStep = () => {
		if (currentStep > 1) setCurrentStep(currentStep - 1);
	};

	return (
		<div className="mb-8">
			<div className="flex items-center w-full">
				{steps.map((_, i) => {
					const step = i + 1;
					const isActive = step === currentStep;
					const isCompleted = step < currentStep;

					return (
						<React.Fragment key={step}>
							<div className="flex flex-col items-center flex-1">
								<div
									className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors
                    ${isActive ? "bg-green-600 text-white" : ""}
                    ${isCompleted ? "bg-secondary text-white" : ""}
                    ${
						!isActive && !isCompleted
							? "bg-gray-300 text-gray-600"
							: ""
					}
                  `}
								>
									{isCompleted ? (
										<CheckCircle className="h-5 w-5" />
									) : (
										step
									)}
								</div>
							</div>

							{step !== steps.length && (
								<div
									className={`h-1 flex-1 transition-colors ${
										isCompleted
											? "bg-secondary"
											: "bg-gray-300"
									}`}
								/>
							)}
						</React.Fragment>
					);
				})}
			</div>

			<div className="flex items-center justify-between mt-10">
				<Button
					variant={currentStep === 1 ? "ghost" : "secondary"}
					onClick={prevStep}
					disabled={currentStep === 1}
					className="w-10 h-10 rounded-full flex items-center justify-center"
				>
					<ArrowLeft className="h-4 w-4" />
				</Button>

				<p className="text-muted-foreground text-center font-bold text-xl">
					{steps[currentStep - 1]}
				</p>

				<Button
					variant={currentStep === totalSteps ? "ghost" : "secondary"}
					onClick={nextStep}
					className="w-10 h-10 rounded-full flex items-center justify-center"
				>
					<ArrowRight className="h-4 w-4" />
				</Button>
			</div>
		</div>
	);
};

export default ProgressIndicator;
