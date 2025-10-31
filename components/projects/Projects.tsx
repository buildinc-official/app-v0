"use client";

import { Button } from "@/components/base/ui/button";
import { Input } from "@/components/base/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/base/ui/select";
import { IProject, IRequest } from "@/lib/types";
import { Filter, Plus, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ProjectMemberRequests from "./ProjectMemberRequests";
import ProjectStatistics from "./ProjectStatistics";
import ProjectTable from "./ProjectTable";

type statusFilter =
	| "All"
	| "Inactive"
	| "Pending"
	| "Active"
	| "Reviewing"
	| "Completed";

export default function Projects({
	projects,
	admin,
	requests,
}: {
	projects: IProject[];
	admin: boolean;
	requests: IRequest[];
}) {
	const [searchTerm, setSearchTerm] = useState("");
	const [statusFilter, setStatusFilter] = useState<statusFilter>("All");

	const totalProjects = projects.length;
	const activeProjects = projects.filter((p) => p.status === "Active").length;
	const totalBudget = projects.reduce((sum, p) => sum + (p.budget ?? 0), 0);

	return (
		<div className="flex flex-1 flex-col pb-20">
			<div className="flex-1 space-y-6 p-2">
				{admin && (
					<ProjectStatistics
						totalProjects={totalProjects}
						activeProjects={activeProjects}
						totalBudget={totalBudget}
					/>
				)}

				{/* Search and Filter */}
				<SearchFilter
					searchTerm={searchTerm}
					setSearchTerm={setSearchTerm}
					statusFilter={statusFilter}
					setStatusFilter={setStatusFilter}
					admin={admin}
				/>

				<ProjectTable
					filteredProjects={projects}
					admin={admin}
				/>

				{!admin && <ProjectMemberRequests requests={requests} />}
			</div>
		</div>
	);
}

const SearchFilter = ({
	searchTerm,
	setSearchTerm,
	statusFilter,
	setStatusFilter,
	admin,
}: {
	searchTerm: string;
	setSearchTerm: (value: string) => void;
	statusFilter: statusFilter;
	setStatusFilter: (value: statusFilter) => void;
	admin: boolean;
}) => {
	const router = useRouter();

	return (
		<div className="flex items-center space-x-2 min-w-full flex-col md:flex-row">
			<div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
				{/* Search Bar */}
				<div className="relative flex-1">
					<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
					<Input
						placeholder="Search projects..."
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className="pl-10 w-full"
					/>
				</div>
				{/* Filter and Create Button */}
				<div className="flex flex-row gap-2 w-full sm:w-auto sm:flex-row mt-0 justify-between sm:justify-start">
					<Select
						value={statusFilter}
						onValueChange={setStatusFilter}
					>
						<SelectTrigger className="w-40">
							<Filter className="mr-2 h-4 w-4" />
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="All">All Status</SelectItem>
							<SelectItem value="Active">Active</SelectItem>
							<SelectItem value="Inactive">Inactive</SelectItem>
							<SelectItem value="Pending">Pending</SelectItem>
							<SelectItem value="Reviewing">Reviewing</SelectItem>
							<SelectItem value="Completed">Completed</SelectItem>
						</SelectContent>
					</Select>
					{admin && (
						<Button
							variant={"secondary"}
							onClick={() => {
								router.push("/projects/create-project");
							}}
							className="flex items-center gap-2 "
						>
							<Plus className="h-4 w-4 mb-0.5" />
							Create Project
						</Button>
					)}
				</div>
			</div>
		</div>
	);
};
