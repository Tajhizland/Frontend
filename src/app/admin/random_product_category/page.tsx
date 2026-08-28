"use client";

import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import { LuPlus } from "react-icons/lu";
import ToolbarButton from "@/shared/Toolbar/ToolbarButton";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import PageLink from "@/shared/PageLink/PageLink";
import Table from "@/shared/Table/Table";
import {SearchPickerItem, SearchPickerModal} from "@/shared/SearchPicker";
import {columns} from "@/app/admin/random_product_category/TableRow";
import {randomProductCategoryTable, remove, store} from "@/services/api/admin/randomProductCategory";
import {search} from "@/services/api/admin/category";
import {CategoryResponse} from "@/services/types/category";
import {useState} from "react";

export default function Page() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <Breadcrump breadcrumb={[{title: "دسته بندی های محصولات منتخب", href: "random_product_category"}]}/>
            <Panel>
                <PageTitle>دسته بندی های محصولات منتخب</PageTitle>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">
                    از مجموع دسته بندی های این لیست، ۱۰ محصول به صورت تصادفی انتخاب و در بخش «منتخب تجهیزلند»
                    صفحه اصلی نمایش داده می شود و با هر بار باز شدن صفحه، ترکیب تازه ای نشان داده می شود.
                    اگر یک دسته بندی پدر را اضافه کنید، محصولات همه زیرشاخه های آن هم در انتخاب لحاظ می شوند.
                </p>
                <PageLink>
                    <ToolbarButton onClick={() => setShowModal(true)} icon={<LuPlus className="w-4 h-4" />}>ایجاد</ToolbarButton>
                </PageLink>

                <SearchPickerModal<CategoryResponse>
                    open={showModal}
                    onClose={() => setShowModal(false)}
                    queryKey={["random-product-category-search"]}
                    placeholder="جستجوی نام دسته بندی"
                    searchFn={(query) => search({query})}
                    onPick={(item) => store({category_id: item.id})}
                    itemKey={(item) => item.id}
                    renderItem={(item) => <SearchPickerItem src={`category/${item.image}`} title={item.name}/>}
                />

                <Table onDelete={remove} fetcher={randomProductCategoryTable} columns={columns}/>
            </Panel>
        </>
    );
}
