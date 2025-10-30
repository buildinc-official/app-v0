import React from "react";
import MobileNav from "../header/MobileNav";
import SideBar from "../header/SideBar";
import { ThemeProvider } from "next-themes";
import TopBar from "../header/TopBar";
import { IProfile } from "@/lib/types";
import { StoreHydrator } from "./StoreHydrator";
import { User } from "@supabase/supabase-js";

export function AppLayout({
	children,
	profile,
	user,
}: {
	children: React.ReactNode;
	profile: IProfile | null;
	user: User | null;
}) {
	// console.log(user);

	return (
		<ThemeProvider
			attribute="class"
			defaultTheme="light"
			enableSystem
			disableTransitionOnChange
		>
			<div className=" min-h-screen min-w-screen">
				<StoreHydrator profile={profile} />
				{user && <TopBar profile={profile} />}
				{user && <SideBar profile={profile} />}
				{user ? (
					<div className="lg:max-w-[calc(100%-15rem)] lg:ml-[15rem] ml-0 min-w-screen mt-14 h-screen p-4 lg:p-6 z-30">
						{children}
					</div>
				) : (
					<div className="ml-0 min-w-screen h-screen z-30">
						{children}
					</div>
				)}

				{user && <MobileNav profile={profile} />}
			</div>
		</ThemeProvider>
	);
}
