import {FilterItemResponse} from "@/services/types/filterItem";
import Input from "@/shared/Input/Input";
interface filterItemProps{
    filterId?:number;
    itemId?:number;
    status?:number;
    value?:string;
}
export default function FilterItemForm({filterId, itemId, status, value}: filterItemProps) {
    return (<>
        <Input name={`filter[${filterId}][item][${itemId}][id]`} type={"hidden"}/>

        <div>
            <Input name={`filter[${filterId}][item][${itemId}][value]`} defaultValue={value}/>
        </div>
        <div>
            <Input name={`filter[${filterId}][item][${itemId}][status]`} defaultValue={status}/>
        </div>
    </>)
}
