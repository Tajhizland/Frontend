"use client"
import React, {FC, useState} from "react";
import NcImage from "@/shared/NcImage/NcImage";
import rightImgDemo from "@/images/rightLargeImg.png";
import rightLargeImgDark from "@/images/rightLargeImgDark.png";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Logo from "@/shared/Logo/Logo";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import Label from "./Label/Label";
import Input from "@/shared/Input/Input";
import Select from "@/shared/Select/Select";
import Textarea from "@/shared/Textarea/Textarea";
import {storeContact} from "@/services/api/admin/contact";
import {useMutation, useQuery} from "react-query";
import {toast} from "react-hot-toast";
import {getProvince} from "@/services/api/shop/province";
import {getCity} from "@/services/api/shop/city";
import NcModal from "@/shared/NcModal/NcModal";

export interface SectionPromo1Props {
    className?: string;
}

const SectionPromo1: FC<SectionPromo1Props> = ({className = ""}) => {
    const [modal, setModal] = useState(false);

    async function submitHandle(e: FormData) {
        let response = await storeContact(
            {
                name: e.get("name") as string,
                email: e.get("email") as string,
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
            <form className="grid grid-cols-1 gap-6 text-right" action={submitHandle} method="post">
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
                    <Label>ایمیل</Label>

                    <Input
                        type="email"
                        placeholder="ایمیل"
                        className="mt-1"
                        name="email"

                    />
                </label>
                <label className="block">
                    <Label>استان</Label>

                    <Select name={"province_id"} onChange={(e) => {
                        changeProvince(Number(e.target.value))
                    }}>
                        <option>انتخاب کنید</option>
                        {
                            provinces && provinces?.map((item) => (<>
                                <option value={item.id as number}>
                                    {item.name}
                                </option>
                            </>))
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
                            concepts.map((item,index)=> (
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
        <div
            className={`nc-SectionPromo1 relative flex flex-col lg:flex-row items-center ${className}`}
        >
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
            <div className="relative flex-shrink-0 mb-16 lg:mb-0 lg:mr-10 lg:w-2/5">
                <Logo className="w-28"/>
                <h2 className="font-semibold text-3xl sm:text-4xl xl:text-5xl 2xl:text-6xl mt-6 sm:mt-10 !leading-[1.2] tracking-tight dark:text-white">
                    تجهیزلند <br/>راه اندازی میکند
                </h2>
                {/* <span className="block mt-6 text-slate-500 dark:text-slate-400 ">
          With Ciseco you will get freeship & savings combo...
        </span> */}
                <div className="flex gap-x-5 sm:gap-x-10 mt-6 sm:mt-12">
                    <ButtonPrimary onClick={() => {
                        setModal(true)
                    }} className=" text-xs sm:text-sm">
                        دریافت نوبت مشاوره
                    </ButtonPrimary>
                    <ButtonSecondary
                        href="/"
                        className="border border-slate-100 dark:border-slate-700 text-xs sm:text-sm"
                    >
                        نمونه پروژه های تجهیز شده
                    </ButtonSecondary>
                </div>
            </div>
            <div className="relative flex-1 max-w-xl lg:max-w-none">
                <NcImage
                    alt=""
                    containerClassName="block dark:hidden"
                    src={rightImgDemo}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className=""
                />
                <NcImage
                    alt=""
                    containerClassName="hidden dark:block"
                    src={rightLargeImgDark}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className=""
                />
            </div>
        </div>
    );
};

export default SectionPromo1;
