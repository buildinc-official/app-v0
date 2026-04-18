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
import {
	modalButtonCancelClass,
	modalButtonConfirmClass,
} from "@/lib/functions/modalButtonStyles";
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
				<Button
					type="button"
					variant="outline"
					className="group h-11 w-auto max-w-full shrink-0 border-border/60 bg-background/80 shadow-sm ring-1 ring-border/40 backdrop-blur-sm transition-all duration-200 ease-out hover:border-primary/35 hover:bg-primary/5 hover:shadow-md hover:ring-primary/25"
				>
					<span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15 text-primary ring-1 ring-primary/20 transition-transform duration-200 ease-out group-hover:scale-105 group-hover:bg-primary/25">
						<Plus className="h-4 w-4" aria-hidden />
					</span>
					<span className="inline-flex h-8 shrink-0 items-center leading-none font-medium">
						Add material
					</span>
				</Button>
			</DialogTrigger>
			<DialogContent className="border-border/60 sm:max-w-[440px]">
				<DialogHeader className="space-y-2">
					<DialogTitle>Add material</DialogTitle>
					<DialogDescription>
						Add a default price for a material. You can use it when planning
						tasks and projects.
					</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-2">
					<div className="space-y-2">
						<Label htmlFor="mat-name">Material name</Label>
						<Input
							id="mat-name"
							placeholder="e.g. Cement"
							className="h-11 border-border/60"
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
							className="h-11 w-full rounded-md border border-border/60 bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
						<Label htmlFor="mat-price">Price per unit</Label>
						<div className="relative flex items-center">
							<span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
								<RupeeIcon />
							</span>
							<Input
								id="mat-price"
								type="number"
								step="0.01"
								min={0}
								placeholder="0.00"
								className="h-11 border-border/60 pl-9"
								value={price}
								onChange={(e) => setPrice(e.target.value)}
							/>
						</div>
					</div>
				</div>
				<DialogFooter className="gap-2 border-t border-border/60 pt-4 sm:gap-2">
					<Button
						type="button"
						variant="outline"
						className={modalButtonCancelClass}
						onClick={() => onOpenChange(false)}
					>
						Cancel
					</Button>
					<Button
						type="button"
						variant="outline"
						className={modalButtonConfirmClass}
						onClick={handleCreate}
						disabled={isLoading}
					>
						{isLoading ? "Adding…" : "Add material"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default AddMaterialModal;
