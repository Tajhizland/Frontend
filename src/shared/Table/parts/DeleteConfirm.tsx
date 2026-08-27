"use client";

import React from "react";
import { IoIosWarning } from "react-icons/io";
import { LuTrash2 } from "react-icons/lu";
import NcModal from "@/shared/NcModal/NcModal";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";

type Props = {
    open: boolean;
    message: string;
    loading: boolean;
    onDismiss: () => void;
    onConfirm: () => void;
};

const DeleteConfirm: React.FC<Props> = ({ open, message, loading, onDismiss, onConfirm }) => {
    if (!open) return null;

    return (
        <NcModal
            isOpenProp={open}
            onCloseModal={onDismiss}
            contentExtraClass="max-w-4xl"
            triggerText=""
            modalTitle="هشدار"
            hasButton={false}
            renderContent={() => (
                <div className="flex flex-col gap-y-8 text-right">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-rose-50 shrink-0">
                            <IoIosWarning className="text-rose-500 w-7 h-7" />
                        </div>
                        <span className="font-bold">{message}</span>
                    </div>
                    <div className="flex gap-x-2 justify-end">
                        <ButtonSecondary onClick={onDismiss}>انصراف</ButtonSecondary>
                        <button
                            type="button"
                            disabled={loading}
                            onClick={onConfirm}
                            className="inline-flex items-center gap-1 px-5 h-11 rounded-2xl bg-rose-600 text-white font-medium hover:bg-rose-700 transition-colors disabled:opacity-50"
                        >
                            <LuTrash2 className="w-4 h-4" />
                            بله، حذف شود
                        </button>
                    </div>
                </div>
            )}
        />
    );
};

export default DeleteConfirm;
