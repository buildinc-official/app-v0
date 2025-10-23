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
		const newOrg = addOrganisation({
			id: crypto.randomUUID(), // ID will be set by the database
			name: name.trim(),
			created_at: new Date(),
			owner: ownerId,
			description: description.trim(),
			memberIds: [],
			projectIds: [],
		});

		// console.log("Created organisation:", newOrg);

		const addedMember = addOrganisationMember({
			id: crypto.randomUUID(), // ID will be set by the database
			joinedAt: new Date(),
			orgId: (await newOrg).id,
			userId: ownerId,
			role: "Admin",
		});

		// console.log("Added organisation member:", addedMember);
	} catch (err) {
		console.error("Failed to create organisation", err);
	} finally {
		setIsLoading(false);
	}
};
