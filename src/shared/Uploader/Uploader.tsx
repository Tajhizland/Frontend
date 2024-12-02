import React, { useState } from 'react';
import Image from "next/image";

export default function Uploader(props: any) {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setSelectedImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <>
            <div className="flex flex-col items-center w-full">
                <label
                    htmlFor={props.name}
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
                            <span className="font-semibold">برای آپلود عکس کلیک کنید</span> یا عکس را در اینجا بکشید
                        </p>
                    </div>
                    <input
                        id={props.name}
                        type="file"
                        className="hidden"
                        name={props.name}
                        {...props}
                        onChange={handleFileChange}
                    />
                </label>

                {selectedImage && (
                    <div className="mt-4">
                        <Image
                            width={120}
                            height={120}
                            src={selectedImage}
                            alt="تصویر انتخاب شده"
                            className=" object-cover rounded border border-gray-300"
                        />
                    </div>
                )}
            </div>
        </>
    );
}
