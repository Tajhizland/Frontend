import React, {useState } from "react";
import Checkbox from "@/shared/Checkbox/Checkbox";
import {BlogCategoryResponse} from "@/services/types/blogCategory";
import {Dialog, DialogTitle, Transition, TransitionChild} from "@headlessui/react";
import ButtonClose from "@/shared/Button/ButtonClose";
import Radio from "@/shared/Radio/Radio";
import ButtonThird from "@/shared/Button/ButtonThird";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";

type SelectedFilters = Record<string, string[] | string>;

const BlogMobileCategory  = ({categoryList,changeFilter}: {categoryList:BlogCategoryResponse[] , changeFilter: (filters: string) => void }) => {
    const [isOpenMoreFilter, setisOpenMoreFilter] = useState(false);

    const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({});
    const openModalMoreFilter = () => setisOpenMoreFilter(true);
    const closeModalMoreFilter = () => setisOpenMoreFilter(false);
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

    const renderTabMobileFilter = () => {
        return (
            <div className="flex-shrink-0">
                <div
                    className={`flex flex-shrink-0 items-center justify-center px-4 py-2 text-sm rounded-full border border-primary-500 bg-primary-50 text-primary-900 focus:outline-none cursor-pointer select-none`}
                    onClick={openModalMoreFilter}
                >
                    <svg
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M22 6.5H16"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M6 6.5H2"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M10 10C11.933 10 13.5 8.433 13.5 6.5C13.5 4.567 11.933 3 10 3C8.067 3 6.5 4.567 6.5 6.5C6.5 8.433 8.067 10 10 10Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M22 17.5H18"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M8 17.5H2"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M14 21C15.933 21 17.5 19.433 17.5 17.5C17.5 15.567 15.933 14 14 14C12.067 14 10.5 15.567 10.5 17.5C10.5 19.433 12.067 21 14 21Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>

                    <span className=" mr-2">فیلتر دسته بندی  </span>
                </div>

                <Transition appear show={isOpenMoreFilter}>
                    <Dialog
                        as="div"
                        className="fixed inset-0 z-50"
                        onClose={closeModalMoreFilter}
                    >
                        <div className="min-h-screen text-center">
                            <TransitionChild
                                enter="ease-out duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <div className="fixed inset-0 bg-black bg-opacity-40 dark:bg-opacity-60"/>
                            </TransitionChild>

                            {/* This element is to trick the browser into centering the modal contents. */}
                            <span
                                className="inline-block h-svh align-middle"
                                aria-hidden="true"
                            >
                &#8203;
              </span>
                            <TransitionChild
                                as={"div"}
                                className="inline-block h-svh w-full max-w-4xl"
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <div
                                    className="inline-flex flex-col w-full text-right align-middle transition-all transform bg-white dark:bg-neutral-900 dark:border dark:border-neutral-700 dark:text-neutral-100 h-full">
                                    <div
                                        className="relative flex-shrink-0 px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 text-center">
                                        <DialogTitle
                                            as="h3"
                                            className="text-lg font-medium leading-6 text-gray-900"
                                        >
                                            فیلتر دسته بندی
                                        </DialogTitle>
                                        <span className="absolute right-3 top-3">
                      <ButtonClose onClick={closeModalMoreFilter}/>
                    </span>
                                    </div>
                                    <div className="flex flex-col divide-y divide-neutral-200 dark:divide-neutral-700 bg-white dark:bg-black/20">
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

                                    <div
                                        className="px-6 py-5 flex-shrink-0 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800 flex items-center justify-between">
                                        <ButtonThird
                                            onClick={() => {
                                                closeModalMoreFilter();
                                                setSelectedFilters({});
                                            }}
                                            sizeClass="py-2.5 px-5"
                                        >
                                            پاک کردن
                                        </ButtonThird>
                                        <ButtonPrimary
                                            onClick={closeModalMoreFilter}
                                            sizeClass="py-2.5 px-5"
                                        >
                                            اعمال
                                        </ButtonPrimary>
                                    </div>
                                </div>
                            </TransitionChild>
                        </div>
                    </Dialog>
                </Transition>
            </div>
        );
    };

    return (
        <div
            className={`nc-WidgetCategories rounded-3xl overflow-hidden  bg-neutral-100 dark:bg-neutral-800 block md:hidden`}
            data-nc-id="WidgetCategories"
        >
            {renderTabMobileFilter()}
        </div>
    );
};

export default BlogMobileCategory;
