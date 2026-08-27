"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

type Options<T extends { id: number | string }> = {
    onDelete?: (id: T["id"]) => unknown | Promise<unknown>;
    invalidate: () => void;
};

export const useRowDelete = <T extends { id: number | string }>({ onDelete, invalidate }: Options<T>) => {
    const [pending, setPending] = useState<T | null>(null);

    const mutation = useMutation({
        mutationFn: async (row: T) => onDelete?.(row.id),
        onSuccess: (response: any) => {
            if (response?.message) toast.success(response.message as string);
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
        deleting: mutation.isPending,
    };
};
