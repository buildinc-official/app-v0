"use client";
import { Shield, Crown, ArrowLeft } from "lucide-react";
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@/components/base/ui/tabs";
import { useOrganisationDetailStore } from "@/lib/store/organisationDetailStore";
import { Button } from "@/components/base/ui/button";
import { IOrganisation } from "@/lib/types";
import { useRouter } from "next/navigation";
import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
} from "@/components/base/ui/card";
import { MembersIcon, ProjectIcon } from "@/lib/functions/utils";
import { organisationDetails } from "@/lib/functions/organisationDetails";
import OrgOverview from "./OrgOverview";
import OrgMembers from "./OrgMembers";
import OrgSettings from "./OrgSettings";
import ProjectTable from "../projects/ProjectTable";
import { TabsTriggerList } from "@/components/base/general/TabsTriggerList";
import {
	getOrganisationMembers,
	getOrganisationMembersFromStore,
} from "@/lib/middleware/organisationMembers";
import {
	getOrganisationProjects,
	getOrganisationProjectsFromStore,
} from "@/lib/middleware/projects";

const getRoleIcon = (role: string) => {
	switch (role) {
		case "admin":
			return <Crown className="h-4 w-4" />;
		case "project-manager":
			return <Shield className="h-4 w-4" />;
		default:
			return null;
	}
};

const getStatusIndicator = (status: string) => {
	switch (status) {
		case "online":
			return <div className="w-2 h-2 bg-green-500 rounded-full" />;
		case "away":
			return <div className="w-2 h-2 bg-yellow-500 rounded-full" />;
		default:
			return <div className="w-2 h-2 bg-gray-400 rounded-full" />;
	}
};

export default function OrganisationDetails() {
	const organisation = useOrganisationDetailStore(
		(state) => state.organisation
	);
	const projects = getOrganisationProjectsFromStore(organisation?.id || "");

	const { totalBudget, totalSpent, budgetUtilization } =
		organisationDetails(projects);

	if (!organisation) {
		return <div className="p-4">No organisation selected.</div>;
	}
	return (
		<div className="p-2">
			<Header organisation={organisation!} />
			<Summary organisation={organisation!} />

			<Tabs
				defaultValue="overview"
				className="rounded-xl"
			>
				<TabsTriggerList
					triggers={[
						{
							value: "overview",
							label: "Overview",
						},
						{
							value: "projects",
							label: "Projects",
						},
						{
							value: "members",
							label: "Members",
						},
						{
							value: "settings",
							label: "Settings",
						},
					]}
				/>

				<OrgOverview
					organisation={organisation}
					totalBudget={totalBudget}
					totalSpent={totalSpent}
					budgetUtilization={budgetUtilization}
				/>

				<TabsContent
					value="projects"
					className="space-y-4 mx-1"
				>
					<div>
						<div className="flex md:justify-between md:items-center mb-5 md:flex-row md:space-y-0 flex-col justify-start items-start space-y-3 ">
							<h3 className="text-lg font-bold">
								Organization Projects
							</h3>
						</div>
						<ProjectTable filteredProjects={projects} />
					</div>
				</TabsContent>

				<TabsContent
					value="members"
					className="space-y-4 mx-1"
				>
					<OrgMembers organisation={organisation} />
				</TabsContent>

				<TabsContent
					value="settings"
					className="space-y-4 mx-1"
				>
					<OrgSettings organisation={organisation} />
				</TabsContent>
			</Tabs>
		</div>
	);
}

const Header = ({ organisation }: { organisation: IOrganisation }) => {
	const router = useRouter();
	return (
		<div className="mb-5">
			<Button
				variant="ghost"
				size="sm"
				onClick={() => router.back()}
				className="flex items-center mb-4 -ml-4"
			>
				<ArrowLeft className="h-4 w-4 mb-0.5" />
				<span>Back to Organisations</span>
			</Button>
			<div className="flex justify-between flex-col space-y-4">
				<h2 className="text-3xl font-bold tracking-tight">
					{organisation?.name}
				</h2>
				{/* <p className="text-muted-foreground">{organisation?.desc}</p> */}
			</div>
		</div>
	);
};

const Summary = ({ organisation }: { organisation: IOrganisation }) => {
	return (
		<div className="grid gap-4 md:grid-cols-2 mb-6">
			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium">
						Total Members
					</CardTitle>
					<MembersIcon className="h-4 w-4 text-muted-foreground" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold">
						{getOrganisationMembersFromStore(organisation.id)
							.length ?? 0}
					</div>
				</CardContent>
			</Card>
			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium">
						Active Projects
					</CardTitle>
					<ProjectIcon className="h-4 w-4 text-muted-foreground" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold">
						{getOrganisationProjectsFromStore(organisation.id)
							.length ?? 0}
					</div>
				</CardContent>
			</Card>
		</div>
	);
};
