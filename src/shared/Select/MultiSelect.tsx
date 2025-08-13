// @ts-nocheck
"use client"
import React, {useEffect, useState} from "react";
import Select from "react-select";

export default function MultiSelect({
                                        className = "",
                                        name = "",
                                        options,
                                        defaultValue,
                                        inputProps,           // ⬅️ اضافه شد: برای {...register("xxx")}
                                        ...args
                                    }) {

    const [selectedValues, setSelectedValues] = useState(
        defaultValue.map((option) => option.value)
    );

    const [defaultValues, setDefaultValues] = useState(defaultValue);

    const handleChange = (selectedOptions) => {
        const values = selectedOptions ? selectedOptions.map((opt) => opt.value) : [];
        setSelectedValues(values);
        setDefaultValues(selectedOptions);

        // ⬅️ اگر با RHF رجیستر شده، تغییر را به RHF هم اعلام کن
        if (inputProps?.onChange) {
            inputProps.onChange({
                target: { name, value: JSON.stringify(values) }
            });
        }
    };

    useEffect(() => {
        setSelectedValues(defaultValue.map((option) => option.value));
    }, [defaultValue]);

    useEffect(() => {
        setDefaultValues(defaultValue);
    }, [defaultValue]);

    return (
        <>
            <Select
                options={options}
                value={defaultValues}
                isSearchable
                isMulti
                onChange={handleChange}
                className={className}
                {...args}
            />
            <input
                type="hidden"
                name={name}
                value={JSON.stringify(selectedValues)}
                readOnly
                {...inputProps}   // ⬅️ اینجا register رو پخش می‌کنیم
            />
        </>
    );
}
