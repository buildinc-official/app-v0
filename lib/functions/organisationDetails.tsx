import {
	addOrganisationMember_DBONLY,
	updateOrganisationMember,
} from "../middleware/organisationMembers";
import { addRequest, updateRequest } from "../middleware/requests";
import { useProfileStore } from "../store/profileStore";
import { organisationMemberDB } from "../supabase/db/organisationMemberDB";
import { IProfile, IProject, IRequest, role } from "../types";

export function organisationDetails(projects: IProject[] | null) {
	const totalBudget: number =
		projects?.reduce((sum, project) => sum + (project.budget ?? 0), 0) ?? 0;
	const totalSpent: number =
		projects?.reduce((sum, project) => sum + (project?.spent ?? 0), 0) ?? 0;
	const budgetUtilization: number =
		(totalBudget ?? 0) > 0
			? ((totalSpent ?? 0) / (totalBudget ?? 1)) * 100
			: 100;
	return { totalBudget, totalSpent, budgetUtilization };
}

export function addMember(
	organisationId: string,
	organisationName: string,
	member: IProfile,
	ownerId: string
) {
	addRequest({
		id: crypto.randomUUID(),
		type: "JoinOrganisation",
		requestedBy: ownerId,
		requestData: { organisationId, organisationName },
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

export function acceptOrgInvitation(request: IRequest) {
	const { profile } = useProfileStore.getState();
	if (!profile) return;

	// Add organisation to user's profile
	const orgId = request.requestData.organisationId;
	const orgName = request.requestData.organisationName;
	if (orgId && orgName) {
		addOrganisationMember_DBONLY({
			id: crypto.randomUUID(),
			orgId: orgId,
			userId: profile.id,
			role: "Employee",
			joinedAt: new Date(),
		});
	}

	// Update request status to Approved
	updateRequest(request.id, {
		status: "Approved",
		approvedBy: profile.id,
		approvedAt: new Date(),
	});
}

export function changeUserRole(id: string, orgId: string, newRole: string) {
	updateOrganisationMember(id, orgId, {
		role: newRole as role,
	});
}
