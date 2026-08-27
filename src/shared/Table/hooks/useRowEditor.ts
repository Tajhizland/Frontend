"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { EditorType } from "@/shared/Table/types";

const coerce = (value: any, previous: any, editorType?: EditorType) => {
    if (editorType === "number") return value === "" ? "" : Number(value);
    if (editorType === "text" || editorType === "date") return value;
    if (typeof previous === "number" && value !== "" && !isNaN(Number(value))) return Number(value);
    if (typeof previous === "boolean") return value === "1" || value === true;
    return value;
};

type Options<T extends { id: number | string }> = {
    onEdit?: (row: T) => unknown | Promise<unknown>;
    reloadOnEdit: boolean;
    invalidate: () => void;
};

export const useRowEditor = <T extends { id: number | string }>({ onEdit, reloadOnEdit, invalidate }: Options<T>) => {
    const [editingId, setEditingId] = useState<T["id"] | null>(null);
    const [draft, setDraft] = useState<T | null>(null);

    const cancel = () => {
        setEditingId(null);
        setDraft(null);
    };

    const mutation = useMutation({
        mutationFn: async (row: T) => onEdit?.(row),
        onSuccess: (response: any) => {
            if (response?.message) toast.success(response.message as string);
            cancel();
            if (reloadOnEdit) invalidate();
        },
        onError: () => {
            toast.error("ذخیره‌ی تغییرات انجام نشد");
        },
    });

    const begin = (row: T) => {
        setEditingId(row.id);
        setDraft({ ...row });
    };

    const setField = (key: keyof T, value: any, editorType?: EditorType) =>
        setDraft((prev) => (prev ? { ...prev, [key]: coerce(value, prev[key], editorType) } : prev));

    const save = () => {
        if (draft) mutation.mutate(draft);
    };

    const isEditing = (row: T) => editingId === row.id;

    return { editingId, draft, isEditing, begin, cancel, setField, save, saving: mutation.isPending };
};
