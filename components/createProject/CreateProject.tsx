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
import PhasesTasks from "./phasesTasks/PhasesTasks";
import ReviewConfirm from "./ReviewConfirm";
import {
	getOrganisationMembers,
	getOrganisationMembersFromStore,
} from "@/lib/middleware/organisationMembers";

export default function CreateProject({
	profile,
	organisations,
}: {
	profile: IProfile;
	organisations: IOrganisation[];
}) {
	const initialProjectData: IProjectCreationData = {
		id: crypto.randomUUID(),
		owner: profile.id,
		status: "Inactive",
		name: "New Project",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi mollis pharetra sagittis. Aenean iaculis tincidunt arcu, quis mattis quam. Sed sed sodales purus. Nulla ullamcorper ut nunc non finibus. Morbi tincidunt, nibh id rutrum interdum, nisi arcu dignissim nunc, quis feugiat nunc justo sit amet risus. Mauris diam sem, pharetra id iaculis ac, tristique et dolor. Vestibulum egestas odio ut faucibus facilisis. ",
		organisationId: "",
		startDate: new Date(),
		endDate: new Date(Date.now() + 100 * 24 * 60 * 60 * 1000),
		budget: 1500000,
		location: "Hyderabad",
		supervisor: "",
		phases: [],
		saveAsTemplate: false,
		templateName: "",
		templateDescription: "",
		supervisorName: "",
		category: "Commercial",
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

	const steps = ["Project Details", "Phases & Tasks", "Review & Confirm"];
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
						<PhasesTasks
							projectData={projectData}
							setProjectData={setProjectData}
							customTemplates={customTemplates}
							validationErrors={validationErrors}
							setValidationErrors={setValidationErrors}
						/>
					)}

					{currentStep === 3 && (
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
