import { Button } from "@/components/base/ui/button";
import {
	DialogHeader,
	DialogFooter,
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
} from "@/components/base/ui/dialog";
import React, { useState, useEffect, use } from "react";
import {
	getProjectIdFromPhaseId,
	getProjectNameFromPhaseId,
	requestMaterial,
} from "@/lib/functions/tasks";
import { ITask } from "@/lib/types";
import { Input } from "@/components/base/ui/input";
import { Textarea } from "@/components/base/ui/textarea";
import { Label } from "@/components/base/ui/label";
import { RupeeIcon } from "@/lib/functions/utils";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/base/ui/select";
import { getTaskMaterialsFromStore } from "@/lib/middleware/materials";
import { availableMaterials } from "@/lib/constants/materials";

const MaterialModal = ({
	isMaterialModalOpen,
	setIsMaterialModalOpen,
	selectedTask,
}: {
	isMaterialModalOpen: boolean;
	setIsMaterialModalOpen: (open: boolean) => void;
	selectedTask: ITask | undefined;
}) => {
	const projectName = getProjectNameFromPhaseId(selectedTask?.phaseId || "");
	const projectId = getProjectIdFromPhaseId(selectedTask?.phaseId || "");
	const materials = getTaskMaterialsFromStore(selectedTask?.id || "");

	const [selectedMaterial, setSelectedMaterial] = useState<string>("");
	const [notes, setNotes] = useState<string>("");

	const [unitName, setUnitName] = useState<string>("");
	const [unitList, setUnitList] = useState<string[]>([]);
	const [units, setUnits] = useState<number>(0);

	const [unitCost, setUnitCost] = useState<number>(0);
	const [totalCost, setTotalCost] = useState<number>(0);

	// Calculate total cost whenever units or unitCost changes
	useEffect(() => {
		setTotalCost(units * unitCost);
	}, [units, unitCost]);

	// Reset form when modal closes or task changes
	useEffect(() => {
		if (!isMaterialModalOpen) {
			setSelectedMaterial("");
			setUnits(0);
			setUnitCost(0);
			setTotalCost(0);
			setNotes("");
			setUnitName("");
		}
	}, [isMaterialModalOpen]);

	useEffect(() => {
		setUnitName(
			materials.find((m) => m.id === selectedMaterial)?.unit || ""
		);
		setUnitList(getUnitOptions());
		// console.log(unitList);
	}, [selectedMaterial]);

	const handleSubmit = () => {
		if (
			!selectedTask ||
			!selectedMaterial ||
			units <= 0 ||
			unitCost <= 0 ||
			!unitName
		)
			return;

		requestMaterial(
			selectedTask,
			materials.find((m) => m.id === selectedMaterial)!,
			units,
			unitName,
			unitCost,
			projectId,
			notes
		);
		setIsMaterialModalOpen(false);
	};

	const handleClose = () => {
		setIsMaterialModalOpen(false);
	};

	const handleOpenChange = (open: boolean) => {
		if (!open) {
			handleClose();
		} else {
			setIsMaterialModalOpen(true);
		}
	};

	// Generate unit options based on selected material
	const getUnitOptions = () => {
		if (!selectedMaterial) return [];

		// You can customize this based on your material types
		const mat = materials.find(
			(m) => m.id === selectedMaterial
		)?.materialId;
		const material = availableMaterials.find((m) => m.id === mat);
		// console.log(mat);

		if (material && material.units) {
			return material.units;
		}
		return ["pieces"];
	};

	return (
		<Dialog
			open={isMaterialModalOpen}
			onOpenChange={handleOpenChange}
		>
			<DialogContent className="sm:max-w-[700px] h-[550px] grid grid-rows-[auto_auto_1fr_auto] p-0 gap-0 overflow-hidden">
				{/* Header */}
				<DialogHeader className="px-6 pt-4 pb-2 row-span-1">
					<DialogTitle>{selectedTask?.name}</DialogTitle>
					<DialogDescription>Material Portal</DialogDescription>
				</DialogHeader>

				{/* Form Container */}
				<div className="row-span-1 min-h-0 w-full h-full">
					{selectedTask && (
						<div className="px-6 py-4 overflow-y-auto max-h-[calc(550px-180px)]">
							<div className="space-y-6">
								{/* Material Selection */}
								<div className="space-y-2 ">
									<Label
										htmlFor="material"
										className="text-sm font-medium"
									>
										Material *
									</Label>
									<Select
										value={selectedMaterial}
										onValueChange={(value) => {
											setSelectedMaterial(value);
										}}
									>
										<SelectTrigger className="w-full border-gray-400">
											<SelectValue placeholder="Select a material" />
										</SelectTrigger>
										<SelectContent className="p-0 m-0">
											{materials.map((material) => (
												<SelectItem
													key={material.id}
													value={material.id}
													className="m-0"
												>
													{material.name}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<p className="text-xs text-gray-500">
										Select the material you wish to request
									</p>
								</div>

								{/* Unit Selection and Cost - Show when material is selected */}
								{selectedMaterial && (
									<>
										{/* Unit Selection */}
										<div className="grid grid-cols-2 gap-4 ">
											{/* Units Input */}
											<div className="space-y-2">
												<Label
													htmlFor="units"
													className="text-sm font-medium"
												>
													Units *
												</Label>
												<Input
													id="units"
													type="number"
													placeholder="0"
													value={units || ""}
													onChange={(e) => {
														const value =
															Number.parseInt(
																e.target.value
															) || 0;
														setUnits(value);
													}}
													min="0"
													className="focus-visible:ring-0 focus-visible:border-black border-gray-400"
												/>
												<p className="text-xs text-gray-500">
													planned:{" "}
													{
														materials.find(
															(m) =>
																m.id ===
																selectedMaterial
														)?.plannedQuantity
													}{" "}
													{
														materials.find(
															(m) =>
																m.id ===
																selectedMaterial
														)?.unit
													}
												</p>
											</div>

											{/* Unit Type Selection */}
											<div className="space-y-2">
												<Label
													htmlFor="unitType"
													className="text-sm font-medium"
												>
													Unit Type *
												</Label>
												<Select
													value={unitName}
													onValueChange={setUnitName}
												>
													<SelectTrigger className="w-full border-gray-400">
														<SelectValue placeholder="Select unit type" />
													</SelectTrigger>
													<SelectContent>
														{unitList.map(
															(unitType) => (
																<SelectItem
																	key={
																		unitType
																	}
																	value={
																		unitType
																	}
																>
																	{unitType}
																</SelectItem>
															)
														)}
													</SelectContent>
												</Select>
												<p className="text-xs text-gray-500">
													Select the unit of
													measurement
												</p>
											</div>
										</div>

										{/* Cost Selection */}
										<div className="grid grid-cols-2 gap-4">
											<div className="space-y-2">
												<Label
													htmlFor="unitCost"
													className="text-sm font-medium"
												>
													Unit Cost *
												</Label>
												<div className="relative">
													<span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
														<RupeeIcon />
													</span>
													<Input
														id="unitCost"
														type="text"
														placeholder="0"
														value={
															unitCost
																? new Intl.NumberFormat(
																		"en-IN"
																  ).format(
																		unitCost
																  )
																: ""
														}
														onChange={(e) => {
															const raw =
																e.target.value.replace(
																	/,/g,
																	""
																);
															const num =
																Number.parseInt(
																	raw
																) || 0;
															setUnitCost(num);
														}}
														className="pl-8 focus-visible:ring-0 focus-visible:border-black w-full border-gray-400"
													/>
												</div>
												<p className="text-xs text-gray-500">
													Cost per unit of material
												</p>
											</div>

											{/* Total Cost (Read-only) */}
											<div className="space-y-2">
												<Label
													htmlFor="totalCost"
													className="text-sm font-medium"
												>
													Total Cost
												</Label>
												<div className="relative">
													<span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
														<RupeeIcon />
													</span>
													<Input
														id="totalCost"
														type="text"
														placeholder="0"
														value={
															totalCost
																? new Intl.NumberFormat(
																		"en-IN"
																  ).format(
																		totalCost
																  )
																: ""
														}
														readOnly
														className="pl-8 focus-visible:ring-0 focus-visible:border-black w-full border-gray-400 bg-gray-50"
													/>
												</div>
												<p className="text-xs text-gray-500">
													Calculated automatically
													(Units × Unit Cost)
												</p>
											</div>
										</div>
									</>
								)}

								{/* Notes Textarea */}
								<div className="space-y-2">
									<Label
										htmlFor="notes"
										className="text-sm font-medium"
									>
										Reason
									</Label>
									<Textarea
										id="notes"
										placeholder="Describe the reason for this Material request..."
										value={notes}
										onChange={(e) =>
											setNotes(e.target.value)
										}
										rows={3}
										className="resize-none focus-visible:ring-0 focus-visible:border-black border-gray-400 w-full"
									/>
									<p className="text-xs text-gray-500">
										Optional: Provide details about what
										this Material covers
									</p>
								</div>
							</div>
						</div>
					)}
				</div>

				<DialogFooter className="px-6 py-4 border-t self-end">
					<div className="flex flex-col w-full gap-4">
						<div className="flex gap-2 w-full items-center justify-center">
							<Button
								variant="outline"
								onClick={handleClose}
								className="w-1/2"
							>
								Cancel
							</Button>
							<Button
								variant="default"
								onClick={handleSubmit}
								className="w-1/2"
								disabled={
									!selectedMaterial ||
									units <= 0 ||
									unitCost <= 0 ||
									!unitName
								}
							>
								Request Material
							</Button>
						</div>
					</div>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default MaterialModal;
