"use client";

import { useMutation, useQueryClient } from "react-query";
import toast from "react-hot-toast";
import { addToFavorite, deleteFromFavorite } from "@/services/api/shop/favorite";

export const useFavorite = (productId?: number) => {
    const queryClient = useQueryClient();

    const mutation = useMutation(
        (like: boolean) =>
            like
                ? addToFavorite({ productId: productId as number })
                : deleteFromFavorite({ productId: productId as number }),
        {
            onSuccess: (response) => {
                toast.success(response?.message as string);
                queryClient.invalidateQueries(["get_favorite"]);
            },
            onError: () => {
                toast.error("عملیات انجام نشد");
            },
        }
    );

    return {
        likeHandle: (like: boolean) => mutation.mutate(like),
        loading: mutation.isLoading,
    };
};
