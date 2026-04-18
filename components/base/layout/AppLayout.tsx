"use client";
import { ClearData } from "@/lib/functions/utils";
import { createClient } from "@/lib/supabase/client";
import { IProfile } from "@/lib/types";
import { User } from "@supabase/supabase-js";
import { ThemeProvider } from "next-themes";
import React, { useEffect, useState } from "react";
import MobileNav from "../header/MobileNav";
import SideBar from "../header/SideBar";
import TopBar from "../header/TopBar";
import LoadingSpinner from "./LoadingSpinner";
import { StoreHydrator } from "./StoreHydrator";
import { Toaster } from "@/components/base/ui/sonner";

export function AppLayout({
	children,
	profile,
	user,
}: {
	children: React.ReactNode;
	profile: IProfile | null;
	user: User | null;
}) {
	const supabase = createClient();
	const [ready, setReady] = useState(false);
	const EXPIRY_MS = 524 * 60 * 60 * 1000; // 1 min test; 24h prod

	useEffect(() => {
		const checkExpiry = async () => {
			try {
				const lastActiveAt = parseInt(
					localStorage.getItem("lastActiveAt") || "0",
					10,
				);
				const now = Date.now();
				if (now - lastActiveAt > EXPIRY_MS) {
					await supabase.auth.signOut();
					ClearData();
					// router.push("/"); // redirect to home or login page
					return;
				}
			} catch (err) {
				console.error("[Layout] Expiry check failed:", err);
			} finally {
				setReady(true);
				// window.location.reload();
			}
		};

		checkExpiry();
	}, []);

	if (!ready) {
		return (
			<div className="flex items-center justify-center h-screen">
				<span className="text-sm text-gray-500">
					<LoadingSpinner />
				</span>
			</div>
		);
	}
	return (
		<ThemeProvider
			attribute="class"
			defaultTheme="light"
			enableSystem
			disableTransitionOnChange
		>
			<div className=" min-h-screen min-w-screen">
				<Toaster />
				<StoreHydrator profile={profile} />
				{user && <TopBar profile={profile} />}
				{user && <SideBar profile={profile} />}
				{user ? (
					<div
						className={`z-30 ml-0 min-h-screen min-w-screen lg:ml-[15rem] lg:max-w-[calc(100%-15rem)] lg:p-6 ${
							profile ? "mt-14 lg:mt-0" : "mt-14"
						} h-screen p-4`}
					>
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
