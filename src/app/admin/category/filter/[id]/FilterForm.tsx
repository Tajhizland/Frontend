"use client"
import {FilterResponse} from "@/services/types/filter";
import Input from "@/shared/Input/Input";
import {useState} from "react";
import FilterItemForm from "@/app/admin/category/filter/[id]/FilterItemForm";
import ButtonCircle from "@/shared/Button/ButtonCircle";

export default function FilterForm({filter}: { filter?: FilterResponse }) {
    const [extraItem, setExtraItem] = useState(0);

    function handleAddForm() {
        setExtraItem(extraItem + 1);
    }

    return (<>
        <div>
            <div>{filter?.name}</div>
            <Input name={`filter[${filter?.id}][id]`} type={"hidden"}/>
            <div className={"grid grid-cols-1 md:grid-cols-2 gap-5 my-2"}>

                {
                    filter?.items.data.map((item) => (<>
                        <FilterItemForm filterId={filter.id} itemId={item.id} status={item.status} value={item.value}/>
                    </>))
                }

                {Array.from({length: extraItem}).map((_, index) => (
                    <>
                        <FilterItemForm/>
                    </>
                ))}
            </div>

            <ButtonCircle type="button" className={"w-48 bg-orange-600"} onClick={handleAddForm}>
                +
            </ButtonCircle>
        </div>
    </>)
}
