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
