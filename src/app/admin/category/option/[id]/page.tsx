"use client"
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import CategoryTab from "@/components/CategoryTabs/CategoryTab";
import Panel from "@/shared/Panel/Panel";
import { useParams } from "next/navigation";
import { useQuery } from "react-query";
import { findByCategoryId, setToCategory } from "@/services/api/admin/option";
import { useState } from "react";
import ButtonCircle from "@/shared/Button/ButtonCircle";
import OptionForm from "@/app/admin/category/option/[id]/OptionForm";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";

export default function Page() {
    const [extraOption, setExtraOption] = useState(0);

    const { id } = useParams();
    const { data: data } = useQuery({
        queryKey: [`option-info`],
        queryFn: () => findByCategoryId(Number(id)),
        staleTime: 5000,
    });

    function handleAddForm() {
        setExtraOption(extraOption + 1);
    }


    const convertData = (data: any) => {
        const options = [];
        let optionIndex = 0;

        while (data[`option[${optionIndex}][title]`]) {
            const items = [];
            let itemIndex = 0;

            while (data[`option[${optionIndex}][item][${itemIndex}][id]`]) {
                items.push({
                    id: data[`option[${optionIndex}][item][${itemIndex}][id]`] ? parseInt(data[`option[${optionIndex}][item][${itemIndex}][id]`]) : undefined,
                    title: data[`option[${optionIndex}][item][${itemIndex}][title]`],
                    status: data[`option[${optionIndex}][item][${itemIndex}][status]`] === "فعال" ? 1 : 0,
                });
                itemIndex++;
            }

            options.push({
                id: data[`option[${optionIndex}][id]`] ? parseInt(data[`option[${optionIndex}][id]`]) : undefined,
                title: data[`option[${optionIndex}][title]`],
                status: data[`option[${optionIndex}][item][0][status]`] === "فعال" ? 1 : 0,
                item: items,
            });

            optionIndex++;
        }

        return {
            category_id: id, // مقدار category_id دلخواه شما
            option: options
        };
    };


    async function submit(e: FormData) {
        const formDataObject: any = {};
        e.forEach((value, key) => {
            formDataObject[key] = value;
        });
        const formattedData = convertData(formDataObject);
        await setToCategory(formattedData)
    }
    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "دسته بندی",
                href: "category"
            },
            {
                title: "ویرایش دسته بندی",
                href: "category/edit/" + id
            },
            {
                title: "ویرایش ویژگی دسته بندی  ",
                href: "category/option/" + id
            }
        ]} />
        <Panel>
            <CategoryTab id={id + ""} />
            <form action={submit}>
                {
                    data && data.map((option, index) => (<>
                        <OptionForm option={option} index={index} />
                        <hr className="my-5" />
                    </>))
                }
                {Array.from({ length: extraOption }).map((_, index) => (
                    <>
                        <OptionForm index={index + (data?.length != undefined ? data?.length : 0)} />
                    </>
                ))}
                <ButtonCircle type="button" className={"w-48 bg-orange-600"} onClick={handleAddForm}>
                    +
                </ButtonCircle>
                <div className={"flex justify-center my-5"}>
                    <ButtonPrimary type={"submit"}>
                        ذخیره
                    </ButtonPrimary>
                </div>
            </form>
        </Panel>

    </>)
}
