import { useRequestStore } from "../store/requestStore";
import { requestPhotosDB } from "../supabase/db/requestPhotosDB";

export async function addRequestPhoto(
	requestId: string,
	file: File,
	userId: string
) {
	try {
		const photoUrl = await requestPhotosDB.uploadPhoto(
			file,
			requestId,
			userId
		);

		// Update Zustand store immediately
		useRequestStore.getState().addPhoto(requestId, photoUrl);

		return photoUrl;
	} catch (err) {
		console.error("Error adding request photo:", err);
		throw err;
	}
}
