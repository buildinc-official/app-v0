// lib/middleware/profile.ts
import { profileDB } from "@/lib/supabase/db/profileDB";
import { IProfile, IProfileDB } from "../types";
import { useProfileStore } from "@/lib/store/profileStore";

export async function getAllProfiles() {
	try {
		const profiles = await profileDB.getAllProfiles();

		// store in allProfiles in the store
		const store = useProfileStore.getState();
		store.setAllProfiles(profiles);
	} catch (error) {
		console.error("Error getting all profiles:", error);
		throw error;
	}
}
export async function getProfile(id: string): Promise<IProfile> {
	try {
		if (!id || id === "") throw new Error("Profile ID is required");
		// First check if we have it in the store (current user profile)
		const store = useProfileStore.getState();
		if (store.profile && store.profile.id === id) {
			return store.profile;
		}

		// If not in store, fetch from DB
		const profile = await profileDB.getProfile(id);

		// Return basic profile (we don't store all profiles, just current user)
		return profile as IProfile;
	} catch (error) {
		console.error("Error getting profile:", error);
		throw error;
	}
}

export async function getProfilesByIds(ids: string[]): Promise<IProfile[]> {
	try {
		const profiles = await profileDB.getProfilesByIds(ids);
		return profiles as IProfile[];
	} catch (error) {
		console.error("Error getting profiles by IDs:", error);
		throw error;
	}
}

export async function updateProfile(
	id: string,
	updates: Partial<IProfile>
): Promise<IProfile> {
	try {
		// Convert partial IProfile to partial IProfileDB
		const updateData: Partial<IProfileDB> = {};

		// Only include fields that exist in IProfileDB
		if (updates.email !== undefined) updateData.email = updates.email;
		if (updates.name !== undefined) updateData.name = updates.name;
		if (updates.bio !== undefined) updateData.bio = updates.bio;
		if (updates.admin !== undefined) updateData.admin = updates.admin;

		const result = await profileDB.updateProfile(id, updateData);

		// Update store if it's the current user's profile
		const store = useProfileStore.getState();
		if (store.profile && store.profile.id === id) {
			store.updateProfile(updates);
		}

		return result as IProfile;
	} catch (error) {
		console.error("Error updating profile:", error);
		throw error;
	}
}

export async function createProfile(profile: IProfile): Promise<IProfile> {
	try {
		const profileData: IProfileDB = {
			id: profile.id,
			email: profile.email,
			name: profile.name,
			bio: profile.bio,
			admin: profile.admin,
		};

		const result = await profileDB.createProfile(profileData);
		return result as IProfile;
	} catch (error) {
		console.error("Error creating profile:", error);
		throw error;
	}
}

// Store Functions
export function getProfileFromStore(id: string): IProfile | null {
	try {
		if (!id || id === "") return null;
		// First check if we have it in the store (current user profile)
		const store = useProfileStore((state) => state.allProfiles);
		const profile = store.find((p) => p.id === id);
		if (profile) return profile;
		return null;
	} catch (error) {
		console.error("Error getting profile:", error);
		throw error;
	}
}

export function getAllProfilesFromStore() {
	try {
		const profiles = useProfileStore.getState().allProfiles;
		if (profiles && profiles.length > 0) {
			return profiles;
		}
		return [];
	} catch (error) {
		console.error("Error getting all profiles:", error);
		throw error;
	}
}
