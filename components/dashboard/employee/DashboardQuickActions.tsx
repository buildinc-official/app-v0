import { Button } from "@/components/base/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/base/ui/card";
import { CheckSquare, Package, CreditCard, AlertCircle } from "lucide-react";
import React from "react";

type Props = {};

const DashboardQuickActions = (props: Props) => {
	return (
		<Card className="shadow-sm">
			<CardHeader>
				<CardTitle>Quick Actions</CardTitle>
				<CardDescription>
					Common tasks you can perform quickly
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
					<Button
						size="lg"
						variant="outline"
						className="h-20 flex-col bg-transparent"
					>
						<CheckSquare className="h-6 w-6 mb-2" />
						View Tasks
					</Button>
					<Button
						size="lg"
						variant="outline"
						className="h-20 flex-col bg-transparent"
					>
						<Package className="h-6 w-6 mb-2" />
						Log Materials
					</Button>
					<Button
						size="lg"
						variant="outline"
						className="h-20 flex-col bg-transparent"
					>
						<CreditCard className="h-6 w-6 mb-2" />
						Log Payment
					</Button>
					<Button
						size="lg"
						variant="outline"
						className="h-20 flex-col bg-transparent"
					>
						<AlertCircle className="h-6 w-6 mb-2" />
						Report Issue
					</Button>
				</div>
			</CardContent>
		</Card>
	);
};

export default DashboardQuickActions;
