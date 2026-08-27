"use client";

import React, { ReactNode, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import NcModal from "@/shared/NcModal/NcModal";
import Input from "@/shared/Input/Input";
import Spinner from "@/shared/Loading/Spinner";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";

type Props<T> = {
    open: boolean;
    onClose: () => void;
    modalTitle?: string;
    placeholder?: string;
    queryKey: unknown[];
    searchFn: (query: string) => Promise<T[] | undefined>;
    onPick: (item: T) => Promise<unknown>;
    renderItem: (item: T) => ReactNode;
    itemKey?: (item: T) => React.Key;
    invalidateKeys?: unknown[][];
    minLength?: number;
    closeOnPick?: boolean;
    emptyText?: string;
};

function SearchPickerModal<T>({
    open,
    onClose,
    modalTitle = "افزودن",
    placeholder = "جستجو",
    queryKey,
    searchFn,
    onPick,
    renderItem,
    itemKey,
    invalidateKeys = [["table"]],
    minLength = 1,
    closeOnPick = false,
    emptyText = "موردی یافت نشد",
}: Props<T>) {
    const queryClient = useQueryClient();
    const [query, setQuery] = useState("");
    const debouncedQuery = useDebouncedValue(query);

    const { data, isFetching } = useQuery({
        queryKey: [...queryKey, debouncedQuery],
        queryFn: () => searchFn(debouncedQuery),
        enabled: open && debouncedQuery.length >= minLength,
        staleTime: 5000,
    });

    const pickMutation = useMutation({
        mutationFn: (item: T) => onPick(item),
        onSuccess: (response: any) => {
            if (response?.message) toast.success(response.message as string);
            invalidateKeys.forEach((key) => queryClient.invalidateQueries({ queryKey: key }));
            if (closeOnPick) onClose();
        },
        onError: () => {
            toast.error("افزودن انجام نشد");
        },
    });

    const renderContent = () => (
        <div>
            <div className="mt-8 relative rounded-md shadow-xs">
                <Input
                    type="text"
                    autoFocus
                    placeholder={placeholder}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </div>
            <div className="mt-5 max-h-96 overflow-y-auto">
                {isFetching ? (
                    <div className="flex justify-center py-10">
                        <Spinner />
                    </div>
                ) : !data?.length ? (
                    <div className="py-10 text-center text-slate-400">
                        {debouncedQuery.length >= minLength ? emptyText : placeholder}
                    </div>
                ) : (
                    <div className="flex flex-col gap-y-5">
                        {data.map((item, index) => (
                            <div
                                key={itemKey ? itemKey(item) : index}
                                onClick={() => !pickMutation.isPending && pickMutation.mutate(item)}
                                className="flex justify-between items-center border shadow-sm rounded-sm ps-5 cursor-pointer hover:bg-slate-100"
                            >
                                {renderItem(item)}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );

    if (!open) return null;

    return (
        <NcModal
            isOpenProp={open}
            onCloseModal={onClose}
            contentExtraClass="max-w-4xl"
            renderContent={renderContent}
            triggerText=""
            modalTitle={modalTitle}
            hasButton={false}
        />
    );
}

export default SearchPickerModal;
