import { Button } from "../ui/button";
import Link from "next/link";
import { IProfile } from "@/lib/types";

export const UserButton = ({
	profile,
	theme = "light",
}: {
	profile: IProfile | null;
	theme?: "light" | "dark";
}) => {
	if (!profile)
		return (
			<div className="flex gap-2">
				<Button
					asChild
					size="sm"
					variant="outline"
					className={
						theme === "dark"
							? "border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white"
							: "border-border bg-background text-foreground hover:bg-muted"
					}
				>
					<Link href="/auth/login">Log In</Link>
				</Button>
				<Button
					asChild
					size="sm"
					className={
						theme === "dark"
							? "bg-white font-medium text-secondary shadow-sm hover:bg-white/90"
							: "bg-secondary font-medium text-secondary-foreground shadow-sm ring-1 ring-border/40 hover:brightness-110 dark:ring-border/60"
					}
				>
					<Link href="/auth/sign-up">Sign up</Link>
				</Button>
			</div>
		);

	// return <UserDropdown profile={profile} />;
};
