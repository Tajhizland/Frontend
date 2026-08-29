"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

type Options<TData, TVars> = {
    invalidate?: unknown[][];
    successMessage?: string;
    errorMessage?: string;
    onSuccess?: (data: TData, variables: TVars) => void;
    onError?: (error: unknown) => void;
    silent?: boolean;
};

export const useApiMutation = <TData, TVars = void>(
    fn: (variables: TVars) => Promise<TData>,
    options: Options<TData, TVars> = {}
) => {
    const queryClient = useQueryClient();
    const { invalidate = [], successMessage, errorMessage, onSuccess, onError, silent } = options;

    return useMutation({
        mutationFn: fn,
        onSuccess: (data, variables) => {
            const message = successMessage ?? (data as { message?: string })?.message;
            if (!silent && message) toast.success(message);
            invalidate.forEach((key) => queryClient.invalidateQueries({ queryKey: key }));
            onSuccess?.(data, variables);
        },
        onError: (error) => {
            // اگر اینترسپتور axios قبلاً پیام سرور را نشان داده، دوباره toast نکن
            const alreadyToasted = (error as { handledByInterceptor?: boolean })?.handledByInterceptor;
            if (!silent && !alreadyToasted) {
                toast.error(errorMessage ?? (error as Error)?.message ?? "عملیات انجام نشد");
            }
            onError?.(error);
        },
    });
};
