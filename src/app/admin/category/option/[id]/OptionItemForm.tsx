import Input from "@/shared/Input/Input";
import Select from "@/shared/Select/Select";
interface optionItemProps {
    optionId?: number;
    itemId?: number;
    status?: number;
    title?: string;
    optionIndex: number;
    itemIndex: number;
}
export default function OptionItemForm({ optionIndex, itemIndex, itemId, status, title }: optionItemProps) {
    return (<>
        <Input name={`option[${optionIndex}][item][${itemIndex}][id]`} type={"hidden"} value={itemId} />

        <div>
            <Input name={`option[${optionIndex}][item][${itemIndex}][title]`} defaultValue={title} />
        </div>
        <div>
            <Select name={`option[${optionIndex}][item][${itemIndex}][status]`} >
                <option selected={status == 1}>
                    فعال
                </option>
                <option selected={status == 0}>
                    غیر‌فعال
                </option>
            </Select>
        </div>
    </>)
}
