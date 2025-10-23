"use client";
import CreateProject from "@/components/createProject/CreateProject";
import LoadingSpinner from "@/components/base/layout/LoadingSpinner";
import { useOrganisationStore } from "@/lib/store/organisationStore";
import { useProfileStore } from "@/lib/store/profileStore";
import React from "react";

type Props = {};

export default function Page() {
	const profile = useProfileStore((state) => state.profile);
	const organisations = useOrganisationStore((state) => state.organisations);

	if (!profile || !profile.admin) return <LoadingSpinner />;

	if (profile.admin) {
		return (
			<CreateProject
				profile={profile}
				organisations={Object.values(organisations)}
			/>
		);
	}
}
