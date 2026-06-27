"use client";

import React, { useState, ChangeEvent, KeyboardEvent, useEffect, useMemo, useRef } from "react";
import CustomSelect from "@/shared/CustomSelect/CustomSelect";
import Input from "@/shared/Input/Input";
import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa";
import { LuColumns3, LuFilterX, LuPencil, LuTrash2, LuCheck, LuX } from "react-icons/lu";
import Link from "next/link";
import { ActionColor, RowHelpers, TableAction, TableMeta, TableProps } from "@/shared/Table/types";
import { tableFetcher } from "@/shared/Table/fetcher";
import { UrlObject } from "node:url";
import AdminPagination from "@/shared/Pagination/AdminPagination";
import Spinner from "@/shared/Loading/Spinner";
import NcModal from "@/shared/NcModal/NcModal";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import { IoIosWarning } from "react-icons/io";
import { usePathname } from "next/navigation";
import SelectPagination from "@/shared/Pagination/SelectPagination";
import PersianDatePicker from "@/shared/DatePicker/PersianDatePicker";

// استایل پایه‌ی همه‌ی دکمه‌های عملیاتی — یکدست، گرد، با ترنزیشن
const ACTION_BASE =
    "inline-flex items-center justify-center gap-1 h-9 min-w-[2.25rem] px-2.5 rounded-lg text-sm font-medium transition-colors disabled:opacity-50";

const ACTION_COLORS: Record<ActionColor, string> = {
    default: "text-slate-700 hover:bg-slate-100",
    primary: "text-blue-600 hover:bg-blue-50",
    success: "text-emerald-600 hover:bg-emerald-50",
    warning: "text-amber-600 hover:bg-amber-50",
    danger: "text-rose-600 hover:bg-rose-50",
    ghost: "text-slate-400 hover:bg-slate-100 hover:text-slate-700",
};

