/** Badge variants for `ITask.status` — aligned with project / board UI. */
export function taskStatusBadgeVariant(
	status: string | undefined
):
	| "active"
	| "reviewing"
	| "inactive"
	| "pending"
	| "completed"
	| "secondary" {
	if (!status) return "secondary";
	const s = status.toLowerCase();
	if (
		s === "active" ||
		s === "reviewing" ||
		s === "inactive" ||
		s === "pending" ||
		s === "completed"
	) {
		return s;
	}
	return "secondary";
}

/** `IRequest.status` — Pending / Approved / Rejected */
export function requestStatusBadgeVariant(
	status: string | undefined
): "pending" | "approved" | "destructive" | "secondary" {
	if (!status) return "secondary";
	const s = status.toLowerCase();
	if (s === "pending") return "pending";
	if (s === "approved") return "approved";
	if (s === "rejected") return "destructive";
	return "secondary";
}
