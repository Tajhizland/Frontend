import { FilterItemResponse } from "@/services/types/filterItem";
import Input from "@/shared/Input/Input";
import Select from "@/shared/Select/Select";
interface filterItemProps {
    filterIndex?: number,
    itemIndex?: number;
    itemId?: number;
    status?: number;
    value?: string;
}
export default function FilterItemForm({ filterIndex, itemIndex, itemId, status, value }: filterItemProps) {
    return (<>
        <Input name={`filter[${filterIndex}][item][${itemIndex}][id]`} type={"hidden"} value={itemId} />

        <div>
            <Input name={`filter[${filterIndex}][item][${itemIndex}][value]`} defaultValue={value} />
        </div>
        <div>
            <Select name={`filter[${filterIndex}][item][${itemIndex}][status]`}  >
                <option selected={status == 0}>
                    غیر‌فعال
                </option>
                <option selected={status == 1}>
                    فعال
                </option>
            </Select>
        </div>
    </>)
}
