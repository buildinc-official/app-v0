import { Label } from "@/components/base/ui/label";
import { TabsContent } from "@/components/base/ui/tabs";
import { RupeeIcon } from "@/lib/functions/utils";
import { IMaterial } from "@/lib/types";

const TaskMaterials = ({ materials }: { materials: IMaterial[] }) => {
	return (
		<TabsContent
			value="materials"
			className="space-y-4"
		>
			<div className="space-y-4">
				{materials.map((material: any, index: number) => (
					<div
						key={index}
						className="border rounded-lg p-4 space-y-3 bg-card/30"
					>
						<div className="grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
							<div className=" items-center flex flex-col">
								<Label className="text-xs text-slate-600">
									Material
								</Label>
								<p className="font-medium">{material.name}</p>
							</div>
							<div className=" items-center flex flex-col">
								<Label className="text-xs text-slate-600">
									Planned
								</Label>
								<p className="font-medium">
									{material.plannedQuantity} {material.unit}
								</p>
							</div>
							<div className=" items-center flex flex-col">
								<Label className="text-xs text-slate-600">
									Used
								</Label>
								<p className="font-medium">
									{material.usedQuantity} {material.unit}
								</p>
							</div>
							<div className=" items-center flex flex-col">
								<Label className="text-xs text-slate-600">
									Cost
								</Label>
								<p className="font-medium">
									{" "}
									{(
										material.usedQuantity *
										material.unitCost
									).toFixed()}{" "}
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
