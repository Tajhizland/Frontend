"use client";

import ProductTablePage from "@/components/Product/ProductTablePage";
import { columns } from "@/app/admin/product/TableRow";
import { productDiscountedTable } from "@/services/api/admin/product";

export default function Page() {
    return (
        <ProductTablePage
            title="مدیریت محصولات تخفیفی"
            breadcrumb={[{ title: "محصولات تخفیفی", href: "product/discounted" }]}
            fetcher={productDiscountedTable}
            columns={columns}
        />
    );
}
