// lib/middleware/projectTemplate.ts
import { projectTemplateDB } from "@/lib/supabase/db/projectTemplateDB";
import { IProjectTemplate, IProjectTemplateDB } from "../types";
import { useProjectTemplateStore } from "@/lib/store/projectTemplateStore";

export async function addProjectTemplate(projectTemplate: IProjectTemplate) {
	try {
		// Convert IProjectTemplate to IProjectTemplateDB by extracting only the DB fields
		const { name, owner, ...data } = projectTemplate;
		const projectTemplateData: IProjectTemplateDB = {
			id: crypto.randomUUID(),
			created_at: new Date(),
			name,
			owner,
			data,
		};

		await projectTemplateDB.addProjectTemplate(projectTemplateData);

		const store = useProjectTemplateStore.getState();

		const enrichedProjectTemplate: IProjectTemplate = {
			...projectTemplateData,
			...data,
		};

		store.addProjectTemplate(enrichedProjectTemplate);

		return enrichedProjectTemplate;
	} catch (error) {
		console.error("Error adding projectTemplate:", error);
		throw error;
	}
}

export async function deleteProjectTemplate(id: string) {
	try {
		await projectTemplateDB.removeProjectTemplate(id);

		// Remove from store
		const store = useProjectTemplateStore.getState();
		store.deleteProjectTemplate(id);

		return {
			success: true,
			message: "ProjectTemplate deleted successfully",
		};
	} catch (error) {
		console.error("Error deleting projectTemplate:", error);
		throw error;
	}
}

export async function getAllProjectTemplates(
	ownerId: string
): Promise<IProjectTemplate[]> {
	try {
		// fetch data
		const projectTemplates = await projectTemplateDB.getAllProjectTemplates(
			ownerId
		);

		// Enrich projectTemplate data
		const enrichedProjectTemplates: IProjectTemplate[] =
			projectTemplates.map((pt) => ({
				...pt,
				...pt.data,
			}));

		const store = useProjectTemplateStore.getState();
		// Store expects an array setter for multiple templates
		store.setProjectTemplates(enrichedProjectTemplates);

		return enrichedProjectTemplates;
	} catch (error) {
		console.error("Error getting projectTemplate:", error);
		throw error;
	}
}

export function getProjectTemplateFromStore(
	id: string
): IProjectTemplate | undefined {
	try {
		// First check if we have it in the store
		const store = useProjectTemplateStore.getState();
		const cachedProjectTemplate = store.getProjectTemplate(id);

		if (cachedProjectTemplate) {
			return cachedProjectTemplate;
		}

		return undefined;
	} catch (error) {
		console.error("Error getting projectTemplate:", error);
		throw error;
	}
}
