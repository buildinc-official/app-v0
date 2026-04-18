"use client";

import Settings from "@/components/settings/Settings";
import { useProfileStore } from "@/lib/store/profileStore";

export default function SettingsPage() {
	const profile = useProfileStore((state) => state.profile);

	if (!profile) {
		window.location.href = "/";
		window.location.reload();
		return null;
	}

	return <Settings />;
}
