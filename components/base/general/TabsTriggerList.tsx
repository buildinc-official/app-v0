import React from "react";
import { TabsList, TabsTrigger } from "../ui/tabs";

export interface ITabTrigger {
	value: string;
	label: string;
	count?: number;
}

export interface ITabsTriggerList {
	triggers: ITabTrigger[];
}

export const TabsTriggerList = ({ triggers }: ITabsTriggerList) => {
	return (
		<TabsList
			className={`grid w-full grid-cols-${triggers.length} p-0 mb-5`}
		>
			{triggers.map((trigger, index) => {
				// Determine rounded corners based on position
				const roundedClass =
					index === 0
						? "rounded-r-none"
						: index === triggers.length - 1
						? "rounded-l-none"
						: "rounded-none";

				return (
					<TabsTrigger
						key={trigger.value}
						value={trigger.value}
						className={`flex items-center gap-2 data-[state=active]:bg-card/40 m-0 ${roundedClass}`}
					>
						{trigger.count !== undefined
							? `${trigger.label} (${trigger.count})`
							: trigger.label}
					</TabsTrigger>
				);
			})}
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
