"use client"
import {OptionResponse} from "@/services/types/option";
import Input from "@/shared/Input/Input";
import {useState} from "react";
import ButtonCircle from "@/shared/Button/ButtonCircle";
import OptionItemForm from "@/app/admin/category/option/[id]/OptionItemForm";

export default function OptionForm({option}: { option?: OptionResponse }) {
    const [extraItem, setExtraItem] = useState(0);

    function handleAddForm() {
        setExtraItem(extraItem + 1);
    }

    return (<>
        <div>
            <div>{option?.title}</div>
            <Input name={`option[${option?.id}][id]`} type={"hidden"}/>
            <div className={"grid grid-cols-1 md:grid-cols-2 gap-5 my-2"}>

                {
                    option?.optionItems?.data.map((item) => (<>
                        <OptionItemForm optionId={option.id} itemId={item.id} status={item.status} value={item.title}/>
                    </>))
                }

                {Array.from({length: extraItem}).map((_, index) => (
                    <>
                        <OptionItemForm/>
                    </>
                ))}
            </div>

            <ButtonCircle type="button" className={"w-48 bg-orange-600"} onClick={handleAddForm}>
                +
            </ButtonCircle>
        </div>
    </>)
}
