"use client"
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import CategoryTab from "@/components/Tabs/CategoryTab";
;

import { findByCategoryId , setToCategory } from "@/services/api/admin/filter";
import ButtonCircle from "@/shared/Button/ButtonCircle";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Panel from "@/shared/Panel/Panel";
import { useParams } from "next/navigation";
import { useState } from "react";
import {useQuery} from "@tanstack/react-query";
import {useApiMutation} from "@/hooks/useApiMutation";
import FilterForm from "./FilterForm";
import Spinner from "@/shared/Loading/Spinner";

export default function Page() {
    const [extraFilter, setExtraFilter] = useState(0);

    const { id } = useParams();
    const { data: data ,isLoading } = useQuery({
        queryKey: [`filter-info`, Number(id)],
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
        while (data[`filter[${filterIndex}][name]`]) {
            const items = [];
            let itemIndex = 0;

            // پردازش آیتم‌های هر filter
            while (data[`filter[${filterIndex}][item][${itemIndex}][value]`]) {
                items.push({
                    id: data[`filter[${filterIndex}][item][${itemIndex}][id]`] ? parseInt(data[`filter[${filterIndex}][item][${itemIndex}][id]`]) : undefined,
                    value: data[`filter[${filterIndex}][item][${itemIndex}][value]`],
                    status: data[`filter[${filterIndex}][item][${itemIndex}][status]`] === "فعال" ? 1 : 0,
                });
                itemIndex++;
            }

            filters.push({
                id: data[`filter[${filterIndex}][id]`] ? parseInt(data[`filter[${filterIndex}][id]`]) : undefined,
                name: data[`filter[${filterIndex}][name]`] ,
                status: data[`filter[${filterIndex}][status]`] ,
                item: items,
            });

            filterIndex++;
        }

        return {
            category_id: Number(id),
            filter: filters
        };
    };
    const saveMutation = useApiMutation(
        (form: FormData) => {
            const formDataObject: any = {};
            form.forEach((value, key) => {
                formDataObject[key] = value;
            });
            return setToCategory(convertFilterData(formDataObject));
        },
        {invalidate: [["filter-info", Number(id)]]}
    );

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
            {isLoading && <Spinner />}

            <form action={(form) => saveMutation.mutate(form)}>

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
