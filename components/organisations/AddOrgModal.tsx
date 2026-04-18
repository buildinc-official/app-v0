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
import { Textarea } from "@/components/base/ui/textarea";
import { createOrganisation } from "@/lib/functions/organisationCreation";
import {
	modalButtonCancelClass,
	modalButtonConfirmClass,
} from "@/lib/functions/modalButtonStyles";
import { useProfileStore } from "@/lib/store/profileStore";
import { Plus } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

const AddOrgModal = ({
	isOpen,
	onOpenChange,
}: {
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
}) => {
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const profile = useProfileStore((state) => state.profile);
	const ownerId = profile?.id;

	const handleCreate = () => {
		if (!name.trim()) return; // simple validation

		toast.info("Creating organisation...");

		createOrganisation(
			name,
			ownerId,
			description,
			onOpenChange,
			setIsLoading
		)
			.then(() => {
				setName("");
				setDescription("");
				onOpenChange(false);
				toast.success("Organisation created successfully.");
			})
			.catch((err: unknown) => {
				const msg =
					err &&
					typeof err === "object" &&
					"message" in err &&
					typeof (err as { message: unknown }).message === "string"
						? (err as { message: string }).message
						: "Could not create organisation.";
				toast.error(msg);
			});
	};

	return (
		<Dialog
			open={isOpen}
			onOpenChange={onOpenChange}
		>
			<DialogTrigger asChild>
				<Button
					variant="outline"
					className="group h-11 w-full border-border/60 bg-background/80 shadow-sm ring-1 ring-border/40 backdrop-blur-sm transition-all duration-200 ease-out hover:border-primary/35 hover:bg-primary/5 hover:shadow-md hover:ring-primary/25 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-primary/40 sm:w-auto"
				>
					<span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15 text-primary ring-1 ring-primary/20 transition-transform duration-200 ease-out group-hover:scale-105 group-hover:bg-primary/25 group-hover:ring-primary/35 group-active:scale-95">
						<Plus
							className="h-4 w-4 transition-transform duration-200 ease-out group-hover:rotate-90"
							aria-hidden
						/>
					</span>
					<span className="inline-flex h-8 shrink-0 items-center leading-none font-medium transition-colors group-hover:text-foreground">
						Create organisation
					</span>
				</Button>
			</DialogTrigger>
			<DialogContent className="border-border/60 sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Create organisation</DialogTitle>
					<DialogDescription>
						Add a new organisation to manage projects and team
						members.
					</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="space-y-2">
						<Label htmlFor="org-name">Name</Label>
						<Input
							id="org-name"
							placeholder="Organisation name"
							className="h-11 border-border/60"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="org-description">Description</Label>
						<Textarea
							id="org-description"
							placeholder="What is this organisation for?"
							rows={3}
							className="border-border/60"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>
					</div>
				</div>
				<DialogFooter className="gap-2 border-t border-border/60 pt-4 sm:gap-2">
					<Button
						type="button"
						variant="outline"
						onClick={() => onOpenChange(false)}
						className={modalButtonCancelClass}
					>
						Cancel
					</Button>
					<Button
						type="button"
						variant="outline"
						onClick={handleCreate}
						className={modalButtonConfirmClass}
						disabled={isLoading}
					>
						{isLoading ? "Creating…" : "Create"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default AddOrgModal;
