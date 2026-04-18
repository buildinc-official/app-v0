"use client";

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
	IProjectTemplate,
} from "@/lib/types";
import { getEstimatedDuration, RupeeIcon } from "@/lib/functions/utils";
import { Eye, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { saveProjectToDB } from "@/lib/functions/projectCreation";
import { motion, AnimatePresence } from "framer-motion";
import LoadingSpinner from "../base/layout/LoadingSpinner";
import { addProjectTemplate } from "@/lib/middleware/projectTemplates";
import { toast } from "sonner";

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
	const [isSaving, setIsSaving] = useState(false);
	const [progress, setProgress] = useState(0);
	const [progressMessage, setProgressMessage] = useState(
		"Preparing project..."
	);

	const [newProjectTemplateName, setNewProjectTemplateName] =
		React.useState("");
	const [newProjectTemplateDescription, setNewProjectTemplateDescription] =
		React.useState("");
	// // console.log("projectData in ReviewConfirm:", projectData);
	const newProjectTemplate: IProjectTemplate = {
		id: crypto.randomUUID(),
		name: newProjectTemplateName,
		description: newProjectTemplateDescription,
		owner: projectData.owner,
		phases: projectData.phases,
		budget: projectData.budget,
		location: projectData.location,
		category: projectData.category,
	};

	const saveProject = async () => {
		setIsSaving(true);
		toast.info("Starting project creation...");
		setProgress(5);
		setProgressMessage("Starting project creation...");

		try {
			await saveProjectToDB(
				projectData,
				organisation as IOrganisation,
				(msg, pct) => {
					setProgressMessage(msg);
					setProgress(pct);
				}
			);
			if (projectData.saveAsTemplate) {
				await addProjectTemplate(newProjectTemplate);
			}

			// reset local data
			setProjectData((prev) => ({
				...prev,
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

			setProgressMessage("Redirecting...");
			setProgress(100);
			toast.success("Project created successfully!");
			setTimeout(() => router.push("/projects"), 800);
		} catch (error) {
			toast.error("Failed to create project. Please try again.");
			console.error("Error saving project:", error);
			alert("Failed to create project. Please try again.");
			setIsSaving(false);
		}
	};

	const estimatedCost = projectData.phases.reduce(
		(sum, phase) => sum + (phase.budget || 0),
		0
	);

	const duration = getEstimatedDuration(
		projectData.startDate,
		projectData.endDate
	);

	return (
		<div className="space-y-6 relative">
			{/* 🪄 Animated modal-style progress overlay */}
			<AnimatePresence>
				{isSaving && (
					<motion.div
						className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
					>
						<motion.div
							initial={{ scale: 0.9, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 0.9, opacity: 0 }}
							className="flex w-[90%] max-w-md flex-col items-center justify-center rounded-2xl border border-border/60 bg-card p-8 text-center shadow-2xl ring-1 ring-border/40"
						>
							<LoadingSpinner />
							<p className="mt-4 text-base font-medium text-foreground">
								{progressMessage}
							</p>
							<div className="mt-6 h-2 w-full overflow-hidden rounded-full bg-muted">
								<motion.div
									className="h-full rounded-full bg-primary"
									initial={{ width: "0%" }}
									animate={{ width: `${progress}%` }}
									transition={{ duration: 0.3 }}
								/>
							</div>
							<p className="mt-2 text-xs text-muted-foreground">
								{Math.floor(progress)}%
							</p>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* 🧾 Main review content */}
			<Card className="border-border/60 bg-background/80 shadow-sm ring-1 ring-border/40 backdrop-blur-sm">
				<CardHeader className="space-y-2 pb-4">
					<CardTitle className="flex items-center gap-3 text-xl">
						<span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary ring-1 ring-primary/20">
							<Eye className="h-5 w-5" aria-hidden />
						</span>
						Review & confirm
					</CardTitle>
					<CardDescription className="text-pretty">
						Check everything below, then create the project or save
						as a template.
					</CardDescription>
				</CardHeader>

				<CardContent className="space-y-8 pb-8">
					{/* Project + Organisation */}
					<div className="grid md:grid-cols-2 gap-6">
						<div>
							<Label className="text-sm font-bold text-muted-foreground">
								Project Name
							</Label>
							<p className="text-lg">{projectData.name}</p>
						</div>
						<div>
							<Label className="text-sm font-bold text-muted-foreground">
								Organization
							</Label>
							<p className="text-lg">
								{selectedOrganisation?.name}
							</p>
						</div>
					</div>

					{/* Budget + Estimated Cost */}
					<div className="grid md:grid-cols-2 gap-6">
						<div>
							<Label className="text-sm font-bold text-muted-foreground">
								Budget
							</Label>
							<p className="text-lg">
								{projectData.budget.toLocaleString("en-IN")}{" "}
								<RupeeIcon />
							</p>
						</div>
						<div>
							<Label className="text-sm font-bold text-muted-foreground">
								Estimated Cost
							</Label>
							<p className="text-lg">
								{estimatedCost.toLocaleString("en-IN")}{" "}
								<RupeeIcon />
							</p>
						</div>
					</div>

					{/* Supervisor + Duration */}
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
									: `${duration} days`}
							</p>
						</div>
					</div>

					{/* Description */}
					<div>
						<Label className="text-sm font-bold text-muted-foreground">
							Description
						</Label>
						<p className="text-sm leading-relaxed text-foreground">
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

					{/* Phases */}
					<div>
						<Label className="text-sm font-bold text-muted-foreground mb-3 block">
							Project Phases ({projectData.phases.length})
						</Label>
						<div className="space-y-3">
							{projectData.phases.map((phase, index) => (
								<div
									key={phase.id}
									className="flex items-center justify-between gap-3 rounded-lg border border-border/60 bg-muted/30 p-3 ring-1 ring-border/30"
								>
									<div className="flex items-center gap-3">
										<div className="text-sm font-bold">
											Phase {index + 1}
										</div>
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

					{/* Template Option */}
					<div className="rounded-xl border border-border/60 bg-muted/30 p-4 ring-1 ring-border/30">
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
									className="font-medium"
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
												className="h-11 border-border/60 bg-background/80"
												value={newProjectTemplateName}
												onChange={(e) =>
													setNewProjectTemplateName(
														e.target.value
													)
												}
											/>
										</div>
										<div>
											<Label className="text-sm">
												Template Description
											</Label>
											<Textarea
												className="min-h-[80px] resize-y border-border/60 bg-background/80"
												placeholder="Describe this template..."
												rows={2}
												value={
													newProjectTemplateDescription
												}
												onChange={(e) =>
													setNewProjectTemplateDescription(
														e.target.value
													)
												}
											/>
										</div>
									</div>
								)}
							</div>
						</div>
					</div>

					{/* Submit Button */}
					<Button
						type="button"
						onClick={saveProject}
						variant="default"
						className="h-11 w-full border border-blue-500/40 bg-blue-600 text-white shadow-md ring-1 ring-blue-500/25 hover:bg-blue-700 hover:text-white dark:bg-blue-600 dark:hover:bg-blue-500"
						disabled={isSaving}
					>
						{isSaving ? (
							<>
								<LoadingSpinner />
								<span className="ml-2">Saving...</span>
							</>
						) : (
							<>
								<Save className="mr-2 h-4 w-4" />
								Create Project
							</>
						)}
					</Button>
				</CardContent>
			</Card>
		</div>
	);
};

export default ReviewConfirm;
