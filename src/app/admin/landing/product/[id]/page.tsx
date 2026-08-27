"use client";

import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import LandingTab from "@/components/Tabs/LandingTab";
import { AttachedList } from "@/shared/AttachedList";
import { SearchPickerItem } from "@/shared/SearchPicker";
import { deleteLandingProducts, getLandingProducts, setProductLanding } from "@/services/api/admin/landing";
import { search } from "@/services/api/admin/product";
import { ProductResponse } from "@/services/types/product";
import { useParams } from "next/navigation";

export default function Page() {
    const { id } = useParams();
    const landingId = Number(id);

    return (
        <>
            <Breadcrump
                breadcrumb={[
                    { title: "لندینگ", href: "landing" },
                    { title: "ویرایش لندینگ", href: `landing/edit/${id}` },
                    { title: "ویرایش محصولات", href: `landing/product/${id}` },
                ]}
            />
            <Panel>
                <LandingTab id={String(id)} />
                <AttachedList
                    queryKey={["landing-product", landingId]}
                    queryFn={() => getLandingProducts(landingId)}
                    itemKey={(item) => item.id}
                    renderItem={(item) => <span>{item?.product?.name}</span>}
                    removeFn={(item) => deleteLandingProducts(item.id)}
                    picker={{
                        placeholder: "جستجوی نام محصول",
                        searchFn: (query) => search({ query }),
                        onPick: (item: ProductResponse) =>
                            setProductLanding({ product_id: item.id, landing_id: landingId }),
                        itemKey: (item: ProductResponse) => item.id,
                        renderItem: (item: ProductResponse) => (
                            <SearchPickerItem src={`product/${item.images?.[0]?.url}`} title={item.name} />
                        ),
                    }}
                />
            </Panel>
        </>
    );
}
