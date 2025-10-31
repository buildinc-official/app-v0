"use client";
import Tasks from "@/components/tasks/Tasks";
import { useProfileStore } from "@/lib/store/profileStore";
import { useTaskStore } from "@/lib/store/taskStore";
export default function Page() {
	const profile = useProfileStore((state) => state.profile);
	const tasks = useTaskStore().getTasksByAssignee(profile?.id || "");
	if (!profile) return null;

	return <Tasks tasks={tasks} />;
}
