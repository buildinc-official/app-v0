// lib/supabase/realtimeClient.ts
import { createClient } from "./client";
import { RealtimeChannel } from "@supabase/supabase-js";

// ✅ Import your stores here
import { useTaskStore } from "@/lib/store/taskStore";
import { useProjectStore } from "@/lib/store/projectStore";
import { usePhaseStore } from "@/lib/store/phaseStore";
import { useOrganisationStore } from "@/lib/store/organisationStore";
import { useMaterialStore } from "@/lib/store/materialStore";
import { useRequestStore } from "@/lib/store/requestStore";
import { useOrganisationMemberStore } from "@/lib/store/organisationMemberStore";
import { useProjectMemberStore } from "@/lib/store/projectMemberStore";
import { profileDB } from "@/lib/supabase/db/profileDB";
import { recomputePhaseAndProjectProgress } from "../functions/base";
import { useProjectTemplateStore } from "../store/projectTemplateStore";

// Create a single client instance for realtime
const supabase = createClient();

// Keep track of all channels so we can unsubscribe later
const activeChannels: RealtimeChannel[] = [];

// Utility to create and store channels
function createChannel(
	table: string,

	// ANY IS ALLOWED HERE FOR FLEXIBILITY; YOU CAN TYPE IT MORE STRICTLY IF NEEDED
	onInsert: (record: any) => void,
	// ANY IS ALLOWED HERE FOR FLEXIBILITY; YOU CAN TYPE IT MORE STRICTLY IF NEEDED
	onUpdate: (record: any) => void,
	// ANY IS ALLOWED HERE FOR FLEXIBILITY; YOU CAN TYPE IT MORE STRICTLY IF NEEDED
	onDelete: (record: any) => void,
	filter?: string // optional filter clause
) {
	const channel = supabase
		.channel(`public:${table}${filter ? `:${filter}` : ""}`)
		.on(
			"postgres_changes",
			{ event: "*", schema: "public", table, filter },
			(payload) => {
				switch (payload.eventType) {
					case "INSERT":
						onInsert(payload.new);
						break;
					case "UPDATE":
						onUpdate(payload.new);
						break;
					case "DELETE":
						onDelete(payload.old);
						break;
				}
			}
		)
		.subscribe();

	activeChannels.push(channel);
	return channel;
}

