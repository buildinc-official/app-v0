import { create } from "zustand";
import { IOrganisation, IProject } from "../types";

interface OrganisationDetailState {
	organisation: IOrganisation | null;
	projects: IProject[] | null;
	setOrganisationDetails: (organisation: IOrganisation) => void;
	clearData: () => void;
}

export const useOrganisationDetailStore = create<OrganisationDetailState>(
	(set) => ({
		organisation: null,
		projects: null,
		setOrganisationDetails: (organisation) => {
			set({ organisation });
		},
		clearData: () => {
			set({ organisation: null });
		},
	})
);
