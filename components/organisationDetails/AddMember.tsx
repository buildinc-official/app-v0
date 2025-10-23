"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/base/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/base/ui/dialog";
import { Input } from "@/components/base/ui/input";
import { ScrollArea } from "@/components/base/ui/scroll-area";
import { UserPlus } from "lucide-react";
import { IOrganisation, IProfile } from "@/lib/types";
import { getAllProfilesFromStore } from "@/lib/middleware/profiles";
import { useProfileStore } from "@/lib/store/profileStore";
import { addMember } from "@/lib/functions/organisationDetails";

type Props = { organisation: IOrganisation };

interface SearchResults extends IProfile {
	added: boolean;
}
const AddMember = ({ organisation }: Props) => {
	const [isOpen, setIsOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const [users, setUsers] = useState<SearchResults[]>([]);
	const [selectedUser, setSelectedUser] = useState<IProfile | null>(null);
	const [loading, setLoading] = useState(false);
	const { allProfiles } = useProfileStore();

	const orgMemberIds = organisation.memberIds;
	// Fetch all users initially
	useEffect(() => {
		const fetchUsers = () => {
			try {
				const data = allProfiles.length
					? allProfiles
					: getAllProfilesFromStore();
				const dataWithAdded = (data ?? []).map((user: IProfile) => ({
					...user,
					added: orgMemberIds.includes(user.id),
				}));
				setUsers(dataWithAdded);
			} catch (err) {
				console.error("Failed to load users", err);
			}
		};
		if (isOpen) fetchUsers();
	}, [isOpen]);

	// Search users
	useEffect(() => {
		if (!searchQuery) return;
		const timeout = setTimeout(() => {
			try {
				const results = allProfiles.filter((user) =>
					(user.name ?? "")
						.toLowerCase()
						.includes(searchQuery.toLowerCase())
				);
				const resultsWithAdded = results.map((user: IProfile) => ({
					...user,
					added: orgMemberIds.includes(user.id),
				}));
				setUsers(resultsWithAdded);
			} catch (err) {
				console.error("Search failed", err);
			}
		}, 300);
		return () => clearTimeout(timeout);
	}, [searchQuery]);

	const handleAdd = () => {
		if (!selectedUser) return;
		addMember(
			organisation.id,
			organisation.name,
			selectedUser,
			organisation.owner
		);
		setIsOpen(false);
		setSelectedUser(null);
		setSearchQuery("");
		setLoading(false);
	};

	return (
		<Dialog
			open={isOpen}
			onOpenChange={setIsOpen}
		>
			<DialogTrigger asChild>
				<Button variant="secondary">
					<UserPlus className="h-4 w-4 mr-2" />
					Add Member
				</Button>
			</DialogTrigger>

			<DialogContent className="sm:max-w-[500px]">
				<DialogHeader>
					<DialogTitle>Add Member</DialogTitle>
					<DialogDescription>
						Search for an existing user to add them to this
						organisation.
					</DialogDescription>
				</DialogHeader>

				<div className="space-y-4">
					<div className="flex flex-col gap-2">
						<Input
							id="search"
							placeholder="Search by name..."
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className=""
						/>
					</div>

					<ScrollArea className="h-64 border rounded-md p-2">
						{users.length === 0 && (
							<p className="text-sm text-muted-foreground">
								No users found.
							</p>
						)}
						<ul className="space-y-2">
							{users.map((user) => (
								<li
									key={user.id}
									className={`flex items-center justify-between rounded-md p-2 cursor-pointer ${
										selectedUser?.id === user.id
											? "bg-muted"
											: "hover:bg-muted/50"
									} ${
										user.added
											? "opacity-50 cursor-not-allowed"
											: ""
									}`}
									onClick={() => {
										!user.added && setSelectedUser(user);
									}}
								>
									<div>
										<p className="font-medium">
											{user.name || user.email}
										</p>
										<p className="text-sm text-muted-foreground">
											{user.email}
										</p>
									</div>
									{selectedUser?.id === user.id && (
										<span className="text-xs text-primary">
											Selected
										</span>
									)}
									{user.added && (
										<span className="text-xs text-muted-foreground">
											Already a member
										</span>
									)}
								</li>
							))}
						</ul>
					</ScrollArea>
				</div>

				<DialogFooter>
					<Button
						onClick={handleAdd}
						disabled={!selectedUser || loading}
						variant={selectedUser?.id ? "secondary" : "default"}
					>
						{loading ? "Adding..." : "Add Member"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default AddMember;
