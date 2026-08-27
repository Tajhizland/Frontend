"use client"
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import {useParams} from "next/navigation";
import {useQuery} from "@tanstack/react-query";
import {useApiMutation} from "@/hooks/useApiMutation";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import { remove ,findById } from "@/services/api/admin/contact";

export default function Page() {
    const {id} = useParams();

    const {data: data} = useQuery({
        queryKey: [`contact-info`, Number(id)],
        queryFn: () => findById(Number(id)),
        staleTime: 5000,
    });

    const deleteMutation = useApiMutation(() => remove(Number(id)), {invalidate: [["contact-info", Number(id)]]});

    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "پیام ها",
                href: "contact"
            },
            {
                title: "مشاهده پیام",
                href: "contact/show/" + id
            }
        ]}/>
        <Panel>
            <PageTitle>
                مشاهده پیام
            </PageTitle>
            <div>
                <div className={"flex flex-col divide-y text-slate-700"}>
                    <div className={"flex justify-between items-center py-5"}>
                    <span>
                        نام :
                    </span>
                        <span>
                        {data?.name}
                    </span>
                    </div>
                    <div className={"flex justify-between items-center  py-5"}>
                    <span>
                        شماره موبایل :
                    </span>
                        <span>
                        {data?.mobile}
                    </span>
                    </div>

                    <div className={"flex justify-between items-center  py-5"}>
                    <span>
                        استان :
                    </span>
                        <span>
                        {data?.province.name}
                    </span>
                    </div>
                    <div className={"flex justify-between items-center  py-5"}>
                    <span>
                        شهر :
                    </span>
                        <span>
                        {data?.city.name}
                    </span>
                    </div>
                    <div className={"flex justify-between items-center  py-5"}>
                    <span>
                        کانسپت :
                    </span>
                        <span>
                        {data?.concept}
                    </span>
                    </div>

                    <div className={"flex flex-col  py-5"}>
                    <span>
                        متن نظر :
                    </span>
                        <span>
                        {data?.message}
                    </span>
                    </div>
                </div>
                <div className={"flex justify-between mt-10"}>
                    <ButtonPrimary onClick={() => deleteMutation.mutate()}>حذف</ButtonPrimary>
                </div>
            </div>
        </Panel>
    </>)
}
