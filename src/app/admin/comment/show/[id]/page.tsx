"use client"
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import {accept, findById, reject} from "@/services/api/admin/comment";
import toast from "react-hot-toast";
import {useParams} from "next/navigation";
import {useQuery, useQueryClient} from "react-query";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";

export default function Page() {
    const {id} = useParams();
    const queryClient = useQueryClient();

    const {data: data} = useQuery({
        queryKey: [`comment-info`],
        queryFn: () => findById(Number(id)),
        staleTime: 5000,
    });

    async function acceptHandle() {
        let response = await accept(Number(id));
        toast.success(response?.message as string)
        queryClient.refetchQueries(['comment-info']);

    }

    async function rejectHandle() {
        let response = await reject(Number(id));
        toast.success(response?.message as string)
        queryClient.refetchQueries(['comment-info']);

    }

    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "نظر",
                href: "comment"
            },
            {
                title: "مشاهده نظر",
                href: "comment/show/" + id
            }
        ]}/>
        <Panel>
            <PageTitle>
                مشاهده نظر
            </PageTitle>
            <div>
                <div className={"flex flex-col divide-y text-slate-700"}>
                    <div className={"flex justify-between items-center py-5"}>
                    <span>
                        کاربر :
                    </span>
                        <span>
                        {data?.user}
                    </span>
                    </div>
                    <div className={"flex justify-between items-center  py-5"}>
                    <span>
                        محصول :
                    </span>
                        <span>
                        {data?.product?.name}
                    </span>
                    </div>
                    <div className={"flex justify-between items-center  py-5"}>
                    <span>
                        امتیاز :
                    </span>
                        <span>
                        {data?.rating}
                    </span>
                    </div>
                    <div className={"flex justify-between items-center  py-5"}>
                    <span>
                        وضعیت :
                    </span>
                        <span>
                        {data?.status}
                    </span>
                    </div>
                    <div className={"flex flex-col  py-5"}>
                    <span>
                        متن نظر :
                    </span>
                        <span >
                        {data?.text}
                    </span>
                    </div>
                </div>
                <div className={"flex justify-between mt-10"}>
                    <ButtonPrimary onClick={acceptHandle}>تایید کردن</ButtonPrimary>
                    <ButtonPrimary onClick={rejectHandle}>رد کردن</ButtonPrimary>
                </div>
            </div>
        </Panel>
    </>)
}
