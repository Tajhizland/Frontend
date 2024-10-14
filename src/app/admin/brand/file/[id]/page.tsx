"use client"
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import ProductTab from "@/components/ProductTabs/ProductTab";
import { getFiles, remove, upload} from "@/services/api/admin/fileManager";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Panel from "@/shared/Panel/Panel";
import Uploader from "@/shared/Uploader/Uploader";
import {TrashIcon} from "@heroicons/react/24/solid";
import Image from "next/image";
import {useParams} from "next/navigation";
import {useQuery, useQueryClient} from "react-query";
import {toast} from "react-hot-toast";

export default function Page() {
    const {id} = useParams();
    const queryClient = useQueryClient();
    const {data: data, isLoading: isLoading} = useQuery({
        queryKey: [`files`],
        queryFn: () => getFiles({model_id:Number(id) ,model_type:"brand"}),
        staleTime: 5000,
    });
    async function submit(e: FormData) {
       let response = await upload({model_id: Number(id), file: e.get("file") as File ,model_type:"brand"})
        if (response?.success) {
            queryClient.refetchQueries(['files']);
            toast.success(response?.message as string);
        }
    }
    async function removeFile(id: number) {
        let response = await remove(id)
        if (response?.success) {
            queryClient.refetchQueries(['files']);
            toast.success(response?.message as string);
        }
    }
    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "برند",
                href: "brand"
            },
            {
                title: "ویرایش برند",
                href: "brand/edit/" + id
            },
            {
                title: "ویرایش فایل برند",
                href: "brand/file/" + id
            }
        ]}/>
        <Panel>
            <ProductTab id={id + ""}/>
            <div className="flex flex-col gap-y-4">
                <form action={submit}>
                    <Uploader name={"file"}/>
                    <ButtonPrimary>
                        آپلود
                    </ButtonPrimary>
                </form>
            </div>
            <div className={"grid grid-cols-1 md:grid-cols-2  xl:grid-cols-5 gap-5 border rounded  mt-10"}>
                {
                    data?.map((item) => (<>
                        <div className="flex flex-col justify-center items-center gap-y-4 ">
                            <Image src={item.path as string} alt={"file"} width={720} height={100}
                                   className="w-full h-full"/>
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
