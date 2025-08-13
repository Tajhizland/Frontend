"use client"
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import ProductTab from "@/components/Tabs/ProductTab";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Panel from "@/shared/Panel/Panel";
import {useParams} from "next/navigation";
import {useQuery, useQueryClient} from "react-query";
import {toast} from "react-hot-toast";
import Input from "@/shared/Input/Input";
import Image from "next/image";
import NcModal from "@/shared/NcModal/NcModal";
import React, {useState} from "react";
import {search} from "@/services/api/admin/vlog";
import {VlogResponse} from "@/services/types/vlog";
import {deleteProductVideo, findById, setProductVideo} from "@/services/api/admin/productVideo";
import NcImage from "@/shared/NcImage/NcImage";
import {FaTrash} from "react-icons/fa";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import {findByProductId} from "@/services/api/admin/option";
import {findById as productFindById} from "@/services/api/admin/product";

export default function Page() {
    const {id} = useParams();
    const queryClient = useQueryClient();
    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState("");
    const [vlogId, setVlogId] = useState<Number>();
    const [serachResponse, setSearchResponse] = useState<VlogResponse[]>();

    const {data: data, isLoading: isLoading} = useQuery({
        queryKey: [`product_info`, Number(id)],
        queryFn: () => findById(Number(id)),
        staleTime: 5000,
    });
    const {data: productInfo} = useQuery({
        queryKey: [`product-info`, Number(id)],
        queryFn: () => productFindById(Number(id)),
        staleTime: 5000,
    });

    async function setVideoId() {
        let response = await setProductVideo({
            product_id: Number(id),
            vlogId: Number(vlogId),
            title: title
        })
        if (response?.success) {
            queryClient.refetchQueries(['product_info']);
            toast.success(response?.message as string);
        }
    }

    async function searchVlog(query: string) {
        let response = await search(query);
        setSearchResponse(response);
    }

    const renderContent = () => {
        return (
            <div>
                <div className="mt-8 relative rounded-md shadow-sm">
                    <Input type={"text"} placeholder="جستجوی نام ویدیو" onChange={(e) => {
                        searchVlog(e.target.value)
                    }}/>
                </div>
                <div className=" mt-5 max-h-96 overflow-y-scroll ">
                    <div className="flex flex-col gap-y-5">
                        {
                            serachResponse && serachResponse.map((item) => (<>
                                <div
                                    className="flex justify-between items-center border shadow  rounded pl-5 cursor-pointer hover:bg-slate-100"
                                    onClick={() => {
                                        setVlogId(item.id);
                                        setShowModal(false);

                                    }}>
                                    <div className="w-[100px] h-[100px]">
                                        <Image
                                            src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/vlog/${item.poster}`}
                                            alt={"image"} width={100} height={100}/>
                                    </div>
                                    <span>
                                        {item.title}
                                    </span>
                                </div>
                            </>))
                        }
                    </div>
                </div>
            </div>
        );
    };

    const deleteVideo = async (id: number) => {
        let response = await deleteProductVideo(id)
        if (response?.success) {
            queryClient.refetchQueries(['product_info']);
            toast.success(response?.message as string);
        }
    }
    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "محصولات",
                href: "product"
            },
            {
                title: "ویرایش محصول",
                href: "product/edit/" + id
            },
            {
                title: "ویدیو های محصول",
                href: "product/video/" + id
            }
        ]}/>
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
        <Panel>
            <ProductTab id={id + ""} url={productInfo?.url ?? ""}/>

            <div className={"flex flex-col gap-4"}>
                <div className={"flex flex-col gap-1"}>
                    <label>عنوان</label>
                    <Input name={"title"} onChange={(e) => {
                        setTitle(e.target.value)
                    }}/>
                </div>
                <div>
                    <ButtonSecondary onClick={() => {
                        setShowModal(true)
                    }}>
                        انتخاب ولاگ
                    </ButtonSecondary>
                </div>
                <div>
                    <ButtonPrimary onClick={setVideoId}>
                        ذخیره
                    </ButtonPrimary>
                </div>
            </div>
            <hr/>
            <div className={"flex flex-col "}>
                {data && data.map((item, index) => (
                    <div className={"flex items-center justify-between gap-5 flex-wrap border-b py-5"} key={index}>
                        <div className="relative  w-32">
                            <NcImage
                                containerClassName="flex aspect-w-16 aspect-h-9 w-full h-0"
                                src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/vlog/${item?.vlog?.poster}`}
                                className="object-cover w-full h-full "
                                fill
                                alt="vlog"
                            />
                        </div>
                        <div>
                            <span>
                                {item.title}
                            </span>
                        </div>
                        <div>
                            <ButtonPrimary onClick={() => {
                                deleteVideo(item.id)
                            }}>
                                <FaTrash/>
                            </ButtonPrimary>
                        </div>
                    </div>
                ))}
            </div>
        </Panel>
    </>)
}
