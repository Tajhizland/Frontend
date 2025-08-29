"use client"
import {OptionResponse} from "@/services/types/option";
import Input from "@/shared/Input/Input";
import {useState} from "react";
import ButtonCircle from "@/shared/Button/ButtonCircle";
import OptionItemForm from "@/app/admin/category/option/[id]/OptionItemForm";
import Label from "@/shared/Label/Label";
import Link from "next/link";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";

export default function OptionForm({option, index}: { option?: OptionResponse, index: number }) {
    const [extraItem, setExtraItem] = useState(0);

    function handleAddForm() {
        setExtraItem(extraItem + 1);
    }

    return (<>
        <div>
            <div className={"grid grid-cols-1 md:grid-cols-2 gap-5 my-2"}>
                <div>
                    <Label>عنوان ویژگی</Label>
                    <Input name={`option[${index}][title]`} defaultValue={option?.title}/>
                </div>
                <div>
                    <Link href={"/admin/category/option/item/sort/" + option?.id}>
                        <ButtonPrimary>
                            سورت کردن آیتم ها
                        </ButtonPrimary>
                    </Link>
                </div>
            </div>
            <hr className="my-5"/>
            <Input name={`option[${index}][id]`} type={"hidden"} value={option?.id}/>
            {/*<div className={"grid grid-cols-1 md:grid-cols-2 gap-5 my-2"}>*/}
            {/*    {*/}
            {/*        option?.optionItems?.data.map((item, itemIndex) => (<>*/}
            {/*            <OptionItemForm optionIndex={index} itemIndex={itemIndex} itemId={item.id} status={item.status}*/}
            {/*                            title={item.title}/>*/}
            {/*        </>))*/}
            {/*    }*/}
            {/*    {Array.from({length: extraItem}).map((_, itemIndex) => (*/}
            {/*        <>*/}
            {/*            <OptionItemForm optionIndex={index}*/}
            {/*                            itemIndex={itemIndex + (option?.optionItems?.data?.length != undefined ? option?.optionItems?.data?.length : 0)}/>*/}
            {/*        </>*/}
            {/*    ))}*/}
            {/*</div>*/}

            <ButtonCircle type="button" className={"w-48 bg-orange-600"} onClick={handleAddForm}>
                +
            </ButtonCircle>
        </div>
    </>)
}
