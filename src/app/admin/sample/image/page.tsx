"use client"
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Panel from "@/shared/Panel/Panel";
import {TrashIcon} from "@heroicons/react/24/solid";
import Image from "next/image";
import {useQuery, useQueryClient} from "react-query";
import {toast} from "react-hot-toast";
import {useState} from "react";
import {deleteImage, getImages, uploadImage} from "@/services/api/admin/sample";
import SampleTab from "@/components/Tabs/SampleTab";
import Uploader from "@/shared/Uploader/Uploader";

export default function Page() {
    const queryClient = useQueryClient();
    const [files, setFiles] = useState<File[]>([]);
    const {data: data, isLoading: isLoading} = useQuery({
        queryKey: [`sample_image`],
        queryFn: () => getImages(),
        staleTime: 5000,
    });

    async function submit(e: FormData) {
        const formData = new FormData();

        let response = await uploadImage(e.get("image") as File)
        if (response?.success) {
            queryClient.refetchQueries(['sample_image']);
            toast.success(response?.message as string);
        }
    }
    async function removeImage(id:number) {
        let response = await deleteImage(id)
        if (response?.success) {
            queryClient.refetchQueries(['sample_image']);
            toast.success(response?.message as string);
        }
    }

    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "پروژه های تجهیز شده",
                href: "sample"
            },
            {
                title: "تصاویر",
                href: "sample/image"
            }
        ]}/>
        <Panel>
            <SampleTab/>
            <div className="flex flex-col gap-y-4">
                <form action={submit}>
                    <Uploader name={"image"}  onFilesSelected={setFiles}/>
                    <ButtonPrimary>
                        آپلود
                    </ButtonPrimary>
                </form>
            </div>
            <div className={"grid grid-cols-1 md:grid-cols-2  xl:grid-cols-5 gap-5 border rounded  mt-10"}>
                {
                    data?.map((item) => (<>
                        <div className="flex flex-col justify-center items-center gap-y-4 ">
                            <Image
                                src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/sample/${item.image}`}

                                alt={"image"} width={720} height={100} className="w-full h-full"/>
                            <TrashIcon className="w-8 h-8 text-red-500 cursor-pointer " onClick={()=>{removeImage(item.id)}}/>
                        </div>
                    </>))
                }
            </div>

        </Panel>

    </>)
}
