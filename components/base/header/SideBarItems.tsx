"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/base/ui/button";
import clsx from "clsx";
import { navItems } from "@/lib/constants/navitems";
import React from "react";
import { IProfile } from "@/lib/types";

const SideBarItems = ({ profile }: { profile: IProfile }) => {
	const pathname = usePathname();
	return (
		<div>
			{navItems.map((item) => {
				const isActive = pathname === item.href;
				if (!item.sidebar) return null;
				if (
					(item.admin && profile.admin) ||
					(item.user && !profile.admin)
				) {
					return (
						<Link
							key={item.href}
							href={item.href}
							className="w-full"
						>
							<Button
								variant="ghost"
								className={clsx(
									"w-full rounded-none px-4 py-7 justify-start text-left font-normal",
									isActive &&
										"bg-primary/10 text-primary hover:bg-primary/5 font-semibold"
								)}
							>
								<item.icon className="mr-2 h-5 w-5" />
								{item.label}
							</Button>
						</Link>
					);
				}
			})}
		</div>
	);
};

export default SideBarItems;
