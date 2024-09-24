"use client";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import PageLink from "@/shared/PageLink/PageLink";
import Link from "next/link";
import DataTable from "@/shared/DataTable/DataTable";
import {columns} from "@/app/admin/popular_category/TableRow";
import {toast} from "react-hot-toast";
import NcModal from "@/shared/NcModal/NcModal";
import { useState } from "react";
import Image from "next/image";
import Input from "@/shared/Input/Input";
import {store,remove} from "@/services/api/admin/popularProduct";


export default function Page() {
    const [showModal, setShowModal] = useState(false);

    async function removeItem(id: any) {
        let response = await remove(id);
        toast.success(response?.message as string)
    }
    async function add(id: any) {
        let response = await store({ product_id: id }); 
        toast.success(response?.message as string)
    }
    const renderContent = () => {
        return (
            <div>
                <div className="mt-8 relative rounded-md shadow-sm">
                    <Input type={"text"} placeholder="جستجوی نام محصول" />
                </div>
                <div className=" mt-5 max-h-96 overflow-y-scroll ">
                    <div className="flex flex-col gap-y-5">
                        <div className="flex justify-between items-center border shadow  rounded pl-5 cursor-pointer hover:bg-slate-100"
                            onClick={() => { add(70) }}>
                            <div className="w-[100px] h-[100px]">
                                <Image src={"https://tajhizland.com/upload/881275ce56ffd388ec8cc2f5935e22d0.jpg"} alt={"image"} width={100} height={100} />
                            </div>
                            <span>
                                اسپرسو ساز
                            </span>
                        </div>
                    </div>
                </div> 
            </div>
        );
    };
    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "دسته‌بندی های محبوب",
                href: "popular_product"
            }
        ]}/>
        <Panel>
            <PageTitle>
                دسته‌بندی های محبوب
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
                apiUrl={"admin/popular_product/dataTable"}
                columns={columns}
                buttons={[]}
            />
        </Panel>
    </>)
}
