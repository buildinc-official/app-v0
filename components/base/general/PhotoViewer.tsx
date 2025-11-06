import { useState } from "react";
import { X, ZoomIn, Loader2 } from "lucide-react";

// Types
interface PhotoGalleryViewerProps {
	photos: string[];
}

interface SelectedImage {
	url: string;
	index: number;
}

interface LoadedImagesState {
	[key: number]: boolean | "error";
}

interface FieldRowProps {
	label: string;
	children: React.ReactNode;
}

// Photo Gallery Viewer Component
export function PhotoGalleryViewer({ photos }: PhotoGalleryViewerProps) {
	const [loadedImages, setLoadedImages] = useState<LoadedImagesState>({});
	const [selectedImage, setSelectedImage] = useState<SelectedImage | null>(
		null
	);

	const handleImageLoad = (index: number): void => {
		setLoadedImages((prev) => ({ ...prev, [index]: true }));
	};

	const handleImageError = (index: number): void => {
		setLoadedImages((prev) => ({ ...prev, [index]: "error" }));
	};

	const openLightbox = (url: string, index: number): void => {
		setSelectedImage({ url, index });
	};

	const closeLightbox = (): void => {
		setSelectedImage(null);
	};

	return (
		<>
			<div className="space-y-2">
				<div className="flex flex-wrap gap-3">
					{photos.map((photoUrl, index) => (
						<div
							key={index}
							className="relative group w-28 h-28 rounded-lg overflow-hidden border border-gray-200 bg-gray-50 cursor-pointer transition-all hover:shadow-lg hover:scale-105"
							onClick={() => openLightbox(photoUrl, index)}
						>
							{/* Loading State */}
							{!loadedImages[index] && (
								<div className="absolute inset-0 flex items-center justify-center bg-gray-100">
									<Loader2 className="w-6 h-6 text-gray-400 animate-spin" />
								</div>
							)}

							{/* Error State */}
							{loadedImages[index] === "error" && (
								<div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-400 text-xs">
									Failed to load
								</div>
							)}

							{/* Image */}
							<img
								src={photoUrl}
								alt={`Photo ${index + 1}`}
								className={`w-full h-full object-cover transition-opacity duration-300 ${
									loadedImages[index] === true
										? "opacity-100"
										: "opacity-0"
								}`}
								onLoad={() => handleImageLoad(index)}
								onError={() => handleImageError(index)}
							/>

							{/* Hover Overlay */}
							<div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-200 flex items-center justify-center">
								<ZoomIn className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
							</div>

							{/* Image Counter */}
							<div className="absolute bottom-1 right-1 bg-black bg-opacity-60 text-white text-xs px-2 py-0.5 rounded">
								{index + 1}
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Lightbox Modal */}
			{selectedImage && (
				<div
					className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4"
					onClick={closeLightbox}
				>
					<button
						className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
						onClick={closeLightbox}
						aria-label="Close lightbox"
					>
						<X className="w-8 h-8" />
					</button>

					<div className="relative max-w-5xl max-h-[90vh]">
						<img
							src={selectedImage.url}
							alt={`Photo ${selectedImage.index + 1}`}
							className="max-w-full max-h-[90vh] object-contain rounded-lg"
							onClick={(e: React.MouseEvent) =>
								e.stopPropagation()
							}
						/>
						<div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 text-white px-4 py-2 rounded-full text-sm">
							{selectedImage.index + 1} of {photos.length}
						</div>
					</div>
				</div>
			)}
		</>
	);
}

// Example usage with FieldRow wrapper
function FieldRow({ label, children }: FieldRowProps) {
	return <div className="py-3">{children}</div>;
}

// Demo
export default function Demo() {
	const samplePhotos: string[] = [
		"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400",
		"https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400",
		"https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400",
		"https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=400",
		"https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=400",
	];

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
			<div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-6">
				<h2 className="text-2xl font-bold mb-6 text-gray-800">
					Approval Details
				</h2>
				<FieldRow label="Photos">
					<PhotoGalleryViewer photos={samplePhotos} />
				</FieldRow>
			</div>
		</div>
	);
}
