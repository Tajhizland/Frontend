//@ts-nocheck
"use client"
import React, {useEffect, useState} from "react";
import Select from "react-select";

export default function MultiSelect({
                                        className = "",
                                        name = "",
                                        options  ,
                                        defaultValue  ,
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
    };
    useEffect(()=>{
        setSelectedValues(defaultValue.map((option) => option.value));
    },[defaultValue])
    useEffect(()=>{
        setDefaultValues(defaultValue)
    },[defaultValue])



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
            />
        </>
    );
}
