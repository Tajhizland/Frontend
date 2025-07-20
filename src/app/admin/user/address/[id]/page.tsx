"use client"
import {Fragment} from "react";
import {useQuery} from "react-query";
import {AddressResponse} from "@/services/types/address";
import {Switch} from "@headlessui/react";
import {getAddress} from "@/services/api/admin/user";
import {useParams} from "next/navigation";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Panel from "@/shared/Panel/Panel";
import UserTab from "@/components/Tabs/UserTab";

const Page = () => {
    const {id} = useParams();

    const {data: address} = useQuery({
        queryKey: ['my-address'],
        queryFn: () => getAddress(Number(id)),
        staleTime: 6000,
    });
    const renderItem = (item: AddressResponse) => {
        return <div
            className={"border rounded-lg flex flex-col p-5 text-neutral-500   dark:text-white dark:bg-black/20 text-sm md:text-base gap-y-10"}>
            <div className={"flex items-center flex-auto flex-wrap gap-x-10 gap-y-5"}>
                <div>
                  <span className={"text-slate-500"}>
                  عنوان :
                  </span>
                    <span className={"text-slate-600"}>
                        {item.title}
                    </span>
                </div>
                <div>
                    <span className={"text-slate-500"}>
                        استان :
                    </span>
                    <span className={"text-slate-600"}>
                        {item.province?.name}
                    </span>
                </div>
                <div>
                    <span className={"text-slate-500"}>
                        شهر :
                    </span>
                    <span className={"text-slate-600"}>
                        {item.city?.name}
                    </span>
                </div>
                <div>
                    <span className={"text-slate-500"}>
                        تلفن :
                    </span>
                    <span className={"text-slate-600"}>
                        {item.tell}
                    </span>
                </div>
                <div>
                    <span className={"text-slate-500"}>
                        موبایل :
                    </span>
                    <span className={"text-slate-600"}>
                        {item.mobile}
                    </span>

                </div>
                <div>
                    <span className={"text-slate-500"}>
                        کدپستی :
                    </span>
                    <span className={"text-slate-600"}>
                        {item.zip_code}
                    </span>
                </div>
            </div>

            <div className={"flex  justify-center md:justify-start"}>
                <p>
                    {item.address}
                </p>
            </div>
            <div className={"flex items-center gap-x-5 justify-between"}>
                <div className={"flex items-center gap-x-5 justify-center  md:justify-start"}>
                <span>
                    فعال :
                </span>
                    <Switch

                        disabled={item.active == 1 ? true : false}
                        checked={item.active == 1 ? true : false}
                        className={`${item.active ? "bg-teal-500" : "bg-slate-900"}
          relative inline-flex h-[22px] w-[42px] shrink-0 cursor-pointer rounded-full border-4 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75 disabled:cursor-not-allowed`}
                    >
                        <span className="sr-only">فعال</span>
                        <span
                            aria-hidden="true"
                            className={`${item.active ? "-translate-x-5" : "translate-x-0"}
            pointer-events-none inline-block h-[14px] w-[14px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                        />
                    </Switch>
                </div>

            </div>
        </div>
    }

    return (
        <>
            <Breadcrump breadcrumb={[
                {
                    title: "کاربران",
                    href: "user"
                },
                {
                    title: "ویرایش کاربر",
                    href: "user/update/" + id
                }
            ]}/>
            <Panel>
                <PageTitle>
                    آدرس کاربر
                </PageTitle>

                <UserTab id={id + ""}/>
                <div className="space-y-10 sm:space-y-12  dark:text-white">

                    {
                        address && address.map((item, index) => (<Fragment key={index}>
                            {renderItem(item)}
                        </Fragment>))
                    }
                </div>
            </Panel>
        </>
    );
};

export default Page;
