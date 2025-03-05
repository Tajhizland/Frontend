import React from 'react';

export default function SimpleUploader(props: any) {
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
                            <span className="font-semibold">برای آپلود کلیک کنید</span>
                        </p>
                    </div>
                    <input
                        id={props.name}
                        type="file"
                        className="hidden"
                        name={props.name}
                        {...props}
                    />
                </label>
            </div>
        </>
    );
}
