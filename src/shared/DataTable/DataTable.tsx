"use client";

import {ReactNode, useState, ChangeEvent, useEffect} from "react";
import CustomSelect from "@/shared/CustomSelect/CustomSelect";
import Input from "@/shared/Input/Input";
import {FaEdit, FaSort, FaSortDown, FaSortUp} from "react-icons/fa";
import Link from "next/link";
import Button from "@/shared/Button/Button";
import {DataTableAction, DataTableButtons, DataTableLink, DataTableProps} from "@/shared/DataTable/type";
import {UrlObject} from "node:url";
import axios from "@/services/axios";
import Pagination from "@/shared/Pagination/Pagination";
import ReactPaginate from "react-paginate";
import AdminPagination from "@/shared/Pagination/AdminPagination";
import Spinner from "@/shared/Loading/Spinner";

type optionType = {
    label: string;
    value: string | number;
};


const DataTable = <T, >({columns, apiUrl, buttons, onEdit, onDelete}: DataTableProps<T>) => {
    const [filterValues, setFilterValues] = useState<{ [key: string]: any }>({});
    const [sortConfig, setSortConfig] = useState<{
        key: keyof T | null;
        direction: "asc" | "desc";
    }>({
        key: null,
        direction: "asc",
    });
    const [data, setData] = useState<T[]>([]);
    const [meta, setMeta] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [editingRow, setEditingRow] = useState<number | null>(null); // Track which row is being edited
    const [editedData, setEditedData] = useState<any[]>([]); // Editable data state

    useEffect(() => {
        // Fetch data when filter values or sort config changes
        fetchData();
    }, [filterValues, sortConfig]);

    // Function to fetch data from API
    const fetchData = async (page: number = 1) => {
        setLoading(true);
        try {
            const queryParams = new URLSearchParams();

            queryParams.append("page", page + "");
            // Add sorting parameters
            if (sortConfig.key) {
                const sortDirection = sortConfig.direction === "asc" ? "" : "-";
                queryParams.append('sort', `${sortDirection}${sortConfig.key as string}`);
            }

            // Add filter parameters
            Object.keys(filterValues).forEach((key) => {
                const value = filterValues[key];
                if (value) {
                    if (value instanceof Date) {
                        queryParams.append(`filter[${key}]`, value.toISOString());
                    } else {
                        queryParams.append(`filter[${key}]`, value);
                    }
                }
            });

            const response = await axios.get(`${apiUrl}?${queryParams.toString()}`)
                .then((res) => res?.data?.result)
            setData(response?.data);
            setEditedData(response?.data);
            setMeta(response?.meta);

        } catch (error) {
            console.error("Failed to fetch data:", error);
        } finally {
            setLoading(false);
        }
    };

    // Handler to apply filters
    const handleFilterChange = (columnKey: keyof T, value: any) => {
        setFilterValues((prev) => ({...prev, [columnKey]: value}));
    };

    // Handler to apply sorting
    const handleSort = (columnKey: keyof T) => {
        let direction: "asc" | "desc" = "asc";
        if (sortConfig.key === columnKey && sortConfig.direction === "asc") {
            direction = "desc";
        }
        setSortConfig({key: columnKey, direction});
    };

    const handleEditClick = (rowIndex: number) => {
        setEditingRow(rowIndex);
    };

    const handleSaveClick = (rowIndex: number) => {
        if (onEdit) {
            onEdit(editedData[rowIndex]);
        }
        setEditingRow(null);
    };

    const handleInputChange = (
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
        columnKey: keyof T,
        rowIndex: number
    ) => {
        const newValue = e.target.value;
        const updatedRow = {...editedData[rowIndex], [columnKey]: newValue};
        const updatedData = [...editedData];
        updatedData[rowIndex] = updatedRow;
        setEditedData(updatedData);
    };

    const handleDateChange = (date: Date | null, columnKey: keyof T, rowIndex: number) => {
        const updatedRow = {...editedData[rowIndex], [columnKey]: date};
        const updatedData = [...editedData];
        updatedData[rowIndex] = updatedRow;
        setEditedData(updatedData);
    };

    function isLink(button: DataTableButtons): button is DataTableLink {
        return (button as DataTableLink).href !== undefined;
    }

    function isAction(button: DataTableButtons): button is DataTableAction {
        return (button as DataTableAction).action !== undefined;
    }

    return (
        <>
            <div className="relative overflow-x-scroll shadow-md sm:rounded-lg w-full">
                <table className="w-full text-sm rtl:text-right text-slate-900 text-center border">
                    <thead className="text-xs uppercase bg-slate-50 border-b border-slate-400 ">
                    <tr className={"text-slate-900 "}>
                        {columns.map((col) => (
                            <th
                                className={"text-center p-3 text-nowrap whitespace-nowrap  font-bold"}
                                key={col.key as string}
                                onClick={() => (col.hasSort !== false ? handleSort(col.key) : undefined)}
                            >
                                <div
                                    className={` flex flex-row gap-x-2 justify-center  ${col.hasSort !== false ? "cursor-pointer" : ""
                                    }`}
                                >
                                    {col.header}
                                    {col.hasSort !== false ? (
                                        sortConfig.key === col.key ? (
                                            sortConfig.direction === "asc" ? (
                                                <FaSortUp className={"text-orange-500"}/>
                                            ) : (
                                                <FaSortDown className={"text-orange-500"}/>
                                            )
                                        ) : (
                                            <FaSort className={"text-orange-500"}/>
                                        )
                                    ) : (
                                        ""
                                    )}
                                </div>
                            </th>
                        ))}
                        <th
                            className={"text-center p-3 text-nowrap whitespace-nowrap"}>
                            عملیات
                        </th>
                        <th
                            className={"text-center p-3 text-nowrap whitespace-nowrap"}>
                        </th>
                    </tr>

                    <tr className={"text-slate-900 bg-white"}>
                        {columns.map((col) => (
                            <th key={col.key as string} className={"text-center p-3"}>
                                {col.hasFilter !== false ? (
                                    <>
                                        {col.filterType === "select" ? (
                                            <CustomSelect
                                                hasAll={1}
                                                options={col.selectOptions || []}
                                                onChange={(e) => handleFilterChange(col.key, e.target.value)}
                                                value={filterValues[col.key as string] || ""}
                                            />
                                        ) : col.filterType === "date" ? (<></>
                                            // <DatePicker
                                            //     selected={filterValues[col.key as string] || null}
                                            //     onChange={(date) => handleFilterChange(col.key, date)}
                                            //     dateFormat="yyyy/MM/dd"
                                            //     placeholderText={`Filter ${col.header}`}
                                            // />
                                        ) : (
                                            <Input
                                                className={"whitespace-nowrap text-nowrap min-w-[150px] "}
                                                type="text"
                                                placeholder={`فیلتر ${col.header}`}
                                                onChange={(e) => handleFilterChange(col.key, e.target.value)}
                                                value={filterValues[col.key as string] || ""}
                                            />
                                        )}
                                    </>
                                ) : (
                                    ""
                                )}
                            </th>
                        ))}
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan={columns.length + 2} className="text-center p-3">
                                <Spinner/>
                            </td>
                        </tr>
                    ) : (
                        editedData && editedData.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {columns.map((col) => {
                                    const cellValue = row[col.key];
                                    let content: any;

                                    if (editingRow === rowIndex && col.editable) {
                                        if (col.filterType === "select") {
                                            content = (
                                                <CustomSelect
                                                    hasAll={0}
                                                    options={col.selectOptions || []}
                                                    value={cellValue as string}
                                                    onChange={(value) =>
                                                        handleInputChange(value, col.key, rowIndex)
                                                    }
                                                />
                                            );
                                        } else if (col.filterType === "date") {
                                            content = (<></>
                                                // <DatePicker
                                                //     selected={cellValue as Date}
                                                //     onChange={(date) =>
                                                //         handleDateChange(date, col.key, rowIndex)
                                                //     }
                                                //     dateFormat="yyyy/MM/dd"
                                                // />
                                            );
                                        } else {
                                            content = (
                                                <Input
                                                    value={cellValue as string}
                                                    name={col.key as string}
                                                    onChange={(e) =>
                                                        handleInputChange(e, col.key, rowIndex)
                                                    }
                                                />
                                            );
                                        }
                                    } else {
                                        content = col.render
                                            ? col.render(cellValue, row, () => handleEditClick(rowIndex))
                                            : cellValue;
                                    }

                                    return (
                                        <td
                                            className={"text-center p-3 text-nowrap whitespace-nowrap border-b"}
                                            key={col.key as string}
                                        >
                                            {content}
                                        </td>
                                    );
                                })}
                                <td className={"text-center p-3 border-b flex"}>
                                    {editingRow === rowIndex ? (
                                        <>
                                            <div className={"flex gap-x-2 justify-center"}>

                                                <Button
                                                    onClick={() => {
                                                        (onEdit != undefined && onEdit(editedData[rowIndex]));
                                                        setEditingRow(null)
                                                    }}
                                                    className={"bg-teal-500 text-white"}
                                                    sizeClass={"py-1 px-3 sm:py-1 h-8 sm:px-6 h-8"}
                                                    fontSize={" text-sm"}>
                                                    ذخیره
                                                </Button>

                                                <Button
                                                    onClick={() => setEditingRow(null)}
                                                    className={"bg-red-500 text-white"}
                                                    sizeClass={"py-1 px-3 sm:py-1 h-8 sm:px-6 h-8"}
                                                    fontSize={" text-sm"}>
                                                    انصراف
                                                </Button>

                                            </div>

                                        </>
                                    ) : (
                                        <>
                                            {onEdit && <button
                                                className="px-3 py-1  rounded"
                                                onClick={() => {
                                                    handleEditClick(rowIndex);
                                                    fetchData(meta.current_page)
                                                }}
                                            >
                                                <FaEdit className={"w-6 h-6"}/>
                                            </button>}
                                                {onDelete && (
                                                    <button
                                                        className="px-3 py-1 bg-red-500 text-white rounded"
                                                        onClick={() => {
                                                            onDelete(editedData[rowIndex].id);
                                                            fetchData(meta.current_page)
                                                        }}
                                                    >
                                                        حذف
                                                    </button>
                                                )}
                                        </>
                                    )}
                                </td>
                                <td className={"text-center p-3 border-b"}>
                                    <div className={"flex gap-x-2 justify-center"}>
                                        {
                                            buttons.map((button) => (<>
                                                {
                                                    isLink(button) ?
                                                        <Link href={button.href(row.id) as UrlObject}>
                                                            <Button className={button.colorClass}
                                                                    sizeClass={"py-1 px-3 sm:py-1 h-8 sm:px-6 h-8"}
                                                                    fontSize={" text-sm"}>
                                                                {button.label}
                                                            </Button>
                                                        </Link>
                                                        : ""
                                                }
                                                {
                                                    isAction(button) ?
                                                        <Button className={button.colorClass}
                                                                sizeClass={"py-1 px-3 sm:py-1 h-8 sm:px-6 h-8"}
                                                                fontSize={" text-sm"} onClick={() => {
                                                            button.action(row.id);
                                                            fetchData(meta.current_page)
                                                        }}>{button.label}</Button>
                                                        : ""
                                                }
                                            </>))
                                        }
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </table>

            </div>
            <div className={"mt-5 mx-auto"}>
                <AdminPagination
                    currentPage={meta.current_page}
                    totalPages={Math.ceil(meta.total / meta.per_page)}
                    onPageChange={(n) => {
                        fetchData(n);
                    }}
                />
            </div>
        </>
    );
};

export default DataTable;
