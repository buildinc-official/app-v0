import React from "react";
import { IProfile, ITask } from "@/lib/types";

import { SummaryCard } from "@/components/base/general/SummaryCard";
import { CheckSquare, Clock } from "lucide-react";
import DashboardQuickActions from "./DashboardQuickActions";

const Dashboard = ({
	profile,
	tasks,
}: {
	profile: IProfile;
	tasks: ITask[];
}) => {
	const inProgressTasks = tasks.filter((task) => task.status === "Active");
	const awaitingApprovalTasks = tasks.filter(
		(task) => task.status === "Reviewing"
	);
	return (
		<div className="flex flex-1 flex-col">
			<div className="flex-1 space-y-6 p-6 mb-20">
				{/* Welcome Section */}
				<h2 className="text-2xl font-bold  mb-2">
					Welcome back, {profile?.name}!
				</h2>

				<div className="grid gap-6 md:grid-cols-2 ">
					<SummaryCard
						title="Tasks In-Progress "
						content={inProgressTasks.length}
						icon={<CheckSquare className="h-4 w-4 text-blue-600" />}
					/>

					<SummaryCard
						title="Tasks Awaiting Approval"
						content={awaitingApprovalTasks.length}
						icon={<Clock className="h-4 w-4 text-yellow-600" />}
					/>
				</div>
				<DashboardQuickActions />
				<div className="grid gap-6 lg:grid-cols">
					{/* <DashboardNotifications /> */}
					{/* <DashboardAssignedProjects /> */}
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
