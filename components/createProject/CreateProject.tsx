"use client";

import { useState } from "react";
import ProgressIndicator from "./ProgressIndicator";
import {
	IOrganisation,
	IOrganisationProfile,
	IProfile,
	IProjectCreationData,
	IProjectTemplate,
} from "@/lib/types";
import ProjectDetails from "./ProjectDetails";
import Phases from "./phases/Phases";
import ReviewConfirm from "./ReviewConfirm";
import { getOrganisationMembersFromStore } from "@/lib/middleware/organisationMembers";
import Tasks from "./tasks/Tasks";

export default function CreateProject({
	profile,
	organisations,
}: {
	profile: IProfile;
	organisations: IOrganisation[];
}) {
	const today = new Date();
	const tomorrow = new Date(today);
	tomorrow.setDate(tomorrow.getDate() + 1);

	const initialProjectData: IProjectCreationData = {
		id: crypto.randomUUID(),
		owner: profile.id,
		status: "Inactive",
		name: "1",
		description: "1",
		organisationId: "",
		startDate: today,
		endDate: tomorrow,
		budget: 1500000,
		location: "",
		supervisor: "",
		phases: [],
		saveAsTemplate: false,
		templateName: "",
		templateDescription: "",
		supervisorName: "",
		category: "Residential",
	};

	const [currentStep, setCurrentStep] = useState(1);
	const [projectData, setProjectData] =
		useState<IProjectCreationData>(initialProjectData);
	const [validationErrors, setValidationErrors] = useState<
		Record<string, string>
	>({});
	const [customTemplates, setCustomTemplates] = useState<IProjectTemplate[]>(
		[]
	);

	const selectedOrganisation = organisations.find(
		(org) => org.id === projectData.organisationId
	);

	const supervisors: IOrganisationProfile[] = selectedOrganisation
		? getOrganisationMembersFromStore(selectedOrganisation.id).filter(
				(member) => member.memberInfo?.role === "Admin"
		  )
		: ([] as IOrganisationProfile[]); // Ensure it's typed as IOrganisationProfile[]

	const steps = ["Project Details", "Phases", "Tasks", "Review & Confirm"];
	const totalSteps = steps.length;

	return (
		<div className="flex min-h-0 flex-1 flex-col">
			<div className="mx-auto w-full max-w-6xl flex-1 space-y-6 px-4 pb-24 pt-4 sm:space-y-8 sm:px-6 sm:pb-12 sm:pt-6">
				<header className="space-y-1">
					<h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
						Create project
					</h1>
					<p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
						Set up details, phases, tasks, then review before
						publishing.
					</p>
				</header>

				<ProgressIndicator
					steps={steps}
					currentStep={currentStep}
					setCurrentStep={setCurrentStep}
					totalSteps={totalSteps}
					projectData={projectData}
					setValidationErrors={setValidationErrors}
				/>

				<div className="min-w-0">
					{currentStep === 1 && (
						<ProjectDetails
							projectData={projectData}
							setProjectData={setProjectData}
							organisations={organisations}
							supervisors={supervisors}
							validationErrors={validationErrors}
							setValidationErrors={setValidationErrors}
						/>
					)}

					{currentStep === 2 && (
						<Phases
							projectData={projectData}
							setProjectData={setProjectData}
							customTemplates={customTemplates}
							validationErrors={validationErrors}
							setValidationErrors={setValidationErrors}
						/>
					)}
					{currentStep === 3 && (
						<Tasks
							projectData={projectData}
							setProjectData={setProjectData}
							validationErrors={validationErrors}
							setValidationErrors={setValidationErrors}
						/>
					)}

					{currentStep === 4 && (
						<ReviewConfirm
							projectData={projectData}
							organisation={selectedOrganisation}
							setProjectData={setProjectData}
							selectedOrganisation={selectedOrganisation}
						/>
					)}
				</div>
			</div>
		</div>
	);
}
