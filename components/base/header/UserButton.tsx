import { Button } from "../ui/button";
import Link from "next/link";
import { IProfile } from "@/lib/types";

export const UserButton = ({ profile }: { profile: IProfile | null }) => {
	if (!profile)
		return (
			<div className="flex gap-2 ">
				<Button
					asChild
					size="sm"
					variant={"outline"}
					className="bg-button-primary text-button-primary-foreground"
				>
					<Link href="/auth/login">Log In</Link>
				</Button>
				<Button
					asChild
					size="sm"
					variant={"outline"}
					className="bg-button-secondary text-button-secondary-foreground"
				>
					<Link href="/auth/sign-up">Sign up</Link>
				</Button>
			</div>
		);

	// return <UserDropdown profile={profile} />;
};
