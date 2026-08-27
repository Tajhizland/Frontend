"use client";

import ProductTablePage from "@/components/Product/ProductTablePage";
import { columns } from "@/app/admin/product/TableRow";
import { productTable } from "@/services/api/admin/product";

export default function Page() {
    return (
        <ProductTablePage
            title="مدیریت محصولات"
            breadcrumb={[{ title: "محصولات", href: "product" }]}
            fetcher={productTable}
            columns={columns}
        />
    );
}
