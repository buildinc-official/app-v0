// AsyncAppLayout.tsx
import { getProfile } from "@/lib/middleware/profiles";
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

	const profile: IProfile | null = user && (await getProfile(user.id));
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
