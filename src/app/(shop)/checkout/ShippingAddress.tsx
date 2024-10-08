"use client";

import Label from "@/components/Label/Label";
import React, {FC} from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import Input from "@/shared/Input/Input";
import Radio from "@/shared/Radio/Radio";
import Select from "@/shared/Select/Select";
import {useMutation, useQuery} from "react-query";
import {getProvince} from "@/services/api/shop/province";
import {getCity} from "@/services/api/shop/city";
import {find, update} from "@/services/api/shop/address";
import {toast} from "react-hot-toast";

interface Props {
    isActive: boolean;
    onCloseActive: () => void;
    onOpenActive: () => void;
}


const ShippingAddress: FC<Props> = ({
                                        isActive,
                                        onCloseActive,
                                        onOpenActive,
                                    }) => {

    const {data: address} = useQuery({
        queryKey: ['address'],
        queryFn: () => find(),
        staleTime: 5000,
        onSuccess: data => {
            changeProvince(data.province_id);
        }
    });


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

    async function saveAddress(e: FormData) {
        let response = await update({
            city_id: e.get("city_id") as string,
            province_id: e.get("province_id") as string,
            tell: e.get("tell") as string,
            zip_code: e.get("zip_code") as string,
            address: e.get("address") as string,
            mobile: e.get("mobile") as string,
        })
        toast.success(response?.message as string);
    }


    const renderShippingAddress = () => {
        return (
            <div className="border border-slate-200 dark:border-slate-700 rounded-xl ">
                <div className="p-6 flex flex-col sm:flex-row items-start justify-between">
                    <div className="flex  items-center">
          <span className="hidden sm:block">
            <svg
                className="w-6 h-6 text-slate-700 dark:text-slate-400 mt-0.5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
              <path
                  d="M12.1401 15.0701V13.11C12.1401 10.59 14.1801 8.54004 16.7101 8.54004H18.6701"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
              />
              <path
                  d="M5.62012 8.55005H7.58014C10.1001 8.55005 12.1501 10.59 12.1501 13.12V13.7701V17.25"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
              />
              <path
                  d="M7.14008 6.75L5.34009 8.55L7.14008 10.35"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
              />
              <path
                  d="M16.8601 6.75L18.6601 8.55L16.8601 10.35"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
              />
              <path
                  d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
              />
            </svg>
          </span>

                        <div className="sm:mr-8">
                            <h3 className=" text-slate-700 dark:text-slate-300 flex ">
                                <span className="uppercase">آدرس</span>
                                <svg
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="2.5"
                                    stroke="currentColor"
                                    className="w-5 h-5 ml-3 text-slate-900 dark:text-slate-100"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4.5 12.75l6 6 9-13.5"
                                    />
                                </svg>
                            </h3>
                        </div>
                    </div>
                    <button
                        className="py-2 px-4 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 mt-5 sm:mt-0  text-sm font-medium rounded-lg"
                        onClick={onOpenActive}
                    >
                        ویرایش
                    </button>
                </div>
                <div
                    className={`border-t border-slate-200 dark:border-slate-700 px-6 py-7 space-y-4 sm:space-y-6 ${isActive ? "block" : "hidden"
                    }`}
                >

                    <form action={saveAddress}>
                        {/* ============ */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-3">
                            <div>
                                <Label className="text-sm">استان</Label>
                                <Select name={"province_id"} onChange={(e) => {
                                    changeProvince(Number(e.target.value))
                                }}>
                                    {
                                        provinces && provinces?.map((item) => (<>
                                            <option value={item.id as number} selected={address?.province_id == item.id}>
                                                {item.name}
                                            </option>
                                        </>))
                                    }
                                </Select>
                            </div>
                            <div>
                                <Label className="text-sm">شهر</Label>

                                <Select name={"city_id"}>
                                    {
                                        citys && citys?.map((item) => (<>
                                            <option value={item.id} selected={address?.city_id == item.id}>
                                                {item.name}
                                            </option>
                                        </>))
                                    }
                                </Select>
                            </div>
                        </div>

                        {/* ============ */}
                        <div className="sm:flex space-y-4 sm:space-y-0 sm:gap-x-3">
                            <div className="flex-1">
                                <Label className="text-sm">آدرس</Label>
                                <Input
                                    className="mt-1.5"
                                    placeholder=""
                                    name={"address"}
                                    defaultValue={address?.address}
                                    type={"text"}
                                />
                            </div>
                            <div className="sm:w-1/3">
                                <Label className="text-sm">تلفن</Label>
                                <Input className="mt-1.5" defaultValue={address?.tell} name={"tell"}/>
                            </div>
                        </div>

                        {/* ============ */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-3">
                            <div>
                                <Label className="text-sm">کد پستی</Label>
                                <Input className="mt-1.5" defaultValue={address?.zip_code} name={"zip_code"}/>
                            </div>
                            <div>
                                <Label className="text-sm">شماره همراه</Label>
                                <Input className="mt-1.5" defaultValue={address?.mobile} name={"mobile"}/>
                            </div>

                        </div>


                        {/* ============ */}
                        <div className="flex flex-col sm:flex-row pt-6">
                            <ButtonPrimary
                                className="sm:!px-7 shadow-none"
                            >
                                ذخیره
                            </ButtonPrimary>
                        </div>
                    </form>
                </div>
            </div>
        );
    };
    return renderShippingAddress();
};

export default ShippingAddress;
