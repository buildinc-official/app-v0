// lib/store/organisationMemberStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IOrganisationProfile } from "@/lib/types";

interface OrganisationMemberState {
	organisationMembers: Record<string, Record<string, IOrganisationProfile>>; // orgId -> { memberId: member }
	setOrganisationMembers: (
		orgId: string,
		members: IOrganisationProfile[]
	) => void;
	addOrganisationMember: (
		orgId: string,
		member: IOrganisationProfile
	) => void;
	removeOrganisationMember: (orgId: string, memberId: string) => void;
	getOrganisationMembers: (orgId: string) => IOrganisationProfile[];
	getOrganisationMember: (
		orgId: string,
		memberId: string
	) => IOrganisationProfile | undefined;
	clearOrganisationMembers: () => void;
	clearMembersForOrganisation: (orgId: string) => void;
}

export const useOrganisationMemberStore = create<OrganisationMemberState>()(
	persist(
		(set, get) => ({
			organisationMembers: {},

			setOrganisationMembers: (orgId, members) => {
				set((state) => {
					const membersObj: Record<string, IOrganisationProfile> = {};
					members.forEach((member) => {
						membersObj[member.id] = member;
					});

					return {
						organisationMembers: {
							...state.organisationMembers,
							[orgId]: membersObj,
						},
					};
				});
			},

			addOrganisationMember: (orgId, member) => {
				set((state) => ({
					organisationMembers: {
						...state.organisationMembers,
						[orgId]: {
							...state.organisationMembers[orgId],
							[member.id]: member,
						},
					},
				}));
			},

			removeOrganisationMember: (orgId, memberId) => {
				set((state) => {
					const orgMembers = state.organisationMembers[orgId];
					if (orgMembers) {
						const { [memberId]: _, ...remainingMembers } =
							orgMembers;
						return {
							organisationMembers: {
								...state.organisationMembers,
								[orgId]: remainingMembers,
							},
						};
					}
					return state;
				});
			},

			getOrganisationMembers: (orgId) => {
				const members = get().organisationMembers[orgId];
				return members ? Object.values(members) : [];
			},

			getOrganisationMember: (orgId, memberId) => {
				const members = get().organisationMembers[orgId];
				return members ? members[memberId] : undefined;
			},

			clearOrganisationMembers: () => {
				set({ organisationMembers: {} });
			},

			clearMembersForOrganisation: (orgId) => {
				set((state) => {
					const { [orgId]: _, ...remainingMembers } =
						state.organisationMembers;
					return { organisationMembers: remainingMembers };
				});
			},
		}),
		{
			name: "organisation-member-storage",
		}
	)
);
