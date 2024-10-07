"use client";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import PageLink from "@/shared/PageLink/PageLink";
import Link from "next/link";
import DataTable from "@/shared/DataTable/DataTable";
import {columns} from "@/app/admin/homepage_category/TableRow";
import {toast} from "react-hot-toast";
import {remove, store} from "@/services/api/admin/homepageCategory";
import { useState } from "react";
import Input from "@/shared/Input/Input";
import Image from "next/image";
import NcModal from "@/shared/NcModal/NcModal";
import {CategoryResponse} from "@/services/types/category";
import {search} from "@/services/api/admin/category";


export default function Page() {
    const [showModal, setShowModal] = useState(false);
    const [serachResponse, setSearchResponse] = useState<CategoryResponse[]>();

    async function removeItem(id: any) {
        let response = await remove(id);
        toast.success(response?.message as string)
    }
    async function add(id: any) {
        let response = await store({ category_id: id });
        toast.success(response?.message as string)
    }
    async function searchCategory(query : string) {
        let response = await search({query:query});
        setSearchResponse(response);
    }
    const renderContent = () => {
        return (
            <div>
                <div className="mt-8 relative rounded-md shadow-sm">
                    <Input type={"text"} placeholder="جستجوی نام دسته بندی" onChange={(e)=>{searchCategory(e.target.value)}} />
                </div>
                <div className=" mt-5 max-h-96 overflow-y-scroll ">
                    <div className="flex flex-col gap-y-5">
                        {
                            serachResponse && serachResponse.map((item) => (<>
                                <div
                                    className="flex justify-between items-center border shadow  rounded pl-5 cursor-pointer hover:bg-slate-100"
                                    onClick={() => {
                                        add(item.id)
                                    }}>
                                    <div className="w-[100px] h-[100px]">
                                        <Image
                                            src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/category/${item.image}`}
                                            alt={"image"} width={100} height={100}/>
                                    </div>
                                    <span>
                                        {item.name}
                                    </span>
                                </div>
                            </>))
                        }
                    </div>
                </div>
            </div>
        );
    };
    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "دسته‌بندی صفحه اصلی",
                href: "homepage_category"
            }
        ]}/>
        <Panel>
            <PageTitle>
                دسته‌بندی صفحه اصلی
            </PageTitle>
            <PageLink>
                <ButtonPrimary onClick={() => { setShowModal(true) }} > ایجاد</ButtonPrimary>
            </PageLink>
            <NcModal
                isOpenProp={showModal}
                onCloseModal={() => { setShowModal(false) }}
                contentExtraClass="max-w-4xl"
                renderContent={renderContent}
                triggerText={""}
                modalTitle="افزودن"
                hasButton={false}
            />
            <DataTable
                onDelete={removeItem}
                apiUrl={"admin/homepage_category/dataTable"}
                columns={columns}
                buttons={[]}
            />
        </Panel>
    </>)
}
