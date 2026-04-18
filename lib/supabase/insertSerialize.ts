/** PostgREST JSON prefers ISO strings for timestamptz; Date can mis-serialize in some paths. */

const TS_KEYS = [
	"created_at",
	"joinedAt",
	"startDate",
	"endDate",
	"completedDate",
	"approvedAt",
] as const;

export function serializeRowForInsert<T extends Record<string, unknown>>(row: T): T {
	const out = { ...row } as Record<string, unknown>;
	for (const k of TS_KEYS) {
		const v = out[k];
		if (v instanceof Date) out[k] = v.toISOString();
	}
	if (out["orgId"] === "") out["orgId"] = null;
	return out as T;
}
