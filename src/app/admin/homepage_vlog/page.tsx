"use client"
import React, {useState} from "react";
import {BrandResponse} from "@/services/types/brand";
import {useQuery, useQueryClient} from "react-query";
import {getHomepageVlog, updateHomepageVlog} from "@/services/api/admin/homepageVlog";
import NcImage from "@/shared/NcImage/NcImage";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Panel from "@/shared/Panel/Panel";
import Input from "@/shared/Input/Input";
import Image from "next/image";
import {search} from "@/services/api/admin/vlog";
import {VlogResponse} from "@/services/types/vlog";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import NcModal from "@/shared/NcModal/NcModal";

export default function Page() {
    const queryClient = useQueryClient();
    const [serachResponse, setSearchResponse] = useState<VlogResponse[]>();
    const [showModal, setShowModal] = useState(false);
    const [vlogId, setVlogId] = useState<Number>();
    const [id, setId] = useState<Number>(1);

    async function submit(e: BrandResponse) {
        let response=await updateHomepageVlog({
            id: Number(id),
            vlogId: Number(vlogId)
        })
        if(response?.success){
            queryClient.refetchQueries(['homepage-vlog-list']);

        }
    }

    const {data: data} = useQuery({
        queryKey: [`homepage-vlog-list`],
        queryFn: () => getHomepageVlog(),
        staleTime: 5000,
    });


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

    return (
        <Panel>
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
            <PageTitle>
                مدیریت ولاگ صفحه اصلی
            </PageTitle>
            <hr/>
            <div className={"flex flex-col gap-5"}>
                <div className={"flex justify-between"}>
                    <div className={"flex items-center  gap-4"}>
                        <label>شماره ویدیو</label>
                    <select onChange={(e) => {
                        setId(Number(e.target.value))
                    }}>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                    </select>
                    </div>
                    <ButtonSecondary onClick={() => {
                        setShowModal(true)
                    }}>
                        انتخاب ولاگ
                    </ButtonSecondary>
                    <ButtonPrimary onClick={submit}>
                        ذخیره
                    </ButtonPrimary>
                </div>
            </div>
            <hr/>
            <>
                {data && <div className={" max-w-2xl "}>
                    <div className="grid lg:grid-cols-4 gap-6 md:gap-8">
                        <div className="relative rounded-xl overflow-hidden group lg:col-span-3">
                            <NcImage
                                containerClassName="flex aspect-w-16 aspect-h-9 w-full h-0"
                                src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/vlog/${data[0].vlog.poster}`}
                                className="object-cover w-full h-full "
                                fill
                                alt="vlog"
                            />
                            <div
                                className={"absolute top-0 left-0 text-3xl bg-black/80 flex items-center justify-center w-full h-full text-white"}>
                                1
                            </div>
                        </div>
                        <div className="grid gap-6 md:gap-8">
                            <div className="relative rounded-xl overflow-hidden group">
                                <NcImage
                                    containerClassName="flex aspect-w-16 aspect-h-9 w-full h-0"
                                    src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/vlog/${data[1].vlog.poster}`}
                                    className="object-cover w-full h-full "
                                    fill
                                    alt="vlog"
                                />
                                <div
                                    className={"absolute top-0 left-0 text-3xl bg-black/80 flex items-center justify-center w-full h-full text-white"}>
                                    2
                                </div>
                            </div>
                            <div className="relative rounded-xl overflow-hidden group">
                                <NcImage
                                    containerClassName="flex aspect-w-16 aspect-h-9 w-full h-0"
                                    src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/vlog/${data[2].vlog.poster}`}
                                    className="object-cover w-full h-full "
                                    fill
                                    alt="vlog"
                                />
                                <div
                                    className={"absolute top-0 left-0 text-3xl bg-black/80 flex items-center justify-center w-full h-full text-white"}>
                                    3
                                </div>
                            </div>
                            <div className="relative rounded-xl overflow-hidden group">
                                <NcImage
                                    containerClassName="flex aspect-w-16 aspect-h-9 w-full h-0"
                                    src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/vlog/${data[3].vlog.poster}`}
                                    className="object-cover w-full h-full "
                                    fill
                                    alt="vlog"
                                />
                                <div
                                    className={"absolute top-0 left-0 text-3xl bg-black/80 flex items-center justify-center w-full h-full text-white"}>
                                    4
                                </div>
                            </div>
                        </div>
                    </div>
                </div>}
            </>
        </Panel>
    )
}