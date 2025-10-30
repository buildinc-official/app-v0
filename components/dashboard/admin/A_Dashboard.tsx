import ActiveProjects from "./ActiveProjects";
import QuickAction from "./QuickAction";
import RecentActivity from "./RecentActivity";
import Summary from "./Summary";

export default function A_Dashboard() {
	return (
		<div className="flex flex-1 flex-col pb-12">
			<div className="flex-1 space-y-6 p-1">
				<Summary />
				<QuickAction />
				<div className="grid gap-6 lg:grid-cols-2">
					<ActiveProjects />
					{/* <RecentActivity /> */}
				</div>
			</div>
		</div>
	);
}
