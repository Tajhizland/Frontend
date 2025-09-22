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

export interface SectionPromo1Props {
    className?: string;
    logo?: string;
}

const SectionPromo1: FC<SectionPromo1Props> = ({className = "" , logo}) => {
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
            <form className="grid grid-cols-1 gap-6 text-right" action={submitHandle} >
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
                            provinces && provinces?.map((item , index) => (
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
                 <h2 className="font-semibold text-lg sm:text-4xl xl:text-5xl mt-6 sm:mt-10 !leading-[1.2] tracking-tight dark:text-white">
                    راه اندازی مجموعتو <br className="hidden sm:block"/>به تجهیزلند بسپار
                </h2>
                <div className="mt-6 sm:mt-12">
                <span className="font-semibold  text-sm sm:text-lg xl:text-xl  !leading-[1.2] tracking-tight text-slate-700 dark:text-white ">
                    مشاوره و راه اندازی صفر تا صد کافه , رستوران و فست فود
                </span>
                </div>
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
                        href="/sample"
                        className="border border-slate-100 dark:border-slate-700 text-xs sm:text-sm"
                    >
                        نمونه پروژه های تجهیز شده
                    </ButtonSecondary>
                </div>
            </div>
            <div className="relative flex-1 max-w-xl lg:max-w-none">
                <NcImage
                    alt=""
                    width={1080}
                    height={1080}
                    containerClassName="block dark:hidden"
                    src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/poster/${logo}`}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className=""
                />
                <NcImage
                    alt=""
                    width={1080}
                    height={1080}
                    containerClassName="hidden dark:block"
                    src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/poster/${logo}`}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className=""
                />
            </div>
        </div>
    );
};

export default SectionPromo1;