function Table<T extends { id: number | string }>({
    columns,
    url,
    fetcher,
    actions = [],
    renderActions,
    renderRow,
    onEdit,
    onDelete,
    defaultSort,
    initialFilters,
    debounce = 350,
    reloadOnEdit = true,
    deleteMessage = "آیا از حذف این آیتم اطمینان دارید ؟",
    emptyText = "موردی یافت نشد",
}: TableProps<T>) {
    const pathname = usePathname();
    const tableStorageKey = `visibleColumns-${pathname}`;

    // تابع دریافت داده: یا fetcher مستقیم، یا ساخته‌شده از url
    const fetchFn = useMemo(() => fetcher ?? tableFetcher<T>(url ?? ""), [fetcher, url]);

    const [filterValues, setFilterValues] = useState<{ [key: string]: any }>(
        (initialFilters as Record<string, any>) ?? {}
    );
    const [debouncedFilters, setDebouncedFilters] = useState(filterValues);
    const [sortConfig, setSortConfig] = useState<{
        key: keyof T | null;
        direction: "asc" | "desc";
    }>({ key: defaultSort?.key ?? null, direction: defaultSort?.direction ?? "asc" });

    const [editedData, setEditedData] = useState<T[]>([]);
    const [meta, setMeta] = useState<Partial<TableMeta>>({});
    const [loading, setLoading] = useState<boolean>(false);
    const [editingRow, setEditingRow] = useState<number | null>(null);
    const [confirmDeleteModal, setConfirmDeleteModal] = useState<boolean>(false);
    const [rowIndexId, setRowIndexId] = useState<number>(0);
    const [visibleColumns, setVisibleColumns] = useState<string[]>([]);
    const [showColumnPicker, setShowColumnPicker] = useState<boolean>(false);

    // شناسه‌ی آخرین درخواست برای نادیده‌گرفتن پاسخ‌های قدیمی (race condition)
    const requestId = useRef(0);

    // مقداردهی اولیه‌ی ستون‌های قابل‌نمایش از localStorage (فقط سمت کلاینت)
    useEffect(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem(tableStorageKey);
            setVisibleColumns(saved ? JSON.parse(saved) : columns.map((col) => col.key as string));
        }
    }, []);

    useEffect(() => {
        if (typeof window !== "undefined" && visibleColumns.length) {
            localStorage.setItem(tableStorageKey, JSON.stringify(visibleColumns));
        }
    }, [visibleColumns]);

    // debounce فیلترها تا با هر کلید، درخواست به سرور نرود
    useEffect(() => {
        const t = setTimeout(() => setDebouncedFilters(filterValues), debounce);
        return () => clearTimeout(t);
    }, [filterValues, debounce]);

    // فیلتر (debounce شده) فوری، و سورت بلافاصله، داده را می‌گیرند
    useEffect(() => {
        fetchData(1);
    }, [debouncedFilters, sortConfig]);

    const fetchData = async (page: number = 1) => {
        const currentRequest = ++requestId.current;
        setLoading(true);
        try {
            const sort = sortConfig.key
                ? `${sortConfig.direction === "asc" ? "" : "-"}${sortConfig.key as string}`
                : undefined;
            const result = await fetchFn({ page, sort, filters: filterValues });
            // اگر درخواست جدیدتری شروع شده، این پاسخ را نادیده بگیر
            if (currentRequest !== requestId.current) return;
            setEditedData(result?.data ?? []);
            setMeta(result?.meta ?? {});
        } catch (error) {
            if (currentRequest === requestId.current) console.error("Failed to fetch data:", error);
        } finally {
            if (currentRequest === requestId.current) setLoading(false);
        }
    };

    const handleFilterChange = (columnKey: keyof T, value: any) => {
        setFilterValues((prev) => ({ ...prev, [columnKey]: value }));
    };

    const resetFilters = () => setFilterValues({});

    const hasActiveFilters = Object.values(filterValues).some((v) => v !== "" && v != null);

    const handleSort = (columnKey: keyof T) => {
        let direction: "asc" | "desc" = "asc";
        if (sortConfig.key === columnKey && sortConfig.direction === "asc") {
            direction = "desc";
        }
        setSortConfig({ key: columnKey, direction });
    };

    const handleInputChange = (
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
        columnKey: keyof T,
        rowIndex: number
    ) => {
        const updatedData = [...editedData];
        updatedData[rowIndex] = { ...editedData[rowIndex], [columnKey]: e.target.value };
        setEditedData(updatedData);
    };

    const saveRow = async (rowIndex: number) => {
        if (onEdit) await onEdit(editedData[rowIndex]);
        setEditingRow(null);
        if (reloadOnEdit) fetchData(meta.current_page);
    };

    const handleEditKeyDown = (e: KeyboardEvent<HTMLInputElement>, rowIndex: number) => {
        if (e.key === "Enter") saveRow(rowIndex);
        else if (e.key === "Escape") setEditingRow(null);
    };

    const toggleColumn = (columnKey: string) => {
        setVisibleColumns((prev) =>
            prev.includes(columnKey) ? prev.filter((key) => key !== columnKey) : [...prev, columnKey]
        );
    };

    // ابزارهای در دسترس داخل render و actionها برای هر ردیف
    const helpersFor = (rowIndex: number): RowHelpers => ({
        edit: () => setEditingRow(rowIndex),
        refresh: () => fetchData(meta.current_page),
    });

    const shownColumns = columns.filter((col) => visibleColumns.includes(col.key as string));
    // ستون عملیات واحد: اکشن‌های سفارشی + ویرایش + حذف، همه در یک ستون تمیز
    const hasOpsColumn = !!onEdit || !!onDelete || actions.length > 0 || !!renderActions;
    const colSpan = shownColumns.length + (hasOpsColumn ? 1 : 0);
    const totalPages = meta.total && meta.per_page ? Math.ceil(meta.total / meta.per_page) : 0;

    const renderActionButton = (action: TableAction<T>, row: T, helpers: RowHelpers, index: number) => {
        if (action.hidden?.(row)) return null;
        const label = typeof action.label === "function" ? action.label(row) : action.label;
        const custom = typeof action.className === "function" ? action.className(row) : action.className;
        const color = typeof action.color === "function" ? action.color(row) : action.color;
        // اگر className سفارشی بدهی همان اعمال می‌شود، وگرنه از رنگ آماده استفاده می‌شود
        const className = custom ?? `${ACTION_BASE} ${ACTION_COLORS[color ?? "default"]}`;

        if (action.href) {
            return (
                <Link key={index} href={action.href(row) as UrlObject} className={className} title={action.title}>
                    {label}
                </Link>
            );
        }
        return (
            <button
                key={index}
                type="button"
                className={className}
                title={action.title}
                onClick={() => action.onClick?.(row, helpers)}
            >
                {label}
            </button>
        );
    };

    const renderDeleteConfirm = () => (
        <div className={"flex flex-col gap-y-8 text-right"}>
            <div className={"flex items-center gap-3"}>
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-rose-50 shrink-0">
                    <IoIosWarning className={"text-rose-500 w-7 h-7"} />
                </div>
                <span className={"font-bold"}>{deleteMessage}</span>
            </div>
            <div className={"flex gap-x-2 justify-end"}>
                <ButtonSecondary onClick={() => setConfirmDeleteModal(false)}>انصراف</ButtonSecondary>
                <button
                    type="button"
                    className="inline-flex items-center gap-1 px-5 h-11 rounded-2xl bg-rose-600 text-white font-medium hover:bg-rose-700 transition-colors"
                    onClick={async () => {
                        if (onDelete) await onDelete(editedData[rowIndexId].id);
                        fetchData(meta.current_page);
                        setConfirmDeleteModal(false);
                    }}
                >
                    <LuTrash2 className="w-4 h-4" />
                    بله، حذف شود
                </button>
            </div>
        </div>
    );

    return (
        <>
            {confirmDeleteModal && (
                <NcModal
                    isOpenProp={confirmDeleteModal}
                    onCloseModal={() => setConfirmDeleteModal(false)}
                    contentExtraClass="max-w-4xl"
                    renderContent={renderDeleteConfirm}
                    triggerText={""}
                    modalTitle={"هشدار"}
                    hasButton={false}
                />
            )}

            {/* نوار ابزار: تعداد کل، حذف فیلترها، انتخاب ستون‌ها */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                <div className="text-sm text-slate-600">
                    {meta.total != null && (
                        <span>
                            مجموع: <b>{Number(meta.total).toLocaleString()}</b> مورد
                        </span>
                    )}
                </div>
                <div className="flex items-center gap-2 relative">
                    {hasActiveFilters && (
                        <button
                            onClick={resetFilters}
                            className="flex items-center gap-1 text-xs px-3 py-2 rounded-lg border border-slate-300 hover:bg-slate-50 transition"
                        >
                            <LuFilterX className="w-4 h-4" />
                            حذف فیلترها
                        </button>
                    )}
                    <button
                        onClick={() => setShowColumnPicker((s) => !s)}
                        className="flex items-center gap-1 text-xs px-3 py-2 rounded-lg border border-slate-300 hover:bg-slate-50 transition"
                    >
                        <LuColumns3 className="w-4 h-4" />
                        ستون‌ها
                    </button>
                    {showColumnPicker && (
                        <div className="absolute top-full left-0 mt-1 z-20 bg-white border border-slate-200 rounded-lg shadow-lg p-3 min-w-[200px] max-h-72 overflow-auto">
                            <div className="flex flex-col gap-2">
                                {columns.map((col) => (
                                    <label
                                        key={col.key as string}
                                        className="flex items-center gap-2 cursor-pointer"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={visibleColumns.includes(col.key as string)}
                                            onChange={() => toggleColumn(col.key as string)}
                                        />
                                        <span className={"text-xs"}>{col.header}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="relative overflow-x-scroll shadow-md sm:rounded-lg w-full min-h-96">
                <table className="w-full text-sm rtl:text-right text-slate-900 text-center border">
                    <thead className="text-xs uppercase bg-slate-50 border-b border-slate-400">
                        <tr className={"text-slate-900"}>
                            {shownColumns.map((col) => {
                                const sortable = col.sortable !== false;
                                return (
                                    <th
                                        className={"text-center p-3 text-nowrap whitespace-nowrap font-bold"}
                                        key={col.key as string}
                                        onClick={() => (sortable ? handleSort(col.key) : undefined)}
                                    >
                                        <div
                                            className={`flex flex-row gap-x-2 justify-center ${sortable ? "cursor-pointer select-none" : ""}`}
                                        >
                                            {col.header}
                                            {sortable &&
                                                (sortConfig.key === col.key ? (
                                                    sortConfig.direction === "asc" ? (
                                                        <FaSortUp className={"text-orange-500"} />
                                                    ) : (
                                                        <FaSortDown className={"text-orange-500"} />
                                                    )
                                                ) : (
                                                    <FaSort className={"text-orange-500"} />
                                                ))}
                                        </div>
                                    </th>
                                );
                            })}
                            {hasOpsColumn && (
                                <th className={"text-center p-3 text-nowrap whitespace-nowrap"}>عملیات</th>
                            )}
                        </tr>
                        <tr className={"text-slate-900 bg-white"}>
                            {shownColumns.map((col) => {
                                const filterType = col.filter ?? "text";
                                return (
                                    <th key={col.key as string} className={"text-center p-3"}>
                                        {filterType === false ? null : filterType === "select" ? (
                                            <CustomSelect
                                                hasAll={1}
                                                options={col.options || []}
                                                onChange={(e) => handleFilterChange(col.key, e.target.value)}
                                                value={filterValues[col.key as string] || ""}
                                            />
                                        ) : filterType === "date" ? (
                                            <PersianDatePicker
                                                onChange={(date) => handleFilterChange(col.key, date)}
                                            />
                                        ) : (
                                            <Input
                                                className={"whitespace-nowrap text-nowrap min-w-[150px]"}
                                                type="text"
                                                placeholder={`فیلتر ${col.header}`}
                                                onChange={(e) => handleFilterChange(col.key, e.target.value)}
                                                value={filterValues[col.key as string] || ""}
                                            />
                                        )}
                                    </th>
                                );
                            })}
                            {hasOpsColumn && <th></th>}
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={colSpan} className="text-center p-3">
                                    <Spinner />
                                </td>
                            </tr>
                        ) : !editedData?.length ? (
                            <tr>
                                <td colSpan={colSpan} className="text-center p-10 text-slate-400">
                                    {emptyText}
                                </td>
                            </tr>
                        ) : (
                            editedData.map((row, rowIndex) => {
                                const helpers = helpersFor(rowIndex);
                                return (
                                    <tr key={rowIndex} className="hover:bg-slate-50 transition-colors">
                                        {renderRow
                                            ? renderRow(row, helpers)
                                            : shownColumns.map((col) => {
                                                  const cellValue = row[col.key];
                                                  let content: React.ReactNode;

                                                  if (editingRow === rowIndex && col.editable) {
                                                      if (col.filter === "select") {
                                                          content = (
                                                              <CustomSelect
                                                                  hasAll={0}
                                                                  options={col.options || []}
                                                                  value={cellValue as string}
                                                                  onChange={(value) =>
                                                                      handleInputChange(value, col.key, rowIndex)
                                                                  }
                                                              />
                                                          );
                                                      } else if (col.filter === "date") {
                                                          content = <></>;
                                                      } else {
                                                          content = (
                                                              <Input
                                                                  value={cellValue as string}
                                                                  name={col.key as string}
                                                                  autoFocus
                                                                  onChange={(e) =>
                                                                      handleInputChange(e, col.key, rowIndex)
                                                                  }
                                                                  onKeyDown={(e) =>
                                                                      handleEditKeyDown(e, rowIndex)
                                                                  }
                                                              />
                                                          );
                                                      }
                                                  } else {
                                                      content = col.render
                                                          ? col.render(row, helpers)
                                                          : (cellValue as React.ReactNode);
                                                  }

                                                  return (
                                                      <td
                                                          className={
                                                              "text-center p-3 text-nowrap whitespace-nowrap border-b"
                                                          }
                                                          key={col.key as string}
                                                      >
                                                          {content}
                                                      </td>
                                                  );
                                              })}

                                        {hasOpsColumn && (
                                            <td className={"p-3 border-b"}>
                                                {editingRow === rowIndex ? (
                                                    <div className={"flex gap-x-1 justify-center"}>
                                                        <button
                                                            type="button"
                                                            onClick={() => saveRow(rowIndex)}
                                                            className={`${ACTION_BASE} text-white bg-emerald-500 hover:bg-emerald-600`}
                                                            title="ذخیره"
                                                        >
                                                            <LuCheck className="w-4 h-4" />
                                                            ذخیره
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => setEditingRow(null)}
                                                            className={`${ACTION_BASE} text-slate-600 hover:bg-slate-100`}
                                                            title="انصراف"
                                                        >
                                                            <LuX className="w-4 h-4" />
                                                            انصراف
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <div className={"flex items-center gap-x-1 justify-center"}>
                                                        {renderActions
                                                            ? renderActions(row, helpers)
                                                            : actions.map((action, i) =>
                                                                  renderActionButton(action, row, helpers, i)
                                                              )}
                                                        {onEdit && (
                                                            <button
                                                                type="button"
                                                                className={`${ACTION_BASE} ${ACTION_COLORS.warning}`}
                                                                title="ویرایش سریع"
                                                                onClick={() => setEditingRow(rowIndex)}
                                                            >
                                                                <LuPencil className={"w-4 h-4"} />
                                                            </button>
                                                        )}
                                                        {onDelete && (
                                                            <button
                                                                type="button"
                                                                className={`${ACTION_BASE} ${ACTION_COLORS.danger}`}
                                                                title="حذف"
                                                                onClick={() => {
                                                                    setConfirmDeleteModal(true);
                                                                    setRowIndexId(rowIndex);
                                                                }}
                                                            >
                                                                <LuTrash2 className={"w-4 h-4"} />
                                                            </button>
                                                        )}
                                                    </div>
                                                )}
                                            </td>
                                        )}
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>

            {totalPages > 1 && (
                <div className={"mt-5 mx-auto flex items-center gap-5"}>
                    <SelectPagination
                        currentPage={meta.current_page ?? 1}
                        totalPages={totalPages}
                        onPageChange={(n) => fetchData(n)}
                    />
                    <AdminPagination
                        currentPage={meta.current_page ?? 1}
                        totalPages={totalPages}
                        onPageChange={(n) => fetchData(n)}
                    />
                </div>
            )}
        </>
    );
}

export default Table;
