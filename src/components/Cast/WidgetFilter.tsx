import React, {useState} from "react";
import Checkbox from "@/shared/Checkbox/Checkbox";
import {CastCategoryResponse} from "@/services/types/castCategory";

type SelectedFilters = Record<string, string[] | string>;

const WidgetFilter = ({categoryList, changeFilter}: {
    categoryList: CastCategoryResponse[],
    changeFilter: (filters: string) => void
}) => {

    const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({});
    const [sortOrderStates, setSortOrderStates] = useState<string>("");
    const [search, setSearch] = useState<string>("");
    const [isOpenMoreFilter, setisOpenMoreFilter] = useState(false);

    const handleFilterChange = (filterId: string, itemId: string, isChecked: boolean) => {
        //@ts-ignore
        setSelectedFilters((prevFilters) => {
            const currentItems = prevFilters[filterId] || [];
            const updatedItems = isChecked
                //@ts-ignore
                ? [...currentItems, itemId]
                //@ts-ignore
                : currentItems.filter((id) => id !== itemId);

            const newFilters: SelectedFilters = {
                ...prevFilters,
                [filterId]: updatedItems.length > 0 ? updatedItems : [],
            };

            changeFilter(buildFilterQueryString(newFilters));
            return newFilters;
        });
    };
    const buildFilterQueryString = (filters: SelectedFilters) => {
        return Object.keys(filters)
            .map((filterId) => {
                const value = filters[filterId];
                // چک کنید که آیا مقدار یک رشته (برای just_has_stock) یا آرایه است
                if (Array.isArray(value)) {
                    return value.map((itemId) => `filter[${filterId}][]=${itemId}`).join("&");
                } else if (value !== undefined) {
                    return `filter[${filterId}]=${value}`; // برای just_has_stock
                }
                return null;
            })
            .filter(Boolean) // فیلتر کردن مقادیر null
            .join("&");
    };
    const handleRemoveFilter = (filterId: string) => {
        setSelectedFilters((prevFilters) => {
            const {[filterId]: _, ...restFilters} = prevFilters;

            // به‌روزرسانی فیلترها بدون فیلتر حذف شده
            changeFilter(buildFilterQueryString(restFilters));

            return restFilters; // فیلترها بدون فیلتر حذف شده
        });
    };
    return (
        <div
            className={`nc-WidgetCategories rounded-3xl overflow-hidden  bg-neutral-100 dark:bg-neutral-800`}
            data-nc-id="WidgetCategories"
        >
            <div
                className={`nc-WidgetHeading1 flex items-center justify-between p-4 xl:p-5 border-b border-neutral-200 dark:border-neutral-700  `}
            >
                <h2 className="text-lg text-neutral-900 dark:text-neutral-100 font-semibold flex-grow">
                    دسته بندی
                </h2>

            </div>
            <div className="flow-root">
                <div
                    className="flex flex-col divide-y divide-neutral-200 dark:divide-neutral-700 bg-white dark:bg-black/20">
                    {categoryList && categoryList.map((item) => (
                        <div key={item.id} className="">
                            <Checkbox
                                name={item.name}
                                label={item.name}
                                className="p-4 xl:p-5 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                                defaultChecked={selectedFilters["category"]?.includes(item.id + "")}
                                onChange={(checked) => handleFilterChange("category", item.id + "", checked)}
                            />
                        </div>
                    ))}

                </div>
            </div>
        </div>
    );
};

export default WidgetFilter;
