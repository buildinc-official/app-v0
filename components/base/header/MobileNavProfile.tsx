"use client";
import { createClient } from "@/lib/supabase/client";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "../ui/sheet";
import Link from "next/link";
import { LogOut, Menu, Settings, User } from "lucide-react";
import { Button } from "../ui/button";
import { IProfile } from "@/lib/types";
import { useState } from "react";
import { ClearData } from "@/lib/functions/utils";

const MobileNavProfile = ({ profile }: { profile: IProfile }) => {
	const logout = async () => {
		const supabase = createClient();
		await supabase.auth.signOut();
		ClearData();
		window.location.href = "/";
	};
	const [open, setOpen] = useState(false);
	return (
		<Sheet
			open={open}
			onOpenChange={setOpen}
		>
			<SheetTrigger asChild>
				<User className="h-4 w-4 text-muted-foreground" />
			</SheetTrigger>

			<SheetContent
				side="bottom"
				className="rounded-t-2xl"
			>
				<SheetHeader className="text-left mb-6">
					<SheetTitle>Account</SheetTitle>
				</SheetHeader>

				<div className="flex flex-col gap-2 mx-3 mb-3">
					<div className="flex items-center gap-3 mb-4">
						<div className="bg-muted border-2 border-dashed rounded-full w-10 h-10 flex items-center justify-center">
							<User className="w-5 h-5 text-muted-foreground" />
						</div>
						<div className="flex flex-col">
							<span className="font-semibold truncate">
								{profile?.email}
							</span>
							<span className="text-xs text-muted-foreground">
								{profile?.bio || "No name provided"}
							</span>
						</div>
					</div>

					<Link
						href="/profile"
						onClick={() => setOpen(false)}
					>
						<Button
							variant="ghost"
							className="w-full justify-start gap-2 p-3 rounded-lg"
						>
							<User className="w-4 h-4 text-muted-foreground mb-1" />
							<span>Profile</span>
						</Button>
					</Link>
					<Link
						href="/settings"
						onClick={() => setOpen(false)}
					>
						<Button
							variant="ghost"
							className="w-full justify-start gap-2 p-3 rounded-lg"
						>
							<Settings className="w-4 h-4 text-muted-foreground mb-1" />
							<span>Settings</span>
						</Button>
					</Link>
					<Link
						href="/billing"
						onClick={() => setOpen(false)}
					>
						<Button
							variant="ghost"
							className="w-full justify-start gap-2 p-3 rounded-lg"
						>
							<Menu className="w-4 h-4 text-muted-foreground mb-1 " />

							<span>Billing & Plans</span>
						</Button>
					</Link>

					<Button
						variant="ghost"
						className="w-full justify-start gap-2 p-3 rounded-lg text-destructive hover:text-destructive"
						onClick={logout}
					>
						<LogOut />
						<span className="font-medium">Sign Out</span>
					</Button>
				</div>
			</SheetContent>
		</Sheet>
	);
};

export default MobileNavProfile;
