import { create } from "zustand";
import { IProjectProfile, IProject, IOrganisation } from "../types";
import { useOrganisationStore } from "./organisationStore";

interface projectDetailstate {
	project: IProject | null;
	setprojectDetails: (project: IProject, organisation: IOrganisation) => void;
	updateprojectDetails: (project: IProject) => void;
	clearData: () => void;
}

export const useprojectDetailStore = create<projectDetailstate>((set) => ({
	project: null,
	setprojectDetails: (project, organisation) => {
		if (!project) return null;
		project.orgId = organisation?.id || "";
		set({ project });
	},

	updateprojectDetails: (project) => set({ project }),

	clearData: () => {
		set({ project: undefined });
	},
}));
