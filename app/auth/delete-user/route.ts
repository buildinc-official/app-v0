import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { createClient as createServerSupabase } from "@/lib/supabase/server";

export async function POST() {
	const supabase = await createServerSupabase();
	const {
		data: { user },
		error: authError,
	} = await supabase.auth.getUser();

	if (authError || !user) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const supabaseAdmin = createClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.SUPABASE_SERVICE_ROLE_KEY!
	);

	const { error } = await supabaseAdmin.auth.admin.deleteUser(user.id);
	if (error) {
		console.error("Auth delete failed:", error);
		return NextResponse.json(
			{ error: "Could not delete account" },
			{ status: 400 }
		);
	}

	return NextResponse.json({ success: true });
}
