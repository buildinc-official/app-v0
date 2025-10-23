// lib/supabase/db/organisationDB.ts
import { createClient } from "@/lib/supabase/client";
import { IOrganisationDB } from "../../types";

const supabase = createClient();

export const organisationDB = {
	// Gets the Orgs owned by a user
	async getUserOrganisations(userId: string) {
		const { data, error } = await supabase
			.from("organisations")
			.select("*")
			.eq("owner", userId);

		if (error) throw error;
		return data as IOrganisationDB[];
	},

	// Gets a single org by its ID
	async getOrganisation(id: string) {
		const { data, error } = await supabase
			.from("organisations")
			.select("*")
			.eq("id", id)
			.single();

		if (error) throw error;
		return data as IOrganisationDB;
	},

	// Adds a new org
	async addOrganisation(organisation: IOrganisationDB) {
		const { data, error } = await supabase
			.from("organisations")
			.insert([organisation])
			.select()
			.single();

		if (error) throw error;
		return data as IOrganisationDB;
	},

	// Updates an org by its ID
	async updateOrganisation(id: string, updates: Partial<IOrganisationDB>) {
		const { data, error } = await supabase
			.from("organisations")
			.update(updates)
			.eq("id", id)
			.select()
			.single();

		if (error) throw error;
		return data as IOrganisationDB;
	},

	// Deletes an org by its ID
	async removeOrganisation(id: string) {
		try {
			await supabase
				.from("organisations")
				.delete()
				.eq("id", id)
				.throwOnError();
		} catch (error) {
			// console.log("error", error);
		}
	},
};
