"use client";

import { RupeeIcon } from "@/lib/functions/utils";
import {
	deleteMaterialPricing,
	getMaterialPricingFromStore,
} from "@/lib/middleware/materialPricing";
import { IProfile } from "@/lib/types";
import { Edit, Trash } from "lucide-react";
import { useState, useMemo } from "react";
import { TabsTriggerList } from "../base/general/TabsTriggerList";
import { Separator } from "../base/ui/separator";
import { Tabs, TabsContent } from "../base/ui/tabs";
import AddMaterialModal from "./AddMaterialModal";
import { toast } from "sonner";
import { useMaterialPricingStore } from "@/lib/store/materialPricingStore";

type Props = {
	profile: IProfile;
	admin: boolean;
};

export default function Settings({ profile, admin }: Props) {
	const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

	// Subscribe to the store so the component re-renders when materials change
	// Subscribe to the material map (stable reference) and derive the array with useMemo
	const materialMap = useMaterialPricingStore(
		(s) => s.materialPricings ?? {}
	);
	const materials = useMemo(() => Object.values(materialMap), [materialMap]);

	return (
		<div className="p-2 pb-28">
			<Tabs
				defaultValue="general"
				className="rounded-xl"
			>
				<TabsTriggerList
					triggers={[
						{ value: "general", label: "General" },
						{ value: "projects", label: "Project" },
					]}
				/>

				<TabsContent
					value="general"
					className="space-y-4 mx-1"
				></TabsContent>

				<TabsContent
					value="projects"
					className="space-y-4 mx-1"
				>
					<div>
						<div>
							<div className="mt-4 flex justify-between items-center">
								<div>
									<label className="font-bold">
										Material Pricing
									</label>
									<p className="text-sm text-muted-foreground">
										Manage your material's pricing here.
									</p>
								</div>
								<AddMaterialModal
									isOpen={isCreateDialogOpen}
									onOpenChange={setIsCreateDialogOpen}
								/>
							</div>
						</div>
						<div>
							<div className="mt-2">
								<div className="overflow-x-auto rounded-md border">
									<div className="overflow-hidden rounded-md border shadow-sm border-secondary/50">
										<div
											className="overflow-y-auto"
											style={{
												maxHeight: `${
													Math.min(
														materials.length > 0
															? materials.length +
																	1
															: 3,
														7
													) * 48
												}px`,
											}}
										>
											<table className="w-full text-sm table-fixed">
												<thead>
													<tr className="sticky top-0 z-10 bg-muted/95 backdrop-blur">
														<th className="px-3 py-2 text-left font-medium">
															Material
														</th>
														<th className="px-3 py-2 text-left font-medium">
															Default unit
														</th>
														<th className="px-3 py-2 text-right font-medium">
															Price / unit
														</th>
														<th className="px-3 py-2 text-right font-medium">
															Actions
														</th>
													</tr>
												</thead>
												<tbody>
													{materials.length > 0 ? (
														materials.map((m) => {
															const name = m.name;
															const unit = m.unit;
															const price =
																m.price;
															return (
																<tr
																	key={m.id}
																	className="odd:bg-muted/50 even:bg-muted/10 border-t "
																>
																	<td className="px-3 py-3 align-middle">
																		<span className="font-medium">
																			{
																				name
																			}
																		</span>
																	</td>
																	<td className="px-3 py-3 align-middle">
																		<span className="text-sm text-muted-foreground">
																			{
																				unit
																			}
																		</span>
																	</td>
																	<td className="px-3 py-3 text-right align-middle">
																		<span className="font-mono">
																			{
																				price
																			}
																			<RupeeIcon />
																		</span>
																	</td>
																	<td className="px-3 py-3 text-right align-middle">
																		{/* <button
																			className="px-1 py-1 text-xs rounded bg-secondary/10 hover:bg-secondary/20 transition mr-2"
																			onClick={() =>
																				alert(
																					`Edit ${name}`
																				)
																			}
																		>
																			<Edit className="inline-block size-3 " />
																		</button> */}
																		<button
																			className="px-1 py-1 text-xs rounded bg-destructive/50 hover:bg-muted/20 transition"
																			onClick={(
																				e
																			) => {
																				e.preventDefault();
																				deleteMaterialPricing(
																					m.id
																				);
																				toast.success(
																					"Material deleted successfully."
																				);
																			}}
																		>
																			<Trash className="inline-block size-3" />
																		</button>
																	</td>
																</tr>
															);
														})
													) : (
														<tr>
															<td
																colSpan={4}
																className="py-6 text-center text-sm text-muted-foreground"
															>
																No Materials
																added
															</td>
														</tr>
													)}
												</tbody>
											</table>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<Separator className="bg-secondary/50" />
				</TabsContent>
			</Tabs>
		</div>
	);
}
