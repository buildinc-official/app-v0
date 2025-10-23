"use client";
import { useState } from "react";
import { Button } from "@/components/base/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/base/ui/table";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
} from "@/components/base/ui/dropdown-menu";
import { IOrganisation, IOrganisationProfile } from "@/lib/types";
import { formatDate } from "@/lib/functions/utils";
import { MoreHorizontal } from "lucide-react";
import AddMember from "./AddMember";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/base/ui/card";
import {
	getOrganisationMembers,
	getOrganisationMembersFromStore,
	removeOrganisationMember,
} from "@/lib/middleware/organisationMembers";

const PAGE_SIZE = 10;

const OrgMembers = ({ organisation }: { organisation: IOrganisation }) => {
	const members = getOrganisationMembersFromStore(organisation.id);
	const [page, setPage] = useState(1);

	const startIndex = (page - 1) * PAGE_SIZE;
	const endIndex = startIndex + PAGE_SIZE;
	const paginatedMembers = members.slice(startIndex, endIndex);

	const totalPages = Math.ceil(members.length / PAGE_SIZE);

	return (
		<Card className="shadow-sm">
			<CardHeader className="flex flex-col md:flex-row md:justify-between md:items-center space-y-3 md:space-y-0">
				<div className="space-y-1">
					<CardTitle>Members</CardTitle>
					<CardDescription>
						All the members associated with this organisation
					</CardDescription>
				</div>
				<AddMember organisation={organisation} />
			</CardHeader>
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow className="divide-x divide-gray-200 border-b-2 border-gray-200 hover:bg-card border-l border-r border-t">
							<TableHead className="min-w-[200px] text-center">
								Name
							</TableHead>
							<TableHead className="min-w-[110px] text-center">
								Role
							</TableHead>
							<TableHead className="min-w-[200px] text-center">
								Email
							</TableHead>
							<TableHead className="min-w-[100px] text-center">
								Joined
							</TableHead>
							<TableHead className="text-center min-w-[80px]">
								Actions
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody className="">
						{paginatedMembers.length > 0 ? (
							paginatedMembers.map(
								(member: IOrganisationProfile) => (
									<TableRow
										key={member.id}
										className=""
									>
										<TableCell className="text-center font-medium">
											{member.name ?? "Unnamed"}
										</TableCell>
										<TableCell className="text-center">
											<p>{member.memberInfo?.role}</p>
										</TableCell>
										<TableCell className="text-center">
											{member.email}
										</TableCell>
										<TableCell className="text-center">
											{member.memberInfo?.joinedAt
												? formatDate(
														member.memberInfo
															?.joinedAt
												  )
												: "N/A"}
										</TableCell>
										<TableCell className="text-center ">
											<DropdownMenu>
												<DropdownMenuTrigger asChild>
													<Button
														variant="ghost"
														size="sm"
													>
														<MoreHorizontal className="h-4 w-4" />
													</Button>
												</DropdownMenuTrigger>
												<DropdownMenuContent
													align="end"
													className="p-0 min-w-[150px] border-0 shadow-lg"
												>
													<DropdownMenuItem className="p-0">
														<button
															className="w-full px-3 py-3 hover:bg-muted cursor-pointer transition-colors rounded-b-none text-center"
															onClick={() => {}}
														>
															Change Role
														</button>
													</DropdownMenuItem>
													<DropdownMenuItem className="p-0">
														<button
															className="w-full px-3 py-3 hover:bg-muted cursor-pointer transition-colors rounded-none text-center"
															onClick={() => {}}
														>
															View Profile
														</button>
													</DropdownMenuItem>
													{member.memberInfo?.role !==
														"Admin" && (
														<DropdownMenuItem className="p-0">
															<button
																className="w-full px-3 py-3 text-red-600 hover:bg-red-600 hover:text-white cursor-pointer transition-colors text-center rounded-t-none"
																onClick={() =>
																	removeOrganisationMember(
																		organisation.id,
																		member.id
																	)
																}
															>
																Remove Member
															</button>
														</DropdownMenuItem>
													)}
												</DropdownMenuContent>
											</DropdownMenu>
										</TableCell>
									</TableRow>
								)
							)
						) : (
							<TableRow>
								<TableCell
									colSpan={5}
									className="text-center text-muted-foreground"
								>
									No members found
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>

				{/* Pagination */}
				{totalPages > 1 && (
					<div className="flex justify-end items-center space-x-2 mt-4">
						<Button
							variant="outline"
							size="sm"
							onClick={() => setPage((p) => Math.max(1, p - 1))}
							disabled={page === 1}
						>
							Previous
						</Button>
						<span className="text-sm">
							Page {page} of {totalPages}
						</span>
						<Button
							variant="outline"
							size="sm"
							onClick={() =>
								setPage((p) => Math.min(totalPages, p + 1))
							}
							disabled={page === totalPages}
						>
							Next
						</Button>
					</div>
				)}
			</CardContent>
		</Card>
	);
};

export default OrgMembers;
