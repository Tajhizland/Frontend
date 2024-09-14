import Input from "@/shared/Input/Input";
interface optionItemProps{
    optionId?:number;
    itemId?:number;
    status?:number;
    title?:string;
}
export default function OptionItemForm({optionId, itemId, status, title}: optionItemProps) {
    return (<>
        <Input name={`option[${optionId}][item][${itemId}][id]`} type={"hidden"}/>

        <div>
            <Input name={`option[${optionId}][item][${itemId}][title]`} defaultValue={title}/>
        </div>
        <div>
            <Input name={`option[${optionId}][item][${itemId}][status]`} defaultValue={status}/>
        </div>
    </>)
}
