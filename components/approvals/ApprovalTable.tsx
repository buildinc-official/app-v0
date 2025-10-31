"use client";

import React from "react";
import {
	Table,
	TableHeader,
	TableRow,
	TableHead,
	TableBody,
	TableCell,
} from "@/components/base/ui/table";
import { Avatar, AvatarFallback } from "@/components/base/ui/avatar"; // ✅ correct import
import { IRequest } from "@/lib/types";
import { RupeeIcon } from "@/lib/functions/utils";

const ApprovalTable = ({
	data,
	setSelectedApproval,
	setIsDetailDialogOpen,
}: {
	data: IRequest[];
	showActions?: boolean;
	setSelectedApproval: (request: IRequest) => void;
	setIsDetailDialogOpen: (open: boolean) => void;
}) => {
	const openDetailDialog = (request: IRequest) => {
		setSelectedApproval(request);
		setIsDetailDialogOpen(true);
	};
	return (
		<Table>
			<TableHeader>
				<TableRow className="divide-x divide-gray-200 border-b-2 border-gray-200 hover:bg-card border-l border-r border-t">
					<TableHead className="min-w-[150px] text-center">
						Type
					</TableHead>
					<TableHead className="min-w-[200px] text-center">
						From
					</TableHead>
					<TableHead className="min-w-[250px] text-center">
						Item
					</TableHead>
					<TableHead className="min-w-[200px] text-center">
						Project
					</TableHead>
					<TableHead className="min-w-[150px] text-center">
						Amount
					</TableHead>
					<TableHead className="min-w-[100px] text-center">
						Date
					</TableHead>

					{/* {showActions && (
						<TableHead className="text-center">Actions</TableHead>
					)} */}
				</TableRow>
			</TableHeader>
			<TableBody>
				{data.map((request) => (
					<TableRow
						className=" hover:bg-white/20 cursor-pointer h-[70px]"
						key={request.id}
						onClick={() => openDetailDialog(request)}
					>
						{/* type */}
						<TableCell className="items-center justify-center">
							<div className="flex items-center gap-2 justify-center">
								{request.type === "MaterialRequest" ? (
									<p>Material Request</p>
								) : request.type === "PaymentRequest" ? (
									<p>Payment Request</p>
								) : request.type === "TaskCompletion" ? (
									<p>Task Review</p>
								) : request.type === "TaskAssignment" ? (
									<p>Task Assignment</p>
								) : null}
							</div>
						</TableCell>

						{/* User */}
						<TableCell className="items-center justify-center">
							<div className="flex items-center gap-2 justify-center">
								<Avatar className="h-8 w-8">
									<AvatarFallback>
										{request.requestedByProfile?.name[0]}
									</AvatarFallback>
								</Avatar>
								{request.requestedByProfile?.name}
							</div>
						</TableCell>

						{/* Item */}
						{request.type === "MaterialRequest" ? (
							<TableCell className="items-center justify-center">
								<div className="justify-center items-center flex flex-col">
									<div className="font-medium">
										{request.requestData.materialName} (
										{request.requestData.units}{" "}
										{request.requestData.unitName})
									</div>
									<div className="text-sm text-slate-500">
										{"quantity" in request.requestData
											? request.requestData.quantity
											: null}
									</div>
								</div>
							</TableCell>
						) : (
							<TableCell className="items-center justify-center">
								<p className="flex items-center gap-1 justify-center">
									N/A
								</p>
							</TableCell>
						)}

						{/* Project */}
						<TableCell className="items-center justify-center">
							<div className="justify-center items-center flex flex-col">
								<div className="font-medium">
									{request.project?.name}
								</div>
							</div>
						</TableCell>

						{/* Amount */}
						{request.type === "PaymentRequest" ? (
							<TableCell className="items-center justify-center">
								<div className="flex items-center gap-1 justify-center">
									<span className="font-medium">
										{request.requestData.amount?.toLocaleString()}
										<RupeeIcon />
									</span>
								</div>
							</TableCell>
						) : request.type === "MaterialRequest" ? (
							<TableCell className="items-center justify-center">
								<div className="flex items-center gap-1 justify-center">
									<span className="font-medium">
										{(
											(request.requestData
												.units as number) *
											(request.requestData
												.unitCost as number)
										).toLocaleString()}
										<RupeeIcon />
									</span>
								</div>
							</TableCell>
						) : (
							<TableCell className="items-center justify-center">
								<p className="flex items-center gap-1 justify-center">
									N/A
								</p>
							</TableCell>
						)}

						{/* Date */}
						<TableCell className="items-center justify-center">
							<div className="flex items-center gap-1 justify-center">
								<span className="text-sm">
									{new Date(
										request.created_at
									).toLocaleDateString()}
								</span>
							</div>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};

export default ApprovalTable;
