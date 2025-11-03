// lib/supabase/db/projectTemplateDB.ts
import { createClient } from "@/lib/supabase/client";
import { IProjectTemplateDB } from "../../types";

const supabase = createClient();

export const projectTemplateDB = {
	// Get a projectTemplate by its ID
	async getAllProjectTemplates(ownerId: string) {
		const owners = [ownerId, process.env.NEXT_PUBLIC_TEMPLATE_OWNER_ID];

		const { data, error } = await supabase
			.from("project_templates")
			.select("*")
			.in("owner", owners);

		if (error) throw error;
		return data as IProjectTemplateDB[];
	},

	// Gets project_templates by their IDs
	async getProjectTemplatesById(ids: string[]) {
		const { data, error } = await supabase
			.from("project_templates")
			.select("*")
			.in("id", ids);

		if (error) throw error;
		return data as IProjectTemplateDB[];
	},

	// Adds a new projectTemplate
	async addProjectTemplate(projectTemplate: IProjectTemplateDB) {
		const { data, error } = await supabase
			.from("project_templates")
			.insert([projectTemplate])
			.select()
			.single();

		if (error) throw error;
		return data as IProjectTemplateDB;
	},

	// Updates a projectTemplate by its ID
	async updateProjectTemplate(
		id: string,
		updates: Partial<IProjectTemplateDB>
	) {
		const { data, error } = await supabase
			.from("project_templates")
			.update(updates)
			.eq("id", id)
			.select()
			.single();

		if (error) throw error;
		return data as IProjectTemplateDB;
	},

	// Deletes a projectTemplate by its ID
	async removeProjectTemplate(id: string) {
		try {
			await supabase
				.from("project_templates")
				.delete()
				.eq("id", id)
				.throwOnError();
		} catch (error) {
			console.log("error", error);
		}
	},

	// Bulk update project_templates
	async updateProjectTemplates(
		updates: { id: string; updates: Partial<IProjectTemplateDB> }[]
	) {
		const { error } = await supabase
			.from("project_templates")
			.upsert(updates.map(({ id, updates }) => ({ id, ...updates })));

		if (error) throw error;
		return { success: true };
	},
};
