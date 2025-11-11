"use client";
import Approvals from "@/components/approvals/Approvals";
import { useProfileStore } from "@/lib/store/profileStore";
export default function Page() {
	const profile = useProfileStore((state) => state.profile);
	if (!profile) {
		window.location.href = "/";
		window.location.reload();
		return null;
	}

	return <Approvals admin={profile.admin} />;
}
