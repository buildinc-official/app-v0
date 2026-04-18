"use client";

import { Button } from "@/components/base/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/base/ui/card";
import { cn } from "@/lib/functions/utils";
import { Laptop, Moon, Palette, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const options = [
	{ value: "light" as const, label: "Light", icon: Sun },
	{ value: "dark" as const, label: "Dark", icon: Moon },
	{ value: "system" as const, label: "System", icon: Laptop },
];

export function AppearanceSettingsCard() {
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	return (
		<Card className="border-border/60 bg-background/80 shadow-sm ring-1 ring-border/40 backdrop-blur-sm">
			<CardHeader className="space-y-3 pb-4">
				<div className="flex items-center gap-3">
					<span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-500/15 text-amber-800 ring-1 ring-amber-500/25 dark:text-amber-300">
						<Palette className="h-4 w-4" aria-hidden />
					</span>
					<CardTitle className="text-lg sm:text-xl">Appearance</CardTitle>
				</div>
				<CardDescription className="text-pretty">
					Choose how BuildInc looks on this device. System follows your OS
					theme.
				</CardDescription>
			</CardHeader>
			<CardContent className="pb-6">
				{!mounted ? (
					<p className="text-sm text-muted-foreground">Loading theme…</p>
				) : (
					<div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
						{options.map(({ value, label, icon: Icon }) => {
							const selected = theme === value;
							return (
								<Button
									key={value}
									type="button"
									variant="outline"
									onClick={() => setTheme(value)}
									className={cn(
										"h-auto flex-col gap-2 py-4",
										"border-border/60 bg-background/80 shadow-sm ring-1 ring-border/40 backdrop-blur-sm transition-all",
										selected &&
											"border-primary/40 bg-primary/5 ring-primary/25",
									)}
								>
									<Icon className="h-5 w-5 opacity-90" aria-hidden />
									<span className="text-sm font-medium">{label}</span>
								</Button>
							);
						})}
					</div>
				)}
			</CardContent>
		</Card>
	);
}
