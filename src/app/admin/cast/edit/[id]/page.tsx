"use client"
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Form from "@/app/admin/cast/Form";
import { findById, update } from "@/services/api/admin/cast";
import toast from "react-hot-toast";
import { useParams } from "next/navigation";
import { useQuery } from "react-query";
import { useState } from "react";

export default function Page() {
    const { id } = useParams();
    const [progress, setProgress] = useState(0);
    const [loading, setLoading] = useState(false);

    const { data: data } = useQuery({
        queryKey: [`cast_info`, Number(id)],
        queryFn: () => findById(Number(id)),
        staleTime: 5000,
    });

    async function submit(e: FormData) {

        setLoading(true);
        let response = await update(
            {
                id: Number(id),
                title: e.get("title") as string,
                url: e.get("url") as string,
                status: Number(e.get("status")),
                vlog_id: Number(e.get("vlog_id")),
                audio: e.get("audio") as File,
                image: e.get("image") as File,
                description: e.get("description") as string,
                setProgress: setProgress,
            }
        )
        if (response.success) {
            toast.success(response?.message as string)
        }
        setLoading(false);
    }

    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "cast",
                href: "cast"
            },
            {
                title: "ویرایش cast",
                href: "product/edit/" + id
            }
        ]} />
        <Panel>
            <PageTitle>
                ویرایش cast
            </PageTitle>
            <div>
                <Form submit={submit} data={data} loading={loading} />
            </div>

            {progress > 0 && <div className="w-full bg-gray-200 rounded-md mt-4">
                <div
                    className="bg-[#fcb415] text-xs font-medium text-white text-center p-1 leading-none rounded-md"
                    style={{ width: `${progress}%` }}
                >
                    {progress}%
                </div>
            </div>}
        </Panel>
    </>)
}
