"use client"
import React, {FC, useState} from "react";
import NcImage from "@/shared/NcImage/NcImage";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import Input from "@/shared/Input/Input";
import Select from "@/shared/Select/Select";
import Textarea from "@/shared/Textarea/Textarea";
import {storeContact} from "@/services/api/admin/contact";
import {useMutation, useQuery} from "react-query";
import {toast} from "react-hot-toast";
import {getProvince} from "@/services/api/shop/province";
import {getCity} from "@/services/api/shop/city";
import NcModal from "@/shared/NcModal/NcModal";
import Label from "@/shared/Label/Label";
import logo from "@/images/poster.png";
import {SampleResponse} from "@/services/types/sample";

export interface SectionPromo1Props {
    className?: string;
    info: SampleResponse
}

const SectionSampleInfo: FC<SectionPromo1Props> = ({className = "", info}) => {
    const [modal, setModal] = useState(false);

    async function submitHandle(e: FormData) {
        let response = await storeContact(
            {
                name: e.get("name") as string,
                mobile: e.get("mobile") as string,
                concept: e.get("concept") as string,
                message: e.get("message") as string,
                city_id: Number(e.get("city_id")),
                province_id: Number(e.get("province_id"))
            }
        )
        toast.success(response.message as string)
    }

    const {data: provinces} = useQuery({
        queryKey: ['province'],
        queryFn: () => getProvince(),
        staleTime: 5000,
    });

    const {
        data: citys,
        mutateAsync: changeProvince,
        isLoading: notifyStockSubmitting,
        isSuccess: notifyStockSuccess,
    } = useMutation({
        mutationKey: [`city`],
        mutationFn: (id: number) =>
            getCity(id),
    });
    const concepts = [
        "کافه"
        , "فست فود"
        , "کافه رستوران"
        , "رستوران ایرانی"
        , "آبمیوه بستنی"
        , "سوخاری"
        , "سیب زمینی بلژیکی"
        , "هایپر مارکت"
        , "سایر"
    ]
    const renderModal = () => {
        return (<>
            <form className="grid grid-cols-1 gap-6 text-right" action={submitHandle}>
                <label className="block">
                    <Label>نام</Label>

                    <Input
                        placeholder="نام"
                        type="text"
                        className="mt-1"
                        name="name"
                    />
                </label>
                <label className="block">
                    <Label>موبایل</Label>
                    <Input
                        type="text"
                        placeholder="موبایل"
                        className="mt-1"
                        name="mobile"
                    />
                </label>
                <label className="block">
                    <Label>استان</Label>

                    <Select name={"province_id"} onChange={(e) => {
                        changeProvince(Number(e.target.value))
                    }}>
                        <option>انتخاب کنید</option>
                        {
                            provinces && provinces?.map((item, index) => (
                                <option value={item.id as number} key={index}>
                                    {item.name}
                                </option>
                            ))
                        }
                    </Select>
                </label>
                <label className="block">
                    <Label>شهر</Label>
                    <Select name={"city_id"} className={"disabled:cursor-not-allowed"} disabled={!citys}>
                        {
                            citys && citys?.map((item) => (<>
                                <option value={item.id}>
                                    {item.name}
                                </option>
                            </>))
                        }
                    </Select>
                </label>
                <label className="block">
                    <Label>کانسپت</Label>
                    <Select name={"concept"}>
                        {
                            concepts.map((item, index) => (
                                <option value={item} key={index}>
                                    {item}
                                </option>
                            ))
                        }

                    </Select>
                </label>
                <label className="block">
                    <Label>پیام</Label>

                    <Textarea name="message" className="mt-1" rows={6}/>
                </label>
                <div>
                    <ButtonPrimary type="submit">ارسال پیام</ButtonPrimary>
                </div>
            </form>
        </>)
    }
    return (
        <>
            <NcModal
                isOpenProp={modal}
                onCloseModal={() => {
                    setModal(false)
                }}
                contentExtraClass="max-w-4xl"
                renderContent={renderModal}
                triggerText={""}
                modalTitle="درخواست مشاوره"
                hasButton={false}

            />

        <div
            className={`nc-SectionPromo1 relative flex flex-col-reverse md:flex-row items-center bg-neutral-100 rounded-xl gap-5 py-5  ${className}`}
        >

            <div
                className="relative flex-shrink-0 mb-16 lg:mb-0 lg:mr-10 md:w-2/5 overflow-auto bg-white max-h-[500px] rounded-lg flex flex-col gap-5 p-4 flex-[1] ">
                <h2 className="font-semibold text-lg   !leading-[1.2] tracking-tight text-[#fcb415]">
                    راه اندازی مجموعتو به تجهیزلند بسپار
                </h2>
                <div className=" ">
                <span
                    className="font-semibold  text-base !leading-[1.2] tracking-tight text-slate-700 dark:text-white ">
                    مشاوره و راه اندازی صفر تا صد کافه , رستوران و فست فود
                </span>
                </div>
                <div className={"text-sm"}>
                    <p className={"break-words"}>
                        {info.content}
                    </p>
                </div>
                <ButtonPrimary onClick={() => {
                    setModal(true)
                }} className=" text-xs sm:text-sm w-fit mx-auto">
                    دریافت نوبت مشاوره
                </ButtonPrimary>
            </div>
            <div className="relative flex-[1] max-w-xl lg:max-w-none flex flex-col gap-5 justify-center items-center">
                <NcImage
                    alt=""
                    width={1080}
                    height={1080}
                    containerClassName="block"
                    src={logo}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className=""
                />

            </div>

        </div>
        </>
    );
};

export default SectionSampleInfo;
