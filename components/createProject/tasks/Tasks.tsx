import { phaseCreationFunctions } from "@/lib/functions/projectCreation";
import { getPhaseSectionTheme } from "@/lib/constants/phaseColorThemes";
import { IProjectCreationData } from "@/lib/types";
import { cn, RupeeIcon } from "@/lib/functions/utils";
import { IndianRupee } from "lucide-react";
import TaskList from "./TaskList";

const Tasks = ({
	projectData,
	setProjectData,
	validationErrors,
	setValidationErrors,
}: {
	projectData: IProjectCreationData;
	setProjectData: React.Dispatch<React.SetStateAction<IProjectCreationData>>;
	validationErrors: Record<string, string>;
	setValidationErrors: React.Dispatch<
		React.SetStateAction<Record<string, string>>
	>;
}) => {
	const { getTotalPhaseBudget } = phaseCreationFunctions();
	const phaseTheme = getPhaseSectionTheme();

	return (
		<div className="space-y-8">
			{Object.keys(validationErrors).length > 0 && (
				<div className="rounded-xl border border-destructive/30 bg-destructive/10 p-4 ring-1 ring-destructive/20">
					<ul className="space-y-2 text-sm text-destructive">
						{Object.entries(validationErrors).map(([key, msg]) => (
							<li
								key={key}
								className="flex items-start justify-between"
							>
								<span className="mr-2">
									<strong className="capitalize">
										{key}:
									</strong>{" "}
									{msg}
								</span>
								<button
									type="button"
									className="ml-2 shrink-0 text-xs font-medium underline-offset-2 hover:underline"
									onClick={() =>
										setValidationErrors((prev) => {
											const next = { ...prev };
											delete next[key];
											return next;
										})
									}
								>
									Dismiss
								</button>
							</li>
						))}
					</ul>
				</div>
			)}
			{projectData.phases && projectData.phases.length > 0 ? (
				<div>
					{projectData.phases.map((phase, index) => {
						return (
							<div
								key={index}
								className={cn(
									"mb-8 rounded-2xl border p-5 shadow-sm backdrop-blur-sm ring-1 last:mb-0 sm:p-6",
									phaseTheme.card,
								)}
							>
								<div className="flex flex-row flex-wrap items-center justify-between gap-4">
									<h3 className="flex min-w-0 items-center gap-3 text-base font-semibold sm:text-lg">
										<span
											className={cn(
												"shrink-0 rounded-md px-2 py-0.5 text-xs font-bold tabular-nums",
												phaseTheme.chip,
											)}
										>
											{index + 1}
										</span>
										<span className="truncate">
											{phase.name || "Unnamed Phase"}
										</span>
									</h3>
									<div className="flex flex-wrap items-center gap-3 font-medium">
										{(() => {
											const tasksTotal =
												phase.tasks?.reduce(
													(sum, t) =>
														sum +
														(t?.plannedBudget ?? 0),
													0,
												) ?? 0;
											return (
												<>
													{tasksTotal >
														phase.budget && (
														<span className="mr-2 text-sm text-destructive">
															Task budgets exceed
															phase budget
														</span>
													)}
												</>
											);
										})()}
										<span className="tabular-nums">
											{phase.budget.toLocaleString(
												"en-IN",
											)}
										</span>
										<RupeeIcon />
									</div>
								</div>

								<div
									className={cn(
										"mt-6 border-t border-border/50 pt-6",
										phaseTheme.contentTint,
									)}
								>
									<TaskList
										phase={phase}
										setProjectData={setProjectData}
									/>
								</div>
							</div>
						);
					})}
				</div>
			) : (
				<div className="rounded-xl border border-dashed border-border/60 bg-muted/20 px-6 py-12 text-center text-sm text-muted-foreground">
					No phases to show. Go back to the Phases step and add at
					least one phase with tasks.
				</div>
			)}
			<BudgetTotal
				totalBudget={getTotalPhaseBudget(projectData)}
				projectData={projectData}
			/>
		</div>
	);
};

const BudgetTotal = ({
	totalBudget,
	projectData,
}: {
	totalBudget: number;
	projectData: IProjectCreationData;
}) => {
	return (
		<div className="mt-6 rounded-xl border border-border/60 bg-muted/40 p-4 ring-1 ring-border/30">
			<div className="flex items-center justify-between gap-3">
				<span className="font-medium text-foreground">
					Total phase budget
				</span>
				<span className="flex items-center gap-1 text-lg font-bold tabular-nums text-foreground">
					{totalBudget.toLocaleString("en-IN")}
					<IndianRupee className="h-4 w-4 shrink-0 text-muted-foreground" />
				</span>
			</div>
			{totalBudget > projectData.budget && (
				<div className="mt-3 text-sm text-destructive">
					Total exceeds the project budget (
					{projectData.budget.toLocaleString("en-IN")}).
				</div>
			)}
		</div>
	);
};

export default Tasks;
