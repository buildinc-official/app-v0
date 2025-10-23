import React from "react";
import MobileNav from "../header/MobileNav";
import SideBar from "../header/SideBar";
import { ThemeProvider } from "next-themes";
import TopBar from "../header/TopBar";
import { IProfile } from "@/lib/types";
import { User } from "@supabase/supabase-js";
import { StoreHydrator } from "./StoreHydrator";

export function AppLayout({
	children,
	profile,
}: {
	children: React.ReactNode;
	profile: IProfile | null;
}) {
	return (
		<ThemeProvider
			attribute="class"
			defaultTheme="system"
			enableSystem
			disableTransitionOnChange
		>
			<div className=" min-h-screen min-w-screen">
				<StoreHydrator profile={profile} />
				<TopBar profile={profile} />
				<SideBar profile={profile} />
				<div className="lg:max-w-[calc(100%-15rem)] lg:ml-[15rem] ml-0 min-w-screen mt-14 h-screen p-4 lg:p-6 z-30">
					{children}
				</div>
				<MobileNav profile={profile} />
			</div>
		</ThemeProvider>
	);
}
