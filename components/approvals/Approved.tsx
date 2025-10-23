import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "@/components/base/ui/card";
import { TabsContent } from "@/components/base/ui/tabs";
import { AlertTriangle, CheckCircle } from "lucide-react";
import React from "react";
import ApprovalTable from "./ApprovalTable";
import { IRequest } from "@/lib/types";

type Props = {
	approvedApprovals: IRequest[];
	setIsDetailDialogOpen: (open: boolean) => void;
	setSelectedApproval: (approval: IRequest) => void;
};

const Approved = ({
	approvedApprovals,
	setIsDetailDialogOpen,
	setSelectedApproval,
}: Props) => {
	return (
		<TabsContent value="approved">
			<Card className="shadow-sm">
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<CheckCircle className="h-5 w-5 text-green-600" />
						Approved Requests
					</CardTitle>
					<CardDescription>
						Recently approved material and payment requests
					</CardDescription>
				</CardHeader>
				<CardContent>
					{approvedApprovals.length > 0 ? (
						<ApprovalTable
							data={approvedApprovals}
							showActions={false}
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

export default Approved;
