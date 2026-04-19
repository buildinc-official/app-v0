/**
 * Canonical site origin for metadata (Open Graph, metadataBase, etc.).
 *
 * Production: set `NEXT_PUBLIC_SITE_URL=https://buildinc.app` on Vercel.
 * Preview: falls back to `VERCEL_URL` when the env var is unset.
 * Local: `http://localhost:3000`.
 */
export function getSiteUrl(): URL {
	const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
	if (raw) {
		const withProtocol = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
		const normalized = withProtocol.replace(/\/$/, "");
		return new URL(normalized);
	}
	if (process.env.VERCEL_URL) {
		return new URL(`https://${process.env.VERCEL_URL}`);
	}
	return new URL("http://localhost:3000");
}
