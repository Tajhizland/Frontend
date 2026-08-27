"use client";

import React, { useState } from "react";
import Link from "next/link";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import PageLink from "@/shared/PageLink/PageLink";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Table from "@/shared/Table/Table";
import ColorPriceModal from "@/components/Product/ColorPriceModal";
import { defineActions, TableColumn, TableFetcher } from "@/shared/Table/types";
import { findById as findProduct, update } from "@/services/api/admin/product";
import { ProductResponse } from "@/services/types/product";
import { HiMiniPencil } from "react-icons/hi2";
import { BsCoin } from "react-icons/bs";
import { FaEye } from "react-icons/fa";

type Props = {
    title: string;
    breadcrumb: { title: string; href: string }[];
    fetcher: TableFetcher<ProductResponse>;
    columns: TableColumn<ProductResponse>[];
    showCreate?: boolean;
};

const submit = (row: ProductResponse) =>
    update(row.id, {
        name: row.name,
        url: row.url,
        status: row.status,
        type: row.type,
        brand_id: row.brand_id,
        is_stock: Number(row.is_stock),
        description: row.description,
        meta_description: row.meta_description,
        meta_title: row.meta_title,
        guaranty_id: JSON.stringify(row.guaranty_id) as string,
        study: row.study,
        guaranty_time: row.guaranty_time,
        categoryId: JSON.stringify(row.category_ids) as string,
        review: row.review,
        stock_of: row.stock_of,
        testing_time: row.testing_time,
        weight: row.weight,
        length: row.length,
        height: row.height,
        width: row.width,
        use_packet: row.use_packet,
    });

const ProductTablePage: React.FC<Props> = ({ title, breadcrumb, fetcher, columns, showCreate = true }) => {
    const [priceProductId, setPriceProductId] = useState<number>();

    const actions = defineActions<ProductResponse>([
        {
            label: <HiMiniPencil className="text-black w-5 h-5" />,
            title: "ویرایش",
            href: (row) => `/admin/product/edit/${row.id}`,
        },
        {
            label: <BsCoin className="text-black w-5 h-5" />,
            title: "ویرایش قیمت",
            onClick: (row) => setPriceProductId(row.id),
        },
        {
            label: <FaEye className="text-black w-5 h-5" />,
            title: "مشاهده",
            onClick: async (row) => {
                const product = await findProduct(row.id);
                if (product) window.open(`/product/${product.url}`, "_blank");
            },
        },
    ]);

    return (
        <>
            <ColorPriceModal
                open={!!priceProductId}
                productId={priceProductId}
                onClose={() => setPriceProductId(undefined)}
            />

            <Breadcrump breadcrumb={breadcrumb} />

            <Panel>
                <PageTitle>{title}</PageTitle>
                {showCreate && (
                    <PageLink>
                        <Link href="/admin/product/create">
                            <ButtonPrimary>ایجاد</ButtonPrimary>
                        </Link>
                    </PageLink>
                )}
                <Table onEdit={submit} fetcher={fetcher} columns={columns} actions={actions} />
            </Panel>
        </>
    );
};

export default ProductTablePage;
