"use client";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import PageLink from "@/shared/PageLink/PageLink";
import DataTable from "@/shared/DataTable/DataTable";
import {columns} from "@/app/admin/special_product/TableRow";
import {toast} from "react-hot-toast";
import {remove, store, updateHomepage} from "@/services/api/admin/specialProduct";
import NcModal from "@/shared/NcModal/NcModal";
import {useState} from "react";
import Input from "@/shared/Input/Input";
import Image from "next/image";
import {search} from "@/services/api/admin/product";
import {ProductResponse} from "@/services/types/product";
import {SpecialProductResponse} from "@/services/types/specialProduct";
import Link from "next/link";


export default function Page() {
    const [showModal, setShowModal] = useState(false);
    const [serachResponse, setSearchResponse] = useState<ProductResponse[]>();

    async function removeItem(id: any) {
        let response = await remove(id);
        toast.success(response?.message as string)
    }

    async function add(id: any) {
        let response = await store({product_id: id});
        toast.success(response?.message as string)
    }

    async function searchHandle(query: string) {
        let response = await search({query: query});
        setSearchResponse(response);

    }

    const renderContent = () => {
        return (
            <>
                <div className="mt-8 relative rounded-md shadow-sm">
                    <Input type={"text"} placeholder="جستجوی نام محصول" onChange={(e) => {
                        searchHandle(e.target.value)
                    }}/>
                </div>
                <div className="max-h-96 mt-5 overflow-y-scroll">
                    <div className="flex flex-col gap-y-5 ">
                        {
                            serachResponse && serachResponse.map((item) => (<>
                                <div
                                    className="flex justify-between items-center border shadow  rounded pl-5 cursor-pointer hover:bg-slate-100"
                                    onClick={() => {
                                        add(item.id)
                                    }}>
                                    <div className="w-[100px] h-[100px]">
                                        <Image
                                            src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/product/${item.images.data[0].url}`}
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
            </>
        );
    };

    async function submit(e: SpecialProductResponse) {
        let response = await updateHomepage({homepage: e.homepage, id: e.id});
        toast.success(response?.message as string)
    }

    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "تجهیزات خاص",
                href: "special_product"
            }
        ]}/>
        <Panel>
            <PageTitle>
                تجهیزات خاص
            </PageTitle>
            <PageLink>
                <ButtonPrimary onClick={() => {
                    setShowModal(true)
                }}> ایجاد</ButtonPrimary>
                <Link href={"/admin/special_product/sort"}>
                    <ButtonPrimary>
                        سورت کردن
                    </ButtonPrimary>
                </Link>
            </PageLink>

            <NcModal
                isOpenProp={showModal}
                onCloseModal={() => {
                    setShowModal(false)
                }}
                contentExtraClass="max-w-4xl"
                renderContent={renderContent}
                triggerText={""}
                modalTitle="افزودن"
                hasButton={false}

            />

            <DataTable
                onDelete={removeItem}
                onEdit={submit}
                apiUrl={"admin/special_product/dataTable"}
                columns={columns}
                buttons={[]}
            />
        </Panel>
    </>)
}
