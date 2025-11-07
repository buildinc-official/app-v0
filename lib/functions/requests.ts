"use client";
import { toast } from "sonner";
import { getMaterialFromStore, updateMaterial } from "../middleware/materials";
import { getPhaseFromStore } from "../middleware/phases";
import { getAllProfilesFromStore } from "../middleware/profiles";
import { getProjectFromStore, updateProject } from "../middleware/projects";
import { updateRequest } from "../middleware/requests";
import { getTask, getTaskFromStore, updateTask } from "../middleware/tasks";
import { IProfile, IRequest } from "../types";

export const getDetailsForRequest = (request: IRequest) => {
	const allProfiles = getAllProfilesFromStore();

	request.approvedByProfile =
		allProfiles.find((p) => p.id === request.approvedBy) || undefined;
	request.requestedByProfile =
		allProfiles.find((p) => p.id === request.requestedBy) || undefined;
	request.requestedToProfile =
		allProfiles.find((p) => p.id === String(request.requestedTo)) ||
		undefined;
	request.project = getProjectFromStore(request.projectId || "");
	request.phase = getPhaseFromStore(request.phaseId || "");
	request.task = getTaskFromStore(request.taskId || "");
	request.material = getMaterialFromStore(request.materialId || "");
	return request;
};

export const handleAssigment = async (
	request: IRequest,
	profile: IProfile | null
) => {
	if (!profile || profile.id !== request.requestedTo) return;

	const task = await getTask(request.taskId ?? "");
	if (!task) return;

	updateRequest(request.id, {
		status: "Approved",
		approvedAt: new Date(),
		approvedBy: profile.id,
	});

	updateTask(request.taskId || "", {
		assignedTo:
			typeof request.requestedTo === "object" &&
			request.requestedTo !== null
				? request.requestedTo
				: request.requestedTo,
		startDate: new Date(),
		status: "Active",
		endDate: new Date(
			Date.now() + task.estimatedDuration! * 24 * 60 * 60 * 1000
		),
	});
};

export const handleCompletion = async (
	request: IRequest,
	profile: IProfile | null
) => {
	if (!profile || profile.id !== request.requestedTo) return;

	toast.info("Completing task and updating project spend...");

	updateRequest(request.id, {
		status: "Approved",
		approvedAt: new Date(),
		approvedBy: profile.id,
	});

	updateTask(request.taskId || "", {
		status: "Completed",
		completedDate: new Date(),
	});

	updateProject(request.projectId || "", {
		spent:
			(getProjectFromStore(request.projectId || "")?.spent ?? 0) +
			(getTaskFromStore(request.taskId || "")?.spent ?? 0),
	});

	toast.success("Task completed and project spend updated.");
};

export const handlePaymentRequest = async (
	request: IRequest,
	profile: IProfile | null
) => {
	if (!profile || profile.id !== request.requestedTo) return;

	updateRequest(request.id, {
		status: "Approved",
		approvedAt: new Date(),
		approvedBy: profile.id,
	});

	updateTask(request.taskId || "", {
		spent: request.requestData.amount as number,
	});
};

export const handleMaterialRequest = async (
	request: IRequest,
	profile: IProfile | null
) => {
	if (!profile || profile.id !== request.requestedTo) return;

	updateRequest(request.id, {
		status: "Approved",
		approvedAt: new Date(),
		approvedBy: profile.id,
	});

	updateMaterial(request.requestData.materialId || "", {
		usedQuantity: request.requestData.units as number,
		unit: request.requestData.unitName as string,
		requested: true,
		approved: true,
	});

	updateTask(request.taskId || "", {
		spent:
			(request.requestData.units as number) *
			(request.requestData.unitCost as number),
	});
};

export const handleReject = async (
	request: IRequest,
	profile: IProfile | null
) => {
	if (!profile || profile.id !== String(request.requestedTo)) return;

	updateRequest(request.id, { status: "Rejected" });

	updateTask(request.taskId || "", {
		assignedTo: null,
		startDate: null,
		status: "Inactive",
		endDate: null,
	});
};
