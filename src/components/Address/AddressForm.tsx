"use client"
import {AddressResponse} from "@/services/types/address";
import Select from "@/shared/Select/Select";
import Input from "@/shared/Input/Input";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import React, {useEffect} from "react";
import {update} from "@/services/api/shop/address";
import {toast} from "react-hot-toast";
import {useMutation, useQuery} from "react-query";
import {getProvince} from "@/services/api/shop/province";
import {getCity} from "@/services/api/shop/city";
import Label from "@/shared/Label/Label";

export default function AddressForm({address}: { address?: AddressResponse }) {
    async function saveAddress(e: FormData) {
        let response = await update({
            id: address?.id,
            city_id: e.get("city_id") as string,
            province_id: e.get("province_id") as string,
            tell: e.get("tell") as string,
            zip_code: e.get("zip_code") as string,
            address: e.get("address") as string,
            mobile: e.get("mobile") as string,
        })
        toast.success(response?.message as string);
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
    useEffect(() => {
        if (address)
            changeProvince(address.province_id);
        else
            changeProvince(1);

    }, []);


    return (<>
        <form action={saveAddress}>
            {/* ============ */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-3 ">
                <div>
                    <Label className="text-sm  dark:text-white">استان</Label>
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
                    <Label className="text-sm  dark:text-white">شهر</Label>

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
                    <Label className="text-sm  dark:text-white">آدرس</Label>
                    <Input
                        className="mt-1.5"
                        placeholder=""
                        name={"address"}
                        defaultValue={address?.address}
                        type={"text"}
                    />
                </div>
                <div className="sm:w-1/3">
                    <Label className="text-sm  dark:text-white">تلفن</Label>
                    <Input className="mt-1.5" defaultValue={address?.tell} name={"tell"}/>
                </div>
            </div>

            {/* ============ */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-3">
                <div>
                    <Label className="text-sm  dark:text-white">کد پستی</Label>
                    <Input className="mt-1.5" defaultValue={address?.zip_code} name={"zip_code"}/>
                </div>
                <div>
                    <Label className="text-sm  dark:text-white">شماره همراه</Label>
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

    </>)

}
