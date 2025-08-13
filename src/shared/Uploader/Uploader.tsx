"use client"
import {useEffect, useState} from "react";
import Image from "next/image";

export default function Uploader({
                                     value,
                                     onChange,
                                     name,
                                     disabled
                                 }: {
    value?: any;
    onChange?: (file: File | null) => void;
    name: string;
    disabled?: boolean;
}) {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [selectedImageName, setSelectedImageName] = useState<string | null>(null);

    useEffect(() => {
        if (value && typeof value === 'string') {
            setSelectedImage(value);
            setSelectedImageName(" ");
        }
    }, [value]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;

        if (file) {
            setSelectedImageName(file.name);
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = () => {
                    setSelectedImage(reader.result as string);
                };
                reader.readAsDataURL(file);
            } else {
                setSelectedImage(null);
            }
        }

        onChange?.(file);
    };

    return (
        <div className="flex flex-col items-center w-full">
            <label
                htmlFor={name}
                className="flex flex-col items-center justify-center p-4 w-full border-2 border-gray-300 border-dashed cursor-pointer bg-gray-50 relative overflow-hidden"
            >
                <div className="absolute right-0 flex flex-col items-center justify-center">
                    {selectedImage && (
                        <Image
                            width={120}
                            height={120}
                            src={selectedImage}
                            alt="فایل انتخاب شده"
                            className="object-contain rounded border border-gray-300"
                        />
                    )}
                    {selectedImageName && <span>{selectedImageName}</span>}
                </div>
                <div className="flex flex-col items-center justify-center pt-5 pb-6 ">
                    <svg className="w-8 h-8 mb-4 text-gray-500" /* ... */ />
                    <p className="mb-2 text-xs text-gray-500 text-center">
                        <span className="font-semibold">برای آپلود فایل کلیک کنید</span>
                    </p>
                </div>
                <input
                    id={name}
                    type="file"
                    className="hidden"
                    name={name}
                    disabled={disabled}
                    onChange={handleFileChange}
                />
            </label>
        </div>
    );
}
