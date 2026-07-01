"use client";

import React, {FC, Fragment, useState} from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {getProvince} from "@/services/api/shop/province";
import {getCity} from "@/services/api/shop/city";
import {changeActiveAddress, findActive, getAllAddress, update} from "@/services/api/shop/address";
import {toast} from "react-hot-toast";
import {AddressResponse} from "@/services/types/address";
import AddressForm from "@/components/Address/AddressForm";
import NcModal from "@/shared/NcModal/NcModal";
import {HiOutlineLocationMarker} from "react-icons/hi";
import {HiPencilSquare} from "react-icons/hi2";
import {FiChevronLeft} from "react-icons/fi";

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
    const [showListModal, setShowListModal] = useState(false);
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
            queryClient.invalidateQueries(['get-shipping-methods']);
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
            queryClient.invalidateQueries(['get-shipping-methods']);

        }
    });

    const renderItem = (item: AddressResponse, index: number) => {
        const active = item.active == 1;
        return (
            <div
                onClick={() => changeActive(item.id)}
                className={`relative rounded-2xl border p-5 cursor-pointer transition-colors text-sm text-slate-600 dark:text-slate-300 ${
                    active
                        ? "border-teal-500 ring-1 ring-teal-500/30"
                        : "border-slate-200 dark:border-slate-700 hover:border-slate-300"
                }`}
            >
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-400">{String(index + 1).padStart(2, "0")}</span>
                        <HiOutlineLocationMarker
                            className={`w-5 h-5 ${active ? "text-teal-500" : "text-slate-400"}`}/>
                    </div>
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            setEditAddress(item);
                            setShowEditModal(true);
                        }}
                        title="ویرایش آدرس"
                        className="flex items-center justify-center rounded-lg bg-slate-100 p-1.5 text-slate-700 transition-colors hover:bg-slate-200 hover:text-slate-900 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600"
                    >
                        <HiPencilSquare className="w-5 h-5"/>
                    </button>
                </div>

                <p className="text-right leading-6 mt-2">
                    {item.address}
                </p>

                <div className="mt-3 text-xs space-y-1">
                    <div>
                        <span className="text-slate-400">کد پستی: </span>
                        <span>{item.zip_code}</span>
                    </div>
                    <div>
                        <span className="text-slate-400">گیرنده: </span>
                        <span>{item.title} | {item.mobile}</span>
                    </div>
                </div>
            </div>
        );
    };

    const renderContent = () => {
        return <div className={"text-right "}>
            {editAddress && <AddressForm address={editAddress} close={() => {
                setShowEditModal(false)
            }}/>}
        </div>
    }
    const renderCreateContent = () => {
        return <div className={"text-right"}>
            <AddressForm
                close={() => {
                    setShowCreateModal(false)
                }}
            />
        </div>
    }

    return (
        <div className="border border-slate-200 dark:border-slate-700 rounded-2xl p-5">
            <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-2 text-slate-700 dark:text-slate-200">
                    <HiOutlineLocationMarker className="w-5 h-5 mt-0.5 flex-shrink-0"/>
                    <div>
                        <span className="font-medium">ارسال به آدرس انتخاب شده</span>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-6">
                            {activeAddress ? (
                                <>
                                    {activeAddress?.province?.name} , {activeAddress?.city?.name} , {activeAddress?.address}
                                </>
                            ) : (
                                <>آدرس را وارد کنید</>
                            )}
                        </p>
                    </div>
                </div>
                <button
                    className="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-800 dark:text-slate-400 flex-shrink-0"
                    onClick={() => setShowListModal(true)}
                >
                    تغییر آدرس
                    <FiChevronLeft/>
                </button>
            </div>

            {/* مودال انتخاب آدرس */}
            <NcModal
                isOpenProp={showListModal}
                onCloseModal={() => setShowListModal(false)}
                contentExtraClass="max-w-2xl"
                renderContent={() => (
                    <div className="dark:text-white">
                        <h3 className="font-medium mb-5">آدرس‌های من</h3>
                        <div className="space-y-4">
                            {address && address.map((item, index) => (
                                <Fragment key={index}>
                                    {renderItem(item, index)}
                                </Fragment>
                            ))}
                        </div>
                        <div className="mt-6">
                            <ButtonPrimary
                                className="w-full"
                                onClick={() => setShowCreateModal(true)}
                            >
                                افزودن آدرس جدید
                            </ButtonPrimary>
                        </div>
                    </div>
                )}
                triggerText={""}
                modalTitle="انتخاب آدرس"
                hasButton={false}
            />

            {/* مودال افزودن آدرس */}
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

            {/* مودال ویرایش آدرس */}
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
        </div>
    );
};

export default ShippingAddress;
