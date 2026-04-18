import { usePhaseStore } from "@/lib/store/phaseStore";
import { useTaskStore } from "@/lib/store/taskStore";
import { useProjectStore } from "@/lib/store/projectStore";
import { status, ITask, IProject, IPhase } from "@/lib/types";

function calculatePhaseStatus(tasks: ITask[]): status[] {
	const statuses = new Set<status>();
	tasks.forEach((task) => statuses.add(task.status));
	return Array.from(statuses);
}

/** Tasks finished or submitted for approval both move project progress. */
function taskCountsTowardProgress(t: ITask): boolean {
	return t.status === "Completed" || t.status === "Reviewing";
}

export function recomputePhaseAndProjectProgress() {
	const phaseStore = usePhaseStore.getState();
	const taskStore = useTaskStore.getState();
	const projectStore = useProjectStore.getState();

	// 🔹 Recalculate each phase (derive tasks by phaseId so we are not blocked on taskIds)
	Object.entries(phaseStore.phases).forEach(([phaseId, phase]) => {
		const tasks = Object.values(taskStore.tasks).filter(
			(t) => t.phaseId === phaseId
		);

		if (tasks.length > 0) {
			const spent = tasks.reduce((acc, t) => acc + (t.spent || 0), 0);
			const estimatedDuration = tasks.reduce(
				(acc, t) => acc + (t.estimatedDuration || 0),
				0
			);
			const completedTasks = tasks.filter(taskCountsTowardProgress).length;
			const phaseStatus = calculatePhaseStatus(tasks);
			const taskIds = tasks.map((t) => t.id);

			phaseStore.updatePhase(phaseId, {
				taskIds,
				spent,
				estimatedDuration,
				completedTasks,
				totalTasks: tasks.length,
				status: phaseStatus,
			});
		} else {
			// Phases with no tasks must still bucket on the board (e.g. Inactive column).
			phaseStore.updatePhase(phaseId, {
				taskIds: [],
				spent: 0,
				estimatedDuration: 0,
				completedTasks: 0,
				totalTasks: 0,
				status: ["Inactive"],
			});
		}
	});

	// 🔹 Recalculate each project (do not rely on project.phaseIds; it is often empty in the store)
	Object.entries(projectStore.projects).forEach(([projectId]) => {
		const phases = Object.values(phaseStore.phases).filter(
			(p) => p.projectId === projectId
		);

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

export const getProjectProgress = (
	projects?: IProject[],
	_phases?: IPhase[]
) => {
	recomputePhaseAndProjectProgress();

	const phaseStore = usePhaseStore.getState();
	const projectStore = useProjectStore.getState();

	const projectList =
		projects ??
		Object.entries(projectStore.projects).map(([_, project]) => project);
	// Always read phases from the store after recompute (props can be stale).
	const phasesList = Object.entries(phaseStore.phases).map(
		([_, phase]) => phase
	);

	// Calculate project properties based on phases (using already stored data)
	projectList.forEach((project) => {
		const phases: IPhase[] = phasesList.filter(
			(phase) => phase.projectId === project.id
		);
		if (phases.length > 0 && phases) {
			const totalTasks = phases.reduce(
				(acc, phase) => acc + (phase.totalTasks || 0),
				0
			);
			const completedTasks = phases.reduce(
				(acc, phase) => acc + (phase.completedTasks || 0),
				0
			);
			const progress =
				totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

			const projectId = project.id;
			projectStore.updateProject(projectId, {
				totalTasks,
				completedTasks,
				progress,
			});
		}
	});
};
