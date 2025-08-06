"use client"
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import ProductTab from "@/components/Tabs/ProductTab";
import {findById as productFindById, findById, setVideo} from "@/services/api/admin/product";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Panel from "@/shared/Panel/Panel";
import {TrashIcon} from "@heroicons/react/24/solid";
import {useParams} from "next/navigation";
import {useQuery, useQueryClient} from "react-query";
import {toast} from "react-hot-toast";
import Input from "@/shared/Input/Input";
import Image from "next/image";
import NcModal from "@/shared/NcModal/NcModal";
import {useState} from "react";
import {search} from "@/services/api/admin/vlog";
import {VlogResponse} from "@/services/types/vlog";

export default function Page() {
    const {id} = useParams();
    const queryClient = useQueryClient();
    const [showModal, setShowModal] = useState(false);
    const [type, setType] = useState("");
    const [serachResponse, setSearchResponse] = useState<VlogResponse[]>();

    const {data: data, isLoading: isLoading} = useQuery({
        queryKey: [`product_info`],
        queryFn: () => findById(Number(id)),
        staleTime: 5000,
    });
    const {data: productInfo} = useQuery({
        queryKey: [`product-info`],
        queryFn: () => productFindById(Number(id)),
        staleTime: 5000,
    });

    async function setVideoId(vlogId: number | null) {
        let response = await setVideo({
            productId: Number(id),
            vlogId: vlogId,
            type: type
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
                                        setVideoId(item.id)
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

    const deleteVideo = async (types: string) => {
        let response = await setVideo({
            productId: Number(id),
            vlogId: null,
            type: types
        })
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
                title: "ویرایش محصول" + " ( " + productInfo?.name + " )",
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
            <ProductTab id={id + ""} url={""}/>
            <div className={"flex flex-col gap-y-10"}>

                <div>
                    <div className="flex flex-col gap-y-4">
                        <h1>ویدیوی معرفی</h1>
                        <ButtonPrimary onClick={() => {
                            setShowModal(true);
                            setType("intro")
                        }}> ویرایش</ButtonPrimary>
                    </div>
                    <div className={"flex-col flex gap-5 mt-10 justify-center items-center"}>
                        {data?.intro && <div className="flex flex-col justify-center items-center gap-y-4 ">
                            <Image
                                src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/vlog/${data?.intro?.poster}`}
                                alt={"image"} width={720} height={100} className="w-full h-full"/>
                            <ButtonPrimary onClick={() => {
                                deleteVideo("intro");
                            }}>
                                <TrashIcon className={"w-6 h-6"}/>
                            </ButtonPrimary>
                        </div>}
                    </div>
                </div>
                <div>
                    <div className="flex flex-col gap-y-4">
                        <h1>ویدیوی استفاده</h1>
                        <ButtonPrimary onClick={() => {
                            setShowModal(true);
                            setType('usage')
                        }}> ویرایش</ButtonPrimary>
                    </div>
                    <div className={"flex-col flex gap-5 mt-10 justify-center items-center"}>
                        {data?.usage && <div className="flex flex-col justify-center items-center gap-y-4 ">
                            <Image
                                src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/vlog/${data?.usage?.poster}`}
                                alt={"image"} width={720} height={100} className="w-full h-full"/>
                            <ButtonPrimary onClick={() => {
                                deleteVideo("usage");
                            }}>
                                <TrashIcon className={"w-6 h-6"}/>
                            </ButtonPrimary>
                        </div>}
                    </div>
                </div>
                <div>
                    <div className="flex flex-col gap-y-4">
                        <h1>ویدیوی آنباکسینگ</h1>
                        <ButtonPrimary onClick={() => {
                            setShowModal(true);
                            setType('unboxing')
                        }}> ویرایش</ButtonPrimary>
                        <div className={"flex-col flex gap-5 mt-10 justify-center items-center mx-auto"}>
                            {data?.unboxing && <div className="flex flex-col justify-center items-center gap-y-4 ">
                                <Image
                                    src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/vlog/${data?.unboxing?.poster}`}
                                    alt={"image"} width={720} height={100} className="w-full h-full"/>
                                <ButtonPrimary onClick={() => {
                                    deleteVideo("unboxing");
                                }}>
                                    <TrashIcon className={"w-6 h-6"}/>
                                </ButtonPrimary>
                            </div>}

                        </div>
                    </div>
                </div>
            </div>
        </Panel>
    </>)
}
