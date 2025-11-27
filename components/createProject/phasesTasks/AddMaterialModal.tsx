"use client";
import { Button } from "@/components/base/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/base/ui/dialog";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/base/ui/form";
import { Input } from "@/components/base/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/base/ui/select";
import { materialCreationFunctions } from "@/lib/functions/projectCreation";
import { useMaterialPricingStore } from "@/lib/store/materialPricingStore";
import {
	IMaterialTemplate,
	IProjectCreationData,
	ITaskTemplate,
} from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const formSchema = z.object({
	materialId: z.string().min(1, "Material is required"),
	unit: z.string().min(1, "Unit is required"),
	quantity: z.number().min(0.1, "Must be at least 0.1"),
	cost: z.number().min(0, "Cost cannot be negative"),
});

type AddMaterialModalProps = {
	phaseId: string;
	task: ITaskTemplate;
	setProjectData: React.Dispatch<React.SetStateAction<IProjectCreationData>>;
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function AddMaterialModal({
	phaseId,
	task,
	setProjectData,
	open,
	setOpen,
}: AddMaterialModalProps) {
	const { addMaterial } = materialCreationFunctions();
	const materialList = useMaterialPricingStore.getState().materialPricings
		? Object.values(useMaterialPricingStore.getState().materialPricings!)
		: [];
	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			materialId: "",
			unit: "",
			quantity: 0,
			cost: 0,
		},
	});

	const [showDropdown, setShowDropdown] = useState(false);
	const [query, setQuery] = useState("");

	// Get selected material from form value
	const selectedMaterialId = form.watch("materialId");
	const selectedMaterial = materialList.find(
		(m) => m.id === selectedMaterialId
	) as IMaterialTemplate | undefined;

	// Filtered materials for dropdown
	const filteredMaterials = useMemo(() => {
		const q = query.trim().toLowerCase();
		if (!q)
			return materialList.sort((a, b) =>
				(a.name || "").localeCompare(b.name || "")
			);
		return materialList
			.filter((m) => (m.name || "").toLowerCase().includes(q))
			.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
	}, [query]);

	// Prefill unit & cost when material selected
	useEffect(() => {
		if (selectedMaterial) {
			form.setValue("unit", selectedMaterial.defaultUnit || "");
			form.setValue("cost", selectedMaterial.unitCost ?? 0);
		}
	}, [selectedMaterial, form]);

	// Reset form when dialog closes
	useEffect(() => {
		if (!open) {
			form.reset();
			setQuery("");
			setShowDropdown(false);
		}
	}, [open, form]);

	const onSubmit = (data: z.infer<typeof formSchema>) => {
		const material = materialList.find((m) => m.id === data.materialId);
		if (!material) return;

		addMaterial(phaseId, task.id, setProjectData, {
			name: material.name!,
			unit: data.unit,
			plannedQuantity: data.quantity,
			unitCost: data.cost,
		} as IMaterialTemplate);

		setOpen(false);
	};

	return (
		<Dialog
			open={open}
			onOpenChange={(open) => !open && setOpen(false)}
		>
			<DialogContent className="max-w-md p-6">
				<DialogHeader className="pb-2">
					<DialogTitle className="text-xl font-semibold text-gray-800">
						Add Material
					</DialogTitle>
					<DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none">
						<X className="h-4 w-4" />
						<span className="sr-only">Close</span>
					</DialogClose>
				</DialogHeader>

				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-5 py-2"
					>
						{/* First Row: Material and Cost */}
						<div className="grid grid-cols-2 gap-4">
							{/* Material Search */}
							<FormField
								control={form.control}
								name="materialId"
								render={({ field }) => (
									<FormItem className="space-y-2.5">
										<FormLabel className="text-sm font-medium text-gray-700">
											Select Material
										</FormLabel>
										<FormControl>
											<div className="relative">
												<Input
													placeholder="Search materials..."
													value={query}
													onChange={(e) =>
														setQuery(e.target.value)
													}
													onFocus={() =>
														setShowDropdown(true)
													}
													onBlur={() =>
														setTimeout(
															() =>
																setShowDropdown(
																	false
																),
															200
														)
													}
													className="rounded-md border-gray-300 w-full focus-visible:ring-0 focus-visible:border-muted-foreground"
												/>
												{showDropdown && (
													<div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
														{filteredMaterials.length ===
														0 ? (
															<div className="p-3 text-sm text-gray-500">
																No materials
																found
															</div>
														) : (
															filteredMaterials.map(
																(material) => (
																	<div
																		key={
																			material.id
																		}
																		className="p-3 cursor-pointer hover:bg-gray-50 transition-colors duration-150 border-b border-gray-100 last:border-b-0"
																		onMouseDown={(
																			e
																		) => {
																			e.preventDefault();
																			field.onChange(
																				material.id
																			);
																			setQuery(
																				material.name ||
																					""
																			);
																			setShowDropdown(
																				false
																			);
																		}}
																	>
																		{
																			material.name
																		}
																	</div>
																)
															)
														)}
													</div>
												)}
											</div>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							{/* Cost */}
							<FormField
								control={form.control}
								name="cost"
								render={({ field }) => (
									<FormItem className="space-y-2.5">
										<FormLabel className="text-sm font-medium text-gray-700">
											Unit Cost (Market Estimate)
										</FormLabel>
										<FormControl>
											<Input
												type="number"
												placeholder="0"
												value={
													field.value === 0
														? ""
														: field.value
												}
												onChange={(e) => {
													const value =
														e.target.value;
													if (value === "") {
														field.onChange(0);
													} else {
														const numValue =
															parseFloat(value);
														if (!isNaN(numValue)) {
															field.onChange(
																numValue
															);
														}
													}
												}}
												className="rounded-md border-gray-300 focus-visible:ring-0 focus-visible:border-muted-foreground"
												min="0"
												step="0.01"
											/>
										</FormControl>

										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						{/* Second Row: Quantity and Unit */}
						<div className="grid grid-cols-2 gap-4">
							{/* Quantity */}
							<FormField
								control={form.control}
								name="quantity"
								render={({ field }) => (
									<FormItem className="space-y-2.5">
										<FormLabel className="text-sm font-medium text-gray-700">
											Quantity
										</FormLabel>
										<FormControl>
											<Input
												type="number"
												placeholder="0"
												value={
													field.value === 0
														? ""
														: field.value
												}
												onChange={(e) => {
													const value =
														e.target.value;
													if (value === "") {
														field.onChange(0);
													} else {
														const numValue =
															parseInt(value);
														if (!isNaN(numValue)) {
															field.onChange(
																numValue
															);
														}
													}
												}}
												className="rounded-md border-gray-300 focus-visible:ring-0 focus-visible:border-muted-foreground"
												min="0"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							{/* Unit */}
							{selectedMaterial && (
								<FormField
									control={form.control}
									name="unit"
									render={({ field }) => (
										<FormItem className="space-y-2.5">
											<FormLabel className="text-sm font-medium text-gray-700">
												Unit
											</FormLabel>
											<Select
												onValueChange={field.onChange}
												value={field.value}
												defaultValue={field.value}
											>
												<FormControl>
													<SelectTrigger className="rounded-md border-gray-300 focus-visible:ring-0 focus-visible:border-muted-foreground w-full">
														<SelectValue placeholder="Select unit" />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													{(
														selectedMaterial?.units ?? [
															selectedMaterial?.defaultUnit ||
																"",
														]
													).map((u) => (
														<SelectItem
															key={u}
															value={u}
															className="focus:bg-blue-50 focus-visible:ring-0 focus-visible:border-muted-foreground"
														>
															{u}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>
							)}
						</div>

						<div className="pt-4 mt-2 border-t border-gray-200 flex justify-end space-x-2">
							<Button
								type="button"
								onClick={() => setOpen(false)}
							>
								Cancel
							</Button>
							<Button
								type="submit"
								variant={"secondary"}
								disabled={!selectedMaterial}
							>
								Add Material
							</Button>
						</div>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
