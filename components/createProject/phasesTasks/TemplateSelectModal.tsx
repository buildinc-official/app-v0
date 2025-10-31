import { Badge } from "@/components/base/ui/badge";
import { Button } from "@/components/base/ui/button";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "@/components/base/ui/card";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/base/ui/dialog";
import { defaultTemplates } from "@/lib/constants/project-templates";
import {
	IPhaseTemplate,
	IProjectCreationData,
	IProjectTemplate,
} from "@/lib/types";
import { getEstimatedDuration } from "@/lib/functions/utils";
import { randomUUID } from "crypto";
import { Layers, User, Plus } from "lucide-react";
import React, { useState } from "react";

const TemplateSelectModal = ({
	projectData,
	setProjectData,
	customTemplates,
}: {
	projectData: IProjectCreationData;
	setProjectData: React.Dispatch<React.SetStateAction<IProjectCreationData>>;
	customTemplates: IProjectTemplate[];
}) => {
	const [selectedTemplate, setSelectedTemplate] =
		useState<IProjectTemplate | null>(null);
	const [isTemplateDialogOpen, setIsTemplateDialogOpen] = useState(false);

	const applyTemplate = (template: IProjectTemplate) => {
		const phases: IPhaseTemplate[] = (template.phases ?? []).map(
			(templatePhase, index) => {
				const phaseStartDays = (template.phases ?? [])
					.slice(0, index)
					.reduce((sum, p) => sum + (p.estimatedDuration ?? 0), 0);

				const phaseStart = projectData.startDate ?? new Date();

				phaseStart.setDate(
					phaseStart.getDate() + (phaseStartDays ?? 0)
				);
				const phaseEnd = new Date(phaseStart);
				phaseEnd.setDate(
					phaseEnd.getDate() + (templatePhase.estimatedDuration ?? 0)
				);
				const estimatedDuration = getEstimatedDuration(
					phaseStart,
					phaseEnd
				);

				return {
					created_at: new Date(),
					id: templatePhase.id || randomUUID(),
					name: templatePhase.name,
					description: templatePhase.description,
					startDate: phaseStart,
					endDate: phaseEnd,
					status: ["Inactive"],
					progress: 0,
					tasks: templatePhase.tasks,
					totalTasks: templatePhase.tasks.length,
					CompletedTasks: 0,
					budget: templatePhase.budget,
					spent: 0,
					dependencies: [],
					projectId: projectData.id,
					estimatedDuration: estimatedDuration,
				};
			}
		);

		setProjectData((prev) => ({
			...prev,
			selectedTemplate: template,
			phases,
		}));
		setSelectedTemplate(template);
		setIsTemplateDialogOpen(false);
	};

	return (
		<div>
			<Card className="shadow-sm">
				<CardHeader>
					<div className="flex items-center justify-between sm:flex-row flex-col">
						<div>
							<CardTitle className="flex items-center gap-2 justify-center sm:justify-start">
								{/* <Layers className="h-5 w-5 text-blue-600" /> */}
								Project Template
							</CardTitle>
							<CardDescription>
								<p className=" flex text-center mt-2 sm:text-left  text-muted-foreground">
									Choose a template to get started quickly, or
									build from scratch
								</p>
							</CardDescription>
						</div>
						<Button
							onClick={() => setIsTemplateDialogOpen(true)}
							variant={"secondary"}
							className="mt-5 sm:mt-0"
						>
							Choose Template
						</Button>
					</div>
				</CardHeader>
				{selectedTemplate && (
					<CardContent>
						<div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
							<div className="flex items-center gap-3">
								<div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
									<Layers className="h-5 w-5 text-green-600" />
								</div>
								<div>
									<h4 className="font-medium text-green-800">
										{selectedTemplate.name}
									</h4>
									<p className="text-sm text-green-600">
										{selectedTemplate.description}
									</p>
								</div>
							</div>
							<Badge className="bg-green-100 text-green-800">
								{selectedTemplate.phases?.length} phases
							</Badge>
						</div>
					</CardContent>
				)}
			</Card>
			<Dialog
				open={isTemplateDialogOpen}
				onOpenChange={setIsTemplateDialogOpen}
			>
				<DialogContent className="sm:max-w-4xl max-h-[80vh] overflow-y-auto">
					<DialogHeader>
						<DialogTitle>Choose Project Template</DialogTitle>
						<DialogDescription>
							Select a template to get started quickly with
							pre-defined phases and tasks
						</DialogDescription>
					</DialogHeader>

					<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
						{/* Default Templates */}
						{defaultTemplates.map((template) => (
							<div
								key={template.id}
								className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
								onClick={() => applyTemplate(template)}
							>
								<div className="flex items-start justify-between mb-3">
									<div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
										<Layers className="h-5 w-5 text-blue-600" />
									</div>
									<Badge variant="secondary">
										{template.category}
									</Badge>
								</div>
								<h3 className="font-semibold mb-2">
									{template.name}
								</h3>
								<p className="text-sm text-slate-600 mb-3">
									{template.description}
								</p>
								<div className="flex items-center justify-between text-sm">
									<span className="text-slate-500">
										{template.phases.length} phases
									</span>
									<span className="text-slate-500">
										{template.phases.reduce(
											(sum: number, p: IPhaseTemplate) =>
												sum + (p.tasks?.length ?? 0),
											0
										)}{" "}
										tasks
									</span>
								</div>
							</div>
						))}

						{/* Custom Templates */}
						{customTemplates.map((template) => (
							<div
								key={template.id}
								className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer border-green-200 bg-green-50"
								onClick={() => applyTemplate(template)}
							>
								<div className="flex items-start justify-between mb-3">
									<div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
										<User className="h-5 w-5 text-green-600" />
									</div>
									<Badge className="bg-green-100 text-green-800">
										Custom
									</Badge>
								</div>
								<h3 className="font-semibold mb-2">
									{template.name}
								</h3>
								<p className="text-sm text-slate-600 mb-3">
									{template.description}
								</p>
								<div className="flex items-center justify-between text-sm">
									<span className="text-slate-500">
										{template.phases?.length} phases
									</span>
									{/* <span className="text-slate-500">
										{template.created_at
											? `By ${template.created_at}`
											: "Not Found"}
									</span> */}
								</div>
							</div>
						))}

						{/* Start from Scratch */}
						<div
							className="border-2 border-dashed border-slate-300 rounded-lg p-4 hover:border-slate-400 transition-colors cursor-pointer flex flex-col items-center justify-center text-center"
							onClick={() => setIsTemplateDialogOpen(false)}
						>
							<Plus className="h-8 w-8 text-slate-400 mb-2" />
							<h3 className="font-semibold mb-1">
								Start from Scratch
							</h3>
							<p className="text-sm text-slate-600">
								Create a custom project structure
							</p>
						</div>
					</div>

					<DialogFooter>
						<Button
							variant="outline"
							onClick={() => setIsTemplateDialogOpen(false)}
						>
							Cancel
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default TemplateSelectModal;
