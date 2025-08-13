"use client"
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import {deleteItem, editDisplay, findById, getItems, setItem} from "@/services/api/admin/concept";
import ButtonCircle from "@/shared/Button/ButtonCircle";
import Spinner from "@/shared/Loading/Spinner";
import Panel from "@/shared/Panel/Panel";
import {useParams} from "next/navigation";
import React, {useState} from "react";
import {toast} from "react-hot-toast";
import {useQuery, useQueryClient} from "react-query";
import {categoryList} from "@/services/api/admin/category";
import Select from "@/shared/Select/Select";
import {TrashIcon} from "@heroicons/react/24/solid";
import ConceptTab from "@/components/Tabs/ConceptTab";
import Input from "@/shared/Input/Input";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import {FaPen} from "react-icons/fa";
import {
    deleteLandingBanner,
    deleteLandingCategory, getLandingBanner,
    getLandingCategory,
    getLandingProducts,
    setCategoryLanding, setLandingBanner
} from "@/services/api/admin/landing";
import LandingTab from "@/components/Tabs/LandingTab";
import NcImage from "@/shared/NcImage/NcImage";
import Uploader from "@/shared/Uploader/Uploader";
import Badge from "@/shared/Badge/Badge";

export default function Page() {
    const [selectedCategory, setSelectedCategory] = useState("0");
    const {id} = useParams();
    const queryClient = useQueryClient();

    const {data: data, isLoading: isLoading} = useQuery({
        queryKey: [`landing-banner`, Number(id)],
        queryFn: () => getLandingBanner(Number(id)),
        staleTime: 5000,
    });


    async function addItemHandle(e: FormData) {
        if (selectedCategory == undefined)
            return;
        let response = await setLandingBanner({
            url: e.get("url") as string,
            slider: Number(e.get("slider")),
            image: e.get("image") as File,
            landing_id: Number(id)
        })
        if (response?.success) {
            queryClient.refetchQueries(['landing-banner', Number(id)]);
            toast.success(response?.message as string);
        }
    }

    async function deleteItemHandle(id: number) {
        let response = await deleteLandingBanner(id)
        if (response?.success) {
            queryClient.refetchQueries(['landing-banner', Number(id)]);
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
        ]}/>
        <Panel>

            <LandingTab id={id + ""}/>

            <form action={addItemHandle}>
                <div className={"grid grid-cols-1 sm:grid-cols-2 gap-5  justify-between items-center gap-x-10"}>

                    <div>
                        <label>آدرس</label>
                        <Input name={"url"}/>
                    </div>
                    <div>
                        <label>اسلایدر</label>
                        <Select name={"slider"}>
                            <option value={1}>بله</option>
                            <option value={0}>خیر</option>
                        </Select>
                    </div>
                    <div className={" sm:col-span-2"}>
                        <Uploader name={"image"}/>
                    </div>

                </div>
                <ButtonPrimary className={"w-full mt-5"}>
                    آپلود
                </ButtonPrimary>

            </form>
            {
                isLoading ? <Spinner/> : <>
                    <div className="grid grid-cols-2 sm:grid-cols-4">

                        {
                            data?.map((item, index) => (<>
                                    <div className={"flex justify-between items-center  gap-x-10"}>
                                        <div className="flex flex-col justify-center items-center gap-y-4 ">
                                            <div
                                                className="relative flex-shrink-0 bg-slate-50 dark:bg-slate-300 rounded-3xl overflow-hidden z-1 group w-96 h-96">
                                                <NcImage
                                                    alt={"file"}
                                                    containerClassName="flex aspect-w-11 aspect-h-12 w-full h-full"
                                                    className="object-cover w-full h-full drop-shadow-xl"
                                                    fill
                                                    sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 40vw"
                                                    src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/landing-banner/${item.image}`}
                                                />
                                            </div>
                                            <span>
                                {item.url}
                            </span>
                                            {item.slider && <Badge name={"اسلایدر"}/>}

                                            <TrashIcon className="w-8 h-8 text-red-500 cursor-pointer" onClick={() => {
                                                deleteItemHandle(item.id)
                                            }}/>
                                        </div>
                                    </div>
                                </>
                            ))
                        }


                    </div>
                </>
            }
        </Panel>

    </>)
}
