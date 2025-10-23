import { Badge } from "@/components/base/ui/badge";
import { Button } from "@/components/base/ui/button";
import {
	DialogHeader,
	DialogFooter,
	Dialog,
	DialogContent,
	DialogTitle,
} from "@/components/base/ui/dialog";
import { Label } from "@/components/base/ui/label";
import { Separator } from "@/components/base/ui/separator";
import { Textarea } from "@/components/base/ui/textarea";
import {
	handleAssigment,
	handleCompletion,
	handleMaterialRequest,
	handlePaymentRequest,
	handleReject,
} from "@/lib/functions/requests";
import { getStatusColor, RupeeIcon } from "@/lib/functions/utils";
import { useProfileStore } from "@/lib/store/profileStore";
import { IProfile, IRequest } from "@/lib/types";
import { profile } from "console";
import { XCircle, CheckCircle } from "lucide-react";
import React from "react";

const ApprovalModal = ({
	isDetailDialogOpen,
	setIsDetailDialogOpen,
	selectedApproval,
	setComment,
	comment,
	profile,
}: {
	isDetailDialogOpen: boolean;
	setIsDetailDialogOpen: (open: boolean) => void;
	selectedApproval: IRequest | null;
	setComment: (comment: string) => void;
	comment: string;
	profile: IProfile | null;
}) => {
	const profiles = useProfileStore((state) => state.allProfiles);
	const requestedByProfile = profiles.find(
		(p) => p.id === selectedApproval?.requestedBy
	);
	const approvedByProfile = profiles.find(
		(p) => p.id === selectedApproval?.approvedBy
	);

	return (
		<Dialog
			open={isDetailDialogOpen}
			onOpenChange={setIsDetailDialogOpen}
		>
			<DialogContent className="sm:max-w-[600px] text-md overflow-auto max-h-[90vh]">
				<DialogHeader>
					<DialogTitle className="flex items-center gap-2">
						{selectedApproval?.type === "MaterialRequest" ? (
							<p>Material Request</p>
						) : selectedApproval?.type === "TaskAssignment" ? (
							<p>Task Assignment Request</p>
						) : selectedApproval?.type === "PaymentRequest" ? (
							<p>Payment Request</p>
						) : selectedApproval?.type === "TaskCompletion" ? (
							<p>Task Completion Request</p>
						) : null}
					</DialogTitle>
				</DialogHeader>

				{selectedApproval && (
					<div className="space-y-5 px-2 sm:px-1 pt-4">
						{selectedApproval.requestedBy ? (
							<FieldRow label="Requested By">
								<div className="flex items-center gap-2 text-primary-foreground">
									<span>
										{requestedByProfile?.name ||
											"Unknown User"}
									</span>
								</div>
							</FieldRow>
						) : (
							<></>
						)}

						<FieldRow label="Date Submitted">
							<div className="text-primary-foreground">
								{new Date(
									selectedApproval.created_at
								).toLocaleDateString("en-GB", {
									day: "2-digit",
									month: "2-digit",
									year: "2-digit",
								})}
							</div>
						</FieldRow>

						{selectedApproval.type === "MaterialRequest" && (
							<>
								<FieldRow label="Item">
									<p className="font-medium text-primary-foreground">
										{
											selectedApproval.requestData
												.materialName
										}
									</p>
								</FieldRow>
								<FieldRow label="Quantity">
									<p className="font-medium text-primary-foreground">
										{selectedApproval.requestData.units}{" "}
										{selectedApproval.requestData.unitName}
									</p>
								</FieldRow>
								<FieldRow
									label={
										`Cost per ` +
										(selectedApproval.requestData.unitName?.endsWith(
											"s"
										)
											? selectedApproval.requestData.unitName.slice(
													0,
													-1
											  )
											: selectedApproval.requestData
													.unitName)
									}
								>
									<p className="font-medium text-primary-foreground">
										{selectedApproval.requestData.unitCost?.toLocaleString(
											"en-IN"
										)}{" "}
										<RupeeIcon />
									</p>
								</FieldRow>
								<FieldRow label="Total Cost">
									<p className="font-medium text-primary-foreground">
										{(
											(selectedApproval.requestData
												?.unitCost ?? 0) *
											(selectedApproval.requestData
												?.units ?? 0)
										).toLocaleString("en-IN")}{" "}
										<RupeeIcon />
									</p>
								</FieldRow>
							</>
						)}

						{selectedApproval.requestData.description ? (
							<FieldRow label="Description">
								<p className="text-sm text-primary-foreground">
									{selectedApproval.requestData.description}
								</p>
							</FieldRow>
						) : (
							<></>
						)}
						{selectedApproval.notes ? (
							<FieldRow label="Notes">
								<p className="text-sm text-primary-foreground">
									{selectedApproval.notes}
								</p>
							</FieldRow>
						) : (
							<></>
						)}
						{selectedApproval.requestData.amount && (
							<FieldRow label="Amount">
								<p className="text-sm text-primary-foreground">
									{selectedApproval.requestData.amount?.toLocaleString(
										"en-IN"
									)}
								</p>
							</FieldRow>
						)}
						<FieldRow label="Project">
							<div>
								<p className="font-medium text-primary-foreground">
									{selectedApproval.project?.name}
								</p>
							</div>
						</FieldRow>

						<FieldRow label="Location">
							<p className="text-primary-foreground">
								{selectedApproval.project?.location}
							</p>
						</FieldRow>

						{selectedApproval.requestData.supplier ? (
							<FieldRow label="Supplier">
								<p className="text-primary-foreground">
									{selectedApproval.requestData.supplier}
								</p>
							</FieldRow>
						) : (
							<></>
						)}

						<FieldRow label="Status">
							<Badge
								className={getStatusColor(
									selectedApproval.status
								)}
								variant="secondary"
							>
								{selectedApproval.status}
							</Badge>
						</FieldRow>

						{selectedApproval.status === "Pending" && (
							<FieldRow label="Add Comment">
								<Textarea
									id="approval-comment"
									placeholder="Add any comments or notes about this approval..."
									value={comment}
									onChange={(e) => setComment(e.target.value)}
									rows={3}
									className="text-sm text-primary-foreground focus-visible:ring-0 focus-visible:border-black"
								/>
							</FieldRow>
						)}
					</div>
				)}

				<DialogFooter className="mt-4">
					{selectedApproval?.status === "Pending" ? (
						<ApprovalButtons
							selectedApproval={selectedApproval}
							setIsDetailDialogOpen={setIsDetailDialogOpen}
							profile={profile}
						/>
					) : (
						<Button
							variant="default"
							onClick={() => setIsDetailDialogOpen(false)}
						>
							Close
						</Button>
					)}
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

const FieldRow = ({
	label,
	children,
}: {
	label: React.ReactNode;
	children: React.ReactNode;
}) => (
	<div className="grid grid-cols-1 sm:grid-cols-[12rem_1fr] gap-2 sm:gap-4 items-start">
		<div className="col-span-full">
			<Separator className="h-px bg-primary/10 mb-2" />
		</div>

		<Label className="text-sm font-medium ">{label}:</Label>
		<div className="min-w-0 break-words text-sm">{children}</div>
	</div>
);

const ApprovalButtons = ({
	selectedApproval,
	setIsDetailDialogOpen,
	profile,
}: {
	selectedApproval: IRequest | null;
	setIsDetailDialogOpen: (open: boolean) => void;
	profile: IProfile | null;
}) => (
	<div className="flex gap-2 w-full ">
		<Button
			variant="destructive"
			onClick={() => {
				if (selectedApproval) handleReject(selectedApproval, profile);
				setIsDetailDialogOpen(false);
			}}
			className="w-1/2"
		>
			<XCircle className="mr-2 h-4 w-4" />
			Reject
		</Button>
		<Button
			variant={"secondary"}
			className="w-1/2"
			onClick={() => {
				if (selectedApproval?.type === "TaskAssignment") {
					handleAssigment(selectedApproval, profile);
				} else if (selectedApproval?.type === "MaterialRequest") {
					handleMaterialRequest(selectedApproval, profile);
				} else if (selectedApproval?.type === "PaymentRequest") {
					handlePaymentRequest(selectedApproval, profile);
				} else if (selectedApproval?.type === "TaskCompletion") {
					handleCompletion(selectedApproval, profile);
				}
				setIsDetailDialogOpen(false);
			}}
		>
			<CheckCircle className="mr-2 h-4 w-4" />
			Approve
		</Button>
	</div>
);
export default ApprovalModal;
