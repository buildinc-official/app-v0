//lib/store/materialPricingStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IMaterialPricingDB } from "@/lib/types";

interface MaterialPricingState {
	materialPricings: Record<string, IMaterialPricingDB>;
	setMaterialPricings: (materialPricings: IMaterialPricingDB[]) => void;
	updateMaterialPricing: (
		id: string,
		updates: Partial<IMaterialPricingDB>
	) => void;
	addMaterialPricing: (materialPricing: IMaterialPricingDB) => void;
	deleteMaterialPricing: (id: string) => void;
	getMaterialPricing: (id: string) => IMaterialPricingDB | undefined;
	clearMaterialPricings: () => void;
}

export const useMaterialPricingStore = create<MaterialPricingState>()(
	persist(
		(set, get) => ({
			materialPricings: {},

			setMaterialPricings: (materialPricings) => {
				set((state) => {
					const materialPricingsObj: Record<
						string,
						IMaterialPricingDB
					> = {
						...state.materialPricings,
					};
					materialPricings.forEach((materialPricing) => {
						materialPricingsObj[materialPricing.id] =
							materialPricing;
					});
					return { materialPricings: materialPricingsObj };
				});
			},

			updateMaterialPricing: (id, updates) => {
				set((state) => {
					const existing = state.materialPricings[id];
					if (existing) {
						return {
							materialPricings: {
								...state.materialPricings,
								[id]: { ...existing, ...updates },
							},
						};
					}
					return state;
				});
			},

			addMaterialPricing: (materialPricing) => {
				set((state) => ({
					materialPricings: {
						...state.materialPricings,
						[materialPricing.id]: materialPricing,
					},
				}));
			},

			deleteMaterialPricing: (id) => {
				set((state) => {
					const { [id]: _, ...remainingMaterialPricings } =
						state.materialPricings;
					return { materialPricings: remainingMaterialPricings };
				});
			},

			getMaterialPricing: (id) => {
				return get().materialPricings[id];
			},

			clearMaterialPricings: () => {
				set({ materialPricings: {} });
			},
		}),
		{
			name: "material-pricing-store",
		}
	)
);
