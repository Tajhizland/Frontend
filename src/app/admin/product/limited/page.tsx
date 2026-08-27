"use client";

import ProductTablePage from "@/components/Product/ProductTablePage";
import { columns } from "@/app/admin/product/TableRow";
import { productLimitedTable } from "@/services/api/admin/product";

export default function Page() {
    return (
        <ProductTablePage
            title="مدیریت محصولات محدود شده"
            breadcrumb={[{ title: "محصولات محدود شده", href: "product/limited" }]}
            fetcher={productLimitedTable}
            columns={columns}
        />
    );
}
