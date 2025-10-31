import { Badge } from "@/components/base/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/base/ui/card";
import { TabsContent } from "@/components/base/ui/tabs";
import { getStatusColor } from "@/lib/functions/utils";
import { getTaskMaterialsFromStore } from "@/lib/middleware/materials";
import { ITask } from "@/lib/types";
import { Package } from "lucide-react";

export const Materials = ({ tasks }: { tasks: ITask[] }) => {
	const tasksWithMaterials = tasks.filter(
		(task) => task.materialIds && task.materialIds.length > 0
	);
	return (
		<TabsContent
			value="materials"
			className="space-y-6"
		>
			<Card className="shadow-sm">
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<Package className="h-5 w-5 text-orange-600" />
						Materials Overview
					</CardTitle>
					<CardDescription>
						Track materials usage across all tasks
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						{tasksWithMaterials.map((task) => {
							const materials = getTaskMaterialsFromStore(
								task.id
							);
							return (
								<div
									key={task.id}
									className="border rounded-lg p-4"
								>
									<div className="flex items-center justify-between mb-3">
										<h4 className="font-medium">
											{task.name}
										</h4>
										<Badge
											className={getStatusColor(
												task.status
											)}
											variant="secondary"
										>
											{task.status
												.replace("-", " ")
												.replace(/\b\w/g, (l: string) =>
													l.toUpperCase()
												)}
										</Badge>
									</div>
									<div className="space-y-2">
										{materials.map(
											(material: any, index: number) => (
												<div
													key={index}
													className="flex items-center justify-between text-sm bg-slate-50 p-2 rounded"
												>
													<div className="flex items-center gap-2">
														<Package className="h-4 w-4 text-slate-400" />
														<span className="font-medium">
															{material.name}
														</span>
													</div>
													<div className="flex items-center gap-4 text-slate-600">
														<span>
															Planned:{" "}
															{
																material.plannedQuantity
															}{" "}
															{material.unit}
														</span>
														<span>
															Used:{" "}
															{
																material.usedQuantity
															}{" "}
															{material.unit}
														</span>
														<span className="font-medium">
															$
															{(
																(material.usedQuantity ||
																	material.plannedQuantity) *
																material.unitCost
															).toFixed(2)}
														</span>
													</div>
												</div>
											)
										)}
									</div>
								</div>
							);
						})}
					</div>
				</CardContent>
			</Card>
		</TabsContent>
	);
};
