import { IRequest } from "@/lib/types";
import React from "react";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "../base/ui/card";
import {
	Table,
	TableHeader,
	TableRow,
	TableHead,
	TableBody,
	TableCell,
} from "../base/ui/table";
import { getAllProfilesFromStore } from "@/lib/middleware/profiles";
import { Check, Inbox, X } from "lucide-react";
import { Button } from "../base/ui/button";
import {
	acceptOrgInvitation,
	refuseInvitation,
} from "@/lib/functions/organisationDetails";

const OrgMemberRequests = ({ requests }: { requests: IRequest[] }) => {
	const orgMemberRequests = requests.filter(
		(req) => req.type === "JoinOrganisation" && req.status === "Pending",
	);

	return (
		<Card className="border-border/60 bg-background/80 shadow-sm ring-1 ring-border/40 backdrop-blur-sm">
			<CardHeader className="space-y-1 pb-4 sm:pb-6">
				<CardTitle className="text-lg sm:text-xl">
					Organisation invitations
				</CardTitle>
				<CardDescription>
					Accept or decline requests to join an organisation.
				</CardDescription>
			</CardHeader>
			<CardContent className="pb-6">
				{orgMemberRequests.length > 0 ? (
					<>
						<ul className="space-y-3 lg:hidden">
							{orgMemberRequests.map((req) => {
								const requestedByProfile =
									getAllProfilesFromStore().find(
										(p) => p.id === req.requestedBy,
									);
								return (
									<li
										key={req.id}
										className="rounded-xl border border-border/60 bg-background/60 p-4 shadow-sm"
									>
										<p className="font-medium">
											{req.requestData.organisationName}
										</p>
										<p className="mt-1 text-sm text-muted-foreground">
											From{" "}
											<span className="text-foreground">
												{requestedByProfile?.name ??
													"Unknown"}
											</span>
										</p>
										<div className="mt-4 flex gap-2">
											<Button
												type="button"
												variant="secondary"
												size="sm"
												className="flex-1"
												onClick={() =>
													acceptOrgInvitation(req)
												}
											>
												<Check
													className="mr-1.5 h-4 w-4"
													aria-hidden
												/>
												Accept
											</Button>
											<Button
												type="button"
												variant="outline"
												size="sm"
												className="flex-1 border-destructive/30 text-destructive hover:bg-destructive/10"
												onClick={() =>
													refuseInvitation(req)
												}
											>
												<X
													className="mr-1.5 h-4 w-4"
													aria-hidden
												/>
												Decline
											</Button>
										</div>
									</li>
								);
							})}
						</ul>

						<div className="hidden overflow-x-auto lg:block">
							<Table>
								<TableHeader>
									<TableRow className="border-border/50 hover:bg-transparent">
										<TableHead className="pl-4">
											Requested by
										</TableHead>
										<TableHead>Organisation</TableHead>
										<TableHead className="pr-4 text-right">
											Actions
										</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{orgMemberRequests.map((req) => {
										const requestedByProfile =
											getAllProfilesFromStore().find(
												(p) =>
													p.id === req.requestedBy,
											);
										return (
											<TableRow
												key={req.id}
												className="border-border/40"
											>
												<TableCell className="pl-4">
													{requestedByProfile?.name ??
														"N/A"}
												</TableCell>
												<TableCell className="font-medium">
													{
														req.requestData
															.organisationName
													}
												</TableCell>
												<TableCell className="pr-4">
													<div className="flex justify-end gap-2">
														<Button
															type="button"
															variant="secondary"
															size="sm"
															onClick={() =>
																acceptOrgInvitation(
																	req,
																)
															}
														>
															<Check
																className="mr-1 h-4 w-4"
																aria-hidden
															/>
															Accept
														</Button>
														<Button
															type="button"
															variant="outline"
															size="sm"
															className="border-destructive/30 text-destructive hover:bg-destructive/10"
															onClick={() =>
																refuseInvitation(
																	req,
																)
															}
														>
															<X
																className="mr-1 h-4 w-4"
																aria-hidden
															/>
															Decline
														</Button>
													</div>
												</TableCell>
											</TableRow>
										);
									})}
								</TableBody>
							</Table>
						</div>
					</>
				) : (
					<div className="flex min-h-[8rem] flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border/60 bg-muted/20 px-4 py-10 text-center">
						<Inbox
							className="h-10 w-10 text-muted-foreground/60"
							aria-hidden
						/>
						<p className="text-sm text-muted-foreground">
							No pending invitations
						</p>
					</div>
				)}
			</CardContent>
		</Card>
	);
};

export default OrgMemberRequests;
