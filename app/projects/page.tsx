"use client";
import Projects from "@/components/projects/Projects";
import LoadingSpinner from "@/components/base/layout/LoadingSpinner";
import { useProfileStore } from "@/lib/store/profileStore";
import { useProjectStore } from "@/lib/store/projectStore";
import { useRequestStore } from "@/lib/store/requestStore";
export default function page() {
	const profile = useProfileStore((state) => state.profile);

	const { projects } = useProjectStore();
	const requests = Object.values(useRequestStore((state) => state.requests));

	if (!profile || !projects) return <LoadingSpinner />;

	return (
		<Projects
			projects={Object.values(projects)}
			admin={profile.admin}
			requests={requests}
		/>
	);
}
