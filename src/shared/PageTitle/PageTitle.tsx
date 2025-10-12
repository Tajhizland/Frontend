import React from "react";

export default function PageTitle({children}: { children: React.ReactNode }) {
    return (
        <div className={"flex gap-2 items-center"}>
            <h2 className={"font-bold text-xl text-slate-500 flex gap-2 "}>
                {children}
            </h2>
        </div>
    )
}
