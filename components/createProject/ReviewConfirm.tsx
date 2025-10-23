import { Badge } from "@/components/base/ui/badge";
import { Button } from "@/components/base/ui/button";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "@/components/base/ui/card";
import { Checkbox } from "@/components/base/ui/checkbox";
import { Input } from "@/components/base/ui/input";
import { Label } from "@/components/base/ui/label";
import { Textarea } from "@/components/base/ui/textarea";
import {
	IOrganisation,
	IProjectCreationData,
	IProjectMemberDB,
	IProjectProfile,
} from "@/lib/types";
import { getEstimatedDuration, RupeeIcon } from "@/lib/functions/utils";
import { Eye, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { saveProjectToDB } from "@/lib/functions/projectCreation";

const ReviewConfirm = ({
	projectData,
	organisation,
	setProjectData,
	selectedOrganisation,
}: {
	projectData: IProjectCreationData;
	organisation: IOrganisation | undefined;
	setProjectData: React.Dispatch<React.SetStateAction<IProjectCreationData>>;
	selectedOrganisation: IOrganisation | undefined;
}) => {
	const router = useRouter();
	// // console.log("projectData in ReviewConfirm:", projectData);

	const saveProject = () => {
		try {
			saveProjectToDB(projectData, organisation as IOrganisation);
			setProjectData((prev) => ({
				...prev,
				// Reset to initial state after saving
				name: "",
				description: "",
				budget: 0,
				location: "",
				startDate: null,
				endDate: null,
				supervisor: "",
				supervisorName: "",
				phases: [],
				saveAsTemplate: false,
				templateName: "",
				templateDescription: "",
			}));
		} catch (error) {
			console.error("Error saving project:", error);
		} finally {
			router.push("/projects");
		}
	};

	// Calculate estimated cost from all phases
	const estimatedCost = projectData.phases.reduce(
		(sum, phase) => sum + (phase.budget || 0),
		0
	);

	const duration = getEstimatedDuration(
		projectData.startDate,
		projectData.endDate
	);

	return (
		<div className="space-y-6">
			<Card className="shadow-sm">
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<Eye className="h-5 w-5 text-blue-600" />
						Project Overview
					</CardTitle>
					<CardDescription>
						Review your project details before creating
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-6">
					{/* Row 1: Project + Organisation */}
					<div className="grid md:grid-cols-2 gap-6">
						<div>
							<Label className="text-sm font-bold text-muted-foreground">
								Project Name
							</Label>
							<p className="text-lg ">{projectData.name}</p>
						</div>
						<div>
							<Label className="text-sm font-bold text-muted-foreground">
								Organization
							</Label>
							<p className="text-lg ">
								{selectedOrganisation?.name}
							</p>
						</div>
					</div>

					{/* Row 2: Budget + Estimated Cost */}
					<div className="grid md:grid-cols-2 gap-6">
						<div>
							<Label className="text-sm font-bold text-muted-foreground">
								Budget
							</Label>
							<p className="text-lg  ">
								{projectData.budget.toLocaleString("en-IN")}{" "}
								<RupeeIcon />
							</p>
						</div>
						<div>
							<Label className="text-sm font-bold text-muted-foreground">
								Estimated Cost
							</Label>
							<p className="text-lg  ">
								{estimatedCost.toLocaleString("en-IN")}
								<RupeeIcon />
							</p>
						</div>
					</div>

					{/* Row 3: Supervisor + Duration */}
					<div className="grid md:grid-cols-2 gap-6">
						<div>
							<Label className="text-sm font-bold text-muted-foreground">
								Project Supervisor
							</Label>
							<p>
								{projectData.supervisorName || "Not assigned"}
							</p>
						</div>
						<div>
							<Label className="text-sm font-bold text-muted-foreground">
								Duration
							</Label>
							<p>
								{duration === 0
									? "Not specified"
									: duration === 1
									? "1 day"
									: duration + " Days"}
							</p>
						</div>
					</div>

					{/* Description */}
					<div>
						<Label className="text-sm font-bold text-muted-foreground">
							Description
						</Label>
						<p className="text-sm text-slate-700">
							{projectData.description ||
								"No description provided"}
						</p>
					</div>

					{/* Location */}
					{projectData.location && (
						<div>
							<Label className="text-sm font-bold text-muted-foreground">
								Location
							</Label>
							<p>{projectData.location}</p>
						</div>
					)}

					{/* Phases Summary (names only) */}
					<div>
						<Label className="text-sm font-bold text-muted-foreground mb-3 block">
							Project Phases ({projectData.phases.length})
						</Label>
						<div className="space-y-3">
							{projectData.phases.map((phase, index) => (
								<div
									key={phase.id}
									className="flex items-center justify-between p-3 border rounded-lg bg-white/50"
								>
									<div className="flex items-center gap-3">
										<Badge variant="outline">
											Phase {index + 1}
										</Badge>
										<p className="font-medium">
											{phase.name}
										</p>
									</div>
									<p className="tbold mt-1">
										{phase.budget?.toLocaleString()}{" "}
										<RupeeIcon />
									</p>
								</div>
							))}
						</div>
					</div>

					{/* Save as Template Option */}
					<div className="p-4 border rounded-lg bg-white/50">
						<div className="flex items-start space-x-3">
							<Checkbox
								id="save-template"
								className="mt-1"
								checked={projectData.saveAsTemplate}
								onCheckedChange={(checked) =>
									setProjectData((prev) => ({
										...prev,
										saveAsTemplate: !!checked,
									}))
								}
							/>
							<div className="flex-1">
								<Label
									htmlFor="save-template"
									className="font-medium t"
								>
									Save this project structure as a template
									for future projects?
								</Label>

								{projectData.saveAsTemplate && (
									<div className="mt-3 space-y-3">
										<div>
											<Label className="text-sm">
												Template Name
											</Label>
											<Input
												placeholder="Enter template name"
												className="bg-white"
												value={projectData.templateName}
												onChange={(e) =>
													setProjectData((prev) => ({
														...prev,
														templateName:
															e.target.value,
													}))
												}
											/>
										</div>
										<div>
											<Label className="text-sm">
												Template Description
											</Label>
											<Textarea
												className="bg-white"
												placeholder="Describe this template..."
												rows={2}
												value={
													projectData.templateDescription
												}
												onChange={(e) =>
													setProjectData((prev) => ({
														...prev,
														templateDescription:
															e.target.value,
													}))
												}
											/>
										</div>
									</div>
								)}
							</div>
						</div>
					</div>
					<Button
						onClick={saveProject}
						variant={"secondary"}
						className="w-full"
					>
						<Save className="mr-2 h-4 w-4" />
						Create Project
					</Button>
				</CardContent>
			</Card>
		</div>
	);
};

export default ReviewConfirm;
