"use client";
import Organisations from "@/components/organisations/Organisations";
import LoadingSpinner from "@/components/base/layout/LoadingSpinner";
import { useOrganisationStore } from "@/lib/store/organisationStore";
import { useProfileStore } from "@/lib/store/profileStore";
import { useRequestStore } from "@/lib/store/requestStore";

export default function Page() {
	const profile = useProfileStore((state) => state.profile);
	const organisations = Object.values(
		useOrganisationStore((state) => state.organisations)
	);
	const requests = Object.values(useRequestStore((state) => state.requests));

	if (!profile) return null;

	if (!organisations) return <LoadingSpinner />;
	return (
		<Organisations
			organisations={organisations}
			admin={profile.admin}
			requests={requests}
		/>
	);
}
