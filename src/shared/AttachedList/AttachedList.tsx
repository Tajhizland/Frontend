"use client";

import React, { ReactNode, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-hot-toast";
import { TrashIcon } from "@heroicons/react/24/solid";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Spinner from "@/shared/Loading/Spinner";
import SearchPickerModal from "@/shared/SearchPicker/SearchPickerModal";

type Picker<T, S> = {
    searchFn: (query: string) => Promise<S[] | undefined>;
    onPick: (item: S) => Promise<unknown>;
    renderItem: (item: S) => ReactNode;
    itemKey?: (item: S) => React.Key;
    placeholder?: string;
    modalTitle?: string;
    closeOnPick?: boolean;
};

type Props<T, S> = {
    queryKey: unknown[];
    queryFn: () => Promise<T[] | undefined>;
    renderItem: (item: T) => ReactNode;
    removeFn?: (item: T) => Promise<unknown>;
    itemKey?: (item: T) => React.Key;
    emptyText?: string;
    addLabel?: string;
    picker?: Picker<T, S>;
    renderAdd?: (helpers: { invalidate: () => void }) => ReactNode;
    layout?: "list" | "grid";
    addPosition?: "before" | "after";
};

function AttachedList<T, S = unknown>({
    queryKey,
    queryFn,
    renderItem,
    removeFn,
    itemKey,
    emptyText = "موردی ثبت نشده",
    addLabel = "افزودن",
    picker,
    renderAdd,
    layout = "list",
    addPosition = "after",
}: Props<T, S>) {
    const queryClient = useQueryClient();
    const [showPicker, setShowPicker] = useState(false);

    const { data, isLoading } = useQuery({ queryKey, queryFn, staleTime: 5000 });

    const invalidate = () => queryClient.invalidateQueries(queryKey);

    const removeMutation = useMutation((item: T) => removeFn!(item), {
        onSuccess: (response: any) => {
            if (response?.message) toast.success(response.message as string);
            invalidate();
        },
        onError: () => {
            toast.error("حذف انجام نشد");
        },
    });

    const trash = (item: T) =>
        removeFn && (
            <TrashIcon
                className="w-8 h-8 text-red-500 cursor-pointer shrink-0"
                onClick={() => !removeMutation.isLoading && removeMutation.mutate(item)}
            />
        );

    const pickerSlot = picker && (
        <>
            <SearchPickerModal<S>
                open={showPicker}
                onClose={() => setShowPicker(false)}
                queryKey={[...queryKey, "picker"]}
                placeholder={picker.placeholder}
                modalTitle={picker.modalTitle}
                closeOnPick={picker.closeOnPick}
                searchFn={picker.searchFn}
                onPick={picker.onPick}
                itemKey={picker.itemKey}
                renderItem={picker.renderItem}
                invalidateKeys={[queryKey]}
            />
            <ButtonPrimary className="my-5" onClick={() => setShowPicker(true)}>
                {addLabel}
            </ButtonPrimary>
        </>
    );

    const addSlot = (
        <>
            {renderAdd?.({ invalidate })}
            {pickerSlot}
        </>
    );

    return (
        <>
            {addPosition === "before" && addSlot}

            {isLoading ? (
                <Spinner />
            ) : !data?.length ? (
                <div className="py-10 text-center text-slate-400">{emptyText}</div>
            ) : layout === "grid" ? (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 mt-5">
                    {data.map((item, index) => (
                        <div
                            key={itemKey ? itemKey(item) : index}
                            className="flex flex-col justify-center items-center gap-y-4"
                        >
                            {renderItem(item)}
                            {trash(item)}
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col">
                    {data.map((item, index) => (
                        <React.Fragment key={itemKey ? itemKey(item) : index}>
                            <div className="flex justify-between items-center gap-x-10 py-2">
                                {renderItem(item)}
                                {trash(item)}
                            </div>
                            <hr />
                        </React.Fragment>
                    ))}
                </div>
            )}

            {addPosition === "after" && addSlot}
        </>
    );
}

export default AttachedList;
