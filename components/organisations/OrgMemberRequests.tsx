import { IRequest, IOrganisation } from "@/lib/types";
import React from "react";
import LoadingSpinner from "../base/layout/LoadingSpinner";
import { Card, CardHeader, CardTitle, CardContent } from "../base/ui/card";
import {
	Table,
	TableHeader,
	TableRow,
	TableHead,
	TableBody,
	TableCell,
} from "../base/ui/table";
import {
	getAllProfiles,
	getAllProfilesFromStore,
	getProfileFromStore,
} from "@/lib/middleware/profiles";
import { Check } from "lucide-react";
import { Button } from "../base/ui/button";
import {
	acceptOrgInvitation,
	refuseInvitation,
} from "@/lib/functions/organisationDetails";

const OrgMemberRequests = ({ requests }: { requests: IRequest[] }) => {
	const orgMemberRequests = requests.filter(
		(req) => req.type === "JoinOrganisation" && req.status === "Pending"
	);
	return (
		<Card className="shadow-sm">
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					Organisation Requests
				</CardTitle>
			</CardHeader>
			<CardContent>
				{orgMemberRequests.length > 0 ? (
					<Table>
						<TableHeader>
							<TableRow className="divide-x divide-gray-200 border-b-2 border-gray-200 hover:bg-card border-l border-r border-t">
								<TableHead className="min-w-[100px] text-center">
									Requested By
								</TableHead>
								<TableHead className="min-w-[100px] text-center">
									Organisation
								</TableHead>
								<TableHead className="min-w-[100px] text-center">
									Actions
								</TableHead>
							</TableRow>
						</TableHeader>

						<TableBody>
							{orgMemberRequests.map((req) => {
								const requestedByProfile =
									getAllProfilesFromStore().find(
										(profile) =>
											profile.id === req.requestedBy
									);

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
											{req.requestData.organisationName}
										</TableCell>
										<TableCell className="text-center">
											<div className="flex justify-center gap-2">
												<Button
													variant={"secondary"}
													title="Accept"
													onClick={() =>
														acceptOrgInvitation(req)
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

export default OrgMemberRequests;
