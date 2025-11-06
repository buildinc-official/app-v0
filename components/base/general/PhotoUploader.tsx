"use client";
import { useState } from "react";
import { Upload, X, ImageIcon } from "lucide-react";

interface Props {
	onFilesSelected: (files: File[]) => void;
}

export default function PhotoUploader({ onFilesSelected }: Props) {
	const [previews, setPreviews] = useState<string[]>([]);
	const [files, setFiles] = useState<File[]>([]);
	const [isDragging, setIsDragging] = useState(false);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const selected = Array.from(e.target.files || []);
		processFiles(selected);
	};

	const processFiles = (newFiles: File[]) => {
		const allFiles = [...files, ...newFiles];
		setFiles(allFiles);
		onFilesSelected(allFiles);

		// Generate preview URLs for new files
		const newUrls = newFiles.map((file) => URL.createObjectURL(file));
		setPreviews((prev) => [...prev, ...newUrls]);
	};

	const removeImage = (index: number) => {
		// Revoke the object URL to free memory
		URL.revokeObjectURL(previews[index]);

		const newFiles = files.filter((_, i) => i !== index);
		const newPreviews = previews.filter((_, i) => i !== index);

		setFiles(newFiles);
		setPreviews(newPreviews);
		onFilesSelected(newFiles);
	};

	const handleDragOver = (e: React.DragEvent) => {
		e.preventDefault();
		setIsDragging(true);
	};

	const handleDragLeave = (e: React.DragEvent) => {
		e.preventDefault();
		setIsDragging(false);
	};

	const handleDrop = (e: React.DragEvent) => {
		e.preventDefault();
		setIsDragging(false);

		const droppedFiles = Array.from(e.dataTransfer.files).filter((file) =>
			file.type.startsWith("image/")
		);

		if (droppedFiles.length > 0) {
			processFiles(droppedFiles);
		}
	};

	return (
		<div className="space-y-4">
			<div
				className={`relative border-2 border-dashed rounded-xl p-8 transition-all duration-200 ${
					isDragging
						? "border-blue-500 bg-blue-50"
						: "border-gray-300 bg-gray-50 hover:bg-gray-100"
				}`}
				onDragOver={handleDragOver}
				onDragLeave={handleDragLeave}
				onDrop={handleDrop}
			>
				<input
					type="file"
					accept="image/*"
					multiple
					onChange={handleFileChange}
					className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
					id="photo-upload"
				/>

				<div className="flex flex-col items-center justify-center text-center space-y-3">
					<div
						className={`p-4 rounded-full transition-colors ${
							isDragging ? "bg-blue-100" : "bg-gray-200"
						}`}
					>
						<Upload
							className={`w-8 h-8 transition-colors ${
								isDragging ? "text-blue-600" : "text-gray-600"
							}`}
						/>
					</div>

					<div>
						<p className="text-sm font-medium text-gray-700">
							{isDragging
								? "Drop your photos here"
								: "Drag & drop photos here"}
						</p>
						<p className="text-xs text-gray-500 mt-1">
							or click to browse from your device
						</p>
					</div>

					<div className="flex items-center gap-2 text-xs text-gray-400">
						<ImageIcon className="w-4 h-4" />
						<span>JPG, PNG, GIF up to 10MB</span>
					</div>
				</div>
			</div>

			{/* Preview Grid */}
			{previews.length > 0 && (
				<div className="space-y-3">
					<div className="flex items-center justify-between">
						<h3 className="text-sm font-semibold text-gray-700">
							Selected Photos ({previews.length})
						</h3>
						{previews.length > 0 && (
							<button
								onClick={() => {
									previews.forEach((url) =>
										URL.revokeObjectURL(url)
									);
									setPreviews([]);
									setFiles([]);
									onFilesSelected([]);
								}}
								className="text-xs text-red-600 hover:text-red-700 font-medium transition-colors"
							>
								Clear all
							</button>
						)}
					</div>

					<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
						{previews.map((url, index) => (
							<div
								key={index}
								className="relative group aspect-square rounded-lg overflow-hidden bg-gray-100 border border-gray-200"
							>
								<img
									src={url}
									alt={`Preview ${index + 1}`}
									className="w-full h-full object-cover"
								/>

								{/* Overlay on hover */}
								<div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-200" />

								{/* Remove button */}
								<button
									onClick={() => removeImage(index)}
									className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600"
									aria-label="Remove photo"
								>
									<X className="w-4 h-4" />
								</button>

								{/* File name tooltip */}
								<div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
									<p className="text-xs text-white truncate">
										{files[index]?.name}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
}

// Demo component
function DemoPhotoUploader() {
	const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

	return (
		<div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-8">
			<div className="max-w-3xl mx-auto">
				<div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
					<h2 className="text-2xl font-bold mb-6 text-gray-800">
						Upload Photos
					</h2>

					<PhotoUploader onFilesSelected={setSelectedFiles} />

					{selectedFiles.length > 0 && (
						<div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
							<p className="text-sm text-blue-800">
								<strong>Ready to upload:</strong>{" "}
								{selectedFiles.length} photo
								{selectedFiles.length !== 1 ? "s" : ""} selected
							</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
