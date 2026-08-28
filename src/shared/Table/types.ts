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
    /** اگر کلید ستون با ستون دیتابیس فرق دارد (مثلا ستون نمایشیِ شمسی) کلید واقعیِ فیلتر. */
    filterKey?: string;
    /** مشابه `filterKey` ولی برای سورت. */
    sortKey?: string;
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
    "inline-flex items-center justify-center gap-1.5 h-9 min-w-9 px-2.5 rounded-lg text-[13px] font-medium " +
    "border transition-all duration-150 outline-hidden focus-visible:ring-3 " +
    "disabled:opacity-50 disabled:pointer-events-none";

export const ACTION_COLORS: Record<ActionColor, string> = {
    default: "bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 focus-visible:ring-slate-900/15",
    primary: "bg-sky-50 border-sky-100 text-sky-700 hover:bg-sky-100 hover:border-sky-200 focus-visible:ring-sky-500/25",
    success: "bg-emerald-50 border-emerald-100 text-emerald-700 hover:bg-emerald-100 hover:border-emerald-200 focus-visible:ring-emerald-500/25",
    warning: "bg-amber-50 border-amber-100 text-amber-700 hover:bg-amber-100 hover:border-amber-200 focus-visible:ring-amber-500/25",
    danger: "bg-rose-50 border-rose-100 text-rose-700 hover:bg-rose-100 hover:border-rose-200 focus-visible:ring-rose-500/25",
    ghost: "bg-transparent border-transparent text-slate-500 hover:bg-slate-100 hover:text-slate-800 focus-visible:ring-slate-900/15",
};
