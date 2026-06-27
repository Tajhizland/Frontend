import { ReactNode } from "react";
import { UrlObject } from "url";

export type SelectOption = { label: string; value: string | number };

export type FilterType = "text" | "select" | "date";

/** ابزارهایی که داخل render و actionها در دسترس‌اند */
export type RowHelpers = {
    /** شروع ویرایش inline همین ردیف */
    edit: () => void;
    /** رفرش داده‌های جدول (مثلاً بعد از یک اکشن یا حذف) */
    refresh: () => void;
};

export type TableColumn<T> = {
    /** نام فیلد در داده */
    key: keyof T;
    /** عنوان ستون */
    header: string;
    /** نوع فیلتر ستون. false یعنی بدون فیلتر. پیش‌فرض: "text" */
    filter?: FilterType | false;
    /** قابلیت مرتب‌سازی. پیش‌فرض: true */
    sortable?: boolean;
    /** گزینه‌های فیلتر/ویرایش وقتی از نوع select است */
    options?: SelectOption[];
    /** ویرایش inline این سلول */
    editable?: boolean;
    /** رندر سفارشی سلول — کل ردیف و ابزارها در دسترس‌اند */
    render?: (row: T, helpers: RowHelpers) => ReactNode;
};

/** رنگ‌های آماده‌ی دکمه‌های عملیاتی */
export type ActionColor = "default" | "primary" | "success" | "warning" | "danger" | "ghost";

export type TableAction<T> = {
    /** متن یا آیکن دکمه (یا تابعی که با توجه به ردیف، محتوای دکمه را می‌سازد) */
    label: ReactNode | ((row: T) => ReactNode);
    /** رنگ آماده‌ی دکمه. پیش‌فرض: "default" */
    color?: ActionColor | ((row: T) => ActionColor);
    /** متن tooltip هنگام hover */
    title?: string;
    /** کلاس استایل سفارشی (جایگزین رنگ آماده) */
    className?: string | ((row: T) => string);
    /** اگر مقدار بدهی، دکمه به‌صورت لینک رندر می‌شود */
    href?: (row: T) => string | UrlObject;
    /** اگر مقدار بدهی، دکمه به‌صورت اکشن رندر می‌شود — ردیف و ابزارها در دسترس‌اند */
    onClick?: (row: T, helpers: RowHelpers) => void;
    /** نمایش شرطی دکمه برای هر ردیف */
    hidden?: (row: T) => boolean;
};

/** پارامترهایی که جدول هنگام درخواست داده تولید می‌کند */
export type TableParams = {
    page: number;
    /** مثل "name" یا "-created_at" */
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

/** تابعی که داده‌ی جدول را برمی‌گرداند — می‌توانی توابع api را مستقیم پاس بدهی */
export type TableFetcher<T> = (params: TableParams) => Promise<TableResult<T>>;

export type TableProps<T extends { id: number | string }> = {
    /** آدرس API. اگر fetcher ندهی، از این استفاده می‌شود */
    url?: string;
    /** تابع دریافت داده (مثلاً یک تابع از فایل‌های api). جایگزین url */
    fetcher?: TableFetcher<T>;
    /** تعریف ستون‌ها */
    columns: TableColumn<T>[];
    /** دکمه‌های عملیاتی هر ردیف (حالت ساده و declarative) */
    actions?: TableAction<T>[];
    /** رندر کامل ستون عملیات — برای وقتی به state/hook صفحه نیاز داری */
    renderActions?: (row: T, helpers: RowHelpers) => ReactNode;
    /** رندر کامل سلول‌های یک ردیف (به‌جای رندر ستون‌به‌ستون) */
    renderRow?: (row: T, helpers: RowHelpers) => ReactNode;
    /** هنگام ذخیره‌ی ویرایش inline یک ردیف */
    onEdit?: (row: T) => void | Promise<void>;
    /** هنگام حذف یک ردیف (شناسه ارسال می‌شود) */
    onDelete?: (id: T["id"]) => void | Promise<void>;

    /** مرتب‌سازی پیش‌فرض هنگام بارگذاری اولیه */
    defaultSort?: { key: keyof T; direction?: "asc" | "desc" };
    /** فیلترهای اولیه */
    initialFilters?: Partial<Record<keyof T, any>>;
    /** تاخیر debounce فیلترها بر حسب میلی‌ثانیه. پیش‌فرض: 350 */
    debounce?: number;
    /** رفرش خودکار جدول بعد از ذخیره‌ی ویرایش. پیش‌فرض: true */
    reloadOnEdit?: boolean;
    /** متن پیام تایید حذف */
    deleteMessage?: string;
    /** متن نمایش‌داده‌شده وقتی داده‌ای وجود ندارد */
    emptyText?: string;
};

/** helper برای تعریف ستون‌ها با type-inference بدون نوشتن صریح <T> */
export const defineColumns = <T,>(columns: TableColumn<T>[]) => columns;

/** helper برای تعریف دکمه‌های عملیاتی با type-inference */
export const defineActions = <T,>(actions: TableAction<T>[]) => actions;
