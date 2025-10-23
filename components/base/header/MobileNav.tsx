"use client";
import React from "react";

import MobileNavItems from "./MobileNavItems";
import { UserButton } from "./UserButton";
import { IProfile } from "@/lib/types";

const MobileNav = ({ profile }: { profile: IProfile | null }) => {
	if (!profile)
		return (
			<div className="fixed inset-x-0 bottom-0 flex justify-around bg-background border-t p-2 lg:hidden">
				<UserButton profile={profile} />
			</div>
		);

	if (profile) return <MobileNavItems profile={profile} />;
};

export default MobileNav;
