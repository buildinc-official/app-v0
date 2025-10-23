import { Button } from "@/components/base/ui/button";
import {
	DialogHeader,
	DialogFooter,
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
} from "@/components/base/ui/dialog";
import { Tabs } from "@/components/base/ui/tabs";
import { CheckCircle } from "lucide-react";
import React, { useState } from "react";
import { getTaskMaterialsFromStore } from "@/lib/middleware/materials";
import { TabsTriggerList } from "@/components/base/general/TabsTriggerList";
import {
	getProjectIdFromPhaseId,
	getProjectNameFromPhaseId,
	requestMaterial,
	requestPayment,
} from "@/lib/functions/tasks";
import { ITask } from "@/lib/types";
import { Input } from "@/components/base/ui/input";
import { Textarea } from "@/components/base/ui/textarea";
import { Label } from "@/components/base/ui/label";
import { RupeeIcon } from "@/lib/functions/utils";

const PaymentModal = ({
	isPaymentModalOpen,
	setIsPaymentModalOpen,
	selectedTask,
}: {
	isPaymentModalOpen: boolean;
	setIsPaymentModalOpen: (open: boolean) => void;
	selectedTask: ITask | undefined;
}) => {
	const projectName = getProjectNameFromPhaseId(selectedTask?.phaseId || "");
	const projectId = getProjectIdFromPhaseId(selectedTask?.phaseId || "");
	const [amount, setAmount] = useState<number>(0);
	const [notes, setNotes] = useState<string>("");

	const handleSubmit = () => {
		if (!selectedTask || !amount) return;

		requestPayment(selectedTask, amount, projectId, notes);

		setIsPaymentModalOpen(false);
		setAmount(0);
		setNotes("");
	};

	const handleClose = () => {
		setIsPaymentModalOpen(false);
		setAmount(0);
		setNotes("");
	};

	const handleOpenChange = (open: boolean) => {
		if (!open) {
			// Modal is being closed
			handleClose();
		} else {
			// Modal is being opened
			setIsPaymentModalOpen(true);
		}
	};

	return (
		<Dialog
			open={isPaymentModalOpen}
			onOpenChange={handleOpenChange}
		>
			<DialogContent className="sm:max-w-[700px] h-[550px] grid grid-rows-[auto_auto_1fr_auto] p-0 gap-0 overflow-hidden">
				{/* Header */}
				<DialogHeader className="px-6 pt-4 pb-2 row-span-1">
					<DialogTitle>{selectedTask?.name}</DialogTitle>
					<DialogDescription>Payment Portal</DialogDescription>
				</DialogHeader>

				{/* Form Container */}
				<div className="row-span-1 min-h-0 w-full h-full">
					{selectedTask && (
						<div className="px-6 py-4 overflow-y-auto max-h-[calc(550px-180px)]">
							<div className="space-y-6">
								{/* Amount Input */}
								<div className="space-y-2">
									<Label
										htmlFor="amount"
										className="text-sm font-medium"
									>
										Payment Amount *
									</Label>
									<div className="relative">
										<span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
											<RupeeIcon />
										</span>
										<Input
											id="budget"
											type="text"
											placeholder="0"
											value={
												amount
													? new Intl.NumberFormat(
															"en-IN"
													  ).format(amount)
													: ""
											}
											onChange={(e) => {
												const raw =
													e.target.value.replace(
														/,/g,
														""
													); // remove commas
												const num =
													Number.parseInt(raw) || 0;
												setAmount(num);
											}}
											className="pl-8 focus-visible:ring-0 focus-visible:border-black w-full border-gray-300"
										/>
									</div>
									<p className="text-xs text-gray-500">
										Enter the amount you wish to request
									</p>
								</div>

								{/* Notes Textarea */}
								<div className="space-y-2">
									<Label
										htmlFor="notes"
										className="text-sm font-medium"
									>
										Reason for Payment
									</Label>
									<Textarea
										id="notes"
										placeholder="Describe the reason for this payment request..."
										value={notes}
										onChange={(e) =>
											setNotes(e.target.value)
										}
										rows={4}
										className="resize-none focus-visible:ring-0 focus-visible:border-black border-gray-300 w-full"
									/>
									<p className="text-xs text-gray-500">
										Optional: Provide details about what
										this payment covers
									</p>
								</div>
							</div>
						</div>
					)}
				</div>

				<DialogFooter className="px-6 py-4 border-t self-end">
					<div className="flex flex-col w-full gap-4">
						<div className="flex gap-2 w-full items-center justify-center">
							<Button
								variant="outline"
								onClick={handleClose}
								className="w-1/2"
							>
								Cancel
							</Button>
							<Button
								variant="default"
								onClick={handleSubmit}
								className="w-1/2"
								disabled={!amount || amount <= 0}
							>
								Request Payment
							</Button>
						</div>
					</div>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default PaymentModal;
