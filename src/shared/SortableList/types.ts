import { ReactNode } from "react";

export type SortableEntity = { id: number };

export type SortPayload = { id: number; sort: number }[];

export type SortableListProps<T extends SortableEntity> = {
    queryKey: unknown[];
    queryFn: () => Promise<T[] | undefined>;
    mutationFn: (payload: SortPayload) => Promise<unknown>;
    renderItem: (item: T, index: number) => ReactNode;
    layout?: "list" | "grid";
    saveText?: string;
    successMessage?: string;
    emptyText?: string;
};
