"use client";

import React from "react";
import ConfirmModal from "@/shared/NcModal/ConfirmModal";

type Props = {
    open: boolean;
    message: string;
    loading: boolean;
    onDismiss: () => void;
    onConfirm: () => void;
};

const DeleteConfirm: React.FC<Props> = ({ open, message, loading, onDismiss, onConfirm }) => (
    <ConfirmModal
        open={open}
        title="حذف آیتم"
        message={message}
        confirmText="بله، حذف شود"
        cancelText="انصراف"
        tone="danger"
        loading={loading}
        onDismiss={onDismiss}
        onConfirm={onConfirm}
    />
);

export default DeleteConfirm;
