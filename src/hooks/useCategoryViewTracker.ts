"use client";

import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import {
    storeCategoryViewHistory,
    storeCategoryViewHistoryIp,
} from "@/services/api/shop/categoryViewHistory";
import { useUser } from "@/services/globalState/GlobalState";

export const useCategoryViewTracker = (categoryId?: number) => {
    const [user] = useUser();

    const track = useMutation({
        mutationFn: (id: number) =>
            user ? storeCategoryViewHistory({ category_id: id }) : storeCategoryViewHistoryIp({ category_id: id }),
    });

    useEffect(() => {
        if (categoryId) track.mutate(categoryId);
    }, [categoryId, !!user]);
};
