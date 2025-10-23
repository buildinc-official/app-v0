// lib/store/projectStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IProject } from "@/lib/types";

interface ProjectState {
	projects: Record<string, IProject>;
	setProjects: (projects: IProject[]) => void;
	updateProject: (id: string, updates: Partial<IProject>) => void;
	addProject: (project: IProject) => void;
	deleteProject: (id: string) => void;
	getProject: (id: string) => IProject | undefined;
	getProjectsByOrg: (orgId: string) => IProject[];
	clearProjects: () => void;
}

export const useProjectStore = create<ProjectState>()(
	persist(
		(set, get) => ({
			projects: {},

			setProjects: (projects) => {
				const projectsObj: Record<string, IProject> = {};
				projects.forEach((project) => {
					projectsObj[project.id] = project;
				});
				set({ projects: projectsObj });
			},

			updateProject: (id, updates) => {
				set((state) => {
					const existing = state.projects[id];
					if (existing) {
						return {
							projects: {
								...state.projects,
								[id]: { ...existing, ...updates },
							},
						};
					}
					return state;
				});
			},

			addProject: (project) => {
				set((state) => ({
					projects: {
						...state.projects,
						[project.id]: project,
					},
				}));
			},

			deleteProject: (id) => {
				set((state) => {
					const { [id]: _, ...remainingProjects } = state.projects;
					return { projects: remainingProjects };
				});
			},

			getProject: (id) => {
				return get().projects[id];
			},

			getProjectsByOrg: (orgId) => {
				const projects = Object.values(get().projects);
				return projects.filter((project) => project.orgId === orgId);
			},

			clearProjects: () => {
				set({ projects: {} });
			},
		}),
		{
			name: "project-storage",
		}
	)
);
