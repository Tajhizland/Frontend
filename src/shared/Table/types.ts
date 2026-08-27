import { ReactNode } from "react";
import { UrlObject } from "url";

export type SelectOption = { label: string; value: string | number };

export type FilterType = "text" | "select" | "date";

export type EditorType = "text" | "number" | "select" | "date";

export type RowHelpers = {
    edit: () => void;
    refresh: () => void;
    mark: () => void;
};

export type TableColumn<T> = {
    key: keyof T;
    header: string;
    filter?: FilterType | false;
    sortable?: boolean;
    options?: SelectOption[];
    editable?: boolean;
    editorType?: EditorType;
    editorOptions?: SelectOption[];
    render?: (row: T, helpers: RowHelpers) => ReactNode;
};

export type ActionColor = "default" | "primary" | "success" | "warning" | "danger" | "ghost";

export type TableAction<T> = {
    label: ReactNode | ((row: T) => ReactNode);
    color?: ActionColor | ((row: T) => ActionColor);
    title?: string;
    className?: string | ((row: T) => string);
    href?: (row: T) => string | UrlObject;
    onClick?: (row: T, helpers: RowHelpers) => void;
    hidden?: (row: T) => boolean;
};

export type TableParams = {
    page: number;
    sort?: string;
    filters: Record<string, any>;
};

export type TableMeta = {
    current_page: number;
    total: number;
    per_page: number;
    [key: string]: any;
};

export type TableResult<T> = { data: T[]; meta: TableMeta };

export type TableFetcher<T> = (params: TableParams) => Promise<TableResult<T>>;

export type TableProps<T extends { id: number | string }> = {
    url?: string;
    fetcher?: TableFetcher<T>;
    queryKey?: unknown[];
    columns: TableColumn<T>[];
    actions?: TableAction<T>[];
    renderActions?: (row: T, helpers: RowHelpers) => ReactNode;
    renderRow?: (row: T, helpers: RowHelpers) => ReactNode;
    onEdit?: (row: T) => unknown | Promise<unknown>;
    onDelete?: (id: T["id"]) => unknown | Promise<unknown>;

    defaultSort?: { key: keyof T; direction?: "asc" | "desc" };
    initialFilters?: Partial<Record<keyof T, any>>;
    debounce?: number;
    reloadOnEdit?: boolean;
    deleteMessage?: string;
    emptyText?: string;
    highlightRow?: boolean;
};

export const defineColumns = <T,>(columns: TableColumn<T>[]) => columns;

export const defineActions = <T,>(actions: TableAction<T>[]) => actions;

export const ACTION_BASE =
    "inline-flex items-center justify-center gap-1 h-9 min-w-[2.25rem] px-2.5 rounded-lg text-sm font-medium transition-colors disabled:opacity-50";

export const ACTION_COLORS: Record<ActionColor, string> = {
    default: "text-slate-700 hover:bg-slate-100",
    primary: "text-blue-600 hover:bg-blue-50",
    success: "text-emerald-600 hover:bg-emerald-50",
    warning: "text-amber-600 hover:bg-amber-50",
    danger: "text-rose-600 hover:bg-rose-50",
    ghost: "text-slate-400 hover:bg-slate-100 hover:text-slate-700",
};
