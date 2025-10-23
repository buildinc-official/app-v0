"use client";
import A_Dashboard from "@/components/dashboard/admin/A_Dashboard";
import Dashboard from "@/components/dashboard/employee/Dashboard";
import { Hero } from "@/components/base/layout/Hero";
import { useProfileStore } from "@/lib/store/profileStore";
import { useTaskStore } from "@/lib/store/taskStore";
export default function Home() {
	const profile = useProfileStore((state) => state.profile);
	const tasks = useTaskStore((state) => state.tasks);
	if (!profile) return <Hero />;

	if (profile.admin) {
		return <A_Dashboard />;
	} else {
		return (
			<Dashboard
				profile={profile}
				tasks={Object.values(tasks)}
			/>
		);
	}
}
