import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/base/ui/card";
import { TabsContent } from "@/components/base/ui/tabs";
import { cn } from "@/lib/functions/utils";
import { IRequest } from "@/lib/types";
import { CheckCircle2 } from "lucide-react";
import React from "react";
import ApprovalTable from "./ApprovalTable";

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
		<TabsContent value="approved" className="mt-0">
			<Card className="border-border/60 bg-background/80 shadow-sm ring-1 ring-border/40 backdrop-blur-sm">
				<CardHeader className="space-y-1 pb-4 sm:pb-6">
					<div className="flex items-start gap-3">
						<span
							className={cn(
								"flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ring-1",
								"bg-emerald-500/15 text-emerald-700 ring-emerald-500/25 dark:text-emerald-400",
							)}
						>
							<CheckCircle2 className="h-4 w-4" aria-hidden />
						</span>
						<div className="min-w-0">
							<CardTitle className="text-lg sm:text-xl">Approved</CardTitle>
							<CardDescription>
								Requests that were approved (open a row for details).
							</CardDescription>
						</div>
					</div>
				</CardHeader>
				<CardContent className="space-y-3 pb-6 sm:px-6">
					{approvedApprovals.length > 0 ? (
						<ApprovalTable
							variant="approved"
							data={approvedApprovals}
							setIsDetailDialogOpen={setIsDetailDialogOpen}
							setSelectedApproval={setSelectedApproval}
						/>
					) : (
						<div className="flex min-h-[8rem] items-center justify-center rounded-xl border border-dashed border-border/60 bg-muted/20 px-4 py-10 text-center text-sm text-muted-foreground">
							No approved requests yet.
						</div>
					)}
				</CardContent>
			</Card>
		</TabsContent>
	);
};

export default Approved;
