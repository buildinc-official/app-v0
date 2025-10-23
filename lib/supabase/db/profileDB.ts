// lib/supabase/db/profileDB.ts
import { createClient } from "@/lib/supabase/client";
import { IProfileDB } from "../../types";

const supabase = createClient();

export const profileDB = {
	// Gets a profile by ID
	async getProfile(id: string) {
		const { data, error } = await supabase
			.from("profiles")
			.select("*")
			.eq("id", id)
			.single();

		if (error) throw error;
		return data as IProfileDB;
	},

	// Gets all profiles
	async getAllProfiles() {
		const { data, error } = await supabase.from("profiles").select("*");

		if (error) throw error;
		return data as IProfileDB[];
	},

	// Gets multiple profiles by IDs
	async getProfilesByIds(ids: string[]) {
		const { data, error } = await supabase
			.from("profiles")
			.select("*")
			.in("id", ids);

		if (error) throw error;
		return data as IProfileDB[];
	},

	// Updates a profile
	async updateProfile(id: string, updates: Partial<IProfileDB>) {
		const { data, error } = await supabase
			.from("profiles")
			.update(updates)
			.eq("id", id)
			.select()
			.single();

		if (error) throw error;
		return data as IProfileDB;
	},

	// Creates a new profile
	async createProfile(profile: IProfileDB) {
		const { data, error } = await supabase
			.from("profiles")
			.insert([profile])
			.select()
			.single();

		if (error) throw error;
		return data as IProfileDB;
	},
};
