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
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Select } from "@/components/base/ui/select";
import { Switch } from "@/components/base/ui/switch";

export function SignUpForm({
	className,
	...props
}: React.ComponentPropsWithoutRef<"div">) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [repeatPassword, setRepeatPassword] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [name, setName] = useState("");
	const [bio, setBio] = useState("");
	const [admin, setAdmin] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const handleSignUp = async (e: React.FormEvent) => {
		e.preventDefault();
		const supabase = createClient();
		setIsLoading(true);
		setError(null);

		if (password !== repeatPassword) {
			setError("Passwords do not match");
			setIsLoading(false);
			return;
		}

		try {
			const { error } = await supabase.auth.signUp({
				email,
				password,
				options: {
					data: {
						name: name,
						bio: bio,
						admin: admin,
					},
				},
			});
			if (error) throw error;
			router.push("/auth/sign-up-success");
		} catch (error: unknown) {
			setError(
				error instanceof Error ? error.message : "An error occurred"
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
			<Card className="bg-secondary text-white">
				<CardHeader>
					<CardTitle className="text-2xl">Sign up</CardTitle>
					<CardDescription className="text-white/90">
						Create a new account
					</CardDescription>
					<div className="flex w-full">
						<Button
							type="button"
							onClick={() => setAdmin(false)}
							className={cn(
								"flex-1 rounded-none rounded-l-md",
								!admin
									? "bg-white text-gray-700 border"
									: "bg-white/10 text-gray-500"
							)}
						>
							User
						</Button>
						<Button
							type="button"
							onClick={() => setAdmin(true)}
							className={cn(
								"flex-1 rounded-none rounded-r-md",
								admin
									? "bg-white text-gray-700 border"
									: "bg-white/10 text-gray-500"
							)}
						>
							Admin
						</Button>
					</div>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSignUp}>
						<div className="flex flex-col gap-6">
							<div className="grid gap-2">
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									type="email"
									placeholder="m@example.com"
									required
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>
							<div className="grid gap-2">
								<Label htmlFor="name">Name</Label>
								<Input
									id="name"
									type="text"
									placeholder="Your name"
									required
									value={name}
									onChange={(e) => setName(e.target.value)}
								/>
							</div>
							<div className="grid gap-2">
								<Label htmlFor="bio">Bio</Label>
								<Input
									id="bio"
									type="text"
									placeholder="Tell us about yourself"
									value={bio}
									onChange={(e) => setBio(e.target.value)}
								/>
							</div>

							<div className="grid gap-2">
								<div className="flex items-center">
									<Label htmlFor="password">Password</Label>
								</div>
								<Input
									id="password"
									type="password"
									required
									value={password}
									onChange={(e) =>
										setPassword(e.target.value)
									}
								/>
							</div>
							<div className="grid gap-2">
								<div className="flex items-center">
									<Label htmlFor="repeat-password">
										Repeat Password
									</Label>
								</div>
								<Input
									id="repeat-password"
									type="password"
									required
									value={repeatPassword}
									onChange={(e) =>
										setRepeatPassword(e.target.value)
									}
								/>
							</div>
							{error && (
								<p className="text-sm text-red-500">{error}</p>
							)}
							<Button
								type="submit"
								className="w-full bg-white/70"
								disabled={isLoading}
							>
								{isLoading
									? "Creating an account..."
									: "Sign up"}
							</Button>
						</div>
						<div className="mt-4 text-center text-sm">
							Already have an account?{" "}
							<Link
								href="/auth/login"
								className="underline underline-offset-4"
							>
								Login
							</Link>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
