"use client";

import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import ProductTab from "@/components/Tabs/ProductTab";
import FileManager from "@/shared/FileManager/FileManager";
import { findById as productFindById } from "@/services/api/admin/product";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

export default function Page() {
    const { id } = useParams();
    const productId = Number(id);

    const { data: productInfo } = useQuery({
        queryKey: ["product-info", productId],
        queryFn: () => productFindById(productId),
        staleTime: 5000,
    });

    return (
        <>
            <Breadcrump
                breadcrumb={[
                    { title: "محصولات", href: "product" },
                    { title: `ویرایش محصول ( ${productInfo?.name ?? ""} )`, href: `product/edit/${id}` },
                    { title: "مدیریت فایل", href: `product/file/${id}` },
                ]}
            />
            <Panel>
                <ProductTab id={String(id)} url={productInfo?.url ?? ""} />
                <FileManager modelId={productId} modelType="product" imagePath="product" uploader="simple" />
            </Panel>
        </>
    );
}
