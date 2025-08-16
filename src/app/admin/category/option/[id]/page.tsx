"use client"
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import CategoryTab from "@/components/Tabs/CategoryTab";

;

import Panel from "@/shared/Panel/Panel";
import {useParams, useRouter} from "next/navigation";
import {useQuery, useQueryClient} from "react-query";
import {findByCategoryId, setToCategory} from "@/services/api/admin/option";
import {Fragment, useState} from "react";
import ButtonCircle from "@/shared/Button/ButtonCircle";
import OptionForm from "@/app/admin/category/option/[id]/OptionForm";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import {toast} from "react-hot-toast";
import Spinner from "@/shared/Loading/Spinner";
import {Route} from "next";
import Link from "next/link";
import OptionItemForm from "@/app/admin/category/option/[id]/OptionItemForm";

export default function Page() {
    const [extraOption, setExtraOption] = useState(0);
    const queryClient = useQueryClient();
    const router = useRouter();

    const {id} = useParams();
    const {data: data, isLoading} = useQuery({
        queryKey: [`option-info`, Number(id)],
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
                    id: data[`option[${optionIndex}][item][${itemIndex}][id]`] ? parseInt(data[`option[${optionIndex}][item][${itemIndex}][id]`]) : undefined as number | undefined,
                    title: data[`option[${optionIndex}][item][${itemIndex}][title]`] as string,
                    status: data[`option[${optionIndex}][item][${itemIndex}][status]`] === "فعال" ? 1 : 0 as number,
                });
                itemIndex++;
            }

            options.push({
                id: data[`option[${optionIndex}][id]`] ? parseInt(data[`option[${optionIndex}][id]`]) : undefined as number | undefined,
                title: data[`option[${optionIndex}][title]`] as string,
                status: data[`option[${optionIndex}][item][0][status]`] === "فعال" ? 1 : 0 as number,
                item: items,
            });

            optionIndex++;
        }

        return {
            category_id: Number(id),
            option: options
        };
    };


    async function submit(e: FormData) {
        const formDataObject: any = {};
        e.forEach((value, key) => {
            formDataObject[key] = value;
        });

        const formattedData = convertData(formDataObject);
        let response = await setToCategory(formattedData)
        if (response?.success) {
            queryClient.refetchQueries(['option-info', Number(id)]);
            toast.success(response.message as string);
            window.location.reload()
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
        ]}/>
        <Panel>

            <CategoryTab id={id + ""}/>
            {isLoading && <Spinner/>}
            <div>
                <Link href={"/admin/category/option/sort/" + id}>
                    <ButtonPrimary>
                        سورت کردن ویژگی ها
                    </ButtonPrimary>
                </Link>
            </div>
            <div className={"flex flex-col gap-5"}>
                {
                    data && data.map((option, index) => (<Fragment key={index}>
                        <OptionItemForm data={option} categoryId={Number(id)}/>
                        <hr className="my-5"/>
                    </Fragment>))
                }
                {Array.from({length: extraOption}).map((_, index) => (
                    <>
                        <OptionItemForm categoryId={Number(id)}/>
                    </>
                ))}
                <ButtonCircle type="button" className={"w-48 bg-orange-600"} onClick={handleAddForm}>
                    +
                </ButtonCircle>
            </div>
        </Panel>

    </>)
}
