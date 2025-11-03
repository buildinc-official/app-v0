// lib/functions/normalizers.ts
import { IProject, IPhase, ITask, IMaterial } from "@/lib/types";

/**
 * 🧩 Ensures every project object has all required base fields.
 */
export function normalizeProject(project: Partial<IProject>): IProject {
	return {
		id: crypto.randomUUID(),
		name: project.name || "",
		description: project.description || "",
		budget: project.budget ?? 0,
		spent: project.spent ?? 0,
		startDate: project.startDate ?? null,
		endDate: project.endDate ?? null,
		location: project.location || "",
		status: project.status || "Inactive",
		category: project.category || "Residential",
		orgId: project.orgId || "",
		owner: project.owner || "",
		created_at: project.created_at || new Date(),
		phaseIds: Array.isArray(project.phaseIds) ? project.phaseIds : [],
		memberIds: Array.isArray(project.memberIds) ? project.memberIds : [],
		progress: project.progress ?? 0,
		totalTasks: project.totalTasks ?? 0,
		completedTasks: project.completedTasks ?? 0,
	};
}

/**
 * 🧱 Ensures every phase object has the proper structure.
 */
export function normalizePhase(phase: Partial<IPhase>): IPhase {
	return {
		id: crypto.randomUUID(),
		projectId: phase.projectId || "",
		name: phase.name || "",
		description: phase.description || "",
		order: phase.order ?? 0,
		budget: phase.budget ?? 0,
		spent: phase.spent ?? 0,
		status: Array.isArray(phase.status) ? phase.status : ["Inactive"],
		startDate: phase.startDate ?? null,
		endDate: phase.endDate ?? null,
		totalTasks: phase.totalTasks ?? 0,
		completedTasks: phase.completedTasks ?? 0,
		taskIds: Array.isArray(phase.taskIds) ? phase.taskIds : [],
		created_at: phase.created_at || new Date(),
		estimatedDuration: phase.estimatedDuration ?? 0,
	};
}

/**
 * ⚙️ Ensures every task has defaults set and avoids missing arrays or nulls.
 */
export function normalizeTask(task: Partial<ITask>): ITask {
	return {
		id: crypto.randomUUID(),
		name: task.name || "",
		description: task.description || "",
		phaseId: task.phaseId || "",
		projectId: task.projectId || "",
		projectName: task.projectName || "",
		status: task.status || "Inactive",
		order: task.order ?? 0,
		created_at: task.created_at || new Date(),
		startDate: task.startDate ?? null,
		endDate: task.endDate ?? null,
		completedDate: task.completedDate ?? null,
		assignedTo: task.assignedTo ?? null,
		approvedBy: task.approvedBy ?? null,
		plannedBudget: task.plannedBudget ?? 0,
		spent: task.spent ?? 0,
		estimatedDuration: task.estimatedDuration ?? 0,
		completionNotes: task.completionNotes || "",
		rejectionReason: task.rejectionReason || "",
		materialIds: Array.isArray(task.materialIds) ? task.materialIds : [],
		paymentCompleted: task.paymentCompleted ?? false,
		materialsCompleted: task.materialsCompleted ?? false,
	};
}

/**
 * 🧰 Normalizes materials to guarantee numeric + boolean safety.
 */
export function normalizeMaterial(material: Partial<IMaterial>): IMaterial {
	return {
		id: crypto.randomUUID(),
		taskId: material.taskId || "",
		name: material.name || "",
		materialId: material.materialId || "",
		plannedQuantity: material.plannedQuantity ?? 0,
		usedQuantity: material.usedQuantity ?? 0,
		unitCost: material.unitCost ?? 0,
		unit: material.unit || "",
		requested: material.requested ?? false,
		approved: material.approved ?? false,
		deliveredQuantity: material.deliveredQuantity ?? 0,
		wasteQuantity: material.wasteQuantity ?? 0,
	};
}
