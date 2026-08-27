"use client";

import { useState } from "react";
import { useMutation } from "react-query";
import { toast } from "react-hot-toast";

type Options<T extends { id: number | string }> = {
    onDelete?: (id: T["id"]) => void | Promise<void>;
    invalidate: () => void;
};

export const useRowDelete = <T extends { id: number | string }>({ onDelete, invalidate }: Options<T>) => {
    const [pending, setPending] = useState<T | null>(null);

    const mutation = useMutation(async (row: T) => onDelete?.(row.id), {
        onSuccess: () => {
            setPending(null);
            invalidate();
        },
        onError: () => {
            toast.error("حذف انجام نشد");
            setPending(null);
        },
    });

    return {
        pending,
        request: (row: T) => setPending(row),
        dismiss: () => setPending(null),
        confirm: () => {
            if (pending) mutation.mutate(pending);
        },
        deleting: mutation.isLoading,
    };
};
