import { usePhaseStore } from "@/lib/store/phaseStore";
import { useTaskStore } from "@/lib/store/taskStore";
import { useProjectStore } from "@/lib/store/projectStore";
import { status, ITask } from "@/lib/types";

function calculatePhaseStatus(tasks: ITask[]): status[] {
	const statuses = new Set<status>();
	tasks.forEach((task) => statuses.add(task.status));
	return Array.from(statuses);
}

export function recomputePhaseAndProjectProgress() {
	const phaseStore = usePhaseStore.getState();
	const taskStore = useTaskStore.getState();
	const projectStore = useProjectStore.getState();

	// 🔹 Recalculate each phase
	Object.entries(phaseStore.phases).forEach(([phaseId, phase]) => {
		const tasks = phase.taskIds
			.map((id) => taskStore.tasks[id])
			.filter(Boolean);

		if (tasks.length > 0) {
			const spent = tasks.reduce((acc, t) => acc + (t.spent || 0), 0);
			const estimatedDuration = tasks.reduce(
				(acc, t) => acc + (t.estimatedDuration || 0),
				0
			);
			const completedTasks = tasks.filter(
				(t) => t.status === "Completed"
			).length;
			const status = calculatePhaseStatus(tasks);

			phaseStore.updatePhase(phaseId, {
				spent,
				estimatedDuration,
				completedTasks,
				totalTasks: tasks.length,
				status,
			});
		}
	});

	// 🔹 Recalculate each project
	Object.entries(projectStore.projects).forEach(([projectId, project]) => {
		const phases = project.phaseIds
			.map((id) => phaseStore.phases[id])
			.filter(Boolean);

		if (phases.length > 0) {
			const totalTasks = phases.reduce(
				(a, p) => a + (p.totalTasks || 0),
				0
			);
			const completedTasks = phases.reduce(
				(a, p) => a + (p.completedTasks || 0),
				0
			);
			const progress =
				totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

			projectStore.updateProject(projectId, {
				totalTasks,
				completedTasks,
				progress,
			});
		}
	});
}
