import {useState} from "react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import gregorian from "react-date-object/calendars/gregorian";

const PersianDatePicker = ({value ,onChange}: {value?:string, onChange: (date: string) => void }) => {
    const [date, setDate] = useState<any>(value);
    const handleChange = (selectedDate: any) => {
        setDate(selectedDate);
        if (selectedDate) {
            const gregorianDate = new selectedDate.constructor({
                date: selectedDate,
                calendar: gregorian,
            }).format("YYYY-MM-DD");
            onChange(gregorianDate);
        }
    };

    const resetDate = () => {
        setDate(null);
        onChange("");
    };
    return (
        <div className={"flex items-center flex-col gap-1  w-full"}>

            <DatePicker
                value={date}
                onChange={handleChange}
                calendar={persian}
                locale={persian_fa}
                inputClass={"block w-full border-neutral-200 focus:border-rose-600 focus:ring-0 focus:ring-rose-600 focus:ring-opacity-50 bg-white disabled:bg-neutral-200  h-11 px-4 py-3 text-sm font-normal rounded-2xl"}
                format="YYYY/MM/DD"
                className="custom-date-picker flex-shrink-0 w-full"
            />
            {
                date &&
                <small className={"text-center text-rose-600 cursor-pointer"}
                       onClick={resetDate}>حذف تاریخ</small>
            }
        </div>
    );
};

export default PersianDatePicker;
