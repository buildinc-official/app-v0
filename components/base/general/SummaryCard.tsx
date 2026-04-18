import type { ReactNode } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { cn } from "@/lib/functions/utils";

export const SummaryCard = ({
	title,
	content,
	icon,
	className,
}: {
	title: string;
	content: number | string | ReactNode;
	icon?: ReactNode;
	className?: string;
}) => {
	return (
		<Card className={cn("shadow-sm text-card-foreground", className)}>
			<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle className="text-sm font-medium text-card-foreground">
					{title}
				</CardTitle>
				{icon}
			</CardHeader>
			<CardContent>
				<div className="text-2xl font-bold">{content}</div>
			</CardContent>
		</Card>
	);
};
