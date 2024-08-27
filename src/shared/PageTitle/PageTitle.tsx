import React from "react";

export default function PageTitle({children}: { children: React.ReactNode }) {
    return (
        <div className={"flex "}>
            <h2 className={"font-bold text-xl text-slate-500"}>
                {children}
            </h2>
        </div>
    )
}
