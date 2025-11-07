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
import { useProfileStore } from "@/lib/store/profileStore";
import { create } from "domain";
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
		).then(() => {
			setName("");
			setDescription("");
			onOpenChange(false);
			toast.success("Organisation created successfully.");
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
					Create Organisation
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Create New Organisation</DialogTitle>
					<DialogDescription>
						Add a new organisation to manage projects and team
						members.
					</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="space-y-2">
						<Label htmlFor="org-name">Organisation Name</Label>
						<Input
							id="org-name"
							placeholder="Enter organisation name"
							className="h-10"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="org-description">Description</Label>
						<Textarea
							id="org-description"
							placeholder="Brief description of the organisation"
							rows={3}
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>
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
						{isLoading ? "Creating..." : "Create Organisation"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default AddOrgModal;
