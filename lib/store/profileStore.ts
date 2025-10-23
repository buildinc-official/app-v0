// lib/store/profileStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IProfile } from "@/lib/types";

interface ProfileState {
	allProfiles: IProfile[];
	profile: IProfile | null;
	setProfile: (profile: IProfile | null) => void;
	setAllProfiles: (profiles: IProfile[]) => void;
	updateProfile: (updates: Partial<IProfile>) => void;
	clearProfile: () => void;
}

export const useProfileStore = create<ProfileState>()(
	persist(
		(set, get) => ({
			allProfiles: [],
			profile: null,

			setProfile: (profile) => set({ profile }),
			setAllProfiles: (profiles) => set({ allProfiles: profiles }),
			updateProfile: (updates) => {
				set((state) => ({
					profile: state.profile
						? { ...state.profile, ...updates }
						: null,
				}));
			},

			clearProfile: () => set({ profile: null, allProfiles: [] }),
		}),
		{
			name: "profile-storage",
		}
	)
);
