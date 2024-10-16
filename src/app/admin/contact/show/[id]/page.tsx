"use client"
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import toast from "react-hot-toast";
import {useParams} from "next/navigation";
import {useQuery, useQueryClient} from "react-query";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import { remove ,findById } from "@/services/api/admin/contact";

export default function Page() {
    const {id} = useParams();
    const queryClient = useQueryClient();

    const {data: data} = useQuery({
        queryKey: [`contact-info`],
        queryFn: () => findById(Number(id)),
        staleTime: 5000,
    });

    async function deleteHandle() {
        let response = await remove(Number(id));
        toast.success(response?.message as string)
        queryClient.refetchQueries(['contact-info']);
    }

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
                        ایمیل :
                    </span>
                        <span>
                        {data?.email}
                    </span>
                    </div>

                    <div className={"flex flex-col  py-5"}>
                    <span>
                        متن نظر :
                    </span>
                        <span >
                        {data?.message}
                    </span>
                    </div>
                </div>
                <div className={"flex justify-between mt-10"}>
                    <ButtonPrimary onClick={deleteHandle}>حذف</ButtonPrimary>
                </div>
            </div>
        </Panel>
    </>)
}
