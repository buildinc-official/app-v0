import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
} from "@/components/base/ui/card";
import {
	TableHeader,
	TableRow,
	TableHead,
	TableBody,
	TableCell,
	Table,
} from "@/components/base/ui/table";
import React from "react";
import { IOrganisation } from "@/lib/types";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/base/layout/LoadingSpinner";
import {
	getOrganisationMembers,
	getOrganisationMembersFromStore,
} from "@/lib/middleware/organisationMembers";
import { getOrganisationProjectsFromStore } from "@/lib/middleware/projects";
import {
	getAllProfiles,
	getAllProfilesFromStore,
} from "@/lib/middleware/profiles";
type Props = {
	filteredOrganisations: IOrganisation[];
	admin: boolean;
};

export const OrgTable = ({ filteredOrganisations, admin }: Props) => {
	const router = useRouter();

	return (
		<Card className="shadow-sm">
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					All Organisations
				</CardTitle>
			</CardHeader>
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow className="divide-x divide-gray-200 border-b-2 border-gray-200 hover:bg-card border-l border-r border-t">
							<TableHead className="min-w-[150px] text-center">
								Name
							</TableHead>
							{admin ? (
								<TableHead className="min-w-[100px] text-center">
									Members
								</TableHead>
							) : (
								<TableHead className="min-w-[100px] text-center">
									Owner
								</TableHead>
							)}
							<TableHead className="min-w-[100px] text-center">
								Projects
							</TableHead>
						</TableRow>
					</TableHeader>

					<TableBody>
						{!filteredOrganisations && <LoadingSpinner />}
						{filteredOrganisations.length > 0 ? (
							filteredOrganisations.map((org) => {
								const ownerName =
									getAllProfilesFromStore().find(
										(profile) => profile.id === org.owner
									)?.name;
								return (
									<TableRow
										key={org.id}
										className=" cursor-pointer h-16"
										onClick={() => {
											if (admin) {
												router.push(
													`/organisations/${org.id}`
												);
											} else {
												return;
											}
										}}
									>
										<TableCell className="text-center">
											{org.name}
										</TableCell>
										{admin ? (
											<TableCell className="text-center">
												{getOrganisationMembersFromStore(
													org.id
												).length ?? 0}
											</TableCell>
										) : (
											<TableCell className="text-center">
												{ownerName ?? "N/A"}
											</TableCell>
										)}
										<TableCell className="text-center">
											{getOrganisationProjectsFromStore.length ??
												0}
										</TableCell>
										{/* <TableCell className="text-center">
										<DropdownMenu>
											<DropdownMenuTrigger asChild>
												<Button
													variant="ghost"
													className="h-8 w-8 p-0"
												>
													<MoreHorizontal className="h-4 w-4" />
												</Button>
											</DropdownMenuTrigger>
											<DropdownMenuContent align="end">
												<DropdownMenuItem
													onClick={() => {}}
												>
													<Eye className="mr-2 h-4 w-4" />
													View Details
												</DropdownMenuItem>
												<DropdownMenuItem>
													<Edit className="mr-2 h-4 w-4" />
													Edit
												</DropdownMenuItem>
												<DropdownMenuItem className="text-red-600">
													<Trash2 className="mr-2 h-4 w-4" />
													Delete
												</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</TableCell> */}
									</TableRow>
								);
							})
						) : (
							<TableRow>
								<TableCell
									colSpan={4}
									className="h-[100px] text-center"
								>
									No organisations found
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
};
