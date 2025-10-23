"use client";

import { cn } from "@/lib/functions/utils";
import { createClient } from "@/lib/supabase/client";
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
import { useRouter } from "next/navigation";
import { useState } from "react";

export function UpdatePasswordForm({
	className,
	...props
}: React.ComponentPropsWithoutRef<"div">) {
	const [currentPassword, setCurrentPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const handlePasswordUpdate = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setError(null);
		setSuccess(null);

		// Validate passwords
		if (newPassword !== confirmPassword) {
			setError("New passwords do not match");
			setIsLoading(false);
			return;
		}

		if (newPassword.length < 6) {
			setError("Password must be at least 6 characters long");
			setIsLoading(false);
			return;
		}

		const supabase = createClient();

		try {
			// First verify the current password by signing in again
			const { data: userData, error: userError } =
				await supabase.auth.getUser();

			if (userError) {
				throw new Error(
					"Unable to verify your identity. Please try again."
				);
			}

			if (!userData.user?.email) {
				throw new Error("User email not found");
			}

			// Verify current password
			const { error: signInError } =
				await supabase.auth.signInWithPassword({
					email: userData.user.email,
					password: currentPassword,
				});

			if (signInError) {
				throw new Error("Current password is incorrect");
			}

			// Update to new password
			const { error: updateError } = await supabase.auth.updateUser({
				password: newPassword,
			});

			if (updateError) throw updateError;

			setSuccess("Password updated successfully!");

			// Clear form
			setCurrentPassword("");
			setNewPassword("");
			setConfirmPassword("");

			// Redirect after a short delay
			setTimeout(() => {
				router.push("/");
			}, 2000);
		} catch (error: unknown) {
			setError(
				error instanceof Error
					? error.message
					: "An error occurred while updating your password"
			);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div
			className={cn("flex flex-col gap-6", className)}
			{...props}
		>
			<Card>
				<CardHeader>
					<CardTitle className="text-2xl">
						Update Your Password
					</CardTitle>
					<CardDescription>
						For security, please verify your current password before
						setting a new one.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handlePasswordUpdate}>
						<div className="flex flex-col gap-6">
							{/* Current Password Field */}
							<div className="grid gap-2">
								<Label htmlFor="current-password">
									Current Password
								</Label>
								<Input
									id="current-password"
									type="password"
									placeholder="Enter your current password"
									required
									value={currentPassword}
									onChange={(e) =>
										setCurrentPassword(e.target.value)
									}
								/>
							</div>

							{/* New Password Field */}
							<div className="grid gap-2">
								<Label htmlFor="new-password">
									New Password
								</Label>
								<Input
									id="new-password"
									type="password"
									placeholder="Enter your new password"
									required
									minLength={6}
									value={newPassword}
									onChange={(e) =>
										setNewPassword(e.target.value)
									}
								/>
							</div>

							{/* Confirm New Password Field */}
							<div className="grid gap-2">
								<Label htmlFor="confirm-password">
									Confirm New Password
								</Label>
								<Input
									id="confirm-password"
									type="password"
									placeholder="Confirm your new password"
									required
									minLength={6}
									value={confirmPassword}
									onChange={(e) =>
										setConfirmPassword(e.target.value)
									}
								/>
							</div>

							{/* Password Requirements Hint */}
							<div className="text-sm text-muted-foreground">
								Password must be at least 6 characters long.
							</div>

							{error && (
								<p className="text-sm text-red-500">{error}</p>
							)}

							{success && (
								<p className="text-sm text-green-500">
									{success}
								</p>
							)}

							<Button
								type="submit"
								className="w-full"
								disabled={isLoading}
							>
								{isLoading ? "Updating..." : "Update Password"}
							</Button>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
