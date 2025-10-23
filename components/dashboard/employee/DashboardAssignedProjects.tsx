import { Badge } from "@/components/base/ui/badge";
import { Button } from "@/components/base/ui/button";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "@/components/base/ui/card";
import { Progress } from "@radix-ui/react-progress";
import { Clock, Bell, Users } from "lucide-react";
import React from "react";

type Props = {};

const DashboardAssignedProjects = (props: Props) => {
	return (
		<Card className="shadow-sm">
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					<Clock className="h-5 w-5 text-green-600" />
					Assigned Projects
				</CardTitle>
				<CardDescription>
					Projects you're currently working on
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="p-4 border rounded-lg">
					<div className="flex items-center justify-between mb-2">
						<h3 className="font-semibold">
							Downtown Office Complex
						</h3>
						<Badge variant="secondary">Active</Badge>
					</div>
					<p className="text-sm text-slate-600 mb-2">
						Foundation and structural work
					</p>
					<div className="space-y-1">
						<div className="flex justify-between text-sm">
							<span>Progress</span>
							<span>75%</span>
						</div>
						<Progress
							value={75}
							className="h-2"
						/>
					</div>
				</div>

				<div className="p-4 border rounded-lg">
					<div className="flex items-center justify-between mb-2">
						<h3 className="font-semibold">Highway Bridge Repair</h3>
						<Badge variant="secondary">Active</Badge>
					</div>
					<p className="text-sm text-slate-600 mb-2">
						Safety inspection and repairs
					</p>
					<div className="space-y-1">
						<div className="flex justify-between text-sm">
							<span>Progress</span>
							<span>90%</span>
						</div>
						<Progress
							value={90}
							className="h-2"
						/>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default DashboardAssignedProjects;
