"use client";

import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import { SortableList, SortablePreview } from "@/shared/SortableList";
import { getImageSortByProductId, sortImage } from "@/services/api/admin/productImage";
import { ProductImageResponse } from "@/services/types/productImage";
import { useParams } from "next/navigation";

export default function Page() {
    const { id } = useParams();
    const productId = Number(id);

    return (
        <>
            <Breadcrump
                breadcrumb={[
                    { title: "محصولات", href: "product" },
                    { title: "ویرایش تصویر", href: `product/image/${id}` },
                    { title: "سورت تصاویر", href: `product/image/sort/${id}` },
                ]}
            />
            <Panel>
                <SortableList<ProductImageResponse>
                    queryKey={["product-images", productId]}
                    queryFn={async () => (await getImageSortByProductId(productId))?.data}
                    mutationFn={(image) => sortImage({ image })}
                    renderItem={(image, index) => (
                        <SortablePreview
                            src={`product/${image.url}`}
                            title={index === 1 ? `${index + 1} — تصویر دوم محصول` : index + 1}
                        />
                    )}
                />
            </Panel>
        </>
    );
}
