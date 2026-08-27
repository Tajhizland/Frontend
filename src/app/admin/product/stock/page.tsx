"use client";

import ProductTablePage from "@/components/Product/ProductTablePage";
import { columns } from "@/app/admin/product/stock/TableRow";
import { productStockTable } from "@/services/api/admin/product";

export default function Page() {
    return (
        <ProductTablePage
            title="مدیریت محصولات کارکرده"
            breadcrumb={[{ title: "محصولات کارکرده", href: "product/stock" }]}
            fetcher={productStockTable}
            columns={columns}
        />
    );
}
