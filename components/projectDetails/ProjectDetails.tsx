"use client";

import { SummaryCard } from "@/components/base/general/SummaryCard";
import { TabsTriggerList } from "@/components/base/general/TabsTriggerList";
import LoadingSpinner from "@/components/base/layout/LoadingSpinner";
import { Badge } from "@/components/base/ui/badge";
import { Button } from "@/components/base/ui/button";
import { Tabs } from "@/components/base/ui/tabs";
import { RupeeIcon } from "@/lib/functions/utils";
import { getOrganisationMembersFromStore } from "@/lib/middleware/organisationMembers";
import { getProjectMembersByProjectIdFromStore } from "@/lib/middleware/projectMembers";
import { useOrganisationStore } from "@/lib/store/organisationStore";
import { useProfileStore } from "@/lib/store/profileStore";
import { useprojectDetailStore } from "@/lib/store/projectDetailStore";
import {
	IOrganisation,
	IProject,
	IProjectProfile,
	ITask,
	status,
} from "@/lib/types";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Members } from "./Members";
import AssignTaskModal from "./Modals/AssignTaskModal";
import ChangeRoleModal from "./Modals/ChangeUserModal";
import TaskDetailModal from "./Modals/TaskDetailModal";
import { Overview } from "./Overview";
import { PhaseBoard } from "./PhaseBoard";

export default function ProjectDetails() {
	if (
		typeof window !== "undefined" &&
		!sessionStorage.getItem("projectDetailsRefreshed")
	) {
		sessionStorage.setItem("projectDetailsRefreshed", "1");
		window.location.reload();
	}
	const [changeRoleModal, setChangeRoleModal] = useState(false);
	const [changeRoleUser, setChangeRoleUser] = useState<string>("");
	const [changeRole, setChangeRole] = useState<string>("");
	const [changeRoleId, setChangeRoleId] = useState<string>("");

	const { updateprojectDetails } = useprojectDetailStore();
	const projectData = useprojectDetailStore((state) => state.project);
	const organisations = useOrganisationStore((state) => state.organisations);
	const organisation = Object.values(organisations).find(
		(org) => org.id === projectData?.orgId
	);

	const teamMembers = getProjectMembersByProjectIdFromStore(
		projectData?.id || ""
	);

	const organisationMembers = getOrganisationMembersFromStore(
		organisation?.id || ""
	);

	const currentUserId = useProfileStore((state) => state.profile?.id);
	const [isTaskDetailOpen, setIsTaskDetailOpen] = useState(false);
	const [isAssignTaskOpen, setIsAssignTaskOpen] = useState(false);
	const [selectedTask, setSelectedTask] = useState<ITask | null>(null);

	if (!projectData) {
		return <LoadingSpinner />;
	}

	return (
		<div className="flex flex-1 flex-col pb-20">
			<div className="flex-1 space-y-6 p-2">
				<Header
					projectData={projectData}
					organisation={organisation!}
				/>

				<Summary
					projectData={projectData}
					teamMembers={teamMembers}
				/>

				<Tabs
					defaultValue="kanban"
					className="rounded-xl "
				>
					<TabsTriggerList
						triggers={[
							{
								value: "kanban",
								label: "Task Board",
							},
							{
								value: "overview",
								label: "Overview",
							},
							{
								value: "team",
								label: "Members",
							},
							{
								value: "settings",
								label: "Settings",
							},
						]}
					/>
					<PhaseBoard
						projectId={projectData.id}
						isTaskDetailOpen={isTaskDetailOpen}
						setIsTaskDetailOpen={setIsTaskDetailOpen}
						setSelectedTask={setSelectedTask}
					/>

					<Overview projectData={projectData} />
					<Members
						members={teamMembers ?? []}
						organisationMembers={organisationMembers}
						teamMembers={teamMembers}
						projectId={projectData.id}
						projectName={projectData.name}
						setChangeRole={setChangeRole}
						setChangeRoleModal={setChangeRoleModal}
						setChangeRoleUser={setChangeRoleUser}
						setChangeRoleId={setChangeRoleId}
					/>
					{/* <Materials tasks={tasks} /> */}
				</Tabs>
			</div>
			<TaskDetailModal
				isTaskDetailOpen={isTaskDetailOpen}
				setIsTaskDetailOpen={setIsTaskDetailOpen}
				selectedTask={selectedTask}
				setIsAssignTaskOpen={setIsAssignTaskOpen}
			/>
			<AssignTaskModal
				isAssignTaskOpen={isAssignTaskOpen}
				setIsAssignTaskOpen={setIsAssignTaskOpen}
				selectedTask={selectedTask}
				setSelectedTask={setSelectedTask}
				teamMembers={teamMembers || []}
				projectData={projectData}
				updateprojectDetails={updateprojectDetails}
				currentUserId={currentUserId || ""}
			/>
			<ChangeRoleModal
				isOpen={changeRoleModal}
				onOpenChange={setChangeRoleModal}
				user={changeRoleUser}
				originalRole={changeRole}
				projectId={projectData.id}
				id={changeRoleId}
			/>
		</div>
	);
}

const Header = ({
	projectData,
	organisation,
}: {
	projectData: IProject;
	organisation: IOrganisation;
}) => {
	return (
		<div className="flex items-start justify-between space-y-2 flex-col">
			<div className="flex items-center gap-2 mb-5">
				<Link href="/projects">
					<Button
						variant="outline"
						size="sm"
					>
						<ArrowLeft className="mr-2 h-4 w-4" />
						Back to Projects
					</Button>
				</Link>
			</div>
			<div className="flex items-start gap-2 w-full justify-between flex-col">
				<h1 className="text-3xl font-bold">{projectData.name}</h1>
				<Badge
					variant={
						projectData.status
							? (projectData.status.toLowerCase() as
									| "active"
									| "reviewing"
									| "inactive"
									| "pending"
									| "completed")
							: "active"
					}
					className={` mb-2 `}
				>
					{projectData.status}
				</Badge>
			</div>
			<p className="text-slate-600">{organisation?.name}</p>
		</div>
	);
};

const Summary = ({
	projectData,
	teamMembers,
}: {
	projectData: IProject;
	teamMembers: IProjectProfile[];
}) => {
	return (
		<div className="grid gap-6 md:grid-cols-4">
			<SummaryCard
				title="Budget"
				content={
					<p className="text-xl font-bold">
						{(projectData.budget ?? 1 / 1000000).toLocaleString(
							"en-IN"
						)}
						<RupeeIcon />
					</p>
				}
			/>
			<SummaryCard
				title="Budget Spent"
				content={
					<p className="text-xl font-bold">
						{(projectData.spent ?? 1 / 1000000).toLocaleString(
							"en-IN"
						)}
						<RupeeIcon />
					</p>
				}
			/>
			<SummaryCard
				title="Team Members"
				content={
					<p className="text-2xl font-bold">
						{teamMembers.length ?? 0}
					</p>
				}
			/>
			<SummaryCard
				title="Progress"
				content={
					<p className="text-2xl font-bold">
						{projectData.progress ?? 0}%
					</p>
				}
			/>
		</div>
	);
};
