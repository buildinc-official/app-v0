"use client";

import { LandingPage } from "@/components/base/layout/LandingPage";
import { useProfileStore } from "@/lib/store/profileStore";
export default function Home() {
	const profile = useProfileStore((state) => state.profile);
	if (!profile) {
		return <LandingPage />;
	} else if (profile) {
		window.location.href = "/dashboard";
		// window.location.reload();
	}
}
