"use client";

import React, { KeyboardEvent } from "react";
import CustomSelect from "@/shared/CustomSelect/CustomSelect";
import Input from "@/shared/Input/Input";
import PersianDatePicker from "@/shared/DatePicker/PersianDatePicker";
import { EditorType, TableColumn } from "@/shared/Table/types";
import { jalaliToGregorian } from "@/utils/jalali";

/**
 * مقدار سلول می‌تواند شمسیِ فرمت‌شده (خروجی بعضی ریسورس‌ها) یا میلادی باشد؛
 * دیت‌پیکر همیشه میلادیِ `YYYY-MM-DD` می‌خواهد.
 */
const toGregorianInput = (value: any): string => {
    if (value == null || value === "") return "";
    const raw = String(value).trim();
    if (/^1[34]\d{2}[/-]/.test(raw)) return jalaliToGregorian(raw);
    return raw.split(/[\sT]/)[0];
};

type Props<T> = {
    column: TableColumn<T>;
    value: any;
    autoFocus: boolean;
    onChange: (value: any, editorType?: EditorType) => void;
    onSave: () => void;
    onCancel: () => void;
};

const resolveEditorType = <T,>(column: TableColumn<T>, value: any): EditorType => {
    if (column.editorType) return column.editorType;
    if (column.filter === "select" || column.filter === "date") return column.filter;
    return typeof value === "number" ? "number" : "text";
};

function EditorCell<T>({ column, value, autoFocus, onChange, onSave, onCancel }: Props<T>) {
    const editorType = resolveEditorType(column, value);
    const options = column.editorOptions ?? column.options ?? [];

    const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") onSave();
        else if (e.key === "Escape") onCancel();
    };

    if (editorType === "select") {
        return (
            <CustomSelect
                hasAll={0}
                options={options}
                value={value == null ? "" : String(value)}
                onChange={(e) => onChange(e.target.value, editorType)}
            />
        );
    }

    if (editorType === "date") {
        return (
            <PersianDatePicker
                value={toGregorianInput(value)}
                onChange={(date) => onChange(date, editorType)}
            />
        );
    }

    return (
        <Input
            autoFocus={autoFocus}
            type={editorType === "number" ? "number" : "text"}
            name={column.key as string}
            value={value == null ? "" : String(value)}
            onChange={(e) => onChange(e.target.value, editorType)}
            onKeyDown={onKeyDown}
            className="!rounded-xl !border-slate-200 focus:!border-slate-400 focus:!ring-3 focus:!ring-slate-900/10"
        />
    );
}

export default EditorCell;
