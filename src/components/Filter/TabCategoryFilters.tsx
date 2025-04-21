"use client";

import React, {Fragment, useState} from "react";
import {
    Dialog,
    DialogTitle,
    Popover,
    PopoverButton,
    PopoverPanel,
    Transition,
    TransitionChild,
} from "@headlessui/react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import ButtonThird from "@/shared/Button/ButtonThird";
import Slider from "rc-slider";
import {ChevronDownIcon} from "@heroicons/react/24/outline";
import {FilterResponse} from "@/services/types/filter";
import Toman from "@/images/tomanBlack.svg";
import Image from "next/image";
import Radio from "@/shared/Radio/Radio";
import Checkbox from "@/shared/Checkbox/Checkbox";
import ButtonClose from "@/shared/Button/ButtonClose";
import MySwitch from "@/shared/Switch/MySwitch";
import {CategoryResponse} from "@/services/types/category";

const DATA_sortOrderRadios = [
    {name: "جدید ترین", id: "Most-Popular"},
    {name: "قدیمی ترین", id: "Best-Rating"},
    {name: "ارزان ترین", id: "Newest"},
    {name: "گران ترین", id: "Price-low-hight"},
    {name: "محبوب ترین", id: "Price-hight-low"},
];
type SelectedFilters = Record<string, string[] | string>;

