import { SummaryCard } from "@/components/base/general/SummaryCard";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/base/ui/card";
import { Building2, CheckCircle, DollarSign, Package } from "lucide-react";
import React from "react";

type Props = {
	totalProjects: number;
	activeProjects: number;
	totalBudget: number;
};

const ProjectStatistics = ({
	totalProjects,
	activeProjects,
	totalBudget,
}: Props) => {
	return (
		<div className="grid gap-6 md:grid-cols-3">
			<SummaryCard
				title="Total Projects"
				content={totalProjects.toLocaleString()}
				icon={<Building2 className="h-5 w-5 text-blue-600" />}
			/>
			<SummaryCard
				title="Active Projects"
				content={activeProjects.toLocaleString()}
				icon={<CheckCircle className="h-5 w-5 text-green-600" />}
			/>
			<SummaryCard
				title="Total Budget"
				content={`${totalBudget.toLocaleString("en-IN")} ₹`}
				icon={<DollarSign className="h-5 w-5 text-green-600" />}
			/>
		</div>
	);
};

// const SummaryCard = ({
// 	title,
// 	content,
// 	icon,
// }: {
// 	title: string;
// 	content: string;
// 	icon?: React.ReactNode;
// }) => {
// 	return (
// 		<Card className="shadow-sm">
// 			<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
// 				<CardTitle className="text-sm font-medium">{title}</CardTitle>
// 				{icon}
// 			</CardHeader>
// 			<CardContent>
// 				<div className="text-2xl font-bold">{content}</div>
// 			</CardContent>
// 		</Card>
// 	);
// };

export default ProjectStatistics;
