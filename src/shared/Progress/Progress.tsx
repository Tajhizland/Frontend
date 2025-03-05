import React from "react";

export default function Progress({progress}: { progress: number }) {
    return (
        <div className="w-full bg-gray-200 rounded-md mt-4">
            <div
                className="bg-[#fcb415] text-xs font-medium text-white text-center p-1 leading-none rounded-md"
                style={{width: `${progress}%`}}
            >
                {progress}%
            </div>
        </div>
    )
}
