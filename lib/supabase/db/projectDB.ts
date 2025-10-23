// lib/supabase/db/projectDB.ts
import { createClient } from "@/lib/supabase/client";
import { IProjectDB } from "../../types";

const supabase = createClient();

export const projectDB = {
	// Gets projects owned by a user
	async getUserProjects(userId: string) {
		const { data, error } = await supabase
			.from("projects")
			.select("*")
			.eq("owner", userId);

		if (error) throw error;
		return data as IProjectDB[];
	},

	// Gets projects in an organisation
	async getOrganisationProjects(orgId: string) {
		const { data, error } = await supabase
			.from("projects")
			.select("*")
			.eq("orgId", orgId);

		if (error) throw error;
		return data as IProjectDB[];
	},

	// Gets a single project by its ID
	async getProject(id: string) {
		const { data, error } = await supabase
			.from("projects")
			.select("*")
			.eq("id", id)
			.single();

		if (error) throw error;
		return data as IProjectDB;
	},

	// Adds a new project
	async addProject(project: IProjectDB) {
		const { data, error } = await supabase
			.from("projects")
			.insert([project])
			.select()
			.single();

		if (error) throw error;
		return data as IProjectDB;
	},

	// Updates a project by its ID
	async updateProject(id: string, updates: Partial<IProjectDB>) {
		const { data, error } = await supabase
			.from("projects")
			.update(updates)
			.eq("id", id)
			.select()
			.single();

		if (error) throw error;
		return data as IProjectDB;
	},

	// Deletes a project by its ID
	async removeProject(id: string) {
		try {
			await supabase
				.from("projects")
				.delete()
				.eq("id", id)
				.throwOnError();
		} catch (error) {
			// console.log("error", error);
		}
	},
};
