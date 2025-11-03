// lib/middleware/projects.ts
import { projectDB } from "@/lib/supabase/db/projectDB";
import {
	IProject,
	IProjectCreationData,
	IProjectDB,
	IProjectMemberDB,
} from "../types";
import { useProjectStore } from "@/lib/store/projectStore";
import { projectMemberDB } from "../supabase/db/projectMemberDB";

export async function addProject(project: IProjectCreationData) {
	try {
		// Convert IProject to IProjectDB by extracting only the DB fields
		const projectData: IProjectDB = {
			id: crypto.randomUUID(),
			created_at: new Date(),
			name: project.name,
			owner: project.owner,
			description: project.description,
			orgId: project.organisationId,
			startDate: project.startDate,
			endDate: project.endDate,
			budget: project.budget,
			spent: 0,
			location: project.location,
			status: project.status,
			category: project.category,
		};

		const result = await projectDB.addProject(projectData);

		// Update store with the new project (basic data only)
		const store = useProjectStore.getState();
		store.addProject({
			...result,
			phaseIds: [],
			memberIds: [],
			progress: 0,
			totalTasks: 0,
			completedTasks: 0,
		});

		return result;
	} catch (error) {
		console.error("Error adding project:", error);
		throw error;
	}
}

export async function deleteProject(id: string) {
	try {
		await projectDB.removeProject(id);

		// Remove from store
		const store = useProjectStore.getState();
		store.deleteProject(id);

		return { success: true, message: "Project deleted successfully" };
	} catch (error) {
		console.error("Error deleting project:", error);
		throw error;
	}
}

export async function updateProject(id: string, updates: Partial<IProject>) {
	try {
		// Convert partial IProject to partial IProjectDB
		const updateData: Partial<IProjectDB> = {};

		// Only include fields that exist in IProjectDB
		if (updates.name !== undefined) updateData.name = updates.name;
		if (updates.description !== undefined)
			updateData.description = updates.description;
		if (updates.owner !== undefined) updateData.owner = updates.owner;
		if (updates.orgId !== undefined) updateData.orgId = updates.orgId;
		if (updates.startDate !== undefined)
			updateData.startDate = updates.startDate;
		if (updates.endDate !== undefined) updateData.endDate = updates.endDate;
		if (updates.budget !== undefined) updateData.budget = updates.budget;
		if (updates.spent !== undefined) updateData.spent = updates.spent;
		if (updates.location !== undefined)
			updateData.location = updates.location;
		if (updates.status !== undefined) updateData.status = updates.status;
		if (updates.category !== undefined)
			updateData.category = updates.category;

		const result = await projectDB.updateProject(id, updateData);

		// Update store
		const store = useProjectStore.getState();
		store.updateProject(id, updateData);

		return result;
	} catch (error) {
		console.error("Error updating project:", error);
		throw error;
	}
}

export async function getProject(id: string): Promise<IProject> {
	try {
		// First check if we have it in the store
		const store = useProjectStore.getState();
		const cachedProject = store.getProject(id);

		if (cachedProject) {
			return cachedProject;
		}

		// If not in store, fetch from DB
		const project = await projectDB.getProject(id);

		// Add to store with empty references
		const projectWithReferences: IProject = {
			...project,
			phaseIds: [],
			memberIds: [],
			progress: 0,
			totalTasks: 0,
			completedTasks: 0,
		};
		store.addProject(projectWithReferences);

		return projectWithReferences;
	} catch (error) {
		console.error("Error getting project:", error);
		throw error;
	}
}

export async function getUserProjects(userId: string): Promise<IProject[]> {
	try {
		const projects = await projectDB.getUserProjects(userId);

		// Update store with the basic project data
		const projectsWithReferences: IProject[] = projects.map((project) => ({
			...project,
			phaseIds: [],
			memberIds: [],
			progress: 0,
			totalTasks: 0,
			completedTasks: 0,
		}));

		const store = useProjectStore.getState();
		store.setProjects(projectsWithReferences);

		return projectsWithReferences;
	} catch (error) {
		console.error("Error getting user projects:", error);
		throw error;
	}
}

export async function getMemberProjects(userId: string): Promise<IProject[]> {
	try {
		const projects = await projectMemberDB.getUserProjectMembers(userId);

		// Fetch full project details for each membership
		const projectDetailsPromises = projects.map((pm) =>
			projectDB.getProject(pm.projectId)
		);
		const projectDetails = await Promise.all(projectDetailsPromises);

		// Update store with the basic project data
		const projectsWithReferences: IProject[] = projectDetails.map(
			(project) => ({
				...project,
				phaseIds: [],
				memberIds: [],
				progress: 0,
				totalTasks: 0,
				completedTasks: 0,
			})
		);

		const store = useProjectStore.getState();
		store.setProjects(projectsWithReferences);

		return projectsWithReferences;
	} catch (error) {
		console.error("Error getting member projects:", error);
		throw error;
	}
}

export async function getOrganisationProjects(
	orgId: string
): Promise<IProject[]> {
	try {
		const projects = await projectDB.getOrganisationProjects(orgId);

		// Update store with the basic project data
		const projectsWithReferences: IProject[] = projects.map((project) => ({
			...project,
			phaseIds: [],
			memberIds: [],
			progress: 0,
			totalTasks: 0,
			completedTasks: 0,
		}));

		const store = useProjectStore.getState();
		// Add to store (don't replace all projects, just add these)
		projectsWithReferences.forEach((project) => {
			store.addProject(project);
		});

		return projectsWithReferences;
	} catch (error) {
		console.error("Error getting organisation projects:", error);
		throw error;
	}
}

// Store functions
export function getOrganisationProjectsFromStore(orgId: string): IProject[] {
	try {
		// First check if we have them in the store
		const store = useProjectStore.getState();
		const projects = store.getProjectsByOrg(orgId);

		if (projects.length > 0) {
			return projects;
		} else {
			return [];
		}
	} catch (error) {
		console.error("Error getting organisation members:", error);
		throw error;
	}
}

export function getProjectFromStore(id: string): IProject | undefined {
	try {
		// First check if we have it in the store
		const store = useProjectStore.getState();
		const cachedProject = store.getProject(id);

		if (cachedProject) {
			return cachedProject;
		}
		return undefined;
	} catch (error) {
		console.error("Error getting project:", error);
		throw error;
	}
}
