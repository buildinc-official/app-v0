// lib/supabase/db/materialPricingDB.ts
import { createClient } from "@/lib/supabase/client";
import { IMaterialPricingDB } from "../../types";

const supabase = createClient();

export const materialPricingDB = {
	// Gets materialPricings for a user
	async getMaterialPricings(userId: string) {
		const { data, error } = await supabase
			.from("material_pricing")
			.select("*")
			.eq("user", userId);

		if (error) throw error;
		return data as IMaterialPricingDB[];
	},

	// Adds a new materialPricing
	async addMaterialPricing(materialPricing: IMaterialPricingDB) {
		const { data, error } = await supabase
			.from("material_pricing")
			.insert([materialPricing])
			.select()
			.single();

		if (error) throw error;
		return data as IMaterialPricingDB;
	},

	// Updates a materialPricing by its ID
	async updateMaterialPricing(
		id: string,
		updates: Partial<IMaterialPricingDB>
	) {
		const { data, error } = await supabase
			.from("material_pricing")
			.update(updates)
			.eq("id", id)
			.select()
			.single();

		if (error) throw error;
		return data as IMaterialPricingDB;
	},

	// Deletes a materialPricing by its ID
	async removeMaterialPricing(id: string) {
		const { data, error } = await supabase
			.from("material_pricing")
			.delete()
			.eq("id", id)
			.select()
			.single();

		if (error) throw error;
		return data as IMaterialPricingDB;
	},
};