// 👇 Main entry point
export function initRealtimeListeners(profile: {
	id: string;
	admin?: boolean;
}) {
	// console.log("[Realtime] Initializing for user:", profile.id);

	// Organisations
	createChannel(
		"organisations",
		(org) => useOrganisationStore.getState().addOrganisation?.(org),
		(org) =>
			useOrganisationStore.getState().updateOrganisation?.(org.id, org),
		(org) => useOrganisationStore.getState().deleteOrganisation?.(org.id)
	);

	// Projects
	createChannel(
		"projects",
		(project) => useProjectStore.getState().addProject?.(project),
		(project) =>
			useProjectStore.getState().updateProject?.(project.id, project),
		(project) => useProjectStore.getState().deleteProject?.(project.id)
	);

	// Phases
	createChannel(
		"phases",
		(phase) => usePhaseStore.getState().addPhase?.(phase),
		(phase) => usePhaseStore.getState().updatePhase?.(phase.id, phase),
		(phase) => usePhaseStore.getState().deletePhase?.(phase.id)
	);

	// Tasks
	createChannel(
		"tasks",
		(task) => {
			const store = useTaskStore.getState();
			store.addTask?.(task);
			recomputePhaseAndProjectProgress();
		},
		(task) => {
			const store = useTaskStore.getState();
			store.updateTask?.(task.id, task);
			recomputePhaseAndProjectProgress();
		},
		(task) => {
			const store = useTaskStore.getState();
			store.deleteTask?.(task.id);
			recomputePhaseAndProjectProgress();
		}
	);

	// Materials
	createChannel(
		"materials",
		(material) => useMaterialStore.getState().addMaterial?.(material),
		(material) =>
			useMaterialStore.getState().updateMaterial?.(material.id, material),
		(material) => useMaterialStore.getState().deleteMaterial?.(material.id)
	);

	// 🟢 Requests (user-specific listener)
	createChannel(
		"requests",
		(request) => useRequestStore.getState().addRequest?.(request),
		(request) =>
			useRequestStore.getState().updateRequest?.(request.id, request),
		(request) => useRequestStore.getState().deleteRequest?.(request.id),
		// 🔍 Filter so only relevant requests trigger updates
		`requestedTo=eq.${profile.id}`
	);

	// Optional: If you also want realtime for requests *sent by* the user
	createChannel(
		"requests",
		(request) => useRequestStore.getState().addRequest?.(request),
		(request) =>
			useRequestStore.getState().updateRequest?.(request.id, request),
		(request) => useRequestStore.getState().deleteRequest?.(request.id),
		`requestedBy=eq.${profile.id}`
	);

	// Project Templates
	createChannel(
		"project_templates",
		(projectTemplate) =>
			useProjectTemplateStore
				.getState()
				.addProjectTemplate?.(projectTemplate),
		(projectTemplate) =>
			useProjectTemplateStore
				.getState()
				.updateProjectTemplate?.(projectTemplate.id, projectTemplate),
		(projectTemplate) =>
			useProjectTemplateStore
				.getState()
				.deleteProjectTemplate?.(projectTemplate.id)
	);

	// 🧩 Organisation Members
	createChannel(
		"organisation_members",
		async (member) => {
			try {
				const profile = await profileDB.getProfile(member.userId);
				const orgProfile = { ...profile, memberInfo: member };
				useOrganisationMemberStore
					.getState()
					.addOrganisationMember(member.orgId, orgProfile);
				// console.log("[Realtime] Org member added:", member);
			} catch (err) {
				console.error("[Realtime] Failed to add org member:", err);
			}
		},
		async (member) => {
			try {
				const profile = await profileDB.getProfile(member.userId);
				const orgProfile = { ...profile, memberInfo: member };
				useOrganisationMemberStore
					.getState()
					.addOrganisationMember(member.orgId, orgProfile);
				// console.log("[Realtime] Org member updated:", member);
			} catch (err) {
				console.error("[Realtime] Failed to update org member:", err);
			}
		},
		(member) => {
			useOrganisationMemberStore
				.getState()
				.removeOrganisationMember(member.orgId, member.id);
			// console.log("[Realtime] Org member removed:", member);
		}
	);

	// 🧩 Project Members
	createChannel(
		"project_members",
		async (member) => {
			try {
				const profile = await profileDB.getProfile(member.userId);
				const projProfile = { ...profile, memberInfo: member };
				useProjectMemberStore
					.getState()
					.addProjectMember(member.projectId, projProfile);
				// console.log("[Realtime] Project member added:", member);
			} catch (err) {
				console.error("[Realtime] Failed to add project member:", err);
			}
		},
		async (member) => {
			try {
				const profile = await profileDB.getProfile(member.userId);
				const projProfile = { ...profile, memberInfo: member };
				useProjectMemberStore
					.getState()
					.addProjectMember(member.projectId, projProfile);
				// console.log("[Realtime] Project member updated:", member);
			} catch (err) {
				console.error(
					"[Realtime] Failed to update project member:",
					err
				);
			}
		},
		(member) => {
			useProjectMemberStore
				.getState()
				.removeProjectMember(member.projectId, member.id);
			// console.log("[Realtime] Project member removed:", member);
		}
	);
}

// 👇 Call this on logout or unmount
export function cleanupRealtimeListeners() {
	// console.log("[Realtime] Cleaning up realtime listeners...");
	activeChannels.forEach((ch) => ch.unsubscribe());
	activeChannels.length = 0;
}
