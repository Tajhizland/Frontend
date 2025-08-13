// @ts-nocheck
"use client";
import React, { useEffect, useRef } from "react";
import SunEditor, { buttonList } from "suneditor-react";
import SunEditorCore from "suneditor/src/lib/core";
import "suneditor/dist/css/suneditor.min.css";

interface TinyEditorProps {
    name: string;
    value?: string;                         // مقدار کنترل‌شده از RHF
    onChange?: (content: string) => void;   // field.onChange
    onBlur?: () => void;                    // field.onBlur
    height?: number | string;               // اختیاری
}

const SunEditors = ({ value, name, onChange, onBlur, height = 200 }: TinyEditorProps) => {
    const editor = useRef<SunEditorCore | null>(null);
    const mounted = useRef(false);

    const getSunEditorInstance = (sunEditor: SunEditorCore) => {
        editor.current = sunEditor;
    };

    // همگام‌سازی مقدار کنترل‌شده از بیرون با ادیتور
    useEffect(() => {
        if (!editor.current) return;

        // بار اول: اگر defaultValue تنظیم شده، کاری نکن
        if (!mounted.current) {
            mounted.current = true;
            return;
        }

        // از بار دوم به بعد: اگر value عوض شد، محتوای ادیتور را به‌روزرسانی کن
        const current = editor.current.getContents(true) ?? "";
        const next = value ?? "";
        if (current !== next) {
            editor.current.setContents(next);
        }
    }, [value]);

    return (
        <div className="w-full">
            <SunEditor
                name={name}
                getSunEditorInstance={getSunEditorInstance}
                setOptions={{
                    height: String(height),
                    buttonList: buttonList.complex,
                }}
                setAllPlugins={true}
                defaultValue={value ?? ""}                 // مقدار اولیه (فقط بار اول)
                onChange={(content) => onChange?.(content)}// تغییرات را به RHF بده
                onBlur={() => onBlur?.()}                  // تا RHF touched/validate را بداند
            />
        </div>
    );
};

export default SunEditors;
