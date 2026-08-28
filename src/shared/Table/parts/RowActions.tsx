"use client";

import React from "react";
import Link from "next/link";
import { UrlObject } from "url";
import { LuCheck, LuPencil, LuTrash2, LuX } from "react-icons/lu";
import { ACTION_BASE, ACTION_COLORS, RowHelpers, TableAction } from "@/shared/Table/types";

type Props<T extends { id: number | string }> = {
    row: T;
    helpers: RowHelpers;
    actions: TableAction<T>[];
    renderActions?: (row: T, helpers: RowHelpers) => React.ReactNode;
    editing: boolean;
    saving: boolean;
    canEdit: boolean;
    canDelete: boolean;
    onBeginEdit: () => void;
    onSave: () => void;
    onCancel: () => void;
    onRequestDelete: () => void;
};

function ActionButton<T extends { id: number | string }>({
    action,
    row,
    helpers,
    onMark,
}: {
    action: TableAction<T>;
    row: T;
    helpers: RowHelpers;
    onMark: () => void;
}) {
    if (action.hidden?.(row)) return null;

    const label = typeof action.label === "function" ? action.label(row) : action.label;
    const custom = typeof action.className === "function" ? action.className(row) : action.className;
    const color = typeof action.color === "function" ? action.color(row) : action.color;
    const className = custom ?? `${ACTION_BASE} ${ACTION_COLORS[color ?? "default"]}`;

    if (action.href) {
        return (
            <Link href={action.href(row) as UrlObject} className={className} title={action.title}>
                {label}
            </Link>
        );
    }

    return (
        <button
            type="button"
            className={className}
            title={action.title}
            onClick={() => {
                onMark();
                action.onClick?.(row, helpers);
            }}
        >
            {label}
        </button>
    );
}

function RowActions<T extends { id: number | string }>({
    row,
    helpers,
    actions,
    renderActions,
    editing,
    saving,
    canEdit,
    canDelete,
    onBeginEdit,
    onSave,
    onCancel,
    onRequestDelete,
}: Props<T>) {
    if (editing) {
        return (
            <div className="flex gap-1.5 justify-center">
                <button
                    type="button"
                    disabled={saving}
                    onClick={onSave}
                    className={`${ACTION_BASE} bg-emerald-600 border-emerald-600 text-white hover:bg-emerald-700 hover:border-emerald-700 focus-visible:ring-emerald-500/30`}
                    title="ذخیره"
                >
                    <LuCheck className="w-4 h-4" />
                    ذخیره
                </button>
                <button
                    type="button"
                    disabled={saving}
                    onClick={onCancel}
                    className={`${ACTION_BASE} ${ACTION_COLORS.default}`}
                    title="انصراف"
                >
                    <LuX className="w-4 h-4" />
                    انصراف
                </button>
            </div>
        );
    }

    return (
        <div className="flex items-center gap-1.5 justify-center">
            {renderActions
                ? renderActions(row, helpers)
                : actions.map((action, index) => (
                      <ActionButton key={index} action={action} row={row} helpers={helpers} onMark={helpers.mark} />
                  ))}
            {canEdit && (
                <button
                    type="button"
                    className={`${ACTION_BASE} ${ACTION_COLORS.warning}`}
                    title="ویرایش سریع"
                    onClick={() => {
                        helpers.mark();
                        onBeginEdit();
                    }}
                >
                    <LuPencil className="w-4 h-4" />
                </button>
            )}
            {canDelete && (
                <button
                    type="button"
                    className={`${ACTION_BASE} ${ACTION_COLORS.danger}`}
                    title="حذف"
                    onClick={() => {
                        helpers.mark();
                        onRequestDelete();
                    }}
                >
                    <LuTrash2 className="w-4 h-4" />
                </button>
            )}
        </div>
    );
}

export default RowActions;
