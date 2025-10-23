// app/api/delete-user/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
	process.env.NEXT_PUBLIC_SUPABASE_URL!,
	process.env.SUPABASE_SERVICE_ROLE_KEY! // ✅ must be service role key
);

export async function POST(req: Request) {
	const { userId } = await req.json();

	const { error } = await supabaseAdmin.auth.admin.deleteUser(userId);
	if (error) {
		console.error("Auth delete failed:", error);
		return NextResponse.json({ error }, { status: 400 });
	}

	return NextResponse.json({ success: true });
}
