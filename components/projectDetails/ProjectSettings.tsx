"use client";

import { Button } from "@/components/base/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/base/ui/card";
import { Input } from "@/components/base/ui/input";
import { Label } from "@/components/base/ui/label";
import { Textarea } from "@/components/base/ui/textarea";
import { TabsContent } from "@/components/base/ui/tabs";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/base/ui/alert-dialog";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/base/ui/dialog";
import { Separator } from "@/components/base/ui/separator";
import {
	deleteProject,
	updateProject,
} from "@/lib/middleware/projects";
import { useProjectStore } from "@/lib/store/projectStore";
import { useprojectDetailStore } from "@/lib/store/projectDetailStore";
import { IOrganisation, IProject } from "@/lib/types";
import { Edit, Settings2, Shield, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
	modalButtonCancelClass,
	modalButtonConfirmClass,
	modalButtonDangerClass,
} from "@/lib/functions/modalButtonStyles";
import { cn } from "@/lib/functions/utils";
import { toast } from "sonner";

export const ProjectSettings = ({
	project,
	organisation,
}: {
	project: IProject;
	organisation: IOrganisation | undefined;
}) => {
	const router = useRouter();
	const updateprojectDetails = useprojectDetailStore(
		(s) => s.updateprojectDetails
	);
	const [isEditOpen, setIsEditOpen] = useState(false);
	const [isSaving, setIsSaving] = useState(false);
	const [form, setForm] = useState({
		name: project.name,
		description: project.description ?? "",
		location: project.location ?? "",
	});

	useEffect(() => {
		setForm({
			name: project.name,
			description: project.description ?? "",
			location: project.location ?? "",
		});
	}, [project.id, project.name, project.description, project.location]);

	const handleSave = async () => {
		if (!form.name.trim()) {
			toast.error("Name is required.");
			return;
		}
		setIsSaving(true);
		try {
			await updateProject(project.id, {
				name: form.name.trim(),
				description: form.description.trim(),
				location: form.location.trim(),
			});
			const updated = useProjectStore.getState().getProject(project.id);
			if (updated) updateprojectDetails(updated);
			setIsEditOpen(false);
			toast.success("Project updated.");
		} catch (e) {
			console.error(e);
			toast.error("Could not save changes.");
		} finally {
			setIsSaving(false);
		}
	};

	const handleDelete = async () => {
		try {
			await deleteProject(project.id);
			toast.success("Project deleted.");
			router.push("/projects");
		} catch (e) {
			console.error(e);
			toast.error("Could not delete project.");
		}
	};

	return (
		<TabsContent value="settings" className="mt-0 space-y-4">
			<Card className="border-border/60 bg-background/80 shadow-sm ring-1 ring-border/40 backdrop-blur-sm">
				<CardHeader className="space-y-1 pb-4">
					<div className="flex items-center gap-2">
						<span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15 text-primary ring-1 ring-primary/20">
							<Settings2 className="h-4 w-4" aria-hidden />
						</span>
						<div>
							<CardTitle className="text-lg sm:text-xl">Settings</CardTitle>
							<CardDescription>
								Project preferences and management
							</CardDescription>
						</div>
					</div>
				</CardHeader>
				<CardContent className="space-y-8 pb-6">
					{organisation ? (
						<div className="rounded-xl border border-border/50 bg-muted/15 p-4 text-sm">
							<span className="text-muted-foreground">Organisation</span>
							<p className="mt-1 font-medium">
								<Link
									href={`/organisations/${organisation.id}`}
									className="text-primary underline-offset-4 hover:underline"
								>
									{organisation.name}
								</Link>
							</p>
						</div>
					) : null}

					<section className="space-y-4">
						<h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
							General
						</h4>
						<div className="grid gap-4">
							<div className="flex flex-col gap-3 rounded-xl border border-border/50 bg-muted/15 p-4 sm:flex-row sm:items-center sm:justify-between">
								<div>
									<p className="font-medium">Task notifications</p>
									<p className="text-sm text-muted-foreground">
										Email when tasks are assigned or completed (coming soon)
									</p>
								</div>
								<Button variant="outline" size="sm" disabled>
									Configure
								</Button>
							</div>
							<div className="flex flex-col gap-3 rounded-xl border border-border/50 bg-muted/15 p-4 sm:flex-row sm:items-center sm:justify-between">
								<div>
									<p className="font-medium">Budget alerts</p>
									<p className="text-sm text-muted-foreground">
										Warn when spend passes a threshold (coming soon)
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
							<Shield className="h-4 w-4 text-muted-foreground" aria-hidden />
							<h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
								Access
							</h4>
						</div>
						<div className="grid gap-4">
							<div className="flex flex-col gap-3 rounded-xl border border-border/50 bg-muted/15 p-4 sm:flex-row sm:items-center sm:justify-between">
								<div>
									<p className="font-medium">Member visibility</p>
									<p className="text-sm text-muted-foreground">
										Control who can see financials (coming soon)
									</p>
								</div>
								<Button variant="outline" size="sm" disabled>
									Configure
								</Button>
							</div>
						</div>
					</section>

					<Separator className="bg-border/60" />

					<div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
						<Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
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
									<DialogTitle>Edit project</DialogTitle>
									<DialogDescription>
										Update name, description, and location. Budget and status
										are managed elsewhere.
									</DialogDescription>
								</DialogHeader>
								<div className="grid gap-4 py-4">
									<div className="space-y-2">
										<Label htmlFor="project-settings-name">Name</Label>
										<Input
											id="project-settings-name"
											value={form.name}
											onChange={(e) =>
												setForm((prev) => ({ ...prev, name: e.target.value }))
											}
											className="border-border/60"
										/>
									</div>
									<div className="space-y-2">
										<Label htmlFor="project-settings-desc">Description</Label>
										<Textarea
											id="project-settings-desc"
											value={form.description}
											onChange={(e) =>
												setForm((prev) => ({
													...prev,
													description: e.target.value,
												}))
											}
											className="border-border/60"
											rows={4}
										/>
									</div>
									<div className="space-y-2">
										<Label htmlFor="project-settings-location">Location</Label>
										<Input
											id="project-settings-location"
											value={form.location}
											onChange={(e) =>
												setForm((prev) => ({
													...prev,
													location: e.target.value,
												}))
											}
											className="border-border/60"
										/>
									</div>
								</div>
								<DialogFooter className="gap-2 border-t border-border/60 pt-4 sm:gap-2">
									<Button
										type="button"
										variant="outline"
										className={modalButtonCancelClass}
										onClick={() => setIsEditOpen(false)}
									>
										Cancel
									</Button>
									<Button
										type="button"
										variant="outline"
										className={modalButtonConfirmClass}
										onClick={handleSave}
										disabled={isSaving}
									>
										{isSaving ? "Saving…" : "Save changes"}
									</Button>
								</DialogFooter>
							</DialogContent>
						</Dialog>

						<AlertDialog>
							<AlertDialogTrigger asChild>
								<Button variant="destructive" className="w-full sm:max-w-xs">
									<Trash2 className="mr-2 h-4 w-4" aria-hidden />
									Delete project
								</Button>
							</AlertDialogTrigger>
							<AlertDialogContent className="border-border/60">
								<AlertDialogHeader>
									<AlertDialogTitle>Delete this project?</AlertDialogTitle>
									<AlertDialogDescription>
										This cannot be undone. Phases, tasks, and member links for
										this project will be removed.
									</AlertDialogDescription>
								</AlertDialogHeader>
								<AlertDialogFooter className="gap-2 sm:gap-2">
									<AlertDialogCancel className={cn(modalButtonCancelClass)}>
										Cancel
									</AlertDialogCancel>
									<AlertDialogAction
										onClick={handleDelete}
										className={cn(modalButtonDangerClass)}
									>
										Delete project
									</AlertDialogAction>
								</AlertDialogFooter>
							</AlertDialogContent>
						</AlertDialog>
					</div>
				</CardContent>
			</Card>
		</TabsContent>
	);
};
