/**
 * Maps provider/auth callback errors to copy safe to show end users.
 */
export function userFacingAuthErrorMessage(
	raw: string | null | undefined,
): string {
	if (!raw?.trim()) {
		return "Something went wrong while completing sign-in. Please try again from the login page.";
	}
	const lower = raw.toLowerCase();
	if (
		lower.includes("expired") ||
		lower.includes("expire") ||
		lower.includes("otp expired")
	) {
		return "This link has expired. Request a new confirmation email or password reset from the login page.";
	}
	if (
		(lower.includes("invalid") || lower.includes("bad")) &&
		(lower.includes("token") ||
			lower.includes("otp") ||
			lower.includes("hash"))
	) {
		return "This sign-in link is invalid or has already been used. Try logging in, or request a new link.";
	}
	if (lower.includes("no token") || lower.includes("token hash")) {
		return "The sign-in link was incomplete. Open the link from your email again, or sign in manually.";
	}
	if (lower.includes("email") && lower.includes("confirm")) {
		return "We could not confirm your email with this link. Try signing up again or contact support.";
	}
	return "Something went wrong while completing sign-in. Please try again from the login page.";
}
