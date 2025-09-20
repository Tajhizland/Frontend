"use client"
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Form from "@/app/admin/vlog/Form";
import {update} from "@/services/api/admin/vlog";
import toast from "react-hot-toast";
import {useParams} from "next/navigation";
import {findById} from "@/services/api/admin/vlog";
import {useMutation, useQuery, useQueryClient} from "react-query";
import PageTab from "@/components/Tabs/PageTab";
import React, {useState} from "react";
import {BarLoader} from "react-spinners";
import {logout} from "@/services/api/auth/logout";
import {deleteCookie, setCookie} from "cookies-next";
import {registerUser} from "@/services/api/auth/register";

export default function Page() {
    const [progress, setProgress] = useState(0);
    const queryClient = useQueryClient();
    const {id} = useParams();
    const {data: data} = useQuery({
        queryKey: [`vlog-info`, Number(id)],
        queryFn: () => findById(Number(id)),
        staleTime: 5000,
    });


    const submitHandler = useMutation({
        mutationKey: [`edit-vlog`, Number(id)],
        mutationFn: async (e: any) => {
            return update({
                id: Number(id),
                title: e.get("title") as string,
                categoryId: e.get("categoryId") as string,
                url: e.get("url") as string,
                status: e.get("status") as string,
                video: e.get("video") as File,
                poster: e.get("poster") as File,
                description: e.get("description") as string,
                setProgress: setProgress,
            });
        },
        onSuccess: (response) => {
            queryClient.invalidateQueries(['vlog-info', Number(id)]);
            toast.success(response?.message as string)
            setProgress(0);
        },
    });

    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "ولاگ",
                href: "vlog"
            },
            {
                title: "ویرایش ولاگ",
                href: "vlog/edit/" + id
            }
        ]}/>
        <Panel>
            <PageTitle>
                ویرایش ولاگ
            </PageTitle>
            <PageTab id={id + ""}/>
            <div>
                <Form data={data} submit={submitHandler.mutateAsync} loading={submitHandler.isLoading}/>
            </div>
            {progress > 0 && <div className="w-full bg-gray-200 rounded-md mt-4">
                <div
                    className="bg-[#fcb415] text-xs font-medium text-white text-center p-1 leading-none rounded-md"
                    style={{width: `${progress}%`}}
                >
                    {progress}%
                </div>
            </div>}
        </Panel>

    </>)
}
