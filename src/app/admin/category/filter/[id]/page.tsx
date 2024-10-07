"use client"
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import CategoryTab from "@/components/CategoryTabs/CategoryTab";
import { findByCategoryId , setToCategory } from "@/services/api/admin/filter";
import ButtonCircle from "@/shared/Button/ButtonCircle";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Panel from "@/shared/Panel/Panel";
import { useParams } from "next/navigation";
import { useState } from "react";
import {useQuery, useQueryClient} from "react-query";
import FilterForm from "./FilterForm";
import {toast} from "react-hot-toast";

export default function Page() {
    const [extraFilter, setExtraFilter] = useState(0);
    const queryClient = useQueryClient();

    const { id } = useParams();
    const { data: data } = useQuery({
        queryKey: [`filter-info`],
        queryFn: () => findByCategoryId(Number(id)),
        staleTime: 5000,
    });

    function handleAddForm() {
        setExtraFilter(extraFilter + 1);
    }
    const convertFilterData = (data: any) => {
        const filters = [];
        let filterIndex = 0;

        // بررسی و پردازش هر filter
        while (data[`filter[${filterIndex}][id]`]) {
            const items = [];
            let itemIndex = 0;

            // پردازش آیتم‌های هر filter
            while (data[`filter[${filterIndex}][item][${itemIndex}][id]`]) {
                items.push({
                    id: data[`filter[${filterIndex}][item][${itemIndex}][id]`] ? parseInt(data[`filter[${filterIndex}][item][${itemIndex}][id]`]) : undefined,
                    value: data[`filter[${filterIndex}][item][${itemIndex}][value]`],
                    status: data[`filter[${filterIndex}][item][${itemIndex}][status]`] === "فعال" ? 1 : 0,
                });
                itemIndex++;
            }

            filters.push({
                id: data[`filter[${filterIndex}][id]`] ? parseInt(data[`filter[${filterIndex}][id]`]) : undefined,
                item: items,
            });

            filterIndex++;
        }

        return {
            category_id: 1, // مقدار دلخواه برای category_id
            option: filters
        };
    };
    async function submit(e: FormData) {
         const formDataObject: any = {};
        e.forEach((value, key) => {
            formDataObject[key] = value;
        });
        const formattedFilterData = convertFilterData(formDataObject);
        let response=await setToCategory(formattedFilterData)
        if (response?.success) {
            queryClient.refetchQueries(['filter-info']);
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
                title: "ویرایش فیلتر دسته‌بندی",
                href: "category/filter/" + id
            }
        ]} />
        <Panel>
            <CategoryTab id={id + ""} />
            <form action={submit}>

                {
                    data && data.map((filter, index) => (<>
                        <FilterForm filter={filter} index={index} />
                        <hr className="my-5" />
                    </>))
                }

                {Array.from({ length: extraFilter }).map((_, index) => (
                    <>
                        <FilterForm index={index + (data?.length != undefined ? data?.length : 0)} />
                        <hr className={"my-5"} />
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
