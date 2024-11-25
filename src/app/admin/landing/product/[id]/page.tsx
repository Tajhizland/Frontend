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
    deleteLandingCategory, deleteLandingProducts,
    getLandingProducts,
    setCategoryLanding,
    setProductLanding
} from "@/services/api/admin/landing";
import {search} from "@/services/api/admin/product";
import Image from "next/image";
import NcModal from "@/shared/NcModal/NcModal";
import {ProductResponse} from "@/services/types/product";
import {store} from "@/services/api/admin/specialProduct";
import LandingTab from "@/components/Tabs/LandingTab";

export default function Page() {
    const [selectedProduct, setselectedProduct] = useState("0");
    const {id} = useParams();
    const queryClient = useQueryClient();
    const [showModal, setShowModal] = useState(false);
    const [serachResponse, setSearchResponse] = useState<ProductResponse[]>();

    const {data: data, isLoading: isLoading} = useQuery({
        queryKey: [`landing-product`],
        queryFn: () => getLandingProducts(Number(id)),
        staleTime: 5000,
    });
    const {data: categoryLists} = useQuery({
        queryKey: [`category-list`],
        queryFn: () => categoryList(),
        staleTime: 5000,
    });

    async function add(productId: any) {
        let response = await setProductLanding({product_id: Number(productId), landing_id: Number(id)})
        if (response?.success) {
            queryClient.refetchQueries(['landing-product']);
            toast.success(response?.message as string);
        }
    }

    async function deleteItemHandle(id: number) {
        let response = await deleteLandingProducts(id)
        if (response?.success) {
            queryClient.refetchQueries(['landing-product']);
            toast.success(response?.message as string);
        }
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
                title: "ویرایش محصولات",
                href: "landing/items/" + id
            }
        ]}/>
        <Panel>
            <LandingTab id={id + ""}/>
            {
                isLoading ? <Spinner/> : <>
                    {
                        data?.map((item, index) => (<>
                            <div className={"flex justify-between items-center  gap-x-10"}>
                                <span>
                                    {item?.product?.name}
                                </span>
                                <span  className={"cursor-pointer"}>
                                    <TrashIcon className={"w-8 h-8 text-red-500"}
                                               onClick={() => deleteItemHandle(item.id)}/>
                                </span>
                            </div>

                            <hr/>
                        </>))
                    }
                </>
            }
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
            <ButtonPrimary onClick={() => {
                setShowModal(true)
            }}>افزودن</ButtonPrimary>
        </Panel>
    </>)
}
