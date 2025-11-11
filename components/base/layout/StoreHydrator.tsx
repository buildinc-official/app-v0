"use client";

import { useEffect } from "react";
import {
	initRealtimeListeners,
	cleanupRealtimeListeners,
} from "@/lib/supabase/realtimeClient";
import { useProfileStore } from "@/lib/store/profileStore";
import { useProjectStore } from "@/lib/store/projectStore";
import { useOrganisationStore } from "@/lib/store/organisationStore";
import { usePhaseStore } from "@/lib/store/phaseStore";
import { IProfile } from "@/lib/types";
import {
	getMemberOrganisations,
	getUserOrganisations,
} from "@/lib/middleware/organisations";
import { getOrganisationMembers } from "@/lib/middleware/organisationMembers";
import { getMemberProjects, getUserProjects } from "@/lib/middleware/projects";
import { getProjectPhases } from "@/lib/middleware/phases";
import { getPhaseTasks } from "@/lib/middleware/tasks";
import { getTaskMaterials } from "@/lib/middleware/materials";
import { getProjectMembersByProjectId } from "@/lib/middleware/projectMembers";
import { getRequestsByUserId } from "@/lib/middleware/requests";
import { projectDetails } from "@/lib/functions/projectDetails";
import { getAllProfiles } from "@/lib/middleware/profiles";
import {
	getProjectProgress,
	recomputePhaseAndProjectProgress,
} from "@/lib/functions/base";
import { useTaskStore } from "@/lib/store/taskStore";
import { useMaterialStore } from "@/lib/store/materialStore";
import { useOrganisationDetailStore } from "@/lib/store/organisationDetailStore";
import { useOrganisationMemberStore } from "@/lib/store/organisationMemberStore";
import { useprojectDetailStore } from "@/lib/store/projectDetailStore";
import { useProjectMemberStore } from "@/lib/store/projectMemberStore";
import { useProjectTemplateStore } from "@/lib/store/projectTemplateStore";
import { useRequestStore } from "@/lib/store/requestStore";

const EXPIRY_MS = 24 * 60 * 60 * 1000; // 24 hours

export const StoreHydrator = ({ profile }: { profile: IProfile | null }) => {
	const { setProfile } = useProfileStore();
	const { updatePhase } = usePhaseStore();
	const { getPhaseStatus } = projectDetails();

	useEffect(() => {
		// 🕒 1. Handle 24-hour inactivity expiry check
		const lastActiveAt = parseInt(
			localStorage.getItem("lastActiveAt") || "0",
			10
		);
		const now = Date.now();

		if (now - lastActiveAt > EXPIRY_MS) {
			console.warn(
				"[Hydrator] Local data expired — clearing persisted stores."
			);
			// ⚠️ Clear only persisted stores (not sessionStorage)
			Object.keys(localStorage).forEach((key) => {
				if (key.endsWith("-storage")) {
					localStorage.removeItem(key);
				}
			});
			localStorage.removeItem("lastActiveAt");
			try {
				useProfileStore.getState().clearProfile?.();
				useOrganisationStore.getState().clearOrganisations?.();
				useProjectStore.getState().clearProjects?.();
				usePhaseStore.getState().clearPhases?.();
				useTaskStore.getState().clearTasks?.();
				useMaterialStore.getState().clearMaterials?.();
				useOrganisationDetailStore.getState().clearData?.();
				useOrganisationMemberStore.getState().clearData?.();
				useprojectDetailStore.getState().clearData?.();
				useProjectMemberStore.getState().clearData?.();
				useProjectTemplateStore.getState().clearProjectTemplates?.();
				useRequestStore.getState().clearRequests?.();
			} catch (err) {
				console.error("Error clearing Zustand stores:", err);
			}
		}

		// 🪄 2. Track user activity to refresh timestamp
		const handleActivity = () => {
			localStorage.setItem("lastActiveAt", Date.now().toString());
		};

		window.addEventListener("click", handleActivity);
		window.addEventListener("mousemove", handleActivity);
		window.addEventListener("keydown", handleActivity);

		return () => {
			window.removeEventListener("click", handleActivity);
			window.removeEventListener("mousemove", handleActivity);
			window.removeEventListener("keydown", handleActivity);
		};
	}, []);

	// 🧠 Existing logic for data + realtime
	useEffect(() => {
		if (!profile) return;

		setProfile(profile);
		loadData(profile);

		initRealtimeListeners(profile);
		return cleanupRealtimeListeners;
	}, [profile]);

	const loadData = async (userProfile: IProfile) => {
		try {
			await getRequestsByUserId(userProfile.id);
			await getAllProfiles();

			if (userProfile.admin) {
				await loadAdminData(userProfile);
			} else {
				await loadUserData(userProfile);
			}
		} catch (error) {
			console.error("Error loading user data:", error);
		}
	};

	const loadUserData = async (userProfile: IProfile) => {
		try {
			await getMemberOrganisations(userProfile.id);
			await getMemberProjects(userProfile.id);
		} catch (error) {
			console.error("Error loading user data:", error);
		}
	};

	const loadAdminData = async (userProfile: IProfile) => {
		try {
			const [organisations, projects] = await Promise.all([
				getUserOrganisations(userProfile.id),
				getUserProjects(userProfile.id),
			]);

			await Promise.all([
				...organisations.map((org) => getOrganisationMembers(org.id)),
				...projects.map((project) => loadProjectDetails(project.id)),
			]);

			linkProjectsToOrganisations();
			recomputePhaseAndProjectProgress();
		} catch (error) {
			console.error("Error loading admin data:", error);
		}
	};

	const loadProjectDetails = async (projectId: string) => {
		await Promise.all([
			getProjectMembersByProjectId(projectId),
			getProjectPhases(projectId).then((phases) =>
				Promise.all(phases.map((phase) => loadPhaseDetails(phase.id)))
			),
		]);
	};

	const loadPhaseDetails = async (phaseId: string) => {
		const tasks = await getPhaseTasks(phaseId);
		const taskIds = tasks.map((t) => t.id);

		updatePhase(phaseId, {
			taskIds,
			status: getPhaseStatus(phaseId),
		});

		await Promise.all(tasks.map((task) => getTaskMaterials(task.id)));
	};

	const linkProjectsToOrganisations = () => {
		const orgStore = useOrganisationStore.getState();
		const projectStore = useProjectStore.getState();

		const orgProjectMap: Record<string, string[]> = {};
		Object.values(projectStore.projects).forEach((project) => {
			if (project.orgId) {
				orgProjectMap[project.orgId] ??= [];
				orgProjectMap[project.orgId].push(project.id);
			}
		});

		Object.entries(orgProjectMap).forEach(([orgId, projectIds]) => {
			orgStore.updateOrganisation(orgId, { projectIds });
		});
	};

	return null;
};
