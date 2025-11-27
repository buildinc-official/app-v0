import { addMaterialPricing } from "../middleware/materialPricing";

export const handleAddMaterial = async (
	name: string,
	ownerId: string | undefined,
	unit: string,
	price: number,
	onOpenChange: (open: boolean) => void,
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
	try {
		if (!ownerId) return;
		setIsLoading(true);
		addMaterialPricing({
			name,
			user: ownerId,
			unit,
			price,
		});
	} catch (err) {
		console.error("Failed to add material", err);
	} finally {
		setIsLoading(false);
	}
};