const TabFilters = ({filters,categorys, changeFilter, minPrice, maxPrice}: {
    filters: FilterResponse[],
    categorys: CategoryResponse[],
    changeFilter: (filters: string) => void,
    minPrice: number,
    maxPrice: number
}) => {
    const [isOpenMoreFilter, setisOpenMoreFilter] = useState(false);
    //
    const [isOnSale, setIsIsOnSale] = useState(false);
    const [rangePrices, setRangePrices] = useState([minPrice, maxPrice]);
    const [categoriesState, setCategoriesState] = useState<string[]>([]);
    const [colorsState, setColorsState] = useState<string[]>([]);
    const [sortOrderStates, setSortOrderStates] = useState<string>("");
    const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({});
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
    const handleStockFilterChange = (isChecked: boolean) => {
        setSelectedFilters((prevFilters) => {
            const newFilters: SelectedFilters = {
                ...prevFilters,
                //@ts-ignore
                just_has_stock: isChecked ? '1' : undefined,
            };
            changeFilter(buildFilterQueryString(newFilters));
            return newFilters;
        });
    };
    const handlePriceChange = (values: number[]) => {
        setRangePrices(values);

        setSelectedFilters((prevFilters) => {
            const newFilters: SelectedFilters = {
                ...prevFilters,
                ...(values[0] > 0 ? {minPrice: values[0].toString()} : {}),
                ...(values[1] > 0 ? {maxPrice: values[1].toString()} : {}),
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


    const closeModalMoreFilter = () => setisOpenMoreFilter(false);
    const openModalMoreFilter = () => setisOpenMoreFilter(true);


    //

    // OK
    const renderXClear = () => {
        return (
            <span
                className="flex-shrink-0 w-4 h-4 rounded-full bg-primary-500 text-white flex items-center justify-center mr-3 cursor-pointer">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3"
            viewBox="0 0 20 20"
            fill="currentColor"
        >
          <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
          />
        </svg>
      </span>
        );
    };


    // OK
    const renderTabsSortOrder = () => {
        return (
            <Popover className="relative">
                {({open, close}) => (
                    <>
                        <PopoverButton
                            className={`flex items-center justify-center px-4 py-2 text-sm border rounded-full focus:outline-none select-none
              ${open ? "!border-primary-500 " : ""}
                ${!!sortOrderStates.length
                                ? "!border-primary-500 bg-primary-50 text-primary-900"
                                : "border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:border-neutral-400 dark:hover:border-neutral-500"
                            }
                `}
                        >
                            <svg className="w-4 h-4" viewBox="0 0 20 20" fill="none">
                                <path
                                    d="M11.5166 5.70834L14.0499 8.24168"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeMiterlimit="10"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M11.5166 14.2917V5.70834"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeMiterlimit="10"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M8.48327 14.2917L5.94995 11.7583"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeMiterlimit="10"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M8.48315 5.70834V14.2917"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeMiterlimit="10"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M10.0001 18.3333C14.6025 18.3333 18.3334 14.6024 18.3334 10C18.3334 5.39763 14.6025 1.66667 10.0001 1.66667C5.39771 1.66667 1.66675 5.39763 1.66675 10C1.66675 14.6024 5.39771 18.3333 10.0001 18.3333Z"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>

                            <span className=" mr-2">
                {sortOrderStates
                    ? DATA_sortOrderRadios.filter(
                        (i) => i.id === sortOrderStates
                    )[0].name
                    : "مرتب سازی"}
              </span>
                            {!sortOrderStates.length ? (
                                <ChevronDownIcon className="w-4 h-4 mr-3"/>
                            ) : (
                                <span onClick={() => setSortOrderStates("")}>
                  {renderXClear()}
                </span>
                            )}
                        </PopoverButton>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1"
                        >
                            <PopoverPanel
                                className="absolute z-40 w-screen max-w-sm px-4 mt-3 left-0 sm:px-0 lg:max-w-sm">
                                <div
                                    className="overflow-hidden rounded-2xl shadow-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700">
                                    <div className="relative flex flex-col px-5 py-6 space-y-5">
                                        {DATA_sortOrderRadios.map((item) => (
                                            <Radio
                                                id={item.id}
                                                key={item.id}
                                                name="radioNameSort"
                                                label={item.name}
                                                defaultChecked={sortOrderStates === item.id}
                                                onChange={setSortOrderStates}
                                            />
                                        ))}
                                    </div>
                                    <div
                                        className="p-5 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800 flex items-center justify-between">
                                        <ButtonThird
                                            onClick={() => {
                                                close();
                                                setSortOrderStates("");
                                                setSelectedFilters({});
                                            }}
                                            sizeClass="px-4 py-2 sm:px-5"
                                        >
                                            پاک کردن
                                        </ButtonThird>
                                        <ButtonPrimary
                                            onClick={close}
                                            sizeClass="px-4 py-2 sm:px-5"
                                        >
                                            اعمال
                                        </ButtonPrimary>
                                    </div>
                                </div>
                            </PopoverPanel>
                        </Transition>
                    </>
                )}
            </Popover>
        );
    };

    const handleRemoveFilter = (filterId: string) => {
        setSelectedFilters((prevFilters) => {
            const {[filterId]: _, ...restFilters} = prevFilters;

            // به‌روزرسانی فیلترها بدون فیلتر حذف شده
            changeFilter(buildFilterQueryString(restFilters));

            return restFilters; // فیلترها بدون فیلتر حذف شده
        });
    };


    const renderFilters = () => {
        return (

            filters && filters.map((filter , index) => (<Fragment key={index}>
                <Popover className="relative" key={filter.id}>
                    {({open, close}) => (
                        <>
                            <PopoverButton
                                className={`flex items-center justify-center px-4 py-2 text-sm rounded-full border focus:outline-none select-none
                ${open ? "!border-primary-500 " : ""}
                  ${!!selectedFilters[filter.id]?.length
                                    ? "!border-primary-500 bg-primary-50 text-primary-900"
                                    : "border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:border-neutral-400 dark:hover:border-neutral-500"
                                }
                  `}
                            >

                                <span className=" mr-2">{filter.name}</span>
                                {!selectedFilters[filter.id]?.length ? (
                                    <ChevronDownIcon className="w-4 h-4 mr-3"/>
                                ) : (
                                    <span
                                        onClick={() => handleRemoveFilter(filter.id as string)}>{renderXClear()}</span>
                                )}
                            </PopoverButton>
                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-200"
                                enterFrom="opacity-0 translate-y-1"
                                enterTo="opacity-100 translate-y-0"
                                leave="transition ease-in duration-150"
                                leaveFrom="opacity-100 translate-y-0"
                                leaveTo="opacity-0 translate-y-1"
                            >
                                <PopoverPanel
                                    className="absolute z-40 w-screen max-w-sm px-4 mt-3 right-0 sm:px-0 lg:max-w-sm">
                                    <div
                                        className="overflow-hidden rounded-2xl shadow-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700">
                                        <div className="relative flex flex-col px-5 py-6 space-y-5">
                                            {filter.items.data.map((item , index) => (
                                                <div key={index} className="">
                                                    <Checkbox
                                                        name={item.value}
                                                        label={item.value}
                                                        defaultChecked={selectedFilters[filter.id]?.includes(item.id + "")}
                                                        onChange={(checked) => handleFilterChange(filter.id as string, item.id + "", checked)}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                        <div
                                            className="p-5 bg-slate-50 dark:bg-slate-900 dark:border-t dark:border-slate-800 flex items-center justify-between">
                                            <ButtonThird
                                                onClick={() => {
                                                    close();
                                                    handleRemoveFilter(filter.id as string)
                                                    setColorsState([]);
                                                }}
                                                sizeClass="px-4 py-2 sm:px-5"
                                            >
                                                پاک کردن
                                            </ButtonThird>
                                            <ButtonPrimary
                                                onClick={close}
                                                sizeClass="px-4 py-2 sm:px-5"
                                            >
                                                اعمال
                                            </ButtonPrimary>
                                        </div>
                                    </div>
                                </PopoverPanel>
                            </Transition>
                        </>
                    )}
                </Popover>
            </Fragment>))

        );
    };
    const renderCategorys = () => {
        return (

           <>
               {categorys && categorys.length>0 &&
                   <Popover className="relative" key={"category"}>
                       {({open, close}) => (
                           <>
                               <PopoverButton
                                   className={`flex items-center justify-center px-4 py-2 text-sm rounded-full border focus:outline-none select-none
                ${open ? "!border-primary-500 " : ""}
                  ${!!selectedFilters["category"]?.length
                                       ? "!border-primary-500 bg-primary-50 text-primary-900"
                                       : "border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:border-neutral-400 dark:hover:border-neutral-500"
                                   }
                  `}
                               >
                                   دسته بندی
                                   {!selectedFilters["category"]?.length ? (
                                       <ChevronDownIcon className="w-4 h-4 mr-3"/>
                                   ) : (
                                       <span
                                           onClick={() => handleRemoveFilter("category")}>{renderXClear()}</span>
                                   )}
                               </PopoverButton>
                               <Transition
                                   as={Fragment}
                                   enter="transition ease-out duration-200"
                                   enterFrom="opacity-0 translate-y-1"
                                   enterTo="opacity-100 translate-y-0"
                                   leave="transition ease-in duration-150"
                                   leaveFrom="opacity-100 translate-y-0"
                                   leaveTo="opacity-0 translate-y-1"
                               >
                                   <PopoverPanel
                                       className="absolute z-40 w-screen max-w-sm px-4 mt-3 right-0 sm:px-0 lg:max-w-sm">
                                       <div
                                           className="overflow-hidden rounded-2xl shadow-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700">
                                         <div className={"relative flex flex-col px-5 py-6 space-y-5"}>
                                              {
                                               categorys && categorys.map((item, index) => (
                                                       <div key={index} className=" ">
                                                           <Checkbox
                                                               name={item.name}
                                                               label={item.name}
                                                               defaultChecked={selectedFilters["category"]?.includes(item.id + "")}
                                                               onChange={(checked) => handleFilterChange("category", item.id + "", checked)}
                                                           />
                                                       </div>
                                                   )
                                               )
                                           }

                                         </div>
                                           <div
                                               className="p-5 bg-slate-50 dark:bg-slate-900 dark:border-t dark:border-slate-800 flex items-center justify-between">
                                               <ButtonThird
                                                   onClick={() => {
                                                       close();
                                                       handleRemoveFilter("category")
                                                       setColorsState([]);
                                                   }}
                                                   sizeClass="px-4 py-2 sm:px-5"
                                               >
                                                   پاک کردن
                                               </ButtonThird>
                                               <ButtonPrimary
                                                   onClick={close}
                                                   sizeClass="px-4 py-2 sm:px-5"
                                               >
                                                   اعمال
                                               </ButtonPrimary>
                                           </div>
                                       </div>
                                   </PopoverPanel>
                               </Transition>
                           </>
                       )}
                   </Popover>}
            </>

        );
    };

    // OK

    const renderTabsPriceRage = () => {
        return (
            <Popover className="relative">
                {({open, close}) => (
                    <>
                        <PopoverButton
                            className={`flex items-center justify-center px-4 py-2 text-sm rounded-full border border-primary-500 bg-primary-50 text-primary-900 focus:outline-none `}
                        >
                            {/*<svg*/}
                            {/*    className="w-4 h-4"*/}
                            {/*    viewBox="0 0 24 24"*/}
                            {/*    fill="none"*/}
                            {/*    xmlns="http://www.w3.org/2000/svg"*/}
                            {/*>*/}
                            {/*    <path*/}
                            {/*        d="M8.67188 14.3298C8.67188 15.6198 9.66188 16.6598 10.8919 16.6598H13.4019C14.4719 16.6598 15.3419 15.7498 15.3419 14.6298C15.3419 13.4098 14.8119 12.9798 14.0219 12.6998L9.99187 11.2998C9.20187 11.0198 8.67188 10.5898 8.67188 9.36984C8.67188 8.24984 9.54187 7.33984 10.6119 7.33984H13.1219C14.3519 7.33984 15.3419 8.37984 15.3419 9.66984"*/}
                            {/*        stroke="currentColor"*/}
                            {/*        strokeWidth="1.5"*/}
                            {/*        strokeLinecap="round"*/}
                            {/*        strokeLinejoin="round"*/}
                            {/*    />*/}
                            {/*    <path*/}
                            {/*        d="M12 6V18"*/}
                            {/*        stroke="currentColor"*/}
                            {/*        strokeWidth="1.5"*/}
                            {/*        strokeLinecap="round"*/}
                            {/*        strokeLinejoin="round"*/}
                            {/*    />*/}
                            {/*    <path*/}
                            {/*        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"*/}
                            {/*        stroke="currentColor"*/}
                            {/*        strokeWidth="1.5"*/}
                            {/*        strokeLinecap="round"*/}
                            {/*        strokeLinejoin="round"*/}
                            {/*    />*/}
                            {/*</svg>*/}
                            <span className="mr-2 min-w-[90px]">محدوده قیمت</span>
                            {rangePrices[0] == minPrice &&
                            rangePrices[1] == maxPrice ? null : (
                                <span onClick={() => {
                                    handleRemoveFilter("minPrice");
                                    handleRemoveFilter("maxPrice");
                                    setRangePrices([minPrice, maxPrice])
                                }}>
                  {renderXClear()}
                </span>
                            )}
                        </PopoverButton>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1"
                        >
                            <PopoverPanel className="absolute z-40 w-screen max-w-sm px-4 mt-3 right-0 sm:px-0 ">
                                <div
                                    className="overflow-hidden rounded-2xl shadow-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700">
                                    <div className="relative flex flex-col px-5 py-6 space-y-8">
                                        <div className="space-y-5">
                                            <span className="font-medium">محدوده قیمت</span>
                                            <Slider
                                                range
                                                min={minPrice}
                                                max={maxPrice}
                                                step={500000}
                                                defaultValue={[rangePrices[0], rangePrices[1]]}
                                                allowCross={false}
                                                onChange={(_input: number | number[]) =>
                                                    handlePriceChange(_input as number[])
                                                }
                                            />
                                        </div>

                                        <div className="flex justify-between space-x-5">
                                            <div>
                                                <label
                                                    htmlFor="maxPrice"
                                                    className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
                                                >
                                                    حداکثر قیمت
                                                </label>
                                                <div className="mt-1 relative rounded-md">
                          <span
                              className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-neutral-500 sm:text-sm">
                                                        <Image width={15} src={Toman} alt={"تومان"}/>

                          </span>
                                                    <input
                                                        type="text"
                                                        disabled
                                                        name="maxPrice"
                                                        id="maxPrice"
                                                        className="block w-32 pr-10 pl-4 text-xs  border-neutral-200 dark:border-neutral-700 rounded-full bg-transparent"
                                                        value={rangePrices[1]}
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label
                                                    htmlFor="minPrice"
                                                    className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
                                                >
                                                    حداقل قیمت
                                                </label>
                                                <div className="mt-1 relative rounded-md">
                          <span
                              className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-neutral-500 sm:text-sm">
                                                                                    <Image width={15} src={Toman}
                                                                                           alt={"تومان"}/>

                          </span>
                                                    <input
                                                        type="text"
                                                        name="minPrice"
                                                        disabled
                                                        id="minPrice"
                                                        className="block w-32 pr-10 pl-4 text-xs border-neutral-200 dark:border-neutral-700 rounded-full bg-transparent"
                                                        value={rangePrices[0]}
                                                    />
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    <div
                                        className="p-5 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800 flex items-center justify-between">
                                        <ButtonThird
                                            onClick={() => {
                                                setRangePrices([minPrice, maxPrice]);
                                                close();
                                            }}
                                            sizeClass="px-4 py-2 sm:px-5"
                                        >
                                            پاک کردن
                                        </ButtonThird>
                                        <ButtonPrimary
                                            onClick={close}
                                            sizeClass="px-4 py-2 sm:px-5"
                                        >
                                            اعمال
                                        </ButtonPrimary>
                                    </div>
                                </div>
                            </PopoverPanel>
                        </Transition>
                    </>
                )}
            </Popover>
        );
    };

    // OK
    const renderTabIsOnsale = () => {
        return (
            <div
                className={`flex items-center justify-center px-4 py-2 text-sm rounded-full border focus:outline-none cursor-pointer select-none ${isOnSale
                    ? "border-primary-500 bg-primary-50 text-primary-900"
                    : "border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:border-neutral-400 dark:hover:border-neutral-500"
                }`}
                onClick={() => {
                    setIsIsOnSale(!isOnSale);
                    handleStockFilterChange(!isOnSale)
                }}
            >


                <span className="line-clamp-1  mr-2"> محصولات موجود</span>
                {isOnSale && renderXClear()}
            </div>
        );
    };

    // OK
    const renderMoreFilterItem = (
        data: FilterResponse
    ) => {

        return (
            <div className="grid grid-cols-2 gap-x-4 sm:gap-x-8 gap-8">
                <div className="flex flex-col space-y-5">
                    {data.items.data.map((item) => (
                        <Checkbox
                            key={item.id}
                            name={item.value}
                            label={item.value}
                            defaultChecked={selectedFilters[data.id]?.includes(item.id + "")}
                            onChange={(checked) => handleFilterChange(data.id as string, item.id + "", checked)}
                        />
                    ))}
                </div>
            </div>
        );
    };

    // FOR RESPONSIVE MOBILE
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

                    <span className=" mr-2">فیلتر محصولات  </span>
                    {renderXClear()}
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
                                            فیلتر محصولات
                                        </DialogTitle>
                                        <span className="absolute right-3 top-3">
                      <ButtonClose onClick={closeModalMoreFilter}/>
                    </span>
                                    </div>

                                    <div className="flex-grow overflow-y-auto">
                                        <div
                                            className="px-6 sm:px-8 md:px-10 divide-y divide-neutral-200 dark:divide-neutral-800">
                                            {/* --------- */}
                                            {/* ---- */}
                                            {

                                            }

                                            {/* --------- */}
                                            {/* ---- */}
                                            {
                                                filters && filters.map((filter,index) => (<Fragment key={index}>
                                                    <div className="py-7" key={filter.id}>
                                                        <h3 className="text-xl font-medium">{filter.name}</h3>
                                                        <div className="mt-6 relative ">
                                                            {renderMoreFilterItem(filter)}
                                                        </div>
                                                    </div>
                                                </Fragment>))
                                            }

                                            {categorys && categorys.length>0 && <div className="py-7">
                                                <h3 className="text-xl font-medium">دسته بندی</h3>
                                                <div className="mt-6 relative ">
                                                    {
                                                        categorys && categorys.map((item, index) => (
                                                                <div key={index} className="py-2">
                                                                    <Checkbox
                                                                        name={item.name}
                                                                        label={item.name}
                                                                        defaultChecked={selectedFilters["category"]?.includes(item.id + "")}
                                                                        onChange={(checked) => handleFilterChange("category", item.id + "", checked)}
                                                                    />
                                                                </div>
                                                            )
                                                        )
                                                    }
                                                </div>
                                            </div>}
                                            {/* --------- */}
                                            {/* ---- */}

                                            {/* --------- */}
                                            {/* ---- */}
                                            <div className="py-7">
                                                <h3 className="text-xl font-medium">محدوده قیمت</h3>
                                                <div className="mt-6 relative ">
                                                    <div className="relative flex flex-col space-y-8">
                                                        <div className="space-y-5">
                                                            <Slider
                                                                range
                                                                className="text-red-400"
                                                                min={minPrice}
                                                                max={maxPrice}
                                                                step={500000}
                                                                defaultValue={[rangePrices[0], rangePrices[1]]}
                                                                allowCross={false}
                                                                onChange={(_input: number | number[]) =>
                                                                    handlePriceChange(_input as number[])
                                                                }
                                                            />
                                                        </div>

                                                        <div className="flex justify-between space-x-5">
                                                            <div>
                                                                <label
                                                                    htmlFor="maxPrice"
                                                                    className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
                                                                >
                                                                    حداکثر قیمت
                                                                </label>
                                                                <div className="mt-1 relative rounded-md">
                                                                    <div
                                                                        className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                    <span className="text-neutral-500 sm:text-sm">
                                                                                              <Image width={15}
                                                                                                     src={Toman}
                                                                                                     alt={"تومان"}/>
                                    </span>
                                                                    </div>
                                                                    <input
                                                                        type="text"
                                                                        disabled
                                                                        name="maxPrice"
                                                                        id="maxPrice"
                                                                        className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-7 pl-3 text-center text-sm border-neutral-200 rounded-full text-neutral-900"
                                                                        value={rangePrices[1]}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <label
                                                                    htmlFor="minPrice"
                                                                    className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
                                                                >
                                                                    حداقل قیمت
                                                                </label>
                                                                <div className="mt-1 relative rounded-md">
                                                                    <div
                                                                        className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                    <span className="text-neutral-500 sm:text-sm">
                                                                                              <Image width={15}
                                                                                                     src={Toman}
                                                                                                     alt={"تومان"}/>
                                    </span>
                                                                    </div>
                                                                    <input
                                                                        type="text"
                                                                        name="minPrice"
                                                                        disabled
                                                                        id="minPrice"
                                                                        className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-7 pl-3  text-sm text-center border-neutral-200 rounded-full text-neutral-900"
                                                                        value={rangePrices[0]}
                                                                    />
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* --------- */}
                                            {/* ---- */}
                                            <div className="py-7">
                                                <h3 className="text-xl font-medium">مرتب سازی</h3>
                                                <div className="mt-6 relative ">
                                                    <div className="relative flex flex-col space-y-5">
                                                        {DATA_sortOrderRadios.map((item) => (
                                                            <Radio
                                                                id={item.id}
                                                                key={item.id}
                                                                name="radioNameSort"
                                                                label={item.name}
                                                                defaultChecked={sortOrderStates === item.id}
                                                                onChange={setSortOrderStates}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* --------- */}
                                            {/* ---- */}
                                            <div className="py-7">
                                                <h3 className="text-xl font-medium">محصولات موجود</h3>
                                                <div className="mt-6 relative ">
                                                    <MySwitch
                                                        label="محصولات موجود"
                                                        desc="فقط نمایش محصولات موجود"
                                                        enabled={isOnSale}
                                                        onChange={setIsIsOnSale}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div
                                        className="px-6 py-5 flex-shrink-0 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800 flex items-center justify-between">
                                        <ButtonThird
                                            onClick={() => {
                                                setRangePrices([minPrice, maxPrice]);
                                                setCategoriesState([]);
                                                setColorsState([]);
                                                setSortOrderStates("");
                                                closeModalMoreFilter();
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
        <div className="flex lg:space-x-4">
            {/* FOR DESKTOP */}
            <div className="hidden lg:flex flex-1 gap-x-4">
                {renderTabsPriceRage()}
                {renderFilters()}
                {renderCategorys()}
                {renderTabIsOnsale()}
                <div className="!mr-auto">{renderTabsSortOrder()}</div>
            </div>

            {/* FOR RESPONSIVE MOBILE */}
            <div className="flex overflow-x-auto lg:hidden gap-x-4">
                {renderTabMobileFilter()}
            </div>
        </div>
    );
};

export default TabFilters;
