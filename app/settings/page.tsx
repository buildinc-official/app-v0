"use client";
import Settings from "@/components/settings/Settings";
import { useProfileStore } from "@/lib/store/profileStore";

import React from "react";

export default function SettingsPage() {
	const profile = useProfileStore((state) => state.profile);

	if (!profile) {
		// redirect and don't render until profile exists
		window.location.href = "/";
		window.location.reload();
		return null;
	}

	return (
		<Settings
			profile={profile}
			admin={profile.admin}
		/>
	);
}
