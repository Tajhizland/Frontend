"use client";

import React, { ReactNode } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { LuGripVertical } from "react-icons/lu";

type Props = { id: string; children: ReactNode; layout: "list" | "grid" };

const SortableItem: React.FC<Props> = ({ id, children, layout }) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

    return (
        <div
            ref={setNodeRef}
            style={{ transform: CSS.Transform.toString(transform), transition }}
            {...attributes}
            {...listeners}
            className={[
                "group relative flex items-center gap-3 select-none cursor-grab active:cursor-grabbing",
                "rounded-xl border bg-white p-3 transition-shadow",
                isDragging ? "shadow-lg border-sky-300 z-10" : "border-slate-200 hover:border-slate-300",
                layout === "grid" ? "flex-col text-center" : "",
            ].join(" ")}
        >
            <LuGripVertical className="w-4 h-4 shrink-0 text-slate-300 group-hover:text-slate-500" />
            <div className="flex-1 min-w-0">{children}</div>
        </div>
    );
};

export default SortableItem;
