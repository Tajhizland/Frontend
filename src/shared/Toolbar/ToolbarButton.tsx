"use client";

import React from "react";
import Link from "next/link";
import { UrlObject } from "url";

export type ToolbarButtonVariant = "primary" | "secondary" | "ghost" | "danger";

const VARIANTS: Record<ToolbarButtonVariant, string> = {
    primary:
        "bg-slate-900 text-white shadow-sm shadow-slate-900/20 hover:bg-slate-800 active:bg-slate-950 focus-visible:ring-slate-900/30",
    secondary:
        "bg-white text-slate-700 border border-slate-200 shadow-xs hover:bg-slate-50 hover:border-slate-300 focus-visible:ring-slate-900/15",
    ghost: "bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus-visible:ring-slate-900/15",
    danger: "bg-rose-600 text-white shadow-sm shadow-rose-600/20 hover:bg-rose-700 focus-visible:ring-rose-600/30",
};

const BASE =
    "inline-flex items-center justify-center gap-2 h-10 px-4 rounded-xl text-sm font-medium whitespace-nowrap " +
    "transition-all duration-150 outline-hidden focus-visible:ring-4 disabled:opacity-50 disabled:pointer-events-none";

export type ToolbarButtonProps = {
    children?: React.ReactNode;
    icon?: React.ReactNode;
    variant?: ToolbarButtonVariant;
    href?: string | UrlObject;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
    loading?: boolean;
    title?: string;
    className?: string;
};

const Spinner = () => (
    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
        <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
    </svg>
);

const ToolbarButton: React.FC<ToolbarButtonProps> = ({
    children,
    icon,
    variant = "primary",
    href,
    onClick,
    type = "button",
    disabled = false,
    loading = false,
    title,
    className = "",
}) => {
    const classes = `${BASE} ${VARIANTS[variant]} ${className}`;

    if (href && !disabled) {
        return (
            <Link href={href as UrlObject} className={classes} title={title}>
                {icon}
                {children}
            </Link>
        );
    }

    return (
        <button type={type} className={classes} onClick={onClick} disabled={disabled || loading} title={title}>
            {loading ? <Spinner /> : icon}
            {children}
        </button>
    );
};

export default ToolbarButton;
