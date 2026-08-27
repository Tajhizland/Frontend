"use client";

import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import GroupTab from "@/components/Tabs/GroupTab";
import { AttachedList } from "@/shared/AttachedList";
import { SearchPickerItem } from "@/shared/SearchPicker";
import { addProduct, deleteProduct, getProduct } from "@/services/api/admin/productGroup";
import { search } from "@/services/api/admin/product";
import { ProductResponse } from "@/services/types/product";
import { useParams } from "next/navigation";

export default function Page() {
    const { id } = useParams();
    const groupId = Number(id);

    return (
        <>
            <Breadcrump
                breadcrumb={[
                    { title: "محصول گروهی", href: "group" },
                    { title: "ویرایش محصول گروهی", href: `group/product/${id}` },
                ]}
            />
            <Panel>
                <PageTitle>ویرایش محصول گروهی</PageTitle>
                <GroupTab id={String(id)} />
                <AttachedList
                    addPosition="before"
                    addLabel="افزودن محصول"
                    queryKey={["group-product", groupId]}
                    queryFn={() => getProduct(groupId)}
                    itemKey={(item) => item.id}
                    renderItem={(item) => <span>{item?.product?.name}</span>}
                    removeFn={(item) => deleteProduct(item.id)}
                    picker={{
                        placeholder: "جستجوی نام محصول",
                        searchFn: (query) => search({ query }),
                        onPick: (item: ProductResponse) => addProduct({ groupId, productId: item.id }),
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
