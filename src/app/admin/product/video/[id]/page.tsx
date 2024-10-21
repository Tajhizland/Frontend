"use client"
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import ProductTab from "@/components/Tabs/ProductTab";
import {findById, setVideo} from "@/services/api/admin/product";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Panel from "@/shared/Panel/Panel";
import Uploader from "@/shared/Uploader/Uploader";
import {TrashIcon} from "@heroicons/react/24/solid";
import {useParams} from "next/navigation";
import {useQuery, useQueryClient} from "react-query";
import {toast} from "react-hot-toast";

export default function Page() {
    const {id} = useParams();
    const queryClient = useQueryClient();

    const {data: data, isLoading: isLoading} = useQuery({
        queryKey: [`product_info`],
        queryFn: () => findById(Number(id)),
        staleTime: 5000,
    });

    async function uploadIntro(e: FormData) {
        let response = await setVideo({productId: Number(id), file: e.get("introFile") as File, type: "intro"})
        if (response?.success) {
            queryClient.refetchQueries(['product_info']);
            toast.success(response?.message as string);
        }
    }

    async function uploadUnBoxing(e: FormData) {
        let response = await setVideo({productId: Number(id), file: e.get("unboxingFile") as File, type: "unboxing"})
        if (response?.success) {
            queryClient.refetchQueries(['product_info']);
            toast.success(response?.message as string);
        }
    }

    async function uploadUsage(e: FormData) {
        let response = await setVideo({productId: Number(id), file: e.get("usageFile") as File, type: "usage"})
        if (response?.success) {
            queryClient.refetchQueries(['product_info']);
            toast.success(response?.message as string);
        }
    }


    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "محصولات",
                href: "product"
            },
            {
                title: "ویرایش محصول",
                href: "product/edit/" + id
            },
            {
                title: "ویدیو های محصول",
                href: "product/video/" + id
            }
        ]}/>
        <Panel>
            <ProductTab id={id + ""}/>
            <div className={"flex flex-col gap-y-10"}>

                <div>
                    <div className="flex flex-col gap-y-4">
                        <form action={uploadIntro}>
                            <Uploader  name={"introFile"}/>
                            <ButtonPrimary>
                                آپلود
                            </ButtonPrimary>
                        </form>
                    </div>
                    <div className={"flex-col flex gap-5 mt-10 justify-center items-center"}>
                        {
                            data?.intro_video && <div>
                                <video controls className={"w-full"}>
                                    <source src={data?.intro_video} type="video/mp4"/>
                                </video>
                            </div>
                        }
                        {
                            data?.intro_video && <div className={"col-span-1 md:col-span-1 xl:col-span-2"}>
                                <ButtonPrimary>
                                    <TrashIcon className={"w-6 h-6"}/>
                                </ButtonPrimary>
                            </div>
                        }
                    </div>
                </div>
                <div>
                    <div className="flex flex-col gap-y-4">
                        <form action={uploadUsage}>
                            <Uploader  name={"usageFile"}/>
                            <ButtonPrimary>
                                آپلود
                            </ButtonPrimary>
                        </form>
                    </div>
                    <div className={"flex-col flex gap-5 mt-10 justify-center items-center"}>
                        {
                            data?.usage_video && <div>
                                <video controls className={"w-full"}>
                                    <source src={data?.usage_video} type="video/mp4"/>
                                </video>
                            </div>
                        }
                        {
                            data?.usage_video && <div className={"col-span-1 md:col-span-1 xl:col-span-2"}>
                                <ButtonPrimary>
                                    <TrashIcon className={"w-6 h-6"}/>
                                </ButtonPrimary>
                            </div>
                        }
                    </div>
                </div>
                <div>
                    <div className="flex flex-col gap-y-4">
                        <form action={uploadUnBoxing}>
                            <Uploader  name={"unboxingFile"}/>
                            <ButtonPrimary>
                                آپلود
                            </ButtonPrimary>
                        </form>
                    </div>
                    <div className={"flex-col flex gap-5 mt-10 justify-center items-center mx-auto"}>
                        {
                            data?.unboxing_video && <div>
                                <video controls className={"w-full"}>
                                    <source src={data?.unboxing_video} type="video/mp4"/>
                                </video>
                            </div>
                        }
                        {
                            data?.unboxing_video && <div className={"col-span-1 md:col-span-1 xl:col-span-2"}>
                                <ButtonPrimary>
                                    <TrashIcon className={"w-6 h-6"}/>
                                </ButtonPrimary>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </Panel>

    </>)
}
