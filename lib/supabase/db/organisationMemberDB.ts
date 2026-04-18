// lib/supabase/db/organisationMemberDB.ts
import { createClient } from "@/lib/supabase/client";
import { serializeRowForInsert } from "@/lib/supabase/insertSerialize";
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
			.insert([serializeRowForInsert(member as unknown as Record<string, unknown>)])
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
		const { error } = await supabase
			.from("organisation_members")
			.delete()
			.eq("id", id);

		if (error) {
			console.error("removeOrganisationMember failed:", error);
			throw error;
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
