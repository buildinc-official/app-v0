import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "@/components/base/ui/card";
import { TrendingUp } from "lucide-react";
import React from "react";

type Props = {};

const RecentActivity = (props: Props) => {
	return (
		<Card className="shadow-sm">
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					<TrendingUp className="h-5 w-5 text-green-600" />
					Recent Activity
				</CardTitle>
				<CardDescription>
					Latest updates from your projects
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="flex items-start space-x-3">
					<div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
					<div>
						<p className="font-medium">
							Material delivery approved
						</p>
						<p className="text-sm text-slate-600">
							Downtown Office Complex • 2 hours ago
						</p>
					</div>
				</div>

				<div className="flex items-start space-x-3">
					<div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
					<div>
						<p className="font-medium">
							Task completed: Foundation pour
						</p>
						<p className="text-sm text-slate-600">
							Residential Tower A • 4 hours ago
						</p>
					</div>
				</div>

				<div className="flex items-start space-x-3">
					<div className="w-2 h-2 bg-amber-600 rounded-full mt-2"></div>
					<div>
						<p className="font-medium">Budget alert: 80% used</p>
						<p className="text-sm text-slate-600">
							Highway Bridge Repair • 6 hours ago
						</p>
					</div>
				</div>

				<div className="flex items-start space-x-3">
					<div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
					<div>
						<p className="font-medium">New team member added</p>
						<p className="text-sm text-slate-600">
							BuildCorp Organization • 1 day ago
						</p>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default RecentActivity;
