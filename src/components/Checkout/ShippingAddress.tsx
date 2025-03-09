"use client";

import React, {FC, Fragment, useState} from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Input from "@/shared/Input/Input";
import Select from "@/shared/Select/Select";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {getProvince} from "@/services/api/shop/province";
import {getCity} from "@/services/api/shop/city";
import {changeActiveAddress, findActive, getAllAddress, update} from "@/services/api/shop/address";
import {toast} from "react-hot-toast";
import Link from "next/link";
import Label from "@/shared/Label/Label";
import {AddressResponse} from "@/services/types/address";
import {Switch} from "@headlessui/react";
import AddressForm from "@/components/Address/AddressForm";
import NcModal from "@/shared/NcModal/NcModal";

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
    const [showEditModal, setShowEditModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [editAddress, setEditAddress] = useState<AddressResponse>();
    const queryClient = useQueryClient();
    const {data: activeAddress} = useQuery({
        queryKey: ['address'],
        queryFn: () => findActive(),
        staleTime: 5000,
        onSuccess: data => {
            changeProvince(data?.province_id ?? 1);
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
            id: activeAddress?.id as number,
            city_id: e.get("city_id") as string,
            title: e.get("title") as string,
            province_id: e.get("province_id") as string,
            tell: e.get("tell") as string,
            zip_code: e.get("zip_code") as string,
            address: e.get("address") as string,
            mobile: e.get("mobile") as string,
        })
        if (response) {
            queryClient.invalidateQueries(['address']);
            toast.success(response?.message as string);
        }
    }
    const {data: address} = useQuery({
        queryKey: ['my-address'],
        queryFn: () => getAllAddress(),
        staleTime: 6000,
    });

    const {
        mutateAsync: changeActive,
        isLoading: changeActiveAddressLoading,
        isSuccess: changeActiveAddressSiccess,
    } = useMutation({
        mutationKey: [`changeActiveAddress`],
        mutationFn: (id: number) =>
            changeActiveAddress({id: id}),
        onSuccess: data => {
            queryClient.invalidateQueries(['my-address']);
            queryClient.invalidateQueries(['address']);

        }
    });

    const renderItem = (item: AddressResponse) => {
        return <div
            className={"border rounded-lg flex flex-col p-5 text-neutral-500   dark:text-white dark:bg-black/20 text-sm md:text-base gap-y-10"}>
            <div className={"flex items-center flex-auto flex-wrap gap-x-10 gap-y-5"}>
                <div>
                  <span className={"text-slate-500"}>
                  عنوان :
                  </span>
                    <span className={"text-slate-600"}>
                        {item.title}
                    </span>
                </div>
                <div>
                    <span className={"text-slate-500"}>
                        استان :
                    </span>
                    <span className={"text-slate-600"}>
                        {item.province?.name}
                    </span>
                </div>
                <div>
                    <span className={"text-slate-500"}>
                        شهر :
                    </span>
                    <span className={"text-slate-600"}>
                        {item.city?.name}
                    </span>
                </div>
                <div>
                    <span className={"text-slate-500"}>
                        تلفن :
                    </span>
                    <span className={"text-slate-600"}>
                        {item.tell}
                    </span>
                </div>
                <div>
                    <span className={"text-slate-500"}>
                        موبایل :
                    </span>
                    <span className={"text-slate-600"}>
                        {item.mobile}
                    </span>

                </div>
                <div>
                    <span className={"text-slate-500"}>
                        کدپستی :
                    </span>
                    <span className={"text-slate-600"}>
                        {item.zip_code}
                    </span>
                </div>
            </div>

            <div className={"flex  justify-center md:justify-start"}>
                <p>
                    {item.address}
                </p>
            </div>
            <div className={"flex items-center gap-x-5 justify-between"}>
                <div className={"flex items-center gap-x-5 justify-center  md:justify-start"}>
                <span>
                    فعال :
                </span>
                    <Switch
                        onChange={() => {
                            changeActive(item.id)
                        }}
                        disabled={item.active == 1 ? true : false}
                        checked={item.active == 1 ? true : false}
                        className={`${item.active ? "bg-teal-500" : "bg-slate-900"}
          relative inline-flex h-[22px] w-[42px] shrink-0 cursor-pointer rounded-full border-4 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75 disabled:cursor-not-allowed`}
                    >
                        <span className="sr-only">فعال</span>
                        <span
                            aria-hidden="true"
                            className={`${item.active ? "-translate-x-5" : "translate-x-0"}
            pointer-events-none inline-block h-[14px] w-[14px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                        />
                    </Switch>
                </div>
                <ButtonPrimary
                    onClick={() => {
                        setEditAddress(item);
                        setShowEditModal(true)
                    }}>
                    ویرایش
                </ButtonPrimary>
            </div>
        </div>
    }
    const renderContent = () => {
        return <div className={"text-right "}>
            {editAddress && <AddressForm address={editAddress} close={() => {
                setShowEditModal(false)
            }}/>}
        </div>
    }
    const renderCreateContent = () => {
        return <div className={"text-right"}>
            <AddressForm/>
        </div>
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
                        <div className="sm:mr-2">
                            <h3 className=" text-slate-700 dark:text-slate-300 flex items-center flex-wrap gap-2">
                                <span className="">آدرس</span>
                                <span className={" text-xs text-slate-600"}> {activeAddress?.title} : </span>
                                <span className={" text-xs text-slate-600"}>
                                  {address && <>(
                                      {activeAddress?.province?.name} ,
                                      {" "}
                                      {activeAddress?.city?.name} ,
                                      {" "}
                                      {activeAddress?.address}
                                      {" "}
                                      به کد پستی
                                      {" "}
                                      {activeAddress?.zip_code}
                                      {" "}
                                      )</>}
                    </span>
                            </h3>
                        </div>
                    </div>
                    <button
                        className="py-2 px-4 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 mt-5 sm:mt-0  text-sm font-medium rounded-lg"
                        onClick={onOpenActive}
                    >
                        تغییر آدرس
                    </button>

                </div>

                <div
                    className={`border-t border-slate-200 dark:border-slate-700 px-6 py-7 space-y-4 sm:space-y-6 ${isActive ? "block" : "hidden"
                    }`}
                >

                    <>
                        <NcModal
                            isOpenProp={showCreateModal}
                            onCloseModal={() => {
                                setShowCreateModal(false);
                                queryClient.invalidateQueries(['my-address']);
                            }}
                            contentExtraClass="max-w-4xl"
                            renderContent={renderCreateContent}
                            triggerText={""}
                            modalTitle="آدرس من"
                            hasButton={false}
                        />


                        <NcModal
                            isOpenProp={showEditModal}
                            onCloseModal={() => {
                                setShowEditModal(false);
                                queryClient.invalidateQueries(['my-address']);
                            }}
                            contentExtraClass="max-w-4xl"
                            renderContent={renderContent}
                            triggerText={""}
                            modalTitle="آدرس من"
                            hasButton={false}
                        />

                        {/*<ModalGallery isOpenProp={showEditModal}>*/}
                        {/*    <div className={"bg-white z-50 flex flex-col"}>*/}
                        {/*        {editAddress && <AddressForm address={editAddress}/>}*/}
                        {/*    </div>*/}
                        {/*</ModalGallery>*/}
                        <div className="space-y-10 sm:space-y-12  dark:text-white">
                            {/* HEADING */}
                            <div>
                                <ButtonPrimary onClick={() => {
                                    setShowCreateModal(true)
                                }}>
                                    افزودن آدرس جدید
                                </ButtonPrimary>
                            </div>
                            {
                                address && address.map((item, index) => (<Fragment key={index}>
                                    {renderItem(item)}
                                </Fragment>))
                            }
                        </div>
                    </>
                    {/*<form action={saveAddress}>*/}
                    {/*    /!* ============ *!/*/}
                    {/*    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-3">*/}
                    {/*        <div>*/}
                    {/*            <Label className="text-sm dark:text-white">استان</Label>*/}
                    {/*            <Select defaultValue={address?.province_id} name={"province_id"} onChange={(e) => {*/}
                    {/*                changeProvince(Number(e.target.value))*/}
                    {/*            }}>*/}
                    {/*                {*/}
                    {/*                    provinces && provinces?.map((item,index) => (*/}
                    {/*                        <option key={index} value={item.id as number} selected={address?.province_id == item.id}>*/}
                    {/*                            {item.name}*/}
                    {/*                        </option>*/}
                    {/*                    ))*/}
                    {/*                }*/}
                    {/*            </Select>*/}
                    {/*        </div>*/}
                    {/*        <div>*/}
                    {/*            <Label className="text-sm dark:text-white">شهر</Label>*/}

                    {/*            <Select name={"city_id"} defaultValue={address?.city_id}>*/}
                    {/*                {*/}
                    {/*                    citys && citys?.map((item ,index) => (*/}
                    {/*                        <option key={index} value={item.id} selected={address?.city_id == item.id}>*/}
                    {/*                            {item.name}*/}
                    {/*                        </option>*/}
                    {/*                    ))*/}
                    {/*                }*/}
                    {/*            </Select>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}

                    {/*    /!* ============ *!/*/}
                    {/*    <div className="sm:flex space-y-4 sm:space-y-0 sm:gap-x-3">*/}
                    {/*        <div className="flex-1">*/}
                    {/*            <Label className="text-sm dark:text-white">آدرس</Label>*/}
                    {/*            <Input*/}
                    {/*                className="mt-1.5"*/}
                    {/*                placeholder=""*/}
                    {/*                name={"address"}*/}
                    {/*                defaultValue={address?.address}*/}
                    {/*                type={"text"}*/}
                    {/*            />*/}
                    {/*        </div>*/}
                    {/*        <div className="sm:w-1/3">*/}
                    {/*            <Label className="text-sm dark:text-white">تلفن</Label>*/}
                    {/*            <Input className="mt-1.5" defaultValue={address?.tell} name={"tell"}/>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}

                    {/*    /!* ============ *!/*/}
                    {/*    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-3">*/}
                    {/*        <div>*/}
                    {/*            <Label className="text-sm dark:text-white">کد پستی</Label>*/}
                    {/*            <Input className="mt-1.5" defaultValue={address?.zip_code} name={"zip_code"}/>*/}
                    {/*        </div>*/}
                    {/*        <div>*/}
                    {/*            <Label className="text-sm dark:text-white">شماره همراه</Label>*/}
                    {/*            <Input className="mt-1.5" defaultValue={address?.mobile} name={"mobile"}/>*/}
                    {/*        </div>*/}

                    {/*    </div>*/}


                    {/*    /!* ============ *!/*/}
                    {/*    <div className="flex flex-col sm:flex-row pt-6">*/}
                    {/*        <ButtonPrimary*/}
                    {/*            className="sm:!px-7 shadow-none"*/}
                    {/*        >*/}
                    {/*            ذخیره*/}
                    {/*        </ButtonPrimary>*/}
                    {/*    </div>*/}
                    {/*</form>*/}
                </div>
            </div>
        );
    };
    return renderShippingAddress();
};

export default ShippingAddress;
