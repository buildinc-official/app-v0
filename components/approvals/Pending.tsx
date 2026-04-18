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
import { Clock } from "lucide-react";
import React from "react";
import ApprovalTable from "./ApprovalTable";

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
		<TabsContent value="pending" className="mt-0">
			<Card className="border-border/60 bg-background/80 shadow-sm ring-1 ring-border/40 backdrop-blur-sm">
				<CardHeader className="space-y-1 pb-4 sm:pb-6">
					<div className="flex items-start gap-3">
						<span
							className={cn(
								"flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ring-1",
								"bg-amber-500/15 text-amber-700 ring-amber-500/25 dark:text-amber-400",
							)}
						>
							<Clock className="h-4 w-4" aria-hidden />
						</span>
						<div className="min-w-0">
							<CardTitle className="text-lg sm:text-xl">Pending</CardTitle>
							<CardDescription>
								Approve or reject material, payment, and task requests.
							</CardDescription>
						</div>
					</div>
				</CardHeader>
				<CardContent className="space-y-3 pb-6 sm:px-6">
					{pendingApprovals.length > 0 ? (
						<ApprovalTable
							variant="pending"
							data={pendingApprovals}
							setIsDetailDialogOpen={setIsDetailDialogOpen}
							setSelectedApproval={setSelectedApproval}
						/>
					) : (
						<div className="flex min-h-[8rem] items-center justify-center rounded-xl border border-dashed border-border/60 bg-muted/20 px-4 py-10 text-center text-sm text-muted-foreground">
							No pending requests.
						</div>
					)}
				</CardContent>
			</Card>
		</TabsContent>
	);
};

export default Pending;
