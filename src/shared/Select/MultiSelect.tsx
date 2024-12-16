//@ts-nocheck
import React, { useState } from "react";
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
    const handleChange = (selectedOptions) => {
        const values = selectedOptions ? selectedOptions.map((opt) => opt.value) : [];
        setSelectedValues(values);
    };

    return (
        <>
            <Select
                options={options}
                defaultValue={defaultValue}
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
