"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProvince } from "@/services/api/shop/province";
import { getCity } from "@/services/api/shop/city";

export const useProvinceCity = (initialProvinceId?: number) => {
    const [provinceId, setProvinceId] = useState<number | undefined>(initialProvinceId);

    const { data: provinces } = useQuery({
        queryKey: ["province"],
        queryFn: () => getProvince(),
        staleTime: Infinity,
    });

    const { data: cities, isFetching: citiesLoading } = useQuery({
        queryKey: ["city", provinceId],
        queryFn: () => getCity(provinceId as number),
        enabled: !!provinceId,
        staleTime: Infinity,
    });

    return { provinces, cities, citiesLoading, provinceId, setProvinceId };
};
