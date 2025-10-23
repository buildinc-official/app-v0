import { add } from "date-fns";
import { updateMaterial } from "../middleware/materials";
import { getPhase, getPhaseFromStore } from "../middleware/phases";
import { getProject, getProjectFromStore } from "../middleware/projects";
import { addRequest } from "../middleware/requests";
import { getTaskFromStore, updateTask } from "../middleware/tasks";
import { useProfileStore } from "../store/profileStore";
import { IMaterial, ITask } from "../types";

export const getProjectNameFromPhaseId = (phaseId: string): string => {
	const phase = getPhaseFromStore(phaseId);
	if (!phase) return "Unknown Project";
	const project = getProjectFromStore(phase.projectId);
	return project ? project.name : "Unknown Project";
};

export const getProjectIdFromPhaseId = (phaseId: string): string => {
	console.log("phaseId", phaseId);

	const phase = getPhaseFromStore(phaseId);
	if (!phase) return "";
	const project = getProjectFromStore(phase.projectId);
	return project ? project.id : "";
};

// In your requestPayment function, add parameters:
export const requestPayment = (
	task: ITask,
	amount: number,
	projectId: string,
	notes?: string
) => {
	//make request
	addRequest({
		type: "PaymentRequest",
		taskId: task.id,
		notes: notes || "",
		status: "Pending",
		requestData: { amount: amount },
		created_at: new Date(),
		projectId: projectId,
		id: crypto.randomUUID(),
		phaseId: task.phaseId,
		materialId: null,
		requestedBy: task.assignedTo || "unknown",
		requestedTo: task.assigneeId || "unassigned",
		approvedBy: null,
		approvedAt: null,
	});
};

export const requestMaterial = (
	task: ITask,
	material: IMaterial,
	units: number,
	unitName: string,
	unitCost: number,
	projectId: string,
	notes: string | undefined = undefined
) => {
	addRequest({
		type: "MaterialRequest",
		taskId: task.id,
		notes: notes || "",
		status: "Pending",
		requestData: {
			materialId: material.id,
			materialName: material.name,
			units: units,
			unitName: unitName,
			unitCost: unitCost,
		},
		created_at: new Date(),
		projectId: projectId,
		id: crypto.randomUUID(),
		phaseId: task.phaseId,
		materialId: null,
		requestedBy: task.assignedTo || "unknown",
		requestedTo: task.assigneeId || "unassigned",
		approvedBy: null,
		approvedAt: null,
	});

	updateMaterial(material.id, {
		requested: true,
	});
};

export const handleTaskCompletion = (taskId: string) => {
	const profile = useProfileStore.getState().profile;
	if (!profile) return;

	const task = getTaskFromStore(taskId);
	if (!task) return;
	updateTask(taskId, {
		status: "Reviewing",
	});

	addRequest({
		type: "TaskCompletion",
		taskId: task.id,
		notes: "",
		status: "Pending",
		requestData: {},
		created_at: new Date(),
		projectId: getProjectIdFromPhaseId(task.phaseId),
		id: crypto.randomUUID(),
		phaseId: task.phaseId,
		materialId: null,
		requestedBy: profile.id,
		requestedTo: task.assigneeId || "unassigned",
		approvedBy: null,
		approvedAt: null,
	});
};
