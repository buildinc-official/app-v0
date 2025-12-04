import { Button } from "@/components/base/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/base/ui/dialog";
import { Input } from "@/components/base/ui/input";
import { Label } from "@/components/base/ui/label";
import { materialUnitList } from "@/lib/constants/materials";
import { createOrganisation } from "@/lib/functions/organisationCreation";
import { handleAddMaterial } from "@/lib/functions/settings";
import { RupeeIcon } from "@/lib/functions/utils";
import { useProfileStore } from "@/lib/store/profileStore";
import { Plus } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

const AddMaterialModal = ({
	isOpen,
	onOpenChange,
}: {
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
}) => {
	const [name, setName] = useState("");
	const [unit, setUnit] = useState("");
	const [price, setPrice] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const profile = useProfileStore((state) => state.profile);
	const ownerId = profile?.id;

	const handleCreate = () => {
		if (
			name === "" ||
			name === null ||
			unit === "" ||
			unit === null ||
			price === "" ||
			price === null ||
			isNaN(Number(price)) ||
			Number(price) < 0 ||
			!Number.isFinite(Number(price)) ||
			unit === null ||
			unit == "Select unit"
		) {
			toast.error("Please provide valid unit and price.");
			return;
		}
		toast.info("Adding...");

		handleAddMaterial(
			name,
			ownerId,
			unit,
			Number(price),
			onOpenChange,
			setIsLoading
		).then(() => {
			setName("");
			setUnit("");
			setPrice("");
			onOpenChange(false);
			toast.success("Material added successfully.");
		});
	};

	return (
		<Dialog
			open={isOpen}
			onOpenChange={onOpenChange}
		>
			<DialogTrigger asChild>
				<Button variant={"secondary"}>
					<Plus className="mr-2 h-5 w-5" />
					Add Material
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Add New Material</DialogTitle>
					<DialogDescription>
						Fill in the details below to add a new material to your
						profile.
					</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="space-y-2">
						<Label htmlFor="mat-name">Material Name</Label>
						<Input
							id="mat-name"
							placeholder="Enter material name"
							className="h-10"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="mat-unit">Unit</Label>
						<select
							id="mat-unit"
							value={unit}
							onChange={(e) => setUnit(e.target.value)}
							className="h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm focus:outline-none"
						>
							{(() => {
								return materialUnitList.map((u) => (
									<option
										key={u.value || "empty"}
										value={u.value}
									>
										{u.label}
									</option>
								));
							})()}
						</select>
					</div>
					<div className="space-y-2">
						<Label htmlFor="mat-price">Price / Unit</Label>
						<div className="flex items-center gap-2">
							<div className="h-10 inline-flex items-center  px-1 text-sm bg-transparent">
								<RupeeIcon />
							</div>
							<Input
								id="mat-price"
								type="number"
								step="0.01"
								placeholder="0.00"
								className="h-10"
								value={price}
								onChange={(e) => setPrice(e.target.value)}
							/>
						</div>
					</div>
				</div>
				<DialogFooter>
					<Button
						variant="outline"
						onClick={() => onOpenChange(false)}
					>
						Cancel
					</Button>
					<Button
						variant={"secondary"}
						onClick={handleCreate}
						disabled={isLoading}
					>
						{isLoading ? "Adding..." : "Add Material"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default AddMaterialModal;
