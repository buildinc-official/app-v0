import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/base/ui/card";
import { Progress } from "@/components/base/ui/progress";
import { Separator } from "@/components/base/ui/separator";
import { TabsContent } from "@/components/base/ui/tabs";
import { IOrganisation } from "@/lib/types";
import { formatDate, formatCurrency, OrgIcon } from "@/lib/functions/utils";
import { Calendar, File } from "lucide-react";
import React from "react";

const OrgOverview = ({
	organisation,
	totalBudget,
	totalSpent,
	budgetUtilization,
}: {
	organisation: IOrganisation;
	totalBudget: number;
	totalSpent: number;
	budgetUtilization: number;
}) => {
	return (
		<TabsContent
			value="overview"
			className="space-y-4 mx-1"
		>
			<div className="grid gap-4 md:grid-cols-2">
				<Card>
					<CardHeader>
						<CardTitle>Organization Information</CardTitle>
						<CardDescription>
							Basic details about the organisation
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="flex items-center space-x-2">
							<OrgIcon className="h-4 w-4 text-muted-foreground mb-1" />
							<span className=" font-bold">Name:</span>
							<span>{organisation.name}</span>
						</div>
						<div className="flex items-start space-x-2">
							<File className="h-4 w-4 text-muted-foreground mt-0.5" />
							<div>
								<span className="font-bold">Description:</span>
								<p className="text-sm mt-1">
									{organisation.description ||
										"No description provided"}
								</p>
							</div>
						</div>
						<div className="flex items-center space-x-2">
							<Calendar className="h-4 w-4 text-muted-foreground mb-1" />
							<span className="font-bold">Created:</span>
							<span>{formatDate(organisation.created_at)}</span>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Financial Overview</CardTitle>
						<CardDescription>
							Budget and spending across all projects
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="flex justify-between items-center">
							<span className="font-bold">Total Budget:</span>
							<span className="text-lg">
								{formatCurrency(totalBudget)}
							</span>
						</div>
						<div className="flex justify-between items-center">
							<span className="font-bold">Total Spent:</span>
							<span className="text-lg ">
								{formatCurrency(totalSpent)}
							</span>
						</div>
						<div className="flex justify-between items-center">
							<span className="font-bold">Remaining:</span>
							<span className="text-lg ">
								{formatCurrency(totalBudget - totalSpent)}
							</span>
						</div>
						<Separator />
						<div className="space-y-2">
							<div className="flex justify-between text-sm">
								<span>Budget Utilization</span>
								<span>{budgetUtilization.toFixed(1)}%</span>
							</div>
							<Progress
								value={budgetUtilization}
								className="bg-muted [&>div]:bg-secondary"
							/>
						</div>
					</CardContent>
				</Card>
			</div>
		</TabsContent>
	);
};

export default OrgOverview;
