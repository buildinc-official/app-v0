"use client";

import { useState } from "react";
import ApprovalModal from "./ApprovalModal";
import { IRequest } from "@/lib/types";
import { TabsTriggerList } from "@/components/base/general/TabsTriggerList";
import Approved from "./Approved";
import Pending from "./Pending";
import Rejected from "./Rejected";
import { SummaryCard } from "@/components/base/general/SummaryCard";
import { Clock, CheckCircle } from "lucide-react";
import { useRequestStore } from "@/lib/store/requestStore";
import { useProfileStore } from "@/lib/store/profileStore";
import { Tabs } from "../base/ui/tabs";

export default function Approvals({ admin }: { admin: boolean }) {
	const { requests } = useRequestStore();
	const { profile } = useProfileStore();
	const [selectedApproval, setSelectedApproval] = useState<IRequest | null>(
		null
	);
	const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
	const [comment, setComment] = useState("");

	const filteredRequests = Object.values(requests);
	const pendingApprovals = Array.from(
		filteredRequests.filter((a) => a.status === "Pending")
	);

	const approvedApprovals = Array.from(
		filteredRequests.filter((a) => a.status === "Approved")
	);
	const rejectedApprovals = Array.from(
		filteredRequests.filter((a) => a.status === "Rejected")
	);

	return (
		<div className="flex flex-1 flex-col mb-32">
			<div className="flex-1 space-y-6 p-2 mb-16">
				<Summary
					pendingApprovals={pendingApprovals}
					approvedApprovals={approvedApprovals}
				/>
				<ApprovalTabs
					pendingApprovals={pendingApprovals}
					approvedApprovals={approvedApprovals}
					rejectedApprovals={rejectedApprovals}
					setIsDetailDialogOpen={setIsDetailDialogOpen}
					setSelectedApproval={setSelectedApproval}
				/>
				<ApprovalModal
					isDetailDialogOpen={isDetailDialogOpen}
					setIsDetailDialogOpen={setIsDetailDialogOpen}
					selectedApproval={selectedApproval}
					setComment={setComment}
					comment={comment}
					profile={profile}
				/>
			</div>
		</div>
	);
}

const Summary = ({
	pendingApprovals,
	approvedApprovals,
}: {
	pendingApprovals: IRequest[];
	approvedApprovals: IRequest[];
}) => {
	return (
		<div className="grid gap-6 md:grid-cols-2">
			<SummaryCard
				content={pendingApprovals.length}
				title="Pending Approvals"
				icon={<Clock className="h-4 w-4 text-yellow-600" />}
			/>

			<SummaryCard
				content={approvedApprovals.length}
				title="Approved Today"
				icon={<CheckCircle className="h-4 w-4 text-green-600" />}
			/>
		</div>
	);
};

const ApprovalTabs = ({
	pendingApprovals,
	approvedApprovals,
	rejectedApprovals,
	setIsDetailDialogOpen,
	setSelectedApproval,
}: {
	pendingApprovals: IRequest[];
	approvedApprovals: IRequest[];
	rejectedApprovals: IRequest[];
	setIsDetailDialogOpen: (open: boolean) => void;
	setSelectedApproval: (approval: IRequest) => void;
}) => {
	return (
		<Tabs
			defaultValue="pending"
			className=" rounded-xl "
		>
			<TabsTriggerList
				triggers={[
					{
						value: "pending",
						label: "Pending",
						count: pendingApprovals.length,
					},
					{
						value: "approved",
						label: "Approved",
						count: approvedApprovals.length,
					},
				]}
			/>

			<Pending
				pendingApprovals={pendingApprovals}
				setIsDetailDialogOpen={setIsDetailDialogOpen}
				setSelectedApproval={setSelectedApproval}
			/>

			<Approved
				approvedApprovals={approvedApprovals}
				setIsDetailDialogOpen={setIsDetailDialogOpen}
				setSelectedApproval={setSelectedApproval}
			/>

			<Rejected
				rejectedApprovals={rejectedApprovals}
				setIsDetailDialogOpen={setIsDetailDialogOpen}
				setSelectedApproval={setSelectedApproval}
			/>
		</Tabs>
	);
};
