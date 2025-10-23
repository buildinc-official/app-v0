// lib/store/materialStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IMaterial } from "@/lib/types";

interface MaterialState {
	materials: Record<string, IMaterial>;
	setMaterials: (materials: IMaterial[]) => void;
	updateMaterial: (id: string, updates: Partial<IMaterial>) => void;
	addMaterial: (material: IMaterial) => void;
	deleteMaterial: (id: string) => void;
	getMaterial: (id: string) => IMaterial | undefined;
	getMaterialsByTask: (taskId: string) => IMaterial[];
	clearMaterials: () => void;
}

export const useMaterialStore = create<MaterialState>()(
	persist(
		(set, get) => ({
			materials: {},

			setMaterials: (materials) => {
				set((state) => {
					const materialsObj: Record<string, IMaterial> = {
						...state.materials,
					};
					materials.forEach((material) => {
						materialsObj[material.id] = material;
					});
					return { materials: materialsObj };
				});
			},

			updateMaterial: (id, updates) => {
				set((state) => {
					const existing = state.materials[id];
					if (existing) {
						return {
							materials: {
								...state.materials,
								[id]: { ...existing, ...updates },
							},
						};
					}
					return state;
				});
			},

			addMaterial: (material) => {
				set((state) => ({
					materials: {
						...state.materials,
						[material.id]: material,
					},
				}));
			},

			deleteMaterial: (id) => {
				set((state) => {
					const { [id]: _, ...remainingMaterials } = state.materials;
					return { materials: remainingMaterials };
				});
			},

			getMaterial: (id) => {
				return get().materials[id];
			},

			getMaterialsByTask: (taskId) => {
				const materials = Object.values(get().materials);
				return materials.filter(
					(material) => material.taskId === taskId
				);
			},

			clearMaterials: () => {
				set({ materials: {} });
			},
		}),
		{
			name: "material-storage",
		}
	)
);
