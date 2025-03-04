import Input from "@/shared/Input/Input";
import Select from "@/shared/Select/Select";
import Label from "@/shared/Label/Label";
import PersianDatePicker from "@/shared/DatePicker/PersianDatePicker";
import {createRef} from "react";

interface form {
    id?: string | number;
    index?: string | number;
    name?: string | number;
    code?: string | number;
    deliveryDelay?: string | number;
    status?: string | number;
    price?: string | number;
    discount?: string | number;
    stock?: string | number;
    discount_expire_time?: string;
    discount_expire_time_fa?: string;
}

export default function FormComponent({
                                          index,
                                          id,
                                          name,
                                          code,
                                          deliveryDelay,
                                          status,
                                          price,
                                          discount,
                                          stock,
                                          discount_expire_time,
                                          discount_expire_time_fa
                                      }: form) {
    const dateRef = createRef<HTMLInputElement>();
    return (
        <div className={"grid grid-cols-1 md:grid-cols-2 gap-5 my-2"}>
            <div>
                <Label>نام رنگ</Label>
                <Input name={`color[${index}][name]`} defaultValue={name ?? ""}/>
            </div>
            <div>
                <Label>کد رنگ</Label>
                <Input type={"color"} name={`color[${index}][code]`} defaultValue={code ?? ""}/>
            </div>
            <div>
                <Label>زمان آماده سازی</Label>
                <Input name={`color[${index}][delivery_delay]`} defaultValue={deliveryDelay ?? 0}/>
            </div>
            <div>
                <Label>وضعیت رنگ</Label>
                <Select name={`color[${index}][status]`}>
                    <option value={1} selected={status == 1}>فعال</option>
                    <option value={0} selected={status == 0}>غیر فعال</option>
                    <option value={2} selected={status == 2}>محدودیت</option>
                </Select>
            </div>

            <div>
                <Label>قیمت</Label>
                <Input name={`color[${index}][price]`} defaultValue={price ?? 0}/>
            </div>

            <div>
                <Label>موجودی</Label>
                <Input name={`color[${index}][stock]`} defaultValue={stock ?? 0}/>
            </div>
            <div>
                <Label>تخفیف</Label>
                <Input name={`color[${index}][discount]`} defaultValue={discount ?? 0}/>
            </div>
            <div>
                <Label>زمان انقضای تخفیف</Label>
                <PersianDatePicker
                    value={discount_expire_time_fa}
                    onChange={(date) => {
                        if (dateRef.current) {
                            dateRef.current.value = date;
                        }
                    }}/>
                <input
                    ref={dateRef}
                    type={"hidden"}
                    name={`color[${index}][discount_expire_time]`}
                       defaultValue={discount_expire_time??""}/>
            </div>
            <Input name={`color[${index}][id]`} type={"hidden"} value={id}/>

        </div>
    );
}
