// lib/store/taskStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ITask } from "@/lib/types";

interface TaskState {
	tasks: Record<string, ITask>;
	setTasks: (tasks: ITask[]) => void;
	updateTask: (id: string, updates: Partial<ITask>) => void;
	addTask: (task: ITask) => void;
	deleteTask: (id: string) => void;
	getTask: (id: string) => ITask | undefined;
	getTasksByPhase: (phaseId: string) => ITask[];
	getTasksByAssignee: (assigneeId: string) => ITask[];
	clearTasks: () => void;
}

export const useTaskStore = create<TaskState>()(
	persist(
		(set, get) => ({
			tasks: {},

			setTasks: (tasks) => {
				set((state) => {
					const newTasks: Record<string, ITask> = { ...state.tasks };
					tasks.forEach((task) => {
						newTasks[task.id] = task;
					});
					return { tasks: newTasks };
				});
			},

			updateTask: (id, updates) => {
				set((state) => {
					const existing = state.tasks[id];
					if (existing) {
						return {
							tasks: {
								...state.tasks,
								[id]: { ...existing, ...updates },
							},
						};
					}
					return state;
				});
			},

			addTask: (task) => {
				set((state) => ({
					tasks: {
						...state.tasks,
						[task.id]: task,
					},
				}));
			},

			deleteTask: (id) => {
				set((state) => {
					const { [id]: _, ...remainingTasks } = state.tasks;
					return { tasks: remainingTasks };
				});
			},

			getTask: (id) => {
				return get().tasks[id];
			},

			getTasksByPhase: (phaseId) => {
				const tasks = Object.values(get().tasks);

				return tasks.filter((task) => task.phaseId === phaseId);
			},

			getTasksByAssignee: (assigneeId) => {
				const tasks = Object.values(get().tasks);
				return tasks.filter((task) => task.assignedTo === assigneeId);
			},

			clearTasks: () => {
				set({ tasks: {} });
			},
		}),
		{
			name: "task-storage",
		}
	)
);
