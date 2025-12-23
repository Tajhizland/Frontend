"use client"
import {
    Dialog,
    DialogTitle,
    Popover,
    PopoverButton,
    PopoverPanel,
    Transition,
    TransitionChild
} from "@headlessui/react";
import {FaFilter} from "react-icons/fa";
import {ChevronDownIcon} from "@heroicons/react/24/outline";
import React, {Fragment, useState} from "react";
import Checkbox from "@/shared/Checkbox/Checkbox";
import ButtonThird from "@/shared/Button/ButtonThird";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import {useQuery} from "react-query";
import {getList} from "@/services/api/shop/vlogCategory";
import Radio from "@/shared/Radio/Radio";
import Input from "@/shared/Input/Input";
import ButtonCircle from "@/shared/Button/ButtonCircle";
import ButtonClose from "@/shared/Button/ButtonClose";
import {FiChevronRight} from "react-icons/fi";

type SelectedFilters = Record<string, string[] | string>;

export default function VlogFilter({changeFilter, defualtSearch, hasFilter = true}: {
    changeFilter: (filters: string) => void,
    defualtSearch?: string
    hasFilter?: boolean
}) {
    const {data: categoryList} = useQuery({
        queryKey: [`vlog_category-list`],
        queryFn: () => getList(),
        staleTime: 5000,
    });

    const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({});
    const [sortOrderStates, setSortOrderStates] = useState<string>("");
    const [search, setSearch] = useState<string>(defualtSearch ?? "");
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
    const renderFilters = () => {
        return (
            <Popover className="relative">
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
                            <FaFilter/>

                            <span className=" mr-2">دسته بندی</span>
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
                                className="absolute z-20 w-screen max-w-sm px-4 mt-3 right-0 sm:px-0 lg:max-w-sm">
                                <div
                                    className="overflow-hidden rounded-2xl shadow-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700">
                                    <div className="relative flex flex-col px-5 py-6 space-y-5">
                                        {categoryList && categoryList.map((item) => (
                                            <div key={item.id} className="">
                                                <Checkbox
                                                    name={item.name}
                                                    label={item.name}
                                                    defaultChecked={selectedFilters["category"]?.includes(item.id + "")}
                                                    onChange={(checked) => handleFilterChange("category", item.id + "", checked)}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    <div
                                        className="p-5 bg-slate-50 dark:bg-slate-900 dark:border-t dark:border-slate-800 flex items-center justify-between">
                                        <ButtonThird
                                            onClick={() => {
                                                close();
                                                setSelectedFilters({});
                                                changeFilter(buildFilterQueryString({}));
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
                                مرتب سازی
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
                                className="absolute z-20 w-screen max-w-sm px-4 mt-3 left-0 sm:px-0 lg:max-w-sm">
                                <div
                                    className="overflow-hidden rounded-2xl shadow-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700">
                                    <div className="relative flex flex-col px-5 py-6 space-y-5">
                                        <Radio
                                            id={"view"}
                                            name="radioNameSort"
                                            label={"بیشترین بازدید"}
                                            defaultChecked={sortOrderStates === "view"}
                                            onChange={handleSortChange}
                                        />
                                        <Radio
                                            id={"new"}
                                            name="radioNameSort"
                                            label={"جدید ترین"}
                                            defaultChecked={sortOrderStates === "new"}
                                            onChange={handleSortChange}
                                        />
                                        <Radio
                                            id={"old"}
                                            name="radioNameSort"
                                            label={"قدیمی ترین"}
                                            defaultChecked={sortOrderStates === "old"}
                                            onChange={handleSortChange}
                                        />
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
    const handleSearchChange = (value: string) => {
        setSearch(value);
        setSelectedFilters((prevFilters) => {
            const newFilters: SelectedFilters = {
                ...prevFilters,
                ...({search: value}),
            };

            changeFilter(buildFilterQueryString(newFilters));
            return newFilters;
        });
    };
    const handleSortChange = (value: string) => {
        setSortOrderStates(value);
        setSelectedFilters((prevFilters) => {
            const newFilters: SelectedFilters = {
                ...prevFilters,
                ...({sort: value}),
            };

            changeFilter(buildFilterQueryString(newFilters));
            return newFilters;
        });
    };
    const closeModalMoreFilter = () => setisOpenMoreFilter(false);
    const openModalMoreFilter = () => setisOpenMoreFilter(true);
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

                    <span className=" mr-2">فیلتر ویدیو ها  </span>
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
                                            فیلتر ویدیو ها
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
                                            {hasFilter && <div className="py-7">
                                                <h3 className="text-xl font-medium">دسته بندی </h3>
                                                <div className="mt-6 relative ">
                                                    <div className="relative flex flex-col space-y-8">
                                                        <div className="space-y-5">
                                                            {categoryList && categoryList.map((item) => (
                                                                <div key={item.id} className="">
                                                                    <Checkbox
                                                                        name={item.name}
                                                                        label={item.name}
                                                                        defaultChecked={selectedFilters["category"]?.includes(item.id + "")}
                                                                        onChange={(checked) => handleFilterChange("category", item.id + "", checked)}
                                                                    />
                                                                </div>
                                                            ))}
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>}

                                            {/* --------- */}
                                            {/* ---- */}
                                            <div className="py-7">
                                                <h3 className="text-xl font-medium">مرتب سازی</h3>
                                                <div className="mt-6 relative ">
                                                    <div className="relative flex flex-col space-y-5">
                                                        <Radio
                                                            id={"view"}
                                                            name="radioNameSort"
                                                            label={"بیشترین بازدید"}
                                                            defaultChecked={sortOrderStates === "view"}
                                                            onChange={setSortOrderStates}
                                                        />
                                                        <Radio
                                                            id={"new"}
                                                            name="radioNameSort"
                                                            label={"جدید ترین"}
                                                            defaultChecked={sortOrderStates === "new"}
                                                            onChange={setSortOrderStates}
                                                        />
                                                        <Radio
                                                            id={"old"}
                                                            name="radioNameSort"
                                                            label={"قدیمی ترین"}
                                                            defaultChecked={sortOrderStates === "old"}
                                                            onChange={setSortOrderStates}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                    <div
                                        className="px-6 py-5 flex-shrink-0 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800 flex items-center justify-between">
                                        <ButtonThird
                                            onClick={() => {
                                                setSortOrderStates("");
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


    return (<>
        <div className="lg:hidden relative w-full">
            <label
                htmlFor="search-input"
                className="text-neutral-500 dark:text-neutral-300"
            >
                <span className="sr-only">Search all icons</span>
                <Input
                    className="  border "
                    id="search-input"
                    type="search"
                    defaultValue={search}
                    onChange={(e) => {
                        handleSearchChange(e.target.value)
                    }}
                    placeholder="ویدیو مورد نظر خود را جستجو کنید"
                    sizeClass="pr-14 py-3 pl-5 md:pr-16"
                    rounded="rounded-full"
                />
                <ButtonCircle
                    className="absolute right-1.5 top-1/2 transform -translate-y-1/2"
                    size=" w-11 h-11"
                    type="submit"
                >
                    <FiChevronRight className={"w-4 h-4"}/>

                </ButtonCircle>
                <span
                    className="absolute left-5 top-1/2 transform -translate-y-1/2 text-2xl md:left-4">
                <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                      d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                  />
                  <path
                      d="M22 22L20 20"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                  />
                </svg>
              </span>
            </label>
        </div>
        <hr className="border-slate-200 dark:border-slate-700 my-5"/>
        <div className="flex lg:space-x-4">
            {/* FOR DESKTOP */}
            <div className="hidden lg:flex flex-1 gap-x-4">
                {/* {renderFilters()} */}
                <div className="relative max-w-[18.5rem] w-full">
                    <label
                        htmlFor="search-input"
                        className="text-neutral-500 dark:text-neutral-300"
                    >
                        <span className="sr-only">Search all icons</span>
                        <Input
                            className="  border "
                            id="search-input"
                            type="search"
                            defaultValue={search}
                            onChange={(e) => {
                                handleSearchChange(e.target.value)
                            }}
                            placeholder="ویدیو مورد نظر خود را جستجو کنید"
                            sizeClass="pr-14 py-3 pl-5 md:pr-16"
                            fontClass={'text-xs'}
                            rounded="rounded-full"
                        />
                        <ButtonCircle
                            className="absolute right-1.5 top-1/2 transform -translate-y-1/2"
                            size=" w-11 h-11"
                            type="submit"
                        >
                            <FiChevronRight className={"w-4 h-4"}/>

                        </ButtonCircle>
                        <span
                            className="absolute left-5 top-1/2 transform -translate-y-1/2 text-2xl md:left-4">
                <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                      d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                  />
                  <path
                      d="M22 22L20 20"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                  />
                </svg>
              </span>
                    </label>
                </div>
                <div className="!mr-auto">{renderTabsSortOrder()}</div>
            </div>
            {/* FOR RESPONSIVE MOBILE */}
            <div className="flex overflow-x-auto lg:hidden gap-x-4">
                {renderTabMobileFilter()}
            </div>
        </div>
    </>)
}
