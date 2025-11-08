"use client"
import Label from "@/shared/Label/Label";
import Input from "@/shared/Input/Input";
import Select from "@/shared/Select/Select";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import React, {useState} from "react";
import Uploader from "@/shared/Uploader/Uploader";
import NcImage from "@/shared/NcImage/NcImage";
import SunEditors from "@/shared/Editor/SunEditors";
import {CastResponse} from "@/services/types/cast";
import NcModal from "@/shared/NcModal/NcModal";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import Image from "next/image";
import {search} from "@/services/api/admin/vlog";
import {VlogResponse} from "@/services/types/vlog";

interface Form {
    data?: CastResponse;
    submit: (e: FormData) => void;
}

export default function Form({data, submit}: Form) {
    const [showModal, setShowModal] = useState(false);
    const [serachResponse, setSearchResponse] = useState<VlogResponse[]>();
    const [vlogId, setVlogId] = useState<Number>(data?.vlog_id ?? 0);
    const [vlog, setVlog] = useState(data?.vlog);
    const renderContent = () => {
        async function searchVlog(query: string) {
            let response = await search(query);
            setSearchResponse(response);
        }

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
                                        setVlog(item);
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

    return (<>
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
        <form action={submit}>
            <div className={"grid grid-cols-1 md:grid-cols-2 gap-5"}>
                <div>
                    <Label>نام </Label>
                    <Input name={"title"} defaultValue={data?.title}/>
                </div>
                <div>
                    <Label>ادرس </Label>
                    <Input name={"url"} defaultValue={data?.url}/>
                </div>
                <div>
                    <Label>وضعیت </Label>
                    <Select name={"status"}>
                        <option value={1} selected={data?.status == 1}>
                            فعال
                        </option>
                        <option value={0} selected={data?.status == 0}>
                            غیر فعال
                        </option>
                    </Select>
                </div>

            </div>

            <hr className={"my-5"}/>
            <div className={"grid grid-cols-1 gap-5"}>

                <div>
                    <Label>توضیحات برند</Label>
                    <SunEditors name={"description"} value={data?.description}/>

                </div>

            </div>
            <div>
                <Label>فایل صوتی</Label>
                <Uploader name={"audio"}/>
            </div>
            {data?.audio ? <div className={"max-w-lg flex justify-center mx-auto"}>
                <div className="flex justify-center items-center">
                    <audio src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/cast/audio/${data.audio}`} controls/>
                </div>
            </div> : ""}

            <div>
                <ButtonSecondary onClick={() => {
                    setShowModal(true)
                }}>
                    انتخاب ولاگ
                </ButtonSecondary>
                {
                    vlog?.title
                }
                <Input type={"hidden"} name={"vlog_id"} value={vlogId?.toString()}/>

            </div>
            <div>
                <Label>تصویر </Label>
                <Uploader name={"image"}/>
            </div>
            {data?.image ? <div className={"max-w-lg flex justify-center mx-auto"}>
                <div className="flex justify-center items-center">
                    <NcImage
                        alt=""
                        containerClassName="w-full h-fit flex justify-center"
                        src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/cast/image/${data.image}`}
                        className="object-contain rounded-2xl w-full h-full"
                        width={720}
                        height={720}
                    />
                </div>
            </div> : ""}
            <hr className={"my-5"}/>
            <div className={"flex justify-center my-5"}>
                <ButtonPrimary type={"submit"}>
                    ذخیره
                </ButtonPrimary>
            </div>
        </form>
    </>)
}
