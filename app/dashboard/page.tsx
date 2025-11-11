"use client";
import A_Dashboard from "@/components/dashboard/admin/A_Dashboard";
import Dashboard from "@/components/dashboard/employee/Dashboard";
import { useProfileStore } from "@/lib/store/profileStore";
import { useTaskStore } from "@/lib/store/taskStore";
import { useRouter } from "next/navigation";
export default function Home() {
	const profile = useProfileStore((state) => state.profile);
	const tasks = useTaskStore((state) => state.tasks);
	if (!profile) {
		// redirect and don't render until profile exists
		window.location.href = "/";
		window.location.reload();
		return null;
	}

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
