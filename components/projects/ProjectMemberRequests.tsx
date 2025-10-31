import { refuseInvitation } from "@/lib/functions/organisationDetails";
import { acceptProjectInvitation } from "@/lib/functions/projectDetails";
import { getAllProfilesFromStore } from "@/lib/middleware/profiles";
import { IRequest } from "@/lib/types";
import { Check } from "lucide-react";
import { Button } from "../base/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../base/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../base/ui/table";

const ProjectMemberRequests = ({ requests }: { requests: IRequest[] }) => {
	const ProjectMemberRequests = requests.filter(
		(req) => req.type === "JoinProject" && req.status === "Pending"
	);
	return (
		<Card className="shadow-sm">
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					Project Requests
				</CardTitle>
			</CardHeader>
			<CardContent>
				{ProjectMemberRequests.length > 0 ? (
					<Table>
						<TableHeader>
							<TableRow className="divide-x divide-gray-200 border-b-2 border-gray-200 hover:bg-card border-l border-r border-t">
								<TableHead className="min-w-[100px] text-center">
									Requested By
								</TableHead>
								<TableHead className="min-w-[100px] text-center">
									Project
								</TableHead>
								<TableHead className="min-w-[100px] text-center">
									Actions
								</TableHead>
							</TableRow>
						</TableHeader>

						<TableBody>
							{ProjectMemberRequests.map((req) => {
								const requestedByProfile =
									getAllProfilesFromStore().find(
										(profile) =>
											profile.id === req.requestedBy
									);
								//  // console.log(req);

								return (
									<TableRow
										key={req.id}
										className=" cursor-pointer h-16"
									>
										<TableCell className="text-center">
											{requestedByProfile
												? requestedByProfile.name
												: "N/A"}
										</TableCell>
										<TableCell className="text-center">
											{req.requestData.projectName}
										</TableCell>
										<TableCell className="text-center">
											<div className="flex justify-center gap-2">
												<Button
													variant={"default"}
													title="Accept"
													onClick={() =>
														acceptProjectInvitation(
															req
														)
													}
												>
													<Check size={18} />
												</Button>
												<Button
													variant={"destructive"}
													title="Refuse"
													onClick={() =>
														refuseInvitation(req)
													}
												>
													<span className="text-lg font-bold">
														×
													</span>
												</Button>
											</div>
										</TableCell>
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
				) : (
					<div className="h-[100px] text-center w-full flex items-center justify-center text-sm text-muted-foreground">
						No Requests
					</div>
				)}
			</CardContent>
		</Card>
	);
};

export default ProjectMemberRequests;
