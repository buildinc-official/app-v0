"use client";

import { useProfileStore } from "@/lib/store/profileStore";
import OrganisationDetails from "@/components/organisationDetails/OrganisationDetails";
import { useOrganisationDetailStore } from "@/lib/store/organisationDetailStore";
import { useOrganisationStore } from "@/lib/store/organisationStore";
import { use, useEffect } from "react";
import LoadingSpinner from "@/components/base/layout/LoadingSpinner";

export default function Page({
	params,
}: {
	params: Promise<{ organisationId: string }>;
}) {
	const { organisationId } = use(params);

	const { setOrganisationDetails } = useOrganisationDetailStore();

	const profile = useProfileStore((state) => state.profile);

	const organisations = useOrganisationStore((store) => store.organisations);
	const organisation = Object.values(organisations).find(
		(org) => org.id === organisationId
	);
	useEffect(() => {
		if (organisation) {
			setOrganisationDetails(organisation);
		}
	}, [organisation, setOrganisationDetails]);

	if (!profile) return null;
	if (!organisation) return <LoadingSpinner />;

	if (profile.admin) {
		return <OrganisationDetails />;
	}
	return <div>Access denied</div>;
}
