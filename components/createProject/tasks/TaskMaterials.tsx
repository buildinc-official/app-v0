"use client";

import { Button } from "@/components/base/ui/button";
import { Input } from "@/components/base/ui/input";
import { Label } from "@/components/base/ui/label";
import { materialCreationFunctions } from "@/lib/functions/projectCreation";
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

	return (
		<div className="space-y-2">
			<div className="flex items-center justify-between">
				<Label className="font-semibold text-muted-foreground">
					Materials
				</Label>
				<Button
					variant="secondary"
					size="sm"
					onClick={() => setOpen(true)}
				>
					<Plus className="h-4 w-4 mr-1" /> Add Material
				</Button>
			</div>

			{task.materials?.length === 0 ? (
				<p className="text-sm text-slate-500">No materials added.</p>
			) : (
				<div className="space-y-2">
					{task.materials?.map((mat) => (
						<div
							key={mat.id}
							className="grid grid-cols-[1fr_1fr_1fr_auto] items-center border rounded-lg p-2 bg-white gap-4 w-full"
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
									className="w-20 focus-visible:ring-0 focus-visible:border-muted-foreground"
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
									className="w-24 focus-visible:ring-0 focus-visible:border-muted-foreground"
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
								variant="ghost"
								size="icon"
								className="text-red-600 hover:text-red-700 justify-self-end"
								onClick={() =>
									removeMaterial(
										phaseId,
										task.id,
										mat.id ?? "",
										setProjectData
									)
								}
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
