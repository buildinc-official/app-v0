"use client";

import { Button } from "@/components/base/ui/button";
import { Input } from "@/components/base/ui/input";
import { Label } from "@/components/base/ui/label";
import { getTaskSectionTheme } from "@/lib/constants/phaseColorThemes";
import { materialCreationFunctions } from "@/lib/functions/projectCreation";
import { cn } from "@/lib/functions/utils";
import { IProjectCreationData, ITaskTemplate } from "@/lib/types";
import { Plus, Trash2 } from "lucide-react";
import React, { useState } from "react";
import AddMaterialModal from "./AddMaterialModal";

const TaskMaterials = ({
	phaseId,
	task,
	setProjectData,
}: {
	phaseId: string;
	task: ITaskTemplate;
	setProjectData: React.Dispatch<React.SetStateAction<IProjectCreationData>>;
}) => {
	const { addMaterial, updateMaterial, removeMaterial } =
		materialCreationFunctions();
	const [open, setOpen] = useState(false);
	const taskTheme = getTaskSectionTheme();

	return (
		<div className="space-y-4">
			<div className="flex flex-wrap items-center justify-between gap-3">
				<Label className="font-semibold text-muted-foreground">
					Materials
				</Label>
				<Button
					type="button"
					variant="outline"
					size="sm"
					className={cn("h-9", taskTheme.outlineIcon)}
					onClick={() => setOpen(true)}
				>
					<Plus className="mr-1 h-4 w-4" aria-hidden /> Add material
				</Button>
			</div>

			{task.materials?.length === 0 ? (
				<p className="text-sm text-muted-foreground">
					No materials added yet.
				</p>
			) : (
				<div className="space-y-3">
					{task.materials?.map((mat) => (
						<div
							key={mat.id}
							className="grid w-full grid-cols-[1fr_1fr_1fr_auto] items-center gap-4 rounded-lg border border-border/60 bg-background/80 p-3 ring-1 ring-border/30"
						>
							{/* Name */}
							<p className="text-sm font-medium">{mat.name}</p>

							{/* Quantity */}
							<div className="flex items-center space-x-2">
								<Label className="whitespace-nowrap">
									Qty:
								</Label>
								<Input
									type="number"
									placeholder="0"
									value={
										mat.plannedQuantity === 0
											? ""
											: mat.plannedQuantity
									}
									className="h-9 w-20 border-border/60 bg-background/90"
									onChange={(e) =>
										updateMaterial(
											phaseId,
											task.id,
											mat.id ?? "",
											{
												plannedQuantity:
													parseInt(e.target.value) ||
													0,
											},
											setProjectData
										)
									}
								/>
								<p>{mat.unit}</p>
							</div>

							{/* Cost */}
							<div className="flex items-center space-x-2">
								<Label>Cost:</Label>
								<Input
									type="number"
									placeholder="0"
									value={
										mat.unitCost === 0 ? "" : mat.unitCost
									}
									className="h-9 w-24 border-border/60 bg-background/90"
									onChange={(e) =>
										updateMaterial(
											phaseId,
											task.id,
											mat.id ?? "",
											{
												unitCost:
													parseFloat(
														e.target.value
													) || 0,
											},
											setProjectData
										)
									}
								/>
							</div>

							{/* Delete button */}
							<Button
								type="button"
								variant="destructive"
								size="icon"
								className="h-9 w-9 justify-self-end"
								onClick={() =>
									removeMaterial(
										phaseId,
										task.id,
										mat.id ?? "",
										setProjectData
									)
								}
								aria-label="Remove material"
							>
								<Trash2 className="h-4 w-4" />
							</Button>
						</div>
					))}
				</div>
			)}

			<AddMaterialModal
				phaseId={phaseId}
				task={task}
				setProjectData={setProjectData}
				open={open}
				setOpen={setOpen}
			/>
		</div>
	);
};

export default TaskMaterials;
