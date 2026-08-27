"use client"
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Panel from "@/shared/Panel/Panel";
import {TrashIcon} from "@heroicons/react/24/solid";
import Image from "next/image";
import {useQuery} from "@tanstack/react-query";
import {useApiMutation} from "@/hooks/useApiMutation";
import {toast} from "react-hot-toast";
import {useState} from "react";
import {deleteImage, getImages, uploadImage} from "@/services/api/admin/sample";
import SampleTab from "@/components/Tabs/SampleTab";
import Uploader from "@/shared/Uploader/Uploader";
import PageLink from "@/shared/PageLink/PageLink";
import Link from "next/link";

export default function Page() {
    const [files, setFiles] = useState<File[]>([]);
    const {data: data, isLoading: isLoading} = useQuery({
        queryKey: ["sample-image"],
        queryFn: () => getImages(),
        staleTime: 5000,
    });

    const uploadMutation = useApiMutation(
        (form: FormData) => uploadImage(form.get("image") as File),
        {invalidate: [["sample-image"]]}
    );

    const removeMutation = useApiMutation((imageId: number) => deleteImage(imageId), {
        invalidate: [["sample-image"]],
    });

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
            <PageLink>
                <Link href={"/admin/sample/image/sort"}>
                    <ButtonPrimary> سورت کردن</ButtonPrimary>
                </Link>
            </PageLink>
            <div className="flex flex-col gap-y-4">
                <form action={(form) => uploadMutation.mutate(form)}>

                    <Uploader name={"image"}
                              //@ts-ignore
                              onChange={(file)=>{setFiles(file)}}/>
                    <ButtonPrimary>
                        آپلود
                    </ButtonPrimary>
                </form>
            </div>
            <div className={"grid grid-cols-1 md:grid-cols-2  xl:grid-cols-5 gap-5 border rounded-sm  mt-10"}>
                {
                    data?.map((item) => (<>
                        <div className="flex flex-col justify-center items-center gap-y-4 ">
                            <Image
                                src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/sample/${item.image}`}

                                alt={"image"} width={720} height={100} className="w-full h-full"/>
                            <TrashIcon className="w-8 h-8 text-red-500 cursor-pointer " onClick={()=>{removeMutation.mutate(item.id)}}/>
                        </div>
                    </>))
                }
            </div>

        </Panel>

    </>)
}
