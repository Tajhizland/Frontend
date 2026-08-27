"use client";

import React, { Fragment, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import NcModal from "@/shared/NcModal/NcModal";
import Input from "@/shared/Input/Input";
import Select from "@/shared/Select/Select";
import Spinner from "@/shared/Loading/Spinner";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import PersianDatePicker from "@/shared/DatePicker/PersianDatePicker";
import { findById, updateColorPrice } from "@/services/api/admin/color";
import { useApiMutation } from "@/hooks/useApiMutation";

type Props = {
    productId?: number;
    open: boolean;
    onClose: () => void;
};

const ColorPriceModal: React.FC<Props> = ({ productId, open, onClose }) => {
    const queryKey = ["color-info", productId];

    const { data: colors, isLoading } = useQuery({
        queryKey,
        queryFn: () => findById(productId ?? 0),
        staleTime: 5000,
        enabled: open && !!productId,
    });

    const [discountExpires, setDiscountExpires] = useState<string[]>([]);

    useEffect(() => {
        setDiscountExpires(colors?.map((color) => color.discount_expire_time ?? "") ?? []);
    }, [colors]);

    const saveMutation = useApiMutation(
        (form: FormData) =>
            updateColorPrice({
                color: (colors ?? []).map((_, index) => ({
                    id: Number(form.get(`color[${index}][id]`)),
                    price: Number(form.get(`color[${index}][price]`)),
                    discount: Number(form.get(`color[${index}][discount]`)),
                    status: Number(form.get(`color[${index}][status]`)),
                    stock: Number(form.get(`color[${index}][stock]`)),
                    delivery_delay: Number(form.get(`color[${index}][delivery_delay]`)),
                    discount_expire_time: `${form.get(`color[${index}][discount_expire_time]`)}`,
                })),
            }),
        {
            invalidate: [queryKey, ["table"]],
            onSuccess: onClose,
        }
    );

    const setDiscountExpire = (index: number, date: string) =>
        setDiscountExpires((prev) => {
            const next = [...prev];
            next[index] = date;
            return next;
        });

    const renderContent = () => {
        if (!productId) return null;
        if (isLoading) return <Spinner />;

        return (
            <>
                <strong className="text-center mx-auto flex justify-center">{colors?.[0]?.product?.name}</strong>
                <form action={(form) => saveMutation.mutate(form)}>
                    {colors?.map((item, index) => (
                        <Fragment key={item.id}>
                            <div className="flex flex-col text-right gap-y-5">
                                <h4>{item.color_name}</h4>
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-5">
                                    <Input defaultValue={item.id} name={`color[${index}][id]`} type="hidden" />
                                    <div>
                                        <label>قیمت</label>
                                        <Input name={`color[${index}][price]`} defaultValue={item.price} />
                                    </div>
                                    <div>
                                        <label>زمان انقضای تخفیف</label>
                                        <PersianDatePicker
                                            value={discountExpires[index] ?? item.discount_expire_time_fa}
                                            onChange={(date) => setDiscountExpire(index, date)}
                                        />
                                        <input
                                            type="hidden"
                                            name={`color[${index}][discount_expire_time]`}
                                            value={discountExpires[index] ?? ""}
                                            readOnly
                                        />
                                    </div>
                                    <div>
                                        <label>قیمت پس از تخفیف</label>
                                        <Input
                                            name={`color[${index}][discount]`}
                                            defaultValue={item.simple_discount}
                                        />
                                    </div>
                                    <div>
                                        <label>وضعیت رنگ</label>
                                        <Select name={`color[${index}][status]`} defaultValue={item.status}>
                                            <option value={1}>فعال</option>
                                            <option value={0}>غیر فعال</option>
                                            <option value={2}>محدودیت</option>
                                        </Select>
                                    </div>
                                    <div>
                                        <label>موجودی</label>
                                        <Input name={`color[${index}][stock]`} defaultValue={item.stock ?? 0} />
                                    </div>
                                    <div>
                                        <label>زمان آماده سازی</label>
                                        <Input
                                            name={`color[${index}][delivery_delay]`}
                                            defaultValue={item.delivery_delay ?? 0}
                                        />
                                    </div>
                                </div>
                            </div>
                            <hr className="border-slate-200 my-5" />
                        </Fragment>
                    ))}
                    <ButtonPrimary loading={saveMutation.isPending}>ذخیره</ButtonPrimary>
                </form>
            </>
        );
    };

    if (!open) return null;

    return (
        <NcModal
            isOpenProp={open}
            onCloseModal={onClose}
            contentExtraClass="max-w-4xl"
            renderContent={renderContent}
            triggerText=""
            modalTitle="تغییر قیمت"
            hasButton={false}
        />
    );
};

export default ColorPriceModal;
