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
import { XCircle } from "lucide-react";
import React from "react";
import ApprovalTable from "./ApprovalTable";

type Props = {
	rejectedApprovals: IRequest[];
	setIsDetailDialogOpen: (open: boolean) => void;
	setSelectedApproval: (approval: IRequest) => void;
};

const Rejected = ({
	rejectedApprovals,
	setIsDetailDialogOpen,
	setSelectedApproval,
}: Props) => {
	return (
		<TabsContent value="rejected" className="mt-0">
			<Card className="border-border/60 bg-background/80 shadow-sm ring-1 ring-border/40 backdrop-blur-sm">
				<CardHeader className="space-y-1 pb-4 sm:pb-6">
					<div className="flex items-start gap-3">
						<span
							className={cn(
								"flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ring-1",
								"bg-rose-500/15 text-rose-700 ring-rose-500/25 dark:text-rose-400",
							)}
						>
							<XCircle className="h-4 w-4" aria-hidden />
						</span>
						<div className="min-w-0">
							<CardTitle className="text-lg sm:text-xl">Rejected</CardTitle>
							<CardDescription>
								Requests that were declined (open a row for details).
							</CardDescription>
						</div>
					</div>
				</CardHeader>
				<CardContent className="space-y-3 pb-6 sm:px-6">
					{rejectedApprovals.length > 0 ? (
						<ApprovalTable
							variant="rejected"
							data={rejectedApprovals}
							setIsDetailDialogOpen={setIsDetailDialogOpen}
							setSelectedApproval={setSelectedApproval}
						/>
					) : (
						<div className="flex min-h-[8rem] items-center justify-center rounded-xl border border-dashed border-border/60 bg-muted/20 px-4 py-10 text-center text-sm text-muted-foreground">
							No rejected requests.
						</div>
					)}
				</CardContent>
			</Card>
		</TabsContent>
	);
};

export default Rejected;
