import PhotoUploader from "@/components/base/general/PhotoUploader";
import { Button } from "@/components/base/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/base/ui/dialog";
import { Input } from "@/components/base/ui/input";
import { Label } from "@/components/base/ui/label";
import { Textarea } from "@/components/base/ui/textarea";
import { handleTaskCompletion, requestPayment } from "@/lib/functions/tasks";
import { RupeeIcon } from "@/lib/functions/utils";
import { addRequestPhoto } from "@/lib/middleware/requestPhotos";
import { useProfileStore } from "@/lib/store/profileStore";
import { ITask } from "@/lib/types";
import { useState } from "react";

const CompleteModal = ({
	isCompleteModalOpen,
	setIsCompleteModalOpen,
	selectedTask,
}: {
	isCompleteModalOpen: boolean;
	setIsCompleteModalOpen: (open: boolean) => void;
	selectedTask: ITask | undefined;
}) => {
	const projectName = selectedTask?.projectName;
	const projectId = selectedTask?.projectId || null;
	const [notes, setNotes] = useState<string>("");
	const [photos, setPhotos] = useState<File[]>([]);

	const user = useProfileStore((state) => state.profile);

	const handleSubmit = async () => {
		if (!selectedTask || !user || !projectId) return;

		const newRequestId = await handleTaskCompletion(selectedTask?.id!);

		if (!newRequestId) return;
		// Step 2: Upload all photos for that request
		for (const file of photos) {
			await addRequestPhoto(newRequestId, file, user.id as string);
		}

		// Step 3: Cleanup
		setIsCompleteModalOpen(false);
		setNotes("");
		setPhotos([]);
	};

	const handleClose = () => {
		setIsCompleteModalOpen(false);
		setNotes("");
	};

	const handleOpenChange = (open: boolean) => {
		if (!open) {
			// Modal is being closed
			handleClose();
		} else {
			// Modal is being opened
			setIsCompleteModalOpen(true);
		}
	};

	return (
		<Dialog
			open={isCompleteModalOpen}
			onOpenChange={handleOpenChange}
		>
			<DialogContent className="sm:max-w-[700px] h-[550px] grid grid-rows-[auto_auto_1fr_auto] p-0 gap-0 overflow-hidden">
				{/* Header */}
				<DialogHeader className="px-6 pt-4 pb-2 row-span-1">
					<DialogTitle>{selectedTask?.name}</DialogTitle>
					<DialogDescription>Completion Portal</DialogDescription>
				</DialogHeader>

				{/* Form Container */}
				<div className="row-span-1 min-h-0 w-full h-full">
					{selectedTask && (
						<div className="px-6 py-4 overflow-y-auto max-h-[calc(550px-180px)]">
							<div className="space-y-6">
								{/* Notes Textarea */}
								<div className="space-y-2">
									<Label
										htmlFor="notes"
										className="text-sm font-medium"
									>
										Notes:
									</Label>
									<Textarea
										id="notes"
										placeholder="Add any notes regarding the completion..."
										value={notes}
										onChange={(e) =>
											setNotes(e.target.value)
										}
										rows={4}
										className="resize-none focus-visible:ring-0 focus-visible:border-black border-gray-300 w-full"
									/>
								</div>

								<div>
									<PhotoUploader
										onFilesSelected={setPhotos}
									/>
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
							>
								Submit
							</Button>
						</div>
					</div>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default CompleteModal;
