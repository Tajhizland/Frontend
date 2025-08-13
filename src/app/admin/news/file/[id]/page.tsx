"use client"
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import {getFiles, remove, upload} from "@/services/api/admin/fileManager";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Panel from "@/shared/Panel/Panel";
import {TrashIcon} from "@heroicons/react/24/solid";
 import {useParams} from "next/navigation";
import {useQuery, useQueryClient} from "react-query";
import {toast} from "react-hot-toast";
import NcImage from "@/shared/NcImage/NcImage";
import React, {useState} from "react";
import NewsTab from "@/components/Tabs/NewsTab";
import Spinner from "@/shared/Loading/Spinner";
import SimpleUploader from "@/shared/Uploader/SimpleUploader";
import Progress from "@/shared/Progress/Progress";

export default function Page() {
    const {id} = useParams();
    const queryClient = useQueryClient();
    const [progress, setProgress] = useState(0);
    const [loading, setLoading] = useState(false);
    const {data: data, isLoading: isLoading} = useQuery({
        queryKey: [`files`, Number(id)],
        queryFn: () => getFiles({model_id:Number(id) ,model_type:"news"}),
        staleTime: 5000,
    });
    async function submit(e: FormData) {
        setLoading(true)
        let response = await upload({model_id: Number(id), file: e.get("file") as File ,model_type:"news",setProgress:setProgress})
        if (response?.success) {
            queryClient.refetchQueries(['files', Number(id)]);
            toast.success(response?.message as string);
        }
        setLoading(false)

    }
    async function removeFile(id: number) {
        let response = await remove(id)
        if (response?.success) {
            queryClient.refetchQueries(['files', Number(id)]);
            toast.success(response?.message as string);
        }
    }
    return (<>
        <Breadcrump breadcrumb={[
           {
            title: "بلاگ",
            href: "news"
        },
        {
            title: "ویرایش بلاگ",
            href: "news/edit/"+id
        },
        {
            title: "مدیریت فایل",
            href: "news/file/"+id
        }
        ]}/>
        <Panel>
        <NewsTab id={id+""} />
            <div className="flex flex-col gap-y-4">
                <form action={submit}>
                    <SimpleUploader name={"file"}/>
                    <ButtonPrimary disabled={loading}>
                        <div className={"flex items-center gap-2"}>
                            آپلود
                            {
                                loading && <div className={"w-4 h-4"}><Spinner  className={"!w-4 !h-4"} /> </div>
                            }
                        </div>
                    </ButtonPrimary>
                </form>
                <Progress progress={progress} />
            </div>
            <div className={"grid grid-cols-1 md:grid-cols-2  xl:grid-cols-5 gap-5 border rounded  mt-10"}>
                {
                    data?.map((item) => (<>
                        <div className="flex flex-col justify-center items-center gap-y-4 ">
                            <div
                                className="relative flex-shrink-0 bg-slate-50 dark:bg-slate-300 rounded-3xl overflow-hidden z-1 group w-96 h-96">
                                <NcImage
                                    alt={"file"}
                                    containerClassName="flex aspect-w-11 aspect-h-12 w-full h-full"
                                    className="object-cover w-full h-full drop-shadow-xl"
                                    fill
                                    sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 40vw"
                                    src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/news/file/${item.path}`}
                                />
                            </div>
                            <span>
                                {item.path}
                            </span>
                            <TrashIcon className="w-8 h-8 text-red-500 cursor-pointer" onClick={() => {
                                removeFile(item.id)
                            }}/>
                        </div>
                    </>))
                }
            </div>
        </Panel>
    </>)
}
