// lib/supabase/db/organisationMemberDB.ts
import { createClient } from "@/lib/supabase/client";
import { IOrganisationMemberDB } from "../../types";

const supabase = createClient();

export const organisationMemberDB = {
	// Gets all members of an organisation
	async getOrganisationMembers(orgId: string) {
		const { data, error } = await supabase
			.from("organisation_members")
			.select("*")
			.eq("orgId", orgId);

		if (error) throw error;
		return data as IOrganisationMemberDB[];
	},

	// Gets organisations a user is member of
	async getUserOrganisationMembers(userId: string) {
		const { data, error } = await supabase
			.from("organisation_members")
			.select("*")
			.eq("userId", userId);

		if (error) throw error;
		return data as IOrganisationMemberDB[];
	},

	// Adds a member to an organisation
	async addOrganisationMember(member: IOrganisationMemberDB) {
		const { data, error } = await supabase
			.from("organisation_members")
			.insert([member])
			.select()
			.single();

		if (error) throw error;
		return data as IOrganisationMemberDB;
	},

	// Updates a member's role
	async updateOrganisationMember(
		id: string,
		updates: Partial<IOrganisationMemberDB>
	) {
		console.log("Updating member:", id, updates);

		const { data, error } = await supabase
			.from("organisation_members")
			.update(updates)
			.eq("id", id)
			.select()
			.single();

		if (error) throw error;
		return data as IOrganisationMemberDB;
	},

	// Removes a member from an organisation
	async removeOrganisationMember(id: string) {
		try {
			await supabase
				.from("organisation_members")
				.delete()
				.eq("id", id)
				.throwOnError();
		} catch (error) {
			console.log("error", error);
		} finally {
			console.log("Finished removing member");
			return;
		}
	},

	// Gets a specific member
	async getOrganisationMember(id: string) {
		const { data, error } = await supabase
			.from("organisation_members")
			.select("*")
			.eq("id", id)
			.single();

		if (error) throw error;
		return data as IOrganisationMemberDB;
	},
};
