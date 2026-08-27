"use client"
import React, {useState} from "react";
import {toast} from "react-hot-toast";
import NcModal from "@/shared/NcModal/NcModal";
import Input from "@/shared/Input/Input";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import ButtonThird from "@/shared/Button/ButtonThird";
import {deleteItem, updateItem} from "@/services/api/admin/order";
import {PencilSquareIcon, TrashIcon} from "@heroicons/react/24/outline";
import {useApiMutation} from "@/hooks/useApiMutation";

type Props = {
    item: any;
    onDone: () => void;
    // تعداد کل آیتم‌های سفارش؛ اگر فقط یک محصول باقی مانده باشد امکان حذف وجود ندارد
    itemsCount?: number;
};

export default function ItemActions({item, onDone, itemsCount = 0}: Props) {
    const isLastItem = itemsCount <= 1;
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [count, setCount] = useState<number>(item.count);

    const updateMutation = useApiMutation(() => updateItem(item.id, {count}), {
        onSuccess: () => {
            setOpenEdit(false);
            onDone();
        },
    });

    const deleteMutation = useApiMutation(() => deleteItem(item.id), {
        onSuccess: () => {
            setOpenDelete(false);
            onDone();
        },
    });

    const handleUpdate = () => {
        if (!count || count < 1) {
            toast.error("تعداد باید حداقل ۱ باشد");
            return;
        }
        updateMutation.mutate();
    };

    const handleDelete = () => {
        if (isLastItem) {
            toast.error("امکان حذف آخرین محصول سفارش وجود ندارد");
            return;
        }
        deleteMutation.mutate();
    };

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

            {/* حذف آیتم - آخرین محصول سفارش قابل حذف نیست */}
            {!isLastItem && (
                <button
                    type="button"
                    title="حذف آیتم"
                    onClick={() => setOpenDelete(true)}
                    className="p-2 rounded-lg text-rose-600 hover:bg-rose-50 transition-colors"
                >
                    <TrashIcon className="w-5 h-5"/>
                </button>
            )}

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
                            <ButtonPrimary loading={updateMutation.isLoading} disabled={updateMutation.isLoading} onClick={handleUpdate}>
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
                                loading={deleteMutation.isLoading}
                                disabled={deleteMutation.isLoading}
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
