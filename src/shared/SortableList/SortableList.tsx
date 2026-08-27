"use client";

import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
    closestCenter,
    DndContext,
    DragEndEvent,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    rectSortingStrategy,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { toast } from "react-hot-toast";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Spinner from "@/shared/Loading/Spinner";
import SortableItem from "@/shared/SortableList/SortableItem";
import { SortableEntity, SortableListProps } from "@/shared/SortableList/types";

function SortableList<T extends SortableEntity>({
    queryKey,
    queryFn,
    mutationFn,
    renderItem,
    layout = "list",
    saveText = "ذخیره ترتیب",
    successMessage,
    emptyText = "موردی برای مرتب‌سازی نیست",
}: SortableListProps<T>) {
    const queryClient = useQueryClient();
    const [items, setItems] = useState<T[]>([]);
    const [dirty, setDirty] = useState(false);

    const { data, isLoading } = useQuery({ queryKey, queryFn, staleTime: 5000 });

    useEffect(() => {
        if (data) {
            setItems(data);
            setDirty(false);
        }
    }, [data]);

    const save = useMutation(
        () => mutationFn(items.map((item, index) => ({ id: item.id, sort: index }))),
        {
        onSuccess: (response: unknown) => {
            const message = successMessage ?? (response as { message?: string })?.message;
            if (message) toast.success(message);
            setDirty(false);
            queryClient.invalidateQueries(queryKey);
        },
        onError: () => {
            toast.error("ذخیره‌ی ترتیب انجام نشد");
        },
        }
    );

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    );

    const handleDragEnd = ({ active, over }: DragEndEvent) => {
        if (!over || active.id === over.id) return;
        setItems((prev) => {
            const from = prev.findIndex((item) => String(item.id) === active.id);
            const to = prev.findIndex((item) => String(item.id) === over.id);
            if (from === -1 || to === -1) return prev;
            return arrayMove(prev, from, to);
        });
        setDirty(true);
    };

    if (isLoading) return <Spinner />;
    if (!items.length) return <div className="p-10 text-center text-slate-400">{emptyText}</div>;

    return (
        <div className="flex flex-col gap-4">
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext
                    items={items.map((item) => String(item.id))}
                    strategy={layout === "grid" ? rectSortingStrategy : verticalListSortingStrategy}
                >
                    <div
                        className={
                            layout === "grid"
                                ? "grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5"
                                : "flex flex-col gap-2"
                        }
                    >
                        {items.map((item, index) => (
                            <SortableItem key={String(item.id)} id={String(item.id)} layout={layout}>
                                {renderItem(item, index)}
                            </SortableItem>
                        ))}
                    </div>
                </SortableContext>
            </DndContext>

            <div className="flex items-center gap-3">
                <ButtonPrimary onClick={() => save.mutate()} disabled={!dirty || save.isLoading}>
                    {save.isLoading ? "در حال ذخیره…" : saveText}
                </ButtonPrimary>
                {dirty && <span className="text-xs text-amber-600">ترتیب تغییر کرده و ذخیره نشده است</span>}
            </div>
        </div>
    );
}

export default SortableList;
