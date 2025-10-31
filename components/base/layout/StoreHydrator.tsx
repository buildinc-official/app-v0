"use client";

import { useEffect } from "react";
import {
	initRealtimeListeners,
	cleanupRealtimeListeners,
} from "@/lib/supabase/realtimeClient";
import { useProfileStore } from "@/lib/store/profileStore";
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
import { useOrganisationStore } from "@/lib/store/organisationStore";
import { useProjectStore } from "@/lib/store/projectStore";
import { usePhaseStore } from "@/lib/store/phaseStore";
import { projectDetails } from "@/lib/functions/projectDetails";
import { getAllProfiles } from "@/lib/middleware/profiles";
import { recomputePhaseAndProjectProgress } from "@/lib/functions/base";
export const StoreHydrator = ({ profile }: { profile: IProfile | null }) => {
	const { setProfile } = useProfileStore();
	const { getPhaseStatus } = projectDetails();
	const { updatePhase } = usePhaseStore();
	const { projects } = useProjectStore();

	useEffect(() => {
		if (!profile) return;

		setProfile(profile);
		loadData(profile);

		// 🔥 Start realtime subscriptions
		initRealtimeListeners(profile);
		// console.log(
		// 	"[Realtime] Active channels:",
		// 	supabase.getChannels().map((ch) => ch.topic)
		// );

		return () => {
			// 🧹 Cleanup on logout/unmount
			cleanupRealtimeListeners();
		};
	}, [profile]);

	useEffect(() => {
		getProjectProgress();
	}, [projects]);

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
			// get organsations that user is a member of, not the owner
			await getMemberOrganisations(userProfile.id);
			// get projects the user is a part of (as a member)
			await getMemberProjects(userProfile.id);
		} catch (error) {
			console.error("Error loading user data:", error);
		}
	};

	const loadAdminData = async (userProfile: IProfile) => {
		try {
			// These middleware calls will store the data automatically
			const [organisations, projects] = await Promise.all([
				getUserOrganisations(userProfile.id),
				getUserProjects(userProfile.id),
			]);

			// Load members for all organisations (middleware stores them)
			const orgMemberPromises = organisations.map((org) =>
				getOrganisationMembers(org.id)
			);

			// Load details for all projects (middleware stores them)
			const projectDetailPromises = projects.map((project) =>
				loadProjectDetails(project.id)
			);

			await Promise.all([...orgMemberPromises, ...projectDetailPromises]);

			// ONLY handle relationships (linking IDs) since data is already stored
			linkProjectsToOrganisations();
			recomputePhaseAndProjectProgress();
		} catch (error) {
			console.error("Error loading admin data:", error);
		}
	};

	const loadProjectDetails = async (projectId: string) => {
		// Middleware calls that automatically store data
		await Promise.all([
			getProjectMembersByProjectId(projectId), // Stores project members
			getProjectPhases(projectId).then((phases) =>
				Promise.all(phases.map((phase) => loadPhaseDetails(phase.id)))
			),
		]);
	};

	const loadPhaseDetails = async (phaseId: string) => {
		// Get tasks and store them in task store
		const tasks = await getPhaseTasks(phaseId);
		const taskIds = tasks.map((task) => task.id);
		// Update the phase with the task IDs
		const updatedPhase = {
			taskIds: taskIds,
			status: getPhaseStatus(phaseId),
		};

		updatePhase(phaseId, updatedPhase);

		// Load details for each task
		await Promise.all(tasks.map((task) => loadTaskDetails(task.id)));
	};

	const loadTaskDetails = async (taskId: string) => {
		// Middleware call that automatically stores data
		await getTaskMaterials(taskId);
	};

	const linkProjectsToOrganisations = () => {
		const orgStore = useOrganisationStore.getState();
		const projectStore = useProjectStore.getState();

		// Create a map of organisation IDs to their project IDs
		const orgProjectMap: Record<string, string[]> = {};

		Object.values(projectStore.projects).forEach((project) => {
			if (project.orgId) {
				if (!orgProjectMap[project.orgId]) {
					orgProjectMap[project.orgId] = [];
				}
				orgProjectMap[project.orgId].push(project.id);
			}
		});

		// Update each organisation with its project IDs
		Object.entries(orgProjectMap).forEach(([orgId, projectIds]) => {
			orgStore.updateOrganisation(orgId, { projectIds });
		});
	};

	const getProjectProgress = () => {
		const phaseStore = usePhaseStore.getState();
		const projectStore = useProjectStore.getState();

		// Calculate project properties based on phases (using already stored data)
		Object.entries(projectStore.projects).forEach(
			([projectId, project]) => {
				const phases = project.phaseIds
					.map((phaseId) => phaseStore.phases[phaseId])
					.filter(Boolean);

				if (phases.length > 0) {
					const totalTasks = phases.reduce(
						(acc, phase) => acc + (phase.totalTasks || 0),
						0
					);
					const completedTasks = phases.reduce(
						(acc, phase) => acc + (phase.completedTasks || 0),
						0
					);
					const progress =
						totalTasks > 0
							? (completedTasks / totalTasks) * 100
							: 0;

					projectStore.updateProject(projectId, {
						totalTasks,
						completedTasks,
						progress,
					});
				}
			}
		);
	};

	return null;
};
