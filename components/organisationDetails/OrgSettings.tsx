"use client";
import { Button } from "@/components/base/ui/button";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "@/components/base/ui/card";
import { Input } from "@/components/base/ui/input";
import { Label } from "@/components/base/ui/label";
import { Textarea } from "@/components/base/ui/textarea";
import {
	AlertDialog,
	AlertDialogTrigger,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogCancel,
	AlertDialogAction,
} from "@/components/base/ui/alert-dialog";
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
} from "@/components/base/ui/dialog";
import { Separator } from "@/components/base/ui/separator";
import { Edit, Settings2, Shield, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { IOrganisation } from "@/lib/types";
import {
	modalButtonCancelClass,
	modalButtonConfirmClass,
	modalButtonDangerClass,
} from "@/lib/functions/modalButtonStyles";
import { cn } from "@/lib/functions/utils";
import {
	deleteOrganisation,
	updateOrganisation,
} from "@/lib/middleware/organisations";
import { toast } from "sonner";

const OrgSettings = ({ organisation }: { organisation: IOrganisation }) => {
	const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
	const [editForm, setEditForm] = useState({
		name: organisation?.name,
		description: organisation?.description || "",
	});
	const router = useRouter();

	const handleEditOrganization = () => {
		setIsEditDialogOpen(false);
		updateOrganisation(organisation.id, {
			name: editForm.name,
			description: editForm.description,
		});
	};

	const handleDeleteOrganization = () => {
		deleteOrganisation(organisation.id);
		router.push("/organisations");
		toast.success("Organisation deleted successfully.");
	};

	return (
		<Card className="border-border/60 bg-background/80 shadow-sm ring-1 ring-border/40 backdrop-blur-sm">
			<CardHeader className="space-y-1 pb-4">
				<div className="flex items-center gap-2">
					<span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15 text-primary ring-1 ring-primary/20">
						<Settings2 className="h-4 w-4" />
					</span>
					<div>
						<CardTitle className="text-lg sm:text-xl">Settings</CardTitle>
						<CardDescription>
							Preferences and organisation management
						</CardDescription>
					</div>
				</div>
			</CardHeader>
			<CardContent className="space-y-8 pb-6">
				<section className="space-y-4">
					<h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
						General
					</h4>
					<div className="grid gap-4">
						<div className="flex flex-col gap-3 rounded-xl border border-border/50 bg-muted/15 p-4 sm:flex-row sm:items-center sm:justify-between">
							<div>
								<p className="font-medium">Material requests</p>
								<p className="text-sm text-muted-foreground">
									Auto-approve material requests under a set
									threshold (coming soon)
								</p>
							</div>
							<Button variant="outline" size="sm" disabled>
								Configure
							</Button>
						</div>
						<div className="flex flex-col gap-3 rounded-xl border border-border/50 bg-muted/15 p-4 sm:flex-row sm:items-center sm:justify-between">
							<div>
								<p className="font-medium">Project notifications</p>
								<p className="text-sm text-muted-foreground">
									Milestones and deadlines (coming soon)
								</p>
							</div>
							<Button variant="outline" size="sm" disabled>
								Configure
							</Button>
						</div>
					</div>
				</section>

				<Separator className="bg-border/60" />

				<section className="space-y-4">
					<div className="flex items-center gap-2">
						<Shield className="h-4 w-4 text-muted-foreground" />
						<h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
							Security
						</h4>
					</div>
					<div className="grid gap-4">
						<div className="flex flex-col gap-3 rounded-xl border border-border/50 bg-muted/15 p-4 sm:flex-row sm:items-center sm:justify-between">
							<div>
								<p className="font-medium">Two-factor authentication</p>
								<p className="text-sm text-muted-foreground">
									Require 2FA for members (coming soon)
								</p>
							</div>
							<Button variant="outline" size="sm" disabled>
								Configure
							</Button>
						</div>
						<div className="flex flex-col gap-3 rounded-xl border border-border/50 bg-muted/15 p-4 sm:flex-row sm:items-center sm:justify-between">
							<div>
								<p className="font-medium">Access logs</p>
								<p className="text-sm text-muted-foreground">
									View organisation access history (coming soon)
								</p>
							</div>
							<Button variant="outline" size="sm" disabled>
								View logs
							</Button>
						</div>
					</div>
				</section>

				<Separator className="bg-border/60" />

				<div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
					<Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
						<DialogTrigger asChild>
							<Button
								variant="outline"
								className="w-full border-border/60 sm:max-w-xs"
							>
								<Edit className="mr-2 h-4 w-4" aria-hidden />
								Edit details
							</Button>
						</DialogTrigger>
						<DialogContent className="border-border/60 sm:max-w-[425px]">
							<DialogHeader>
								<DialogTitle>Edit organisation</DialogTitle>
								<DialogDescription>
									Update the name and description shown across the
									app.
								</DialogDescription>
							</DialogHeader>
							<div className="grid gap-4 py-4">
								<div className="space-y-2">
									<Label htmlFor="org-settings-name">Name</Label>
									<Input
										id="org-settings-name"
										value={editForm.name}
										onChange={(e) =>
											setEditForm((prev) => ({
												...prev,
												name: e.target.value,
											}))
										}
										className="border-border/60"
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="org-settings-desc">
										Description
									</Label>
									<Textarea
										id="org-settings-desc"
										value={editForm.description}
										onChange={(e) =>
											setEditForm((prev) => ({
												...prev,
												description: e.target.value,
											}))
										}
										className="border-border/60"
										rows={4}
									/>
								</div>
							</div>
							<DialogFooter className="gap-2 border-t border-border/60 pt-4 sm:gap-2">
								<Button
									type="button"
									variant="outline"
									className={modalButtonCancelClass}
									onClick={() => setIsEditDialogOpen(false)}
								>
									Cancel
								</Button>
								<Button
									type="button"
									variant="outline"
									className={modalButtonConfirmClass}
									onClick={handleEditOrganization}
								>
									Save changes
								</Button>
							</DialogFooter>
						</DialogContent>
					</Dialog>

					<AlertDialog>
						<AlertDialogTrigger asChild>
							<Button
								variant="destructive"
								className="w-full sm:max-w-xs"
							>
								<Trash2 className="mr-2 h-4 w-4" aria-hidden />
								Delete organisation
							</Button>
						</AlertDialogTrigger>
						<AlertDialogContent className="border-border/60">
							<AlertDialogHeader>
								<AlertDialogTitle>Delete organisation?</AlertDialogTitle>
								<AlertDialogDescription>
									This cannot be undone. Projects and member links
									for this organisation will be removed.
								</AlertDialogDescription>
							</AlertDialogHeader>
							<AlertDialogFooter className="gap-2 sm:gap-2">
								<AlertDialogCancel className={cn(modalButtonCancelClass)}>
									Cancel
								</AlertDialogCancel>
								<AlertDialogAction
									onClick={handleDeleteOrganization}
									className={cn(modalButtonDangerClass)}
								>
									Delete organisation
								</AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
				</div>
			</CardContent>
		</Card>
	);
};

export default OrgSettings;
