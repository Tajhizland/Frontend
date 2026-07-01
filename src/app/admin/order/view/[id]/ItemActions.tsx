"use client"
import React, {useState} from "react";
import {toast} from "react-hot-toast";
import NcModal from "@/shared/NcModal/NcModal";
import Input from "@/shared/Input/Input";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import ButtonThird from "@/shared/Button/ButtonThird";
import {deleteItem, updateItem} from "@/services/api/admin/order";
import {PencilSquareIcon, TrashIcon} from "@heroicons/react/24/outline";

type Props = {
    item: any;
    onDone: () => void;
};

export default function ItemActions({item, onDone}: Props) {
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [count, setCount] = useState<number>(item.count);
    const [loading, setLoading] = useState(false);

    async function handleUpdate() {
        if (!count || count < 1) {
            toast.error("تعداد باید حداقل ۱ باشد");
            return;
        }
        setLoading(true);
        try {
            const response = await updateItem({id: item.id, count});
            if (response?.success) {
                toast.success(response?.message as string);
                setOpenEdit(false);
                onDone();
            } else {
                toast.error(response?.message as string);
            }
        } finally {
            setLoading(false);
        }
    }

    async function handleDelete() {
        setLoading(true);
        try {
            const response = await deleteItem({id: item.id});
            if (response?.success) {
                toast.success(response?.message as string);
                setOpenDelete(false);
                onDone();
            } else {
                toast.error(response?.message as string);
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex items-center justify-center gap-2 print:hidden">
            {/* ویرایش تعداد */}
            <button
                type="button"
                title="ویرایش تعداد"
                onClick={() => {
                    setCount(item.count);
                    setOpenEdit(true);
                }}
                className="p-2 rounded-lg text-sky-600 hover:bg-sky-50 transition-colors"
            >
                <PencilSquareIcon className="w-5 h-5"/>
            </button>

            {/* حذف آیتم */}
            <button
                type="button"
                title="حذف آیتم"
                onClick={() => setOpenDelete(true)}
                className="p-2 rounded-lg text-rose-600 hover:bg-rose-50 transition-colors"
            >
                <TrashIcon className="w-5 h-5"/>
            </button>

            {/* مودال ویرایش */}
            <NcModal
                isOpenProp={openEdit}
                onCloseModal={() => setOpenEdit(false)}
                hasButton={false}
                modalTitle="ویرایش تعداد آیتم"
                contentExtraClass="max-w-md"
                renderContent={() => (
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-3 text-sm">
                            <span className="text-gray-500">محصول:</span>
                            <span className="font-medium">{item.product?.name}</span>
                        </div>
                        <label className="flex flex-col gap-2">
                            <span className="text-sm text-gray-600">تعداد</span>
                            <Input
                                type="number"
                                min={1}
                                value={count}
                                onChange={(e) => setCount(Number(e.target.value))}
                            />
                        </label>
                        <div className="flex items-center justify-end gap-3 pt-2">
                            <ButtonThird onClick={() => setOpenEdit(false)}>
                                انصراف
                            </ButtonThird>
                            <ButtonPrimary loading={loading} disabled={loading} onClick={handleUpdate}>
                                ذخیره
                            </ButtonPrimary>
                        </div>
                    </div>
                )}
            />

            {/* مودال حذف */}
            <NcModal
                isOpenProp={openDelete}
                onCloseModal={() => setOpenDelete(false)}
                hasButton={false}
                modalTitle="حذف آیتم"
                contentExtraClass="max-w-md"
                renderContent={() => (
                    <div className="flex flex-col gap-4">
                        <p className="text-sm text-gray-600 leading-6">
                            آیا از حذف محصول{" "}
                            <span className="font-medium text-gray-800">{item.product?.name}</span>{" "}
                            از این سفارش مطمئن هستید؟ این عملیات قابل بازگشت نیست.
                        </p>
                        <div className="flex items-center justify-end gap-3 pt-2">
                            <ButtonThird onClick={() => setOpenDelete(false)}>
                                انصراف
                            </ButtonThird>
                            <ButtonPrimary
                                loading={loading}
                                disabled={loading}
                                onClick={handleDelete}
                                className="!bg-rose-600 hover:!bg-rose-700"
                            >
                                حذف
                            </ButtonPrimary>
                        </div>
                    </div>
                )}
            />
        </div>
    );
}
