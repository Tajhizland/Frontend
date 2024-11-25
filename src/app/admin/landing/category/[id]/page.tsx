"use client"
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import { deleteItem, editDisplay, findById, getItems, setItem } from "@/services/api/admin/concept";
import ButtonCircle from "@/shared/Button/ButtonCircle";
import Spinner from "@/shared/Loading/Spinner";
import Panel from "@/shared/Panel/Panel";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useQuery, useQueryClient } from "react-query";
import { categoryList } from "@/services/api/admin/category";
import Select from "@/shared/Select/Select";
import { TrashIcon } from "@heroicons/react/24/solid";
import ConceptTab from "@/components/Tabs/ConceptTab";
import Input from "@/shared/Input/Input";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import { FaPen } from "react-icons/fa";
import {
    deleteLandingCategory,
    getLandingCategory,
    getLandingProducts,
    setCategoryLanding
} from "@/services/api/admin/landing";
import LandingTab from "@/components/Tabs/LandingTab";

export default function Page() {
    const [selectedCategory, setSelectedCategory] = useState("0");
    const { id } = useParams();
    const queryClient = useQueryClient();

    const { data: data, isLoading: isLoading } = useQuery({
        queryKey: [`landing-category`],
        queryFn: () => getLandingCategory(Number(id)),
        staleTime: 5000,
    });

    const { data: categoryLists } = useQuery({
        queryKey: [`category-list`],
        queryFn: () => categoryList(),
        staleTime: 5000,
    });


    async function addItemHandle() {
        if (selectedCategory == undefined)
            return;
        let response = await setCategoryLanding({ category_id: Number(selectedCategory), landing_id: Number(id) })
        if (response?.success) {
            queryClient.refetchQueries(['landing-category']);
            toast.success(response?.message as string);
        }
    }

    async function deleteItemHandle(id: number) {
        let response = await deleteLandingCategory(id)
        if (response?.success) {
            queryClient.refetchQueries(['landing-category']);
            toast.success(response?.message as string);
        }
    }


    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "لندینگ",
                href: "landing"
            },
            {
                title: "ویرایش لندینگ",
                href: "landing/edit/" + id
            },
            {
                title: "ویرایش  آیتم ها",
                href: "landing/items/" + id
            }
        ]} />
        <Panel>

            <LandingTab id={id + ""}/>
            {
                isLoading ? <Spinner /> : <>
                    {
                        data?.map((item, index) => (<>
                            <div className={"flex justify-between items-center  gap-x-10"}>
                                <span>
                                    {item?.category?.name}
                                </span>

                                <span className={"cursor-pointer"}>
                                    <TrashIcon className={"w-8 h-8 text-red-500"}
                                        onClick={() => deleteItemHandle(item.id)} />
                                </span>
                            </div>

                            <hr />
                        </>))
                    }
                    <div className={"flex justify-between items-center gap-x-10"}>

                        <Select onChange={(e) => {
                            setSelectedCategory(e.target.value as string)
                        }}>
                            <option>انتخاب کنید</option>
                            {
                                categoryLists?.data.map((item) => (<>
                                    <option value={item.id}>
                                        {item.name}
                                    </option>
                                </>))
                            }
                        </Select>
                        <ButtonCircle type="button" className={"w-48 bg-orange-600"} onClick={addItemHandle}>
                            +
                        </ButtonCircle>

                    </div>
                </>
            }
        </Panel>

    </>)
}
