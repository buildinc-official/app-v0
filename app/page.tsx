"use client";

import { Hero } from "@/components/base/layout/Hero";
import { useProfileStore } from "@/lib/store/profileStore";
export default function Home() {
	const profile = useProfileStore((state) => state.profile);
	if (!profile) {
		return <Hero />;
	} else if (profile) {
		window.location.href = "/dashboard";
		// window.location.reload();
	}
}
