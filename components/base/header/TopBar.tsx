import React from "react";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { UserButton } from "./UserButton";
import { CurrentPage } from "./CurrentPage";
import Link from "next/link";
import { IProfile } from "@/lib/types";

const TopBar = ({ profile }: { profile: IProfile | null }) => {
	return (
		<nav
			className={`${
				profile
					? "px-4 lg:hidden"
					: "min-w-screen px-6"
			} fixed top-0 right-0 z-50 flex h-16 w-full items-center justify-between border-b border-primary/10 bg-background py-2.5`}
		>
			{profile ? (
				<CurrentPage />
			) : (
				<div className="flex gap-5 items-center font-semibold md:text-xl h-full">
					<Link href={"/"}>BuildInc</Link>
				</div>
			)}
			<div className="flex items-center gap-4">
				{/* <ThemeSwitcher /> */}
				<div className="hidden items-center gap-4 lg:flex">
					<UserButton profile={profile} />
				</div>
			</div>
		</nav>
	);
};

export default TopBar;
