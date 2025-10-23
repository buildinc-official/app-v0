import { useState } from "react";
import { Input } from "@/components/base/ui/input";
import { Search } from "lucide-react";
import { OrgTable } from "./OrgTable";
import { IOrganisation, IRequest } from "@/lib/types";
import AddOrgModal from "./AddOrgModal";
import OrgMemberRequests from "./OrgMemberRequests";

export default function Organisations({
	organisations,
	admin,
	requests,
}: {
	organisations: IOrganisation[];
	admin: boolean;
	requests: IRequest[];
}) {
	const [searchTerm, setSearchTerm] = useState("");
	const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

	const filteredOrganisations = organisations.filter((org) =>
		org.name.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<div className="flex-col flex-1 space-y-6 p-2">
			<div className="flex sm:flex-row gap-4 justify-between items-center">
				<div className="relative flex w-full py-4">
					<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />

					<Input
						placeholder="Search organisations..."
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className="pl-10"
					/>
				</div>
				{admin && (
					<AddOrgModal
						isOpen={isCreateDialogOpen}
						onOpenChange={setIsCreateDialogOpen}
					/>
				)}
			</div>

			<OrgTable
				filteredOrganisations={filteredOrganisations}
				admin={admin}
			/>

			{!admin && <OrgMemberRequests requests={requests} />}
		</div>
	);
}
