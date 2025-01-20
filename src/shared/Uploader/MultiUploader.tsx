import React, { useState } from "react";
import Image from "next/image";

export default function MultiUploader({ onFilesSelected, name }: { onFilesSelected: (files: File[]) => void; name: string }) {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [previewImages, setPreviewImages] = useState<string[]>([]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            const fileArray = Array.from(files);
            setSelectedFiles([...selectedFiles, ...fileArray]);

            const imagePromises = fileArray.map((file) => {
                return new Promise<string>((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = () => resolve(reader.result as string);
                    reader.onerror = reject;
                    reader.readAsDataURL(file);
                });
            });

            Promise.all(imagePromises)
                .then((images) => setPreviewImages([...previewImages, ...images]))
                .catch((err) => console.error("Error loading images:", err));

            // ارسال فایل‌ها به والد
            onFilesSelected([...selectedFiles, ...fileArray]);
        }
    };

    const removeImage = (index: number) => {
        setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
        setPreviewImages((prev) => prev.filter((_, i) => i !== index));
    };

    return (
        <div className="flex flex-col items-center w-full">
            <label
                htmlFor={name}
                className="flex flex-col items-center justify-center p-4 w-full border-2 border-gray-300 border-dashed cursor-pointer bg-gray-50"
            >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                        className="w-8 h-8 mb-4 text-gray-500"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                    </svg>
                    <p className="mb-2 text-xs text-gray-500 text-center">
                        <span className="font-semibold">برای آپلود عکس کلیک کنید</span> یا عکس‌ها را در اینجا بکشید
                    </p>
                </div>
                <input
                    id={name}
                    type="file"
                    multiple
                    className="hidden"
                    onChange={handleFileChange}
                />
            </label>

            {previewImages.length > 0 && (
                <div className="grid grid-cols-3 gap-4 mt-4">
                    {previewImages.map((image, index) => (
                        <div key={index} className="relative">
                            <Image
                                width={120}
                                height={120}
                                src={image}
                                alt={`تصویر ${index + 1}`}
                                className="object-cover rounded border border-gray-300"
                            />
                            <button
                                onClick={() => removeImage(index)}
                                className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 text-xs"
                            >
                                ×
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
