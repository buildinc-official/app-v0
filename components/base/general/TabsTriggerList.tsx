import React from "react";
import { TabsList, TabsTrigger } from "../ui/tabs";
import { cn } from "@/lib/functions/utils";

export interface ITabTrigger {
	value: string;
	label: string;
	count?: number;
}

export interface ITabsTriggerList {
	triggers: ITabTrigger[];
	className?: string;
}

export const TabsTriggerList = ({ triggers, className }: ITabsTriggerList) => {
	return (
		<TabsList
			className={cn(
				"mb-6 grid h-auto w-full gap-1 rounded-xl border border-border/60 bg-muted/30 p-1.5 shadow-sm ring-1 ring-border/30",
				className
			)}
			style={{
				gridTemplateColumns: `repeat(${triggers.length}, minmax(0, 1fr))`,
			}}
		>
			{triggers.map((trigger) => (
				<TabsTrigger
					key={trigger.value}
					value={trigger.value}
					className="rounded-lg px-2 py-2.5 text-xs font-medium text-muted-foreground shadow-none transition-colors data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm sm:px-3 sm:text-sm"
				>
					{trigger.count !== undefined
						? `${trigger.label} (${trigger.count})`
						: trigger.label}
				</TabsTrigger>
			))}
		</TabsList>
	);
};
// Optional: Individual trigger component if needed elsewhere
const TabTrigger = ({ value, label, count }: ITabTrigger) => {
	return (
		<TabsTrigger
			value={value}
			className="flex items-center gap-2 data-[state=active]:bg-card/40 m-0"
		>
			{count !== undefined ? `${label} (${count})` : label}
		</TabsTrigger>
	);
};
