"use client"
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import ProductTab from "@/components/Tabs/ProductTab";
import {deleteItem, findById, getItems, setItem} from "@/services/api/admin/concept";
import ButtonCircle from "@/shared/Button/ButtonCircle";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Spinner from "@/shared/Loading/Spinner";
import Panel from "@/shared/Panel/Panel";
import {useParams} from "next/navigation";
import React, {useState} from "react";
import {toast} from "react-hot-toast";
import {useQuery, useQueryClient} from "react-query";
import {categoryList} from "@/services/api/admin/category";
import Select from "@/shared/Select/Select";
import {TrashIcon} from "@heroicons/react/24/solid";

export default function Page() {
    const [selectedCategory, setSelectedCategory] = useState("0");
    const {id} = useParams();
    const queryClient = useQueryClient();

    const {data: data, isLoading: isLoading} = useQuery({
        queryKey: [`concept-items`],
        queryFn: () => getItems(Number(id)),
        staleTime: 5000,
    });
    const {data: categoryLists} = useQuery({
        queryKey: [`category-list`],
        queryFn: () => categoryList(),
        staleTime: 5000,
    });


    async function addItemHandle() {
        if (selectedCategory == undefined)
            return;
        let response = await setItem({category_id: selectedCategory, concept_id: Number(id)})
        if (response?.success) {
            queryClient.refetchQueries(['concept-items']);
            toast.success(response?.message as string);
        }
    }

    async function deleteItemHandle(id: number) {
        let response = await deleteItem(id)
        if (response?.success) {
            queryClient.refetchQueries(['concept-items']);
            toast.success(response?.message as string);
        }
    }

    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "concept",
                href: "concept"
            },
            {
                title: "ویرایش concept",
                href: "concept/edit/" + id
            },
            {
                title: "ویرایش  آیتم ها",
                href: "concept/items/" + id
            }
        ]}/>
        <Panel>

            <ProductTab id={id + ""}/>
            {
                isLoading ? <Spinner/> : <>
                         {
                             data?.map((item, index) => (<>
                                 <div className={"flex justify-between items-center  gap-x-10"}>
                                    <span>
                                        {item?.category?.name}
                                    </span>
                                     <span>
                                        <TrashIcon className={"w-8 h-8 text-red-500"}
                                                   onClick={() => deleteItemHandle(item.id)}/>
                                    </span>
                                 </div>
                                 <hr/>
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
