// lib/middleware/materialPricing.ts
import { useMaterialPricingStore } from "@/lib/store/materialPricingStore";
import { materialPricingDB } from "../supabase/db/materialPricingDB";
import { IMaterialPricingDB } from "../types";

export async function addMaterialPricing(
	materialPricing: Partial<IMaterialPricingDB>
) {
	try {
		const newMaterialPricing = {
			id: crypto.randomUUID(),
			...materialPricing,
		};
		const result: IMaterialPricingDB =
			await materialPricingDB.addMaterialPricing(
				newMaterialPricing as IMaterialPricingDB
			);

		// Update store with the new materialPricing
		const store = useMaterialPricingStore.getState();

		store.addMaterialPricing(result);

		return result;
	} catch (error) {
		console.error("Error adding material pricing:", error);
		throw error;
	}
}

export async function deleteMaterialPricing(id: string) {
	try {
		await materialPricingDB.removeMaterialPricing(id);

		// Remove from store
		const store = useMaterialPricingStore.getState();
		store.deleteMaterialPricing(id);

		return {
			success: true,
			message: "Material pricing deleted successfully",
		};
	} catch (error) {
		console.error("Error deleting material pricing:", error);
		throw error;
	}
}

export async function getMaterialPricingsByUserId(userId: string) {
	try {
		const materialPricings = await materialPricingDB.getMaterialPricings(
			userId
		);
		// Update store with fetched materialPricings
		const store = useMaterialPricingStore.getState();
		store.setMaterialPricings(materialPricings);
		return materialPricings;
	} catch (error) {
		console.error("Error fetching material pricings:", error);
		throw error;
	}
}

export function getMaterialPricingFromStore() {
	const store = useMaterialPricingStore.getState();
	return Object.values(store.materialPricings);
}
