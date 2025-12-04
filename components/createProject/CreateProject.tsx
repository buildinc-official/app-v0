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
		<div className="flex flex-col pb-20">
			<div className="flex-1 p-6">
				<ProgressIndicator
					steps={steps}
					currentStep={currentStep}
					setCurrentStep={setCurrentStep}
					totalSteps={totalSteps}
					projectData={projectData}
					setValidationErrors={setValidationErrors}
				/>

				<div className="max-w-6xl mx-auto">
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
