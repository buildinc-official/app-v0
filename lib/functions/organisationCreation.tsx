import { addOrganisationMember } from "../middleware/organisationMembers";
import { addOrganisation } from "../middleware/organisations";

export const createOrganisation = async (
	name: string,
	ownerId: string | undefined,
	description: string,
	onOpenChange: (open: boolean) => void,
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
	try {
		if (!ownerId) return;
		setIsLoading(true);
		const newOrg = await addOrganisation({
			id: crypto.randomUUID(),
			name: name.trim(),
			created_at: new Date(),
			owner: ownerId,
			description: description.trim(),
			memberIds: [],
			projectIds: [],
		});

		await addOrganisationMember({
			id: crypto.randomUUID(),
			joinedAt: new Date(),
			orgId: newOrg.id,
			userId: ownerId,
			role: "Admin",
		});
	} catch (err) {
		console.error("Failed to create organisation", err);
		throw err;
	} finally {
		setIsLoading(false);
	}
};
