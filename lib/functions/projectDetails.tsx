import { Dispatch, SetStateAction } from "react";
import { availableMaterials } from "../constants/materials";
import {
	IMaterial,
	IPhase,
	IProfile,
	IProject,
	IRequest,
	ITask,
	status,
} from "../types";
import {
	getPhaseTasksFromStore,
	getTask,
	getTaskFromStore,
	updateTask,
} from "../middleware/tasks";
import { getPhase, getPhaseFromStore, updatePhase } from "../middleware/phases";
import { updateProject } from "../middleware/projects";
import { addRequest, updateRequest } from "../middleware/requests";
import { useProfileStore } from "../store/profileStore";
import { addProjectMember_DBONLY } from "../middleware/projectMembers";

export const projectDetails = () => {
	const getPhaseStatus = (phaseId: string): status[] => {
		const tasks = getPhaseTasksFromStore(phaseId);

		return Array.from(new Set(tasks.map((task) => task.status)));
	};

	const assignTask = async (
		taskId: string,
		phaseId: string,
		assignedToId: string,
		assigneeId: string,
		projectData: IProject
	) => {
		const now = new Date();
		// console.log("projectData", projectData);

		// Find the phase and task
		const phase = getPhaseFromStore(phaseId);
		const task = getTaskFromStore(taskId);
		if (!phase || !task) return;

		// Prepare updated task
		const updatedTask: Partial<ITask> = {
			assignedTo: assignedToId,
			status: "Pending",
		};

		// Prepare updated project
		const updatedProject: Partial<IProject> = {
			status:
				projectData.status === "Inactive"
					? "Active"
					: projectData.status,
		};

		// Update in DB
		updateTask(taskId, updatedTask).catch((err) => {
			console.error("Failed to update task:", err);
		});

		updateProject(projectData.id, updatedProject).catch((err) => {
			console.error("Failed to update project:", err);
		});

		// add request for task assignment
		addRequest({
			id: crypto.randomUUID(),
			type: "TaskAssignment",
			requestedBy: assigneeId,
			requestData: {
				description: `Task "${task.name}" assigned to you in project "${projectData.name}".`,
			},
			status: "Pending",
			created_at: new Date(),
			projectId: projectData.id,
			phaseId: phaseId,
			taskId: taskId,
			materialId: null,
			requestedTo: assignedToId,
			approvedBy: null,
			approvedAt: null,
			notes: null,
		}).catch((err) => {
			console.error("Failed to create request:", err);
		});
	};

	return {
		assignTask,
		getPhaseStatus,
		// approveTask,
		// rejectTask,
		// addMaterial,
		// removeMaterial,
		// updateMaterial,
	};
};

export function addProjectMember(
	projectId: string,
	projectName: string,
	member: IProfile,
	ownerId: string
) {
	addRequest({
		id: crypto.randomUUID(),
		type: "JoinProject",
		requestedBy: ownerId,
		requestData: { projectId, projectName },
		status: "Pending",
		created_at: new Date(),
		projectId: null,
		phaseId: null,
		taskId: null,
		materialId: null,
		requestedTo: member.id,
		approvedBy: null,
		approvedAt: null,
		notes: null,
	});
}

export function refuseInvitation(request: IRequest) {
	updateRequest(request.id, {
		status: "Rejected",
	});
}

export function acceptProjectInvitation(request: IRequest) {
	const { profile } = useProfileStore.getState();
	if (!profile) return;

	// Add organisation to user's profile
	const projectId = request.requestData.projectId;
	const projectName = request.requestData.projectName;
	if (projectId && projectName) {
		addProjectMember_DBONLY({
			id: crypto.randomUUID(),
			joinedAt: new Date(),
			projectId: projectId,
			userId: profile.id,
			role: "Employee",
		}).catch((err) => {
			console.error("Failed to add project member:", err);
		});
	}

	// Update request status to Approved
	updateRequest(request.id, {
		status: "Approved",
		approvedBy: profile.id,
		approvedAt: new Date(),
	});
}

const approveTask = (
	taskId: string,
	setTasks: Dispatch<SetStateAction<ITask[]>>,
	setIsTaskDetailOpen: Dispatch<SetStateAction<boolean>>
) => {
	setTasks((prev) =>
		prev.map((task) =>
			task.id === taskId
				? {
						...task,
						status: "Completed",
						approvedDate: new Date(),
						approvedBy: "John Doe",
				  }
				: task
		)
	);
	setIsTaskDetailOpen(false);
};

const rejectTask = (
	taskId: string,
	setTasks: Dispatch<SetStateAction<ITask[]>>,
	setIsTaskDetailOpen: Dispatch<SetStateAction<boolean>>
) => {
	setTasks((prev) =>
		prev.map((task) =>
			task.id === taskId ? { ...task, status: "Active" } : task
		)
	);
	setIsTaskDetailOpen(false);
};

const addMaterial = (
	material: IMaterial,
	taskMaterials: IMaterial[],
	setTaskMaterials: Dispatch<SetStateAction<IMaterial[]>>
) => {
	if (!material.id || !material.defaultUnit) return;
	setTaskMaterials([
		...taskMaterials,
		{
			taskId: "",
			id: crypto.randomUUID(),
			materialId: material.materialId,
			defaultUnit: material.defaultUnit,
			name: material.name ?? "",
			plannedQuantity: 0,
			unit: "",
			unitCost: 0,
			usedQuantity: 0,
			requested: false,
			approved: false,
			deliveredQuantity: 0,
			wasteQuantity: 0,
		},
	]);
};

const removeMaterial = (
	index: number,
	taskMaterials: IMaterial[],
	setTaskMaterials: Dispatch<SetStateAction<IMaterial[]>>
) => {
	setTaskMaterials(taskMaterials.filter((_, i) => i !== index));
};

const updateMaterial = (
	index: number,
	field: string,
	value: string,
	taskMaterials: IMaterial[],
	setTaskMaterials: Dispatch<SetStateAction<IMaterial[]>>
) => {
	const updated = [...taskMaterials];
	if (field === "materialId") {
		const material = availableMaterials.find((m) => m.id === value);
		if (material) {
			updated[index] = {
				...updated[index],
				materialId: value,
				unit: material.unit ?? "",
				unitCost: material.unitCost ?? 1,
			};
		}
	} else {
		updated[index] = { ...updated[index], [field]: value };
	}
	setTaskMaterials(updated);
};
