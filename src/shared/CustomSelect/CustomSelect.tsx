import Select from "@/shared/Select/Select";
import {ChangeEvent} from "react";
import {optionType} from "@/shared/DataTable/type";


type CustomSelectProps = {
    options?:optionType[];
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    value: string;
    hasAll?: number;
};

const CustomSelect: React.FC<CustomSelectProps> = ({ options, onChange, value,hasAll=0 }) => {
    return (
        <Select className={"min-w-[150px]"} value={value} onChange={onChange}>
            {hasAll && <option value="">همه</option>}
            {options && options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </Select>
    );
};
export  default  CustomSelect;
