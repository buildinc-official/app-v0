import React, { Dispatch, SetStateAction, Fragment } from "react";
import { Button } from "@/components/base/ui/button";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { IProjectCreationData } from "@/lib/types";
import { cn } from "@/lib/functions/utils";

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
			if (!projectData.phases || projectData.phases.length === 0) {
				errors.phases = "At least one phase with tasks is required";
			} else {
				projectData.phases.forEach((phase, pIdx) => {
					const phaseBudget = Number(phase?.budget ?? 0);

					if (!phase?.budget || phaseBudget <= 0) {
						errors[`phase_${pIdx}_budget`] = `Phase ${
							pIdx + 1
						} budget is required`;
					}

					if (!phase.tasks || phase.tasks.length === 0) {
						errors[`phase_${pIdx}_tasks`] = `Phase ${
							pIdx + 1
						} must have at least one task`;
						return;
					}

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
			if (projectData.phases && projectData.phases.length > 0) {
				projectData.phases.forEach((phase, pIdx) => {
					phase?.tasks?.forEach((task, tIdx) => {
						const taskBudget = Number(task?.plannedBudget ?? 0);
						const materials = Array.isArray(task?.materials)
							? task!.materials
							: [];

						const materialTotal = materials.reduce((sum, m) => {
							const unitCost = Number(
								m?.unitCost ?? m?.unitCost ?? 0
							);
							const qty = Number(m?.plannedQuantity ?? 1);
							return sum + unitCost * qty;
						}, 0);

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
		<div className="space-y-6">
			<nav aria-label="Create project steps" className="w-full">
				{/* Single horizontal track: circles align with connecting bars */}
				<div className="flex w-full items-center">
					{steps.map((_, i) => {
						const step = i + 1;
						const isActive = step === currentStep;
						const isDone = step < currentStep;

						return (
							<Fragment key={step}>
								<div className="relative z-[2] flex shrink-0 flex-col items-center">
									<div
										className={cn(
											"flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-semibold transition-colors sm:h-11 sm:w-11",
											isDone &&
												"border-blue-600 bg-blue-600 text-white shadow-md dark:border-blue-500 dark:bg-blue-600",
											isActive &&
												!isDone &&
												"border-blue-600 bg-blue-600 text-white shadow-md ring-4 ring-blue-500/35 dark:ring-blue-500/25",
											!isActive &&
												!isDone &&
												"border-border bg-muted/70 text-muted-foreground",
										)}
									>
										{isDone ? (
											<Check
												className="h-5 w-5"
												strokeWidth={2.5}
												aria-hidden
											/>
										) : (
											<span>{step}</span>
										)}
									</div>
								</div>

								{step < totalSteps && (
									<div
										className={cn(
											"relative z-[1] mx-[-6px] min-h-[3px] min-w-[0.5rem] flex-1 rounded-full sm:mx-[-8px] sm:min-h-[4px]",
											step < currentStep
												? "bg-blue-500 dark:bg-blue-500"
												: "bg-border",
										)}
										aria-hidden
									/>
								)}
							</Fragment>
						);
					})}
				</div>
			</nav>

			<div className="flex items-center justify-between gap-4 rounded-xl border border-border/60 bg-muted/30 px-3 py-3 ring-1 ring-border/40 sm:px-4">
				<Button
					variant="outline"
					type="button"
					onClick={prevStep}
					disabled={currentStep === 1}
					className="h-10 w-10 shrink-0 rounded-full border-slate-400/50 bg-slate-50 p-0 text-slate-700 shadow-sm ring-1 ring-slate-400/30 hover:bg-slate-100 disabled:opacity-40 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-200 dark:ring-slate-600 dark:hover:bg-slate-800"
					aria-label="Previous step"
				>
					<ArrowLeft className="h-4 w-4" />
				</Button>

				<p className="min-w-0 flex-1 truncate text-center text-sm font-semibold text-foreground sm:text-base">
					{steps[currentStep - 1]}
					<span className="mt-0.5 block text-xs font-normal text-muted-foreground sm:mt-1">
						Step {currentStep} of {totalSteps}
					</span>
				</p>

				<Button
					type="button"
					onClick={nextStep}
					className={cn(
						"h-10 w-10 shrink-0 rounded-full p-0 shadow-sm",
						currentStep === totalSteps
							? "border border-border/60 bg-muted/50 text-muted-foreground ring-1 ring-border/30 hover:bg-muted/70"
							: "border border-blue-500/45 bg-blue-600 text-white ring-1 ring-blue-500/30 hover:bg-blue-700 hover:text-white dark:bg-blue-600 dark:hover:bg-blue-500",
					)}
					aria-label={
						currentStep === totalSteps
							? "Continue on this step"
							: "Next step"
					}
				>
					<ArrowRight className="h-4 w-4" />
				</Button>
			</div>
		</div>
	);
};

export default ProgressIndicator;
