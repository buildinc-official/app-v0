"use client";
import {
	AlertDialogHeader,
	AlertDialogFooter,
} from "@/components/base/ui/alert-dialog";
import { Button } from "@/components/base/ui/button";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "@/components/base/ui/card";
import { DialogHeader, DialogFooter } from "@/components/base/ui/dialog";
import { Input } from "@/components/base/ui/input";
import { Label } from "@/components/base/ui/label";
import { Textarea } from "@/components/base/ui/textarea";
import {
	AlertDialog,
	AlertDialogTrigger,
	AlertDialogContent,
	AlertDialogTitle,
	AlertDialogDescription,
	AlertDialogCancel,
	AlertDialogAction,
} from "@/components/base/ui/alert-dialog";
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogTitle,
	DialogDescription,
} from "@/components/base/ui/dialog";
import { Separator } from "@/components/base/ui/separator";
import { Edit, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { IOrganisation } from "@/lib/types";
import {
	deleteOrganisation,
	updateOrganisation,
} from "@/lib/middleware/organisations";

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
		router.push("/admin/organisations");
	};
	return (
		<Card>
			{/* <CardHeader>
				<CardTitle>Organization Settings</CardTitle>
				<CardDescription>
					Manage organisation preferences and configurations
				</CardDescription>
			</CardHeader> */}
			<CardContent className="space-y-6 my-5">
				<div className="space-y-2">
					<h4 className="font-bold text-lg mb-4">General Settings</h4>
					<div className="grid gap-4">
						<div className="flex items-center justify-between">
							<div>
								<p className="font-medium">
									Auto-approve material requests
								</p>
								<p className="text-sm text-muted-foreground">
									Automatically approve material requests
									under $500
								</p>
							</div>
							<Button
								variant="outline"
								size="sm"
								disabled
							>
								Configure
							</Button>
						</div>
						<div className="flex items-center justify-between">
							<div>
								<p className="font-medium">
									Project notifications
								</p>
								<p className="text-sm text-muted-foreground">
									Send notifications for project milestones
									and deadlines
								</p>
							</div>
							<Button
								variant="outline"
								size="sm"
								disabled
							>
								Configure
							</Button>
						</div>
					</div>
				</div>

				<Separator />

				<div className="space-y-2">
					<h4 className="font-bold text-lg mb-4">
						Security Settings
					</h4>
					<div className="grid gap-4">
						<div className="flex items-center justify-between">
							<div>
								<p className="font-medium">
									Two-factor authentication
								</p>
								<p className="text-sm text-muted-foreground">
									Require 2FA for all organisation members
								</p>
							</div>
							<Button
								variant="outline"
								size="sm"
								disabled
							>
								Configure
							</Button>
						</div>
						<div className="flex items-center justify-between">
							<div>
								<p className="font-medium">Access logs</p>
								<p className="text-sm text-muted-foreground">
									View and manage organisation access logs
								</p>
							</div>
							<Button
								variant="outline"
								size="sm"
								disabled
							>
								View Logs
							</Button>
						</div>
						<div className="flex items-center space-x-2 justify-center mt-5">
							<Dialog
								open={isEditDialogOpen}
								onOpenChange={setIsEditDialogOpen}
							>
								<DialogTrigger asChild>
									<Button
										variant="outline"
										className="w-1/2"
										// size="sm"
									>
										<Edit className="h-4 w-4 mr-2" />
										Edit
									</Button>
								</DialogTrigger>
								<DialogContent className="sm:max-w-[425px]">
									<DialogHeader>
										<DialogTitle>
											Edit Organization
										</DialogTitle>
										<DialogDescription>
											Make changes to the organisation
											details here.
										</DialogDescription>
									</DialogHeader>
									<div className="grid gap-4 py-4">
										<div className="grid grid-cols-4 items-center gap-4">
											<Label
												htmlFor="name"
												className="text-right"
											>
												Name
											</Label>
											<Input
												id="name"
												value={editForm.name}
												onChange={(e) =>
													setEditForm((prev) => ({
														...prev,
														name: e.target.value,
													}))
												}
												className="col-span-3"
											/>
										</div>
										<div className="grid grid-cols-4 items-center gap-4">
											<Label
												htmlFor="description"
												className="text-right"
											>
												Description
											</Label>
											<Textarea
												id="description"
												value={editForm.description}
												onChange={(e) =>
													setEditForm((prev) => ({
														...prev,
														description:
															e.target.value,
													}))
												}
												className="col-span-3"
											/>
										</div>
									</div>
									<DialogFooter>
										<Button
											type="submit"
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
										// size="sm"
										className="w-1/2"
									>
										<Trash2 className="h-4 w-4 mr-2" />
										Delete
									</Button>
								</AlertDialogTrigger>
								<AlertDialogContent>
									<AlertDialogHeader>
										<AlertDialogTitle>
											Are you absolutely sure?
										</AlertDialogTitle>
										<AlertDialogDescription>
											This action cannot be undone. This
											will permanently delete the
											organisation and remove all
											associated data including projects
											and member assignments.
										</AlertDialogDescription>
									</AlertDialogHeader>
									<AlertDialogFooter>
										<AlertDialogCancel>
											Cancel
										</AlertDialogCancel>
										<AlertDialogAction
											onClick={handleDeleteOrganization}
											className="bg-destructive text-secondary-foreground hover:bg-destructive/70"
										>
											Delete Organization
										</AlertDialogAction>
									</AlertDialogFooter>
								</AlertDialogContent>
							</AlertDialog>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default OrgSettings;
