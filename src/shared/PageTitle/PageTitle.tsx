import React from "react";

export default function PageTitle({ children, subtitle }: { children: React.ReactNode; subtitle?: React.ReactNode }) {
    return (
        <div className="flex flex-col gap-0.5 min-w-0">
            <h2 className="flex items-center gap-2 text-lg sm:text-xl font-bold text-slate-800 truncate">
                <span className="inline-block w-1 h-5 rounded-full bg-slate-900 shrink-0" />
                {children}
            </h2>
            {subtitle && <p className="text-xs text-slate-500 pr-3">{subtitle}</p>}
        </div>
    );
}
