// lib/store/projectMemberStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IProjectProfile } from "@/lib/types";

interface ProjectMemberState {
	projectMembers: Record<string, Record<string, IProjectProfile>>; // projectId -> { memberId: member }
	setProjectMembers: (projectId: string, members: IProjectProfile[]) => void;
	addProjectMember: (projectId: string, member: IProjectProfile) => void;
	removeProjectMember: (projectId: string, memberId: string) => void;
	getProjectMembers: (projectId: string) => IProjectProfile[];
	getProjectMember: (
		projectId: string,
		memberId: string
	) => IProjectProfile | undefined;
	clearProjectMembers: () => void;
	clearMembersForProject: (projectId: string) => void;
	clearData: () => void;
}

export const useProjectMemberStore = create<ProjectMemberState>()(
	persist(
		(set, get) => ({
			projectMembers: {},

			setProjectMembers: (projectId, members) => {
				set((state) => {
					const membersObj: Record<string, IProjectProfile> = {};
					members.forEach((member) => {
						membersObj[member.id] = member;
					});

					return {
						projectMembers: {
							...state.projectMembers,
							[projectId]: membersObj,
						},
					};
				});
			},

			addProjectMember: (projectId, member) => {
				set((state) => ({
					projectMembers: {
						...state.projectMembers,
						[projectId]: {
							...state.projectMembers[projectId],
							[member.id]: member,
						},
					},
				}));
			},

			removeProjectMember: (projectId, memberId) => {
				set((state) => {
					const projectMembers = state.projectMembers[projectId];
					if (projectMembers) {
						const { [memberId]: _, ...remainingMembers } =
							projectMembers;
						return {
							projectMembers: {
								...state.projectMembers,
								[projectId]: remainingMembers,
							},
						};
					}
					return state;
				});
			},

			getProjectMembers: (projectId) => {
				const members = get().projectMembers[projectId];
				return members ? Object.values(members) : [];
			},

			getProjectMember: (projectId, memberId) => {
				const members = get().projectMembers[projectId];
				return members ? members[memberId] : undefined;
			},

			clearProjectMembers: () => {
				set({ projectMembers: {} });
			},

			clearMembersForProject: (projectId) => {
				set((state) => {
					const { [projectId]: _, ...remainingMembers } =
						state.projectMembers;
					return { projectMembers: remainingMembers };
				});
			},
			clearData: () => {
				set({ projectMembers: {} });
			},
		}),
		{
			name: "project-member-storage",
		}
	)
);
