"use client"
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import CategoryTab from "@/components/Tabs/CategoryTab";
;

import Panel from "@/shared/Panel/Panel";
import { useParams } from "next/navigation";
import {useQuery, useQueryClient} from "react-query";
import { findByCategoryId, setToCategory } from "@/services/api/admin/option";
import { useState } from "react";
import ButtonCircle from "@/shared/Button/ButtonCircle";
import OptionForm from "@/app/admin/category/option/[id]/OptionForm";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import {toast} from "react-hot-toast";
import Spinner from "@/shared/Loading/Spinner";

export default function Page() {
    const [extraOption, setExtraOption] = useState(0);
    const queryClient = useQueryClient();

    const { id } = useParams();
    const { data: data  ,isLoading} = useQuery({
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

            while (data[`option[${optionIndex}][item][${itemIndex}][title]`]) {
                items.push({
                    id: data[`option[${optionIndex}][item][${itemIndex}][id]`] ? parseInt(data[`option[${optionIndex}][item][${itemIndex}][id]`]) : undefined as number|undefined,
                    title: data[`option[${optionIndex}][item][${itemIndex}][title]`] as string,
                    status: data[`option[${optionIndex}][item][${itemIndex}][status]`] === "فعال" ? 1 : 0  as number,
                });
                itemIndex++;
            }

            options.push({
                id: data[`option[${optionIndex}][id]`] ? parseInt(data[`option[${optionIndex}][id]`]) : undefined as number|undefined,
                title: data[`option[${optionIndex}][title]`] as string,
                status: data[`option[${optionIndex}][item][0][status]`] === "فعال" ? 1 : 0 as number,
                item: items,
            });

            optionIndex++;
        }

        return {
            category_id: Number(id) ,
            option: options
        };
    };


    async function submit(e: FormData) {
        const formDataObject: any = {};
        e.forEach((value, key) => {
            formDataObject[key] = value;
        });

        const formattedData = convertData(formDataObject);
       let response=await setToCategory(formattedData)
        if (response?.success) {
            queryClient.refetchQueries(['option-info']);
            toast.success(response.message as string)
        }
    }
    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "دسته‌بندی",
                href: "category"
            },
            {
                title: "ویرایش دسته‌بندی",
                href: "category/edit/" + id
            },
            {
                title: "ویرایش ویژگی دسته‌بندی",
                href: "category/option/" + id
            }
        ]} />
        <Panel>

            <CategoryTab id={id + ""} />
            {isLoading && <Spinner />}

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
