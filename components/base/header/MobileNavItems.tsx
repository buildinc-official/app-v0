"use client";
import { navItems } from "@/lib/constants/navitems";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import MobileNavProfile from "./MobileNavProfile";
import { IProfile } from "@/lib/types";

const MobileNavItems = ({ profile }: { profile: IProfile }) => {
	const pathname = usePathname();

	return (
		<div className="fixed inset-x-0 bottom-0 flex justify-around bg-background border-t p-2 lg:hidden z-50 border-primary/10 ">
			{navItems.map((item) => {
				const isActive = pathname === item.href;
				if (!item.mobile) return null;
				if (
					(item.admin && profile.admin) ||
					(item.user && !profile.admin)
				) {
					if (item.label === "Profile") {
						return (
							<MobileNavProfile
								profile={profile}
								key={item.href}
							/>
						);
					} else {
						return (
							<Link
								key={item.href}
								href={item.href}
							>
								<item.icon
									className={clsx(
										"h-8 w-8 rounded-full p-2",
										isActive
											? "text-secondary-foreground bg-secondary"
											: "text-muted-foreground"
									)}
								/>
							</Link>
						);
					}
				}
			})}
		</div>
	);
};

export default MobileNavItems;
