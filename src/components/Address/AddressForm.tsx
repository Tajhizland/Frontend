"use client"
import {AddressResponse} from "@/services/types/address";
import Select from "@/shared/Select/Select";
import Input from "@/shared/Input/Input";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import React, {useEffect} from "react";
import {update} from "@/services/api/shop/address";
import {toast} from "react-hot-toast";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {getProvince} from "@/services/api/shop/province";
import {getCity} from "@/services/api/shop/city";
import Label from "@/shared/Label/Label";
import {useForm} from "react-hook-form";

export default function AddressForm({address, close}: { address?: AddressResponse, close?: () => void }) {
    const queryClient = useQueryClient();

    const saveAddress = useMutation({
        mutationKey: [`save-address`],
        mutationFn: async (formData: any) => {
            return update({
                id: address?.id,
                ...formData,
            });
        },
        onSuccess: (response) => {
            if (!response)
                return;
            queryClient.invalidateQueries(['my-address']);
            queryClient.invalidateQueries(['address']);

            toast.success(response?.message as string);
            close && close()
        },
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
    useEffect(() => {
        if (address)
            changeProvince(address.province_id);
        else
            changeProvince(1);

    }, []);


    const {register, handleSubmit, control, formState: {errors}, setValue} = useForm({
        defaultValues: {
            title: "",
            province_id: "1",
            city_id: "1",
            address: "",
            tell: "",
            zip_code: "",
            mobile: "",
        },
    });
    useEffect(() => {
        if (address) {
            setValue("title", address.title);
            setValue("province_id", address.province_id.toString());
            setValue("city_id", address.city_id.toString());
            setValue("address", address.address);
            setValue("tell", address.tell);
            setValue("zip_code", address.zip_code);
            setValue("mobile", address.mobile);
        }
    }, [address, setValue]);

    const onSubmit = async (formData: any) => {
        await saveAddress.mutateAsync(formData);
    };


    return (<>
        <form onSubmit={handleSubmit(onSubmit)}>
            {/* ============ */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-3 ">
                <div>
                    <Label className="text-sm  dark:text-white">عنوان آدرس</Label>
                    <Input className="mt-1.5"  {...register("title")}/>
                </div>
                <div>
                    <Label className="text-sm  dark:text-white">استان</Label>
                    <Select  {...register("province_id")} onChange={(e) => {
                        changeProvince(Number(e.target.value))
                    }}>
                        {
                            provinces && provinces?.map((item, index) => (
                                <option key={index} value={item.id as number} selected={address?.province_id == item.id}>
                                    {item.name}
                                </option>
                            ))
                        }
                    </Select>
                </div>
                <div>
                    <Label className="text-sm  dark:text-white">شهر</Label>

                    <Select  {...register("city_id")}>
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
                        {...register("address")}
                        type={"text"}
                    />
                </div>
                <div className="sm:w-1/3">
                    <Label className="text-sm  dark:text-white">تلفن</Label>
                    <Input className="mt-1.5" {...register("tell")}/>
                </div>
            </div>

            {/* ============ */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-3">
                <div>
                    <Label className="text-sm  dark:text-white">کد پستی</Label>
                    <Input className="mt-1.5" {...register("zip_code")}/>
                </div>
                <div>
                    <Label className="text-sm  dark:text-white">شماره همراه</Label>
                    <Input className="mt-1.5"  {...register("mobile")}/>
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
