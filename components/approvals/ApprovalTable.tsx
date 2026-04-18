"use client";

import { Avatar, AvatarFallback } from "@/components/base/ui/avatar";
import { Badge } from "@/components/base/ui/badge";
import { requestStatusBadgeVariant } from "@/lib/functions/taskStatusUi";
import { cn, RupeeIcon } from "@/lib/functions/utils";
import { IRequest, requestType } from "@/lib/types";
import { Calendar, IndianRupee } from "lucide-react";
import React from "react";

function requestTypeLabel(type: requestType): string {
	switch (type) {
		case "MaterialRequest":
			return "Material";
		case "PaymentRequest":
			return "Payment";
		case "TaskCompletion":
			return "Task completion";
		case "TaskAssignment":
			return "Task assignment";
		case "JoinOrganisation":
			return "Join organisation";
		case "JoinProject":
			return "Join project";
		default:
			return type;
	}
}

function itemSummary(request: IRequest): string {
	const rd = request.requestData;
	if (request.type === "MaterialRequest" && rd.materialName) {
		return `${rd.materialName} (${rd.units ?? 0} ${rd.unitName ?? ""})`.trim();
	}
	if (request.type === "PaymentRequest") {
		return rd.description || rd.reason || "Payment request";
	}
	if (request.type === "TaskCompletion") {
		return request.task?.name || rd.completionNotes || "Task completion";
	}
	if (request.type === "TaskAssignment") {
		return request.task?.name || rd.description || "Task assignment";
	}
	if (request.type === "JoinOrganisation") {
		return rd.organisationName || "Organisation request";
	}
	if (request.type === "JoinProject") {
		return rd.projectName || "Project request";
	}
	return "—";
}

function amountLine(request: IRequest): React.ReactNode {
	const rd = request.requestData;
	if (request.type === "PaymentRequest" && rd.amount != null) {
		return (
			<span className="inline-flex items-center gap-0.5 font-medium tabular-nums text-foreground">
				{rd.amount.toLocaleString("en-IN")}
				<RupeeIcon />
			</span>
		);
	}
	if (request.type === "MaterialRequest") {
		const u = rd.units ?? 0;
		const c = rd.unitCost ?? 0;
		const total = u * c;
		return (
			<span className="inline-flex items-center gap-0.5 font-medium tabular-nums text-foreground">
				{total.toLocaleString("en-IN")}
				<RupeeIcon />
			</span>
		);
	}
	return <span className="text-muted-foreground">—</span>;
}

const SECTION_SURFACE: Record<
	"pending" | "approved" | "rejected",
	string
> = {
	pending:
		"border-amber-500/25 bg-amber-500/[0.06] hover:bg-amber-500/10 dark:bg-amber-950/20",
	approved:
		"border-emerald-500/25 bg-emerald-500/[0.06] hover:bg-emerald-500/10 dark:bg-emerald-950/20",
	rejected:
		"border-rose-500/25 bg-rose-500/[0.06] hover:bg-rose-500/10 dark:bg-rose-950/20",
};

const ApprovalTable = ({
	data,
	variant,
	setSelectedApproval,
	setIsDetailDialogOpen,
}: {
	data: IRequest[];
	variant: "pending" | "approved" | "rejected";
	setSelectedApproval: (request: IRequest) => void;
	setIsDetailDialogOpen: (open: boolean) => void;
}) => {
	const surface = SECTION_SURFACE[variant];

	const openDetailDialog = (request: IRequest) => {
		setSelectedApproval(request);
		setIsDetailDialogOpen(true);
	};

	return (
		<ul className="space-y-3">
			{data.map((request) => {
				const name =
					request.requestedByProfile?.name?.trim() || "Unknown";
				const initial = name.charAt(0).toUpperCase() || "?";

				return (
					<li key={request.id}>
						<button
							type="button"
							className={cn(
								"w-full rounded-xl border p-4 text-left shadow-sm transition-colors",
								"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
								surface,
							)}
							onClick={() => openDetailDialog(request)}
						>
							<div className="flex items-start justify-between gap-3">
								<div className="min-w-0 flex-1">
									<div className="flex flex-wrap items-center gap-2">
										<Badge variant="outline" className="text-xs font-normal">
											{requestTypeLabel(request.type)}
										</Badge>
										<Badge
											variant={requestStatusBadgeVariant(request.status)}
											className="capitalize"
										>
											{request.status}
										</Badge>
									</div>
									<p className="mt-2 line-clamp-2 text-sm font-semibold leading-snug">
										{itemSummary(request)}
									</p>
									<p className="mt-0.5 truncate text-xs text-muted-foreground">
										{request.project?.name ?? "—"}
									</p>
								</div>
								<div className="flex max-w-[11rem] shrink-0 items-center gap-2">
									<Avatar className="h-8 w-8 ring-1 ring-border/60">
										<AvatarFallback className="text-xs">{initial}</AvatarFallback>
									</Avatar>
									<span className="truncate text-sm font-medium text-foreground">
										{name}
									</span>
								</div>
							</div>

							<div className="mt-3 grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
								<div className="flex min-h-[1.25rem] items-center gap-2">
									<IndianRupee
										className="h-4 w-4 shrink-0 text-muted-foreground opacity-70"
										aria-hidden
									/>
									<div className="text-muted-foreground">
										<span className="sr-only">Amount: </span>
										{amountLine(request)}
									</div>
								</div>
								<div className="flex items-center gap-2 text-muted-foreground">
									<Calendar className="h-4 w-4 shrink-0 opacity-70" aria-hidden />
									<span>
										Submitted{" "}
										<span className="font-medium text-foreground">
											{new Date(request.created_at).toLocaleDateString()}
										</span>
									</span>
								</div>
							</div>
						</button>
					</li>
				);
			})}
		</ul>
	);
};

export default ApprovalTable;
