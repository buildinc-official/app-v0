"use client";

import { useProfileStore } from "@/lib/store/profileStore";
import ProjectDetails from "@/components/projectDetails/ProjectDetails";
import { useprojectDetailStore } from "@/lib/store/projectDetailStore";
import { useProjectStore } from "@/lib/store/projectStore";
import { use, useEffect } from "react";
import LoadingSpinner from "@/components/base/layout/LoadingSpinner";
import { useOrganisationStore } from "@/lib/store/organisationStore";

export default function Page({
	params,
}: {
	params: Promise<{ projectId: string }>;
}) {
	const { projectId } = use(params);

	const profile = useProfileStore((state) => state.profile);

	const { setprojectDetails } = useprojectDetailStore();
	const organisations = useOrganisationStore((state) => state.organisations);
	const projects = useProjectStore((store) => store.projects);
	const project = Object.values(projects).find((p) => p.id === projectId);
	const organisation = Object.values(organisations).find(
		(org) => org.id === project?.orgId
	);
	useEffect(() => {
		if (project && organisation) {
			setprojectDetails(project, organisation);
		}
	}, [project, organisation, setprojectDetails]);

	if (!profile) return null;
	if (!project) return <LoadingSpinner />;

	if (profile.admin) {
		return <ProjectDetails />;
	}
	return <div>Access denied</div>;
}
