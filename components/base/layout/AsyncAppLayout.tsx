import { createClient } from "@/lib/supabase/server";
import { IProfile } from "@/lib/types";
import { AppLayout } from "./AppLayout";

export default async function AsyncAppLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const supabase = await createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	let profile: IProfile | null = null;
	if (user) {
		const { data, error } = await supabase
			.from("profiles")
			.select("*")
			.eq("id", user.id)
			.single();

		if (error) {
			console.error("Error getting profile:", error);
		} else {
			profile = data as IProfile;
		}
	}
	return (
		// <ClearDataStorage>
		<AppLayout
			profile={profile}
			user={user}
		>
			{children}
		</AppLayout>
		// </ClearDataStorage>
	);
}
