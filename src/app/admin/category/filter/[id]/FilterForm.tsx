"use client"
import { FilterResponse } from "@/services/types/filter";
import Input from "@/shared/Input/Input";
import { useState } from "react";
import FilterItemForm from "@/app/admin/category/filter/[id]/FilterItemForm";
import ButtonCircle from "@/shared/Button/ButtonCircle";
import Label from "@/components/Label/Label";
import Select from "@/shared/Select/Select";

export default function FilterForm({ filter, index }: { filter?: FilterResponse, index: number }) {
    const [extraItem, setExtraItem] = useState(0);

    function handleAddForm() {
        setExtraItem(extraItem + 1);
    }

    return (<>
        <div>
            <div className={"grid grid-cols-1 md:grid-cols-2 gap-5 my-2"}>
                <div>
                    <Label>عنوان فیلتر</Label>
                    <Input name={`filter[${index}][name]`} defaultValue={filter?.name} />
                </div>
                <div>
                    <Label>وضعیت فیلتر</Label>
                     <Select name={`filter[${index}][status]`}   >
                        <option selected={filter?.status == 0} value={0}>
                            غیر‌فعال
                        </option>
                        <option selected={filter?.status== 1} value={1}>
                            فعال
                        </option>
                    </Select>
                </div>
            </div>
            <hr className="my-5" />
            <Input name={`filter[${index}][id]`} type={"hidden"} value={filter?.id} />
            <div className={"grid grid-cols-1 md:grid-cols-2 gap-5 my-2"}>

                {
                    filter?.items.data.map((item, itemIndex) => (<>
                        <FilterItemForm filterIndex={index} itemIndex={itemIndex} itemId={item.id} status={item.status} value={item.value} />
                    </>))
                }

                {Array.from({ length: extraItem }).map((_, itemIndex) => (
                    <>
                        <FilterItemForm filterIndex={index} itemIndex={itemIndex + (filter?.items?.data?.length != undefined ? filter?.items?.data?.length : 0)} />
                    </>
                ))}
            </div>

            <ButtonCircle type="button" className={"w-48 bg-orange-600"} onClick={handleAddForm}>
                +
            </ButtonCircle>
        </div>
    </>)
}
