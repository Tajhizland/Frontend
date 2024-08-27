import Select from "@/shared/Select/Select";
import {ChangeEvent} from "react";

type CustomSelectProps = {
    options: string[];
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    value: string;
};

const CustomSelect: React.FC<CustomSelectProps> = ({ options, onChange, value }) => {
    return (
        <Select className={"min-w-[150px]"} value={value} onChange={(e) => onChange(e)}>
            <option value="">همه</option>
            {options.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </Select>
    );
};
export  default  CustomSelect;
