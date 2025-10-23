// lib/store/organisationStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IOrganisation } from "@/lib/types";

interface OrganisationState {
	organisations: Record<string, IOrganisation>;
	setOrganisations: (organisations: IOrganisation[]) => void;
	updateOrganisation: (id: string, updates: Partial<IOrganisation>) => void;
	addOrganisation: (organisation: IOrganisation) => void;
	deleteOrganisation: (id: string) => void;
	getOrganisation: (id: string) => IOrganisation | undefined;
	clearOrganisations: () => void;
}

export const useOrganisationStore = create<OrganisationState>()(
	persist(
		(set, get) => ({
			organisations: {},

			setOrganisations: (organisations) => {
				const organisationsObj: Record<string, IOrganisation> = {};
				organisations.forEach((org) => {
					organisationsObj[org.id] = org;
				});
				set({ organisations: organisationsObj });
			},

			updateOrganisation: (id, updates) => {
				set((state) => {
					const existing = state.organisations[id];
					if (existing) {
						return {
							organisations: {
								...state.organisations,
								[id]: { ...existing, ...updates },
							},
						};
					}
					return state;
				});
			},

			addOrganisation: (organisation) => {
				set((state) => ({
					organisations: {
						...state.organisations,
						[organisation.id]: organisation,
					},
				}));
			},

			deleteOrganisation: (id) => {
				set((state) => {
					const { [id]: _, ...remainingOrganisations } =
						state.organisations;
					return { organisations: remainingOrganisations };
				});
			},

			getOrganisation: (id) => {
				return get().organisations[id];
			},

			clearOrganisations: () => {
				set({ organisations: {} });
			},
		}),
		{
			name: "organisation-storage",
		}
	)
);
