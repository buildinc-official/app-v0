import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "@/components/base/ui/card";
import { TabsContent } from "@/components/base/ui/tabs";
import { AlertTriangle, Clock } from "lucide-react";
import React from "react";
import ApprovalTable from "./ApprovalTable";
import { IRequest } from "@/lib/types";

type Props = {
	pendingApprovals: IRequest[];
	setIsDetailDialogOpen: (open: boolean) => void;
	setSelectedApproval: (approval: IRequest) => void;
};

const Pending = ({
	pendingApprovals,
	setIsDetailDialogOpen,
	setSelectedApproval,
}: Props) => {
	return (
		<TabsContent value="pending">
			<Card className="shadow-sm">
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<Clock className="h-5 w-5 text-yellow-600" />
						Pending Approvals
					</CardTitle>
					<CardDescription>
						Review and approve or reject material and payment
						requests
					</CardDescription>
				</CardHeader>
				<CardContent>
					{pendingApprovals.length > 0 ? (
						<ApprovalTable
							data={pendingApprovals}
							setIsDetailDialogOpen={setIsDetailDialogOpen}
							setSelectedApproval={setSelectedApproval}
						/>
					) : (
						<div className="flex flex-col items-center justify-center py-20">
							<AlertTriangle className="mb-4 h-12 w-12" />
							<h2 className="mb-2 text-xl font-semibold text-gray-700">
								No Approvals Found
							</h2>
							<p className="text-center text-gray-500">
								There are currently no approvals to display.
								Please check back later.
							</p>
						</div>
					)}
				</CardContent>
			</Card>
		</TabsContent>
	);
};

export default Pending;
