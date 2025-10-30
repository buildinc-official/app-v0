import { useProfileStore } from "@/lib/store/profileStore";
import React, { useState, useEffect } from "react";
import { role } from "@/lib/types";
import { Button } from "@/components/base/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
} from "@/components/base/ui/dialog";
import { Label } from "@/components/base/ui/label";
import { changeUserRole } from "@/lib/functions/projectDetails";

const ChangeRoleModal = ({
	isOpen,
	onOpenChange,
	user,
	originalRole,
	projectId,
	id,
}: {
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
	user: string;
	originalRole: string;
	projectId: string;
	id: string;
}) => {
	const [role, setRole] = useState<role>(originalRole as role);
	const [loading, setLoading] = useState(false);
	const memberProfile = useProfileStore((state) =>
		state.allProfiles.find((profile) => profile.id === user)
	);

	const handleSubmit = async (e: React.FormEvent) => {
		if (role === originalRole) {
			onOpenChange(false);
			return;
		}
		setLoading(true);
		changeUserRole(id, projectId, role);
		setLoading(false);
		onOpenChange(false);
	};

	// Close modal when clicking outside
	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (isOpen) {
				const modalContent = document.querySelector(
					"[data-radix-dialog-content]"
				);
				if (modalContent && !modalContent.contains(e.target as Node)) {
					onOpenChange(false);
				}
			}
		};

		if (isOpen) {
			document.addEventListener("mousedown", handleClickOutside);
			// Add backdrop
			document.body.style.overflow = "hidden";
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
			document.body.style.overflow = "unset";
		};
	}, [isOpen, onOpenChange]);

	return (
		<>
			{/* Backdrop */}
			{isOpen && (
				<div
					className="fixed inset-0 bg-black/50 z-50"
					onClick={() => onOpenChange(false)}
				/>
			)}

			<Dialog
				open={isOpen}
				onOpenChange={onOpenChange}
				modal={false}
			>
				<DialogContent
					className="sm:max-w-[425px] z-50"
					onPointerDownOutside={(e) => {
						e.preventDefault();
						onOpenChange(false);
					}}
					onInteractOutside={(e) => e.preventDefault()}
				>
					<div>
						<DialogHeader>
							<DialogTitle>Change member role</DialogTitle>
							<DialogDescription>
								Update the role for a member in your
								organisation.
							</DialogDescription>
						</DialogHeader>

						<div className="space-y-4">
							<div className="flex items-start gap-4 p-4 bg-muted/50 border border-muted rounded-md">
								<div className="flex-1 min-w-0">
									<div className="text-sm font-medium">
										{memberProfile?.name ??
											"Unknown member"}
									</div>
									<div className="mt-1 text-xs text-muted-foreground">
										Email: {memberProfile?.email ?? "—"}
									</div>
								</div>
							</div>

							<div>
								<Label htmlFor="role-select">Role</Label>
								<select
									id="role-select"
									value={role}
									onChange={(e) =>
										setRole(e.target.value as role)
									}
									className="w-full rounded-md border px-3 py-2"
								>
									<option value="Admin">Admin</option>
									<option value="Supervisor">
										Supervisor
									</option>
									<option value="Employee">Employee</option>
								</select>
							</div>

							<DialogFooter>
								<Button
									variant="ghost"
									type="button"
									onClick={() => onOpenChange(false)}
									disabled={loading}
								>
									Cancel
								</Button>
								<Button
									disabled={loading}
									onClick={handleSubmit}
								>
									{loading ? "Saving..." : "Save changes"}
								</Button>
							</DialogFooter>
						</div>
					</div>
				</DialogContent>
			</Dialog>
		</>
	);
};

export default ChangeRoleModal;
