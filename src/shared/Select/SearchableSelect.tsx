import React, { FC, useState, useEffect, useRef } from "react";

interface Option {
    label: string;
    value: string | number;
}

interface SearchableSelectProps {
    options: Option[];
    value: string | number;
    onChange: (value: string | number) => void;
    placeholder?: string;
    disabled?: boolean;
}

const SearchableSelect: FC<SearchableSelectProps> = ({
                                                         options,
                                                         value,
                                                         onChange,
                                                         placeholder = "انتخاب کنید...",
                                                         disabled = false
                                                     }) => {
    const [search, setSearch] = useState("");
    const [open, setOpen] = useState(false);
    const [filtered, setFiltered] = useState<Option[]>(options);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setFiltered(
            options.filter((opt) =>
                opt.label.toLowerCase().includes(search.toLowerCase())
            )
        );
    }, [search, options]);

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const selectedLabel = options.find((opt) => opt.value == value)?.label;

    return (
        <div className="relative w-full text-neutral-900 dark:text-neutral-100" ref={containerRef}>
            <div
                className={`border rounded-2xl px-4 py-2 border-neutral-200 dark:border-neutral-700 ${disabled ? "bg-neutral-100 text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400 cursor-not-allowed" : "bg-white dark:bg-neutral-900 cursor-pointer hover:border-primary-500"}`}
                onClick={() => !disabled && setOpen(!open)}
            >
                {selectedLabel || placeholder}
            </div>

            {open && !disabled && (
                <div className="absolute z-50 mt-1 w-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-2xl shadow-md max-h-60 overflow-y-auto">
                    <input
                        type="text"
                        className="w-full px-4 py-2 text-sm outline-hidden bg-white text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100 placeholder:text-neutral-500 dark:placeholder:text-neutral-400 border-b border-neutral-200 dark:border-neutral-700"
                        placeholder="جستجو..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <ul className="max-h-48 overflow-y-auto">
                        {filtered.length > 0 ? (
                            filtered.map((opt) => (
                                <li
                                    key={opt.value}
                                    className="px-4 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer text-sm"
                                    onClick={() => {
                                        onChange(opt.value);
                                        setOpen(false);
                                        setSearch("");
                                    }}
                                >
                                    {opt.label}
                                </li>
                            ))
                        ) : (
                            <li className="px-4 py-2 text-sm text-neutral-500 dark:text-neutral-400">موردی یافت نشد</li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default SearchableSelect;
