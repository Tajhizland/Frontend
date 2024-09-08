import {ReactNode} from "react";
import {UrlObject} from "node:url";
export type Column<T> = {
    key: keyof T;
    header: string;
    hasSort?: boolean;
    hasFilter?: boolean;
    filterType?: "input" | "select" | "date";
    selectOptions?: optionType[]; // Only used if filterType is 'select'
    render?: (value: T[keyof T], row: T, onEdit?: () => void) => ReactNode; // Custom rendering function
    editable?: boolean; // Flag for inline editing
};
export type optionType = {
    label:string;
    value:string|number;
};

export type DataTableProps<T> = {
    columns: Column<T>[];
    buttons:DataTableButtons[];
    apiUrl: string; // URL for fetching data from API
    onEdit?: (e: unknown) => void; // Callback for when a row is edited
    onDelete?: (row: T) => void; // Callback for when a row is deleted
};
export type  DataTableButtons=DataTableLink |DataTableAction
export type DataTableLink = {
    label: string|ReactNode;
    type: string;
    colorClass: string;
    href: (value: any) => UrlObject;
};

export type DataTableAction = {
    label: string|ReactNode;
    type: string;
    colorClass: string;
    action: (value: any) => void;
};
