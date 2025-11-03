// lib/store/projectTemplateStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IProjectTemplate } from "@/lib/types";

interface ProjectTemplateState {
	projectTemplates: Record<string, IProjectTemplate>;
	setProjectTemplates: (projectTemplate: IProjectTemplate[]) => void;
	addProjectTemplate: (projectTemplate: IProjectTemplate) => void;
	deleteProjectTemplate: (id: string) => void;
	getProjectTemplate: (id: string) => IProjectTemplate | undefined;
	updateProjectTemplate: (
		id: string,
		projectTemplate: IProjectTemplate
	) => void;
	clearProjectTemplates: () => void;
}

export const useProjectTemplateStore = create<ProjectTemplateState>()(
	persist(
		(set, get) => ({
			projectTemplates: {},

			setProjectTemplates: (projectTemplates) => {
				set((state) => {
					const projectTemplateObj: Record<string, IProjectTemplate> =
						{
							...state.projectTemplates,
						};
					projectTemplates.forEach((projectTemplate) => {
						projectTemplateObj[projectTemplate.id] =
							projectTemplate;
					});
					return { projectTemplates: projectTemplateObj };
				});
			},

			addProjectTemplate: (projectTemplate) => {
				set((state) => ({
					projectTemplates: {
						...state.projectTemplates,
						[projectTemplate.id]: projectTemplate,
					},
				}));
			},

			deleteProjectTemplate: (id) => {
				set((state) => {
					const { [id]: _, ...remainingProjectTemplates } =
						state.projectTemplates;
					return { projectTemplates: remainingProjectTemplates };
				});
			},

			getProjectTemplate: (id) => {
				return get().projectTemplates[id];
			},

			updateProjectTemplate: (id, projectTemplate) => {
				set((state) => ({
					projectTemplates: {
						...state.projectTemplates,
						[id]: projectTemplate,
					},
				}));
			},

			clearProjectTemplates: () => {
				set({ projectTemplates: {} });
			},
		}),
		{
			name: "projectTemplate-storage",
		}
	)
);
