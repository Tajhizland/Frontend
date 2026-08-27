"use client";

import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import Prices from "@/components/Price/Prices";
import { SortableList, SortablePreview } from "@/shared/SortableList";
import { getTop, sortTop } from "@/services/api/admin/discount";
import { DiscountItemResponse } from "@/services/types/discountItem";
import { useParams } from "next/navigation";

export default function Page() {
    const { id } = useParams();
    const discountId = Number(id);

    return (
        <>
            <Breadcrump
                breadcrumb={[
                    { title: "تخفیف", href: "discount" },
                    { title: "مشاهده تخفیف", href: `discount/item/${id}` },
                    { title: "سورت تخفیف", href: `discount/item/${id}/sort` },
                ]}
            />
            <Panel>
                <SortableList<DiscountItemResponse>
                    queryKey={["discount-top", discountId]}
                    queryFn={() => getTop(discountId)}
                    mutationFn={(discounts) => sortTop({ discounts })}
                    renderItem={(discount) => (
                        <div className="flex items-center gap-4">
                            <SortablePreview
                                ratio="square"
                                src={`product/${discount.productColor?.product?.images?.[0]?.url}`}
                                title={discount.productColor?.product?.name}
                            />
                            <div className="flex items-center gap-3 text-sm">
                                <span>{discount.productColor?.color_name}</span>
                                <del className="text-red-600">{discount.productColor?.price}</del>
                                <Prices price={discount.discount_price ?? 0} />
                            </div>
                        </div>
                    )}
                />
            </Panel>
        </>
    );
}
