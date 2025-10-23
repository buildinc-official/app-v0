import React from "react";
import { format } from "date-fns";
import {
	Calendar as CalendarIcon,
	Clock,
	MapPin,
	IndianRupee,
} from "lucide-react";
import { Card, CardContent } from "@/components/base/ui/card";
import { Input } from "@/components/base/ui/input";
import { Label } from "@/components/base/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/base/ui/select";
import { Textarea } from "@/components/base/ui/textarea";
import { Calendar } from "@/components/base/ui/calendar";
import { Button } from "@/components/base/ui/button";
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogTitle,
} from "@/components/base/ui/dialog";
import { getEstimatedDuration } from "@/lib/functions/utils";
import {
	IOrganisation,
	IOrganisationProfile,
	IProjectCreationData,
} from "@/lib/types";

interface projectDetailsProps {
	projectData: IProjectCreationData;
	setProjectData: React.Dispatch<React.SetStateAction<IProjectCreationData>>;
	organisations: IOrganisation[];
	supervisors: IOrganisationProfile[];
	validationErrors: Record<string, string>;
	setValidationErrors: React.Dispatch<
		React.SetStateAction<Record<string, string>>
	>;
}

const ProjectDetails: React.FC<projectDetailsProps> = ({
	projectData,
	setProjectData,
	organisations,
	supervisors,
	validationErrors,
	setValidationErrors,
}) => {
	const [startDialogOpen, setStartDialogOpen] = React.useState(false);
	const [endDialogOpen, setEndDialogOpen] = React.useState(false);

	const handleChange = (field: string, value: any) => {
		setProjectData((prev) => ({ ...prev, [field]: value }));

		// Remove error for this field when the user types/selects a valid value
		if (validationErrors[field]) {
			setValidationErrors((prev) => {
				const copy = { ...prev };
				delete copy[field];
				return copy;
			});
		}
	};

	return (
		<Card className="shadow-sm pt-6 pb-4">
			<CardContent className="space-y-6">
				{/* Row 1: Name & Organisation */}
				<div className="grid gap-6 md:grid-cols-2">
					<div className="space-y-2">
						<Label htmlFor="project-name">Project Name *</Label>
						<Input
							id="project-name"
							placeholder="Enter project name"
							value={projectData.name}
							onChange={(e) =>
								handleChange("name", e.target.value)
							}
							className="focus-visible:ring-0 focus-visible:border-black"
						/>
						{validationErrors.name && (
							<p className="text-red-500 text-sm">
								{validationErrors.name}
							</p>
						)}
					</div>
					<div className="space-y-2">
						<Label htmlFor="organisation">Organisation *</Label>
						<Select
							value={projectData.organisationId.toString()}
							onValueChange={(value) =>
								handleChange("organisationId", value)
							}
						>
							<SelectTrigger className="w-full">
								<SelectValue placeholder="Select organisation" />
							</SelectTrigger>
							<SelectContent>
								{organisations.map((org) => (
									<SelectItem
										key={org.id}
										value={org.id.toString()}
									>
										{org.name}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
						{validationErrors.organisationId && (
							<p className="text-red-500 text-sm">
								{validationErrors.organisationId}
							</p>
						)}
					</div>
				</div>

				{/* Row 2: Supervisor & Budget */}
				<div className="grid gap-6 md:grid-cols-2">
					<div className="space-y-2">
						<Label htmlFor="supervisor">Project Supervisor *</Label>
						<Select
							value={projectData.supervisor}
							onValueChange={(value) => {
								const sup = supervisors.find(
									(s) => s.id === value
								);
								if (sup) {
									handleChange("supervisor", sup.id);
									handleChange("supervisorName", sup.name);
								}
							}}
						>
							<SelectTrigger className="w-full">
								<SelectValue placeholder="Select supervisor" />
							</SelectTrigger>
							<SelectContent>
								{supervisors.map((sup) => (
									<SelectItem
										key={sup.id}
										value={sup.id}
									>
										{sup.name}
									</SelectItem>
								))}
							</SelectContent>
						</Select>

						{validationErrors.supervisor && (
							<p className="text-red-500 text-sm">
								{validationErrors.supervisor}
							</p>
						)}
					</div>

					<div className="space-y-2">
						<Label htmlFor="budget">Budget *</Label>
						<div className="relative w-full">
							<IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 h-3 w-3" />
							<Input
								id="budget"
								type="text"
								placeholder="0"
								value={
									projectData.budget
										? new Intl.NumberFormat("en-IN").format(
												projectData.budget
										  )
										: ""
								}
								onChange={(e) => {
									const raw = e.target.value.replace(
										/,/g,
										""
									); // remove commas
									const num = Number.parseInt(raw) || 0;
									handleChange("budget", num);
								}}
								className="pl-8 focus-visible:ring-0 focus-visible:border-black w-full"
							/>
						</div>
						{validationErrors.budget && (
							<p className="text-red-500 text-sm">
								{validationErrors.budget}
							</p>
						)}
					</div>
				</div>

				{/* Row 3: Description */}
				<div className="space-y-2">
					<Label htmlFor="description">Description *</Label>
					<Textarea
						id="description"
						placeholder="Describe the project..."
						rows={3}
						value={projectData.description}
						onChange={(e) =>
							handleChange("description", e.target.value)
						}
						className="focus-visible:ring-0 focus-visible:border-black"
					/>
					{validationErrors.description && (
						<p className="text-red-500 text-sm">
							{validationErrors.description}
						</p>
					)}
				</div>

				{/* Row 4: Start & End Dates */}
				<div className="grid gap-6 md:grid-cols-2">
					{/* Start Date */}
					<div className="space-y-1">
						<Label htmlFor="start-date">Start Date *</Label>
						<Dialog
							open={startDialogOpen}
							onOpenChange={setStartDialogOpen}
						>
							<DialogTitle></DialogTitle>

							<DialogTrigger asChild>
								<Button
									variant="outline"
									className="w-full justify-start text-left font-normal"
								>
									<CalendarIcon className="mr-2 h-4 w-4" />
									{projectData.startDate
										? format(projectData.startDate, "PPP")
										: "Pick a date"}
								</Button>
							</DialogTrigger>
							<DialogContent className="sm:max-w-[425px] p-6">
								<Calendar
									className="w-full"
									mode="single"
									selected={
										projectData.startDate || undefined
									}
									onSelect={(date) => {
										if (!date) return;
										handleChange("startDate", date);
										setStartDialogOpen(false);
									}}
								/>
							</DialogContent>
						</Dialog>
						{validationErrors.startDate && (
							<p className="text-red-500 text-sm">
								{validationErrors.startDate}
							</p>
						)}
					</div>

					{/* End Date */}
					<div className="space-y-1">
						<Label htmlFor="end-date">End Date *</Label>
						<Dialog
							open={endDialogOpen}
							onOpenChange={setEndDialogOpen}
						>
							<DialogTitle></DialogTitle>
							<DialogTrigger asChild>
								<Button
									variant="outline"
									className="w-full justify-start text-left font-normal"
								>
									<CalendarIcon className="mr-2 h-4 w-4" />
									{projectData.endDate
										? format(projectData.endDate, "PPP")
										: "Pick a date"}
								</Button>
							</DialogTrigger>
							<DialogContent className="sm:max-w-[425px] p-6">
								<Calendar
									className="w-full"
									mode="single"
									selected={projectData.endDate || undefined}
									onSelect={(date) => {
										if (!date) return;
										handleChange("endDate", date);
										setEndDialogOpen(false);
									}}
								/>
							</DialogContent>
						</Dialog>
						{validationErrors.endDate && (
							<p className="text-red-500 text-sm">
								{validationErrors.endDate}
							</p>
						)}
					</div>
				</div>

				{/* Row 5: Duration */}
				{projectData.startDate && projectData.endDate && (
					<div className="p-4 bg-white/50 rounded-lg flex items-center gap-2">
						<Clock className="h-3 w-3" />
						<p className="text-sm">
							Project Duration:{" "}
							{getEstimatedDuration(
								projectData.startDate,
								projectData.endDate
							)}{" "}
							days
						</p>
					</div>
				)}

				{/* Row 6: Location */}
				<div className="space-y-2">
					<Label htmlFor="location">Location</Label>
					<div className="relative">
						<MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-3 w-3" />
						<Input
							id="location"
							placeholder="Enter project location"
							value={projectData.location}
							onChange={(e) =>
								handleChange("location", e.target.value)
							}
							className="pl-10"
						/>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default ProjectDetails;
