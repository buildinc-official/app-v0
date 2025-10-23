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
					? " lg:max-w-[calc(100%-15rem)]  self-end px-4"
					: "min-w-screen  px-6"
			} fixed top-0 right-0 bg-background border-b py-2.5 z-50 flex items-center justify-between w-full border-primary/10 h-16`}
		>
			{profile ? (
				<CurrentPage />
			) : (
				<div className="flex gap-5 items-center font-semibold md:text-xl h-full">
					<Link href={"/"}>BuildInc</Link>
				</div>
			)}
			<div className="flex items-center gap-4">
				<ThemeSwitcher />
				<div className="hidden lg:flex items-center gap-4">
					<UserButton profile={profile} />
				</div>
			</div>
		</nav>
	);
};

export default TopBar;
