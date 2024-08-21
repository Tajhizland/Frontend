import React from "react";

export default function PageTitle({children}: { children: React.ReactNode }) {
    return (
        <div className={"flex mb-10"}>
            <h2 className={"font-bold text-xl text-slate-700"}>
                {children}
            </h2>
        </div>
    )
}
