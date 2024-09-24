"use client";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import PageLink from "@/shared/PageLink/PageLink";
import Link from "next/link";
import DataTable from "@/shared/DataTable/DataTable";
import { columns } from "@/app/admin/special_product/TableRow";
import { toast } from "react-hot-toast";
import { remove, store } from "@/services/api/admin/specialProduct";
import ModalDelete from "@/components/ModalDelete";
import ModalEdit from "@/components/ModalEdit";
import NcModal from "@/shared/NcModal/NcModal";
import { useState } from "react";
import Input from "@/shared/Input/Input";
import Image from "next/image";
import { revalidatePath } from "next/cache";


export default function Page() {
    const [showModal, setShowModal] = useState(false);
    async function removeItem(id: any) {
        let response = await remove(id);
        toast.success(response?.message as string)
    }
    async function add(id: any) {
        let response = await store({ product_id: id });
        revalidatePath("/admin/special_product")
        toast.success(response?.message as string)
    }
    const renderContent = () => {
        return (
            <form action="#">
                <div className="mt-8 relative rounded-md shadow-sm">
                    <Input type={"text"} placeholder="جستجوی نام محصول" />
                </div>
                <div className="max-h-96 mt-5">
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
                <div className="mt-4 space-x-3">
                    <ButtonPrimary type="submit">ذخیره</ButtonPrimary>
                </div>
            </form>
        );
    };

    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "محصولات خاص",
                href: "special_product"
            }
        ]} />
        <Panel>
            <PageTitle>
                محصولات خاص
            </PageTitle>
            <PageLink>
                <ButtonPrimary onClick={() => { setShowModal(true) }}> ایجاد</ButtonPrimary>
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
                apiUrl={"admin/special_product/dataTable"}
                columns={columns}
                buttons={[]}
            />
        </Panel>
    </>)
}
