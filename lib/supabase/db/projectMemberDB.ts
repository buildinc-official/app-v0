// lib/supabase/db/projectMemberDB.ts
import { createClient } from "@/lib/supabase/client";
import { IProjectMemberDB } from "../../types";

const supabase = createClient();

export const projectMemberDB = {
	// Gets all members of a project
	async getProjectMembers(projectId: string) {
		const { data, error } = await supabase
			.from("project_members")
			.select("*")
			.eq("projectId", projectId);

		if (error) throw error;
		return data as IProjectMemberDB[];
	},

	// Gets projects a user is member of
	async getUserProjectMembers(userId: string) {
		const { data, error } = await supabase
			.from("project_members")
			.select("*")
			.eq("userId", userId);

		if (error) throw error;
		return data as IProjectMemberDB[];
	},

	// Adds a member to a project
	async addProjectMember(member: IProjectMemberDB) {
		const { data, error } = await supabase
			.from("project_members")
			.insert([member])
			.select()
			.single();

		if (error) throw error;
		return data as IProjectMemberDB;
	},

	// Updates a member's role
	async updateProjectMember(id: string, updates: Partial<IProjectMemberDB>) {
		const { data, error } = await supabase
			.from("project_members")
			.update(updates)
			.eq("id", id)
			.select()
			.single();

		if (error) throw error;
		return data as IProjectMemberDB;
	},

	// Removes a member from a project
	async removeProjectMember(id: string) {
		try {
			await supabase
				.from("project_members")
				.delete()
				.eq("id", id)
				.throwOnError();
		} catch (error) {
			// console.log("error", error);
		}
	},

	// Gets a specific member
	async getProjectMember(id: string) {
		const { data, error } = await supabase
			.from("project_members")
			.select("*")
			.eq("id", id)
			.single();

		if (error) throw error;
		return data as IProjectMemberDB;
	},
};
