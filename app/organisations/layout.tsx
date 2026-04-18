import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Organisations",
};

export default function OrganisationsLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return children;
}
