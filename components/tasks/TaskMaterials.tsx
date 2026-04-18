import { Label } from "@/components/base/ui/label";
import { TabsContent } from "@/components/base/ui/tabs";
import { RupeeIcon } from "@/lib/functions/utils";
import { IMaterial } from "@/lib/types";
import { Package } from "lucide-react";

const TaskMaterials = ({ materials }: { materials: IMaterial[] }) => {
	return (
		<TabsContent value="materials" className="mt-6 space-y-4">
			<div className="space-y-3">
				{materials.map((material: IMaterial, index: number) => (
					<div
						key={material.id ?? index}
						className="space-y-3 rounded-xl border border-border/60 bg-background/80 p-4 shadow-sm ring-1 ring-border/40"
					>
						<div className="flex items-center gap-2 text-sm font-medium">
							<Package
								className="h-4 w-4 shrink-0 text-muted-foreground"
								aria-hidden
							/>
							<span className="truncate">{material.name}</span>
						</div>
						<div className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
							<div className="space-y-1">
								<Label className="text-xs text-muted-foreground">
									Planned
								</Label>
								<p className="font-medium tabular-nums">
									{material.plannedQuantity} {material.unit}
								</p>
							</div>
							<div className="space-y-1">
								<Label className="text-xs text-muted-foreground">Used</Label>
								<p className="font-medium tabular-nums">
									{material.usedQuantity} {material.unit}
								</p>
							</div>
							<div className="space-y-1">
								<Label className="text-xs text-muted-foreground">
									Line cost
								</Label>
								<p className="font-medium tabular-nums">
									{(material.usedQuantity * material.unitCost).toFixed(0)}{" "}
									<RupeeIcon />
								</p>
							</div>
						</div>
					</div>
				))}
			</div>
		</TabsContent>
	);
};

export default TaskMaterials;
