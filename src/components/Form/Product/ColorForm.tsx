import Label from "@/components/Label/Label";
import Input from "@/shared/Input/Input";
import Select from "@/shared/Select/Select";

interface form {
    id?: string|number;
    index?: string|number;
    name?: string|number;
    code?: string|number;
    deliveryDelay?: string|number;
    status?: string|number;
    price?: string|number;
    discount?: string|number;
    stock?: string|number;
}
export default function FormComponent({index ,id , name , code ,deliveryDelay , status ,price , discount , stock}: form) {
    return (
        <div className={"grid grid-cols-1 md:grid-cols-2 gap-5"}>
            <div>
                <Label>نام رنگ</Label>
                <Input name={`color[${index}][name]`} defaultValue={name??""}/>
            </div>
            <div>
                <Label>کد رنگ</Label>
                <Input type={"color"} name={`color[${index}][code]`} defaultValue={code??""}/>
            </div>
            <div>
                <Label>زمان آماده سازی</Label>
                <Input name={`color[${index}][delivery_delay]`} defaultValue={deliveryDelay??""}/>
            </div>
            <div>
                <Label>وضعیت رنگ</Label>
                <Select name={`color[${index}][status]`}>
                    <option value={1} selected={status==1} >فعال</option>
                    <option value={0} selected={status==0}>غیر فعال</option>
                    <option value={2} selected={status==2}>محدودیت</option>
                </Select>
            </div>

            <div>
                <Label>قیمت</Label>
                <Input name={`color[${index}][price]`} defaultValue={price??""}/>
            </div>
            <div>
                <Label>تخفیف</Label>
                <Input name={`color[${index}][discount]`} defaultValue={discount??""}/>
            </div>
            <div>
                <Label>موجودی</Label>
                <Input name={`color[${index}][stock]`} defaultValue={stock??""}/>
            </div>
            {
                id ? <>
                        <Input type={"hidden"} value={id}/>
                    </>
                    :
                    ""
            }
        </div>
    );
}
