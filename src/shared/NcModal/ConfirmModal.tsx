"use client";

import React, { ReactNode } from "react";
import NcModal from "@/shared/NcModal/NcModal";
import ButtonThird from "@/shared/Button/ButtonThird";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";

export type ConfirmTone = "danger" | "primary";

export type ConfirmModalProps = {
    open: boolean;
    title?: string;
    /** متن سوال؛ می‌تواند JSX باشد تا بشود بخشی را پررنگ کرد. */
    message: ReactNode;
    confirmText?: string;
    cancelText?: string;
    tone?: ConfirmTone;
    loading?: boolean;
    onConfirm: () => void;
    onDismiss: () => void;
};

/**
 * دیالوگ تایید یکسان برای همه‌ی عملیات برگشت‌ناپذیر (حذف، لغو سفارش، …).
 */
const ConfirmModal: React.FC<ConfirmModalProps> = ({
    open,
    title = "تایید عملیات",
    message,
    confirmText = "تایید",
    cancelText = "انصراف",
    tone = "danger",
    loading = false,
    onConfirm,
    onDismiss,
}) => (
    <NcModal
        isOpenProp={open}
        onCloseModal={onDismiss}
        hasButton={false}
        modalTitle={title}
        contentExtraClass="max-w-md"
        triggerText=""
        renderContent={() => (
            <div className="flex flex-col gap-4">
                <div className="text-sm text-gray-600 leading-6">{message}</div>
                <div className="flex items-center justify-end gap-3 pt-2">
                    <ButtonThird onClick={onDismiss} disabled={loading}>
                        {cancelText}
                    </ButtonThird>
                    <ButtonPrimary
                        loading={loading}
                        disabled={loading}
                        onClick={onConfirm}
                        className={tone === "danger" ? "!bg-rose-600 hover:!bg-rose-700" : ""}
                    >
                        {confirmText}
                    </ButtonPrimary>
                </div>
            </div>
        )}
    />
);

export default ConfirmModal;
