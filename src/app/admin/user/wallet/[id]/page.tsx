"use client"
import {useQuery} from "react-query";
import {findById } from "@/services/api/admin/user";
import {useParams} from "next/navigation";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Panel from "@/shared/Panel/Panel";
import UserTab from "@/components/Tabs/UserTab";
import {Alert} from "@/shared/Alert/Alert";
import Prices from "@/components/Price/Prices";

const Page = () => {
    const {id} = useParams();

    const { data: data } = useQuery({
        queryKey: [`user-info`],
        queryFn: () => findById(Number(id)),
        staleTime: 5000,
    });
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
                    کیف پول
                </PageTitle>
                <UserTab id={id + ""}/>
                <div className="space-y-10  dark:text-white">
                    <div>
                        <Alert type={"success"}>
                            <div className={"flex items-center justify-between w-full"}>
                        <span>
                        اعتبار کیف پول
                            </span>
                                <Prices price={data?.wallet ?? 0}/>
                            </div>
                        </Alert>
                    </div>
                </div>
            </Panel>
        </>
    );
};

export default Page;
