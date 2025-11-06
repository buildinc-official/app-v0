// lib/supabase/db/requestPhotosDB.ts
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export const requestPhotosDB = {
	async uploadPhoto(
		file: File,
		requestId: string,
		userId: string
	): Promise<string> {
		const filePath = `${requestId}/${Date.now()}_${file.name}`;

		const { error: uploadError } = await supabase.storage
			.from("request-photos")
			.upload(filePath, file);
		if (uploadError) throw uploadError;

		await new Promise((r) => setTimeout(r, 300));

		const { data: signed, error: signedError } = await supabase.storage
			.from("request-photos")
			.createSignedUrl(filePath, 60 * 60 * 24 * 7);
		if (signedError) throw signedError;

		const { error: dbError } = await supabase
			.from("request_photos")
			.insert({
				request_id: requestId,
				photo_url: signed.signedUrl,
				uploaded_by: userId,
			});
		if (dbError) throw dbError;

		return signed.signedUrl!;
	},
};
