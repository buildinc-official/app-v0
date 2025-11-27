import { Button } from "@/components/base/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
} from "@/components/base/ui/dialog";
import { Input } from "@/components/base/ui/input";
import { Label } from "@/components/base/ui/label";
import {
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
	Select,
} from "@/components/base/ui/select";
import { Textarea } from "@/components/base/ui/textarea";
import { IMaterial } from "@/lib/types";
import { projectDetails } from "@/lib/functions/projectDetails";
import { Minus } from "lucide-react";
import React, { useState } from "react";
import { useMaterialPricingStore } from "@/lib/store/materialPricingStore";

type Props = {
	isCreateTaskOpen: boolean;
	setIsCreateTaskOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreateTaskModal = ({ isCreateTaskOpen, setIsCreateTaskOpen }: Props) => {
	const [taskMaterials, setTaskMaterials] = useState<IMaterial[]>([]);
	const materials = useMaterialPricingStore.getState().materialPricings;
	const materialList = materials ? Object.values(materials) : [];
	return (
		<Dialog
			open={isCreateTaskOpen}
			onOpenChange={setIsCreateTaskOpen}
		>
			<DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
				<DialogHeader>
					<DialogTitle>Create New Task</DialogTitle>
					<DialogDescription>
						Add a new task to the project with materials
					</DialogDescription>
				</DialogHeader>
				<div className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="task-name">Task Name *</Label>
						<Input
							id="task-name"
							placeholder="Enter task name"
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="task-description">Description</Label>
						<Textarea
							id="task-description"
							placeholder="Describe the task..."
							rows={3}
						/>
					</div>
					<div className="grid grid-cols-2 gap-4">
						<div className="space-y-2">
							<Label htmlFor="task-priority">Priority</Label>
							<Select>
								<SelectTrigger>
									<SelectValue placeholder="Select priority" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="high">High</SelectItem>
									<SelectItem value="medium">
										Medium
									</SelectItem>
									<SelectItem value="low">Low</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<div className="space-y-2">
							<Label htmlFor="task-hours">Estimated Hours</Label>
							<Input
								id="task-hours"
								type="number"
								placeholder="0"
							/>
						</div>
					</div>
					<div className="space-y-2">
						<Label htmlFor="task-due-date">Due Date</Label>
						<Input
							id="task-due-date"
							type="date"
						/>
					</div>

					{/* Materials Section */}
					<div className="space-y-4">
						<div className="flex items-center justify-between">
							<Label className="text-base font-medium">
								Required Materials
							</Label>
							{/* <Button
										type="button"
										variant="outline"
										size="sm"
										onClick={() =>
											addMaterial(
												material,
												taskMaterials,
												setTaskMaterials
											)
										}
									>
										<Plus className="mr-2 h-4 w-4" />
										Add Material
									</Button> */}
						</div>
						{taskMaterials.map((material, index) => (
							<div
								key={material.id}
								className="grid grid-cols-12 gap-2 items-end p-3 border rounded-lg"
							>
								<div className="col-span-4">
									<Label className="text-xs">Material</Label>
									<Select
										value={material.materialId}
										// onValueChange={(value) =>
										// 	updateMaterial(
										// 		index,
										// 		"materialId",
										// 		value,
										// 		taskMaterials,
										// 		setTaskMaterials
										// 	)
										// }
									>
										<SelectTrigger className="h-8">
											<SelectValue placeholder="Select material" />
										</SelectTrigger>
										<SelectContent>
											{materialList.map((mat) => (
												<SelectItem
													key={mat.id}
													value={
														mat.id?.toString() ?? ""
													}
												>
													{mat.name}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>
								<div className="col-span-2">
									<Label className="text-xs">Quantity</Label>
									<Input
										type="number"
										className="h-8"
										value={material.plannedQuantity}
										// onChange={(e) =>
										// 	updateMaterial(
										// 		index,
										// 		"plannedQuantity",
										// 		e.target.value,
										// 		taskMaterials,
										// 		setTaskMaterials
										// 	)
										// }
									/>
								</div>
								<div className="col-span-2">
									<Label className="text-xs">Unit</Label>
									<Input
										className="h-8"
										value={material.unit}
										readOnly
									/>
								</div>
								<div className="col-span-2">
									<Label className="text-xs">Unit Cost</Label>
									<Input
										className="h-8"
										value={`$${material.unitCost}`}
										readOnly
									/>
								</div>
								<div className="col-span-1">
									<Label className="text-xs">Total</Label>
									<div className="text-xs font-medium h-8 flex items-center">
										$
										{(
											material.plannedQuantity *
											material.unitCost
										).toFixed(2)}
									</div>
								</div>
								<div className="col-span-1">
									<Button
										type="button"
										variant="outline"
										size="sm"
										className="h-8 w-8 p-0 bg-transparent"
										// onClick={() =>
										// 	removeMaterial(
										// 		index,
										// 		taskMaterials,
										// 		setTaskMaterials
										// 	)
										// }
									>
										<Minus className="h-4 w-4" />
									</Button>
								</div>
							</div>
						))}
					</div>
				</div>
				<DialogFooter>
					<Button
						variant="outline"
						onClick={() => setIsCreateTaskOpen(false)}
					>
						Cancel
					</Button>
					<Button>Create Task</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default CreateTaskModal;
