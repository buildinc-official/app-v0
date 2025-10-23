import { Button } from "@/components/base/ui/button";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "@/components/base/ui/card";
import { Bell, Users } from "lucide-react";
import React from "react";

type Props = {};

const DashboardNotifications = (props: Props) => {
	return (
		<div>
			<Card className="shadow-sm">
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<Bell className="h-5 w-5 text-blue-600" />
						Notifications
					</CardTitle>
					<CardDescription>
						Recent updates and invitations
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					{/* Organisation Invitation */}
					<div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
						<div className="flex items-start justify-between">
							<div className="flex items-start space-x-3">
								<Users className="h-5 w-5 text-blue-600 mt-0.5" />
								<div>
									<h4 className="font-medium text-blue-900">
										Organisation Invitation
									</h4>
									<p className="text-sm text-blue-700">
										BuildCorp Construction invited you to
										join their team
									</p>
								</div>
							</div>
						</div>
						<div className="flex gap-2 mt-3">
							<Button
								size="sm"
								className="bg-blue-600 hover:bg-blue-700"
							>
								Accept
							</Button>
							<Button
								size="sm"
								variant="outline"
							>
								Decline
							</Button>
						</div>
					</div>

					{/* Regular Notifications */}
					<div className="space-y-3">
						<div className="flex items-start space-x-3 p-3 hover:bg-slate-50 rounded-lg">
							<div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
							<div>
								<p className="font-medium">Task completed</p>
								<p className="text-sm text-slate-600">
									Foundation inspection - Downtown Office
								</p>
								<p className="text-xs text-slate-500">
									2 hours ago
								</p>
							</div>
						</div>

						<div className="flex items-start space-x-3 p-3 hover:bg-slate-50 rounded-lg">
							<div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
							<div>
								<p className="font-medium">New task assigned</p>
								<p className="text-sm text-slate-600">
									Material delivery verification
								</p>
								<p className="text-xs text-slate-500">
									4 hours ago
								</p>
							</div>
						</div>

						<div className="flex items-start space-x-3 p-3 hover:bg-slate-50 rounded-lg">
							<div className="w-2 h-2 bg-amber-600 rounded-full mt-2"></div>
							<div>
								<p className="font-medium">Payment approved</p>
								<p className="text-sm text-slate-600">
									Equipment rental - $2,500
								</p>
								<p className="text-xs text-slate-500">
									1 day ago
								</p>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default DashboardNotifications;
