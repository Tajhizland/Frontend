import Select from "@/shared/Select/Select";
import { ChangeEvent } from "react";
import { SelectOption as optionType } from "@/shared/Table/types";

type CustomSelectProps = {
    options?: optionType[];
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    value: string;
    hasAll?: number;
};

const CustomSelect: React.FC<CustomSelectProps> = ({ options, onChange, value, hasAll = 0 }) => {
    return (
        <Select
            className="min-w-[150px] !h-11 !rounded-xl !border-slate-200 text-sm text-slate-700 hover:border-slate-300 focus:!border-slate-400 focus:!ring-3 focus:!ring-slate-900/10"
            value={value}
            onChange={onChange}
        >
            {hasAll ? <option value="">همه</option> : null}
            {options &&
                options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
        </Select>
    );
};
export default CustomSelect;
