import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/base/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/base/ui/table";
import { RupeeIcon } from "@/lib/functions/utils";
import { IProject } from "@/lib/types";
import { useRouter } from "next/navigation";

type Props = {
	filteredProjects: IProject[];
	admin: boolean;
};

const ProjectTable = ({ filteredProjects, admin }: Props) => {
	const router = useRouter();

	const handleClick = (project: IProject) => {
		const projectName = project.id;

		router.push(`/projects/${projectName}`);
	};

	return (
		<Card className="shadow-sm">
			<CardHeader>
				<CardTitle>All Projects</CardTitle>
				<CardDescription>
					{/* Comprehensive list of all construction projects */}
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow className="divide-x divide-gray-200 border-b-2 border-gray-200 hover:bg-card border-l border-r border-t">
							<TableHead className="min-w-[200px] text-center">
								Project
							</TableHead>
							<TableHead className="min-w-[120px] text-center">
								Status
							</TableHead>
							{admin && (
								<TableHead className="min-w-[100px] text-center">
									Progress
								</TableHead>
							)}
							{admin && (
								<TableHead className="min-w-[100px] text-center">
									Budget
								</TableHead>
							)}
							{admin && (
								<TableHead className="min-w-[100px] text-center">
									Tasks
								</TableHead>
							)}
							{!admin && (
								<TableHead className="min-w-[100px] text-center">
									Location
								</TableHead>
							)}
							{/* <TableHead className="w-[80px] text-center">
								Actions
							</TableHead> */}
						</TableRow>
					</TableHeader>
					<TableBody>
						{filteredProjects.length > 0 ? (
							filteredProjects.map((project) => (
								<TableRow
									key={project.id}
									className=" hover:bg-secondary/30 cursor-pointer bg-white/50"
									onClick={() => {
										if (admin) {
											handleClick(project);
										}
									}}
								>
									<TableCell className="text-center">
										<div className="space-y-1">
											<p className="font-medium">
												{project.name}
											</p>
											{/* <p className="text-xs text-blue-900">
												{project.location}
											</p> */}
										</div>
									</TableCell>

									<TableCell className="items-center justify-center">
										<p className="w-full justify-center text-center ">
											{project.status}
										</p>
									</TableCell>

									{admin && (
										<TableCell className="text-center">
											<div className="space-y-2 flex flex-col items-center">
												<span className="text-sm">
													{project.progress
														? project.progress
														: "0"}
													%
												</span>
												{/* <Progress
												value={project.progress}
												className="h-2 w-20"
											/> */}
											</div>
										</TableCell>
									)}

									{admin && (
										<TableCell className="text-center">
											<div className="space-y-1">
												<p className="font-medium">
													{project.budget?.toLocaleString(
														"en-IN"
													)}
													<RupeeIcon />
												</p>
												<p className="text-sm text-slate-600">
													Spent:
													{project.spent?.toLocaleString(
														"en-IN"
													)}
													<RupeeIcon /> (
													{Math.round(
														((project.spent ?? 0) /
															(project.budget ??
																1)) *
															100
													)}
													%)
												</p>
											</div>
										</TableCell>
									)}

									{admin && (
										<TableCell className="text-center">
											<div className="space-y-1">
												<p className="text-sm font-medium">
													{project.totalTasks}
												</p>
											</div>
										</TableCell>
									)}

									{!admin && (
										<TableCell className="text-center">
											<div className="space-y-1">
												<p className="text-sm">
													{project.location}
												</p>
											</div>
										</TableCell>
									)}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={5}
									className="h-[100px] text-center"
								>
									No projects found
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
};

export default ProjectTable;
