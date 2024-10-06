"use client"
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import ProductTab from "@/components/ProductTabs/ProductTab";
import { getByProductId, upload } from "@/services/api/admin/productImage";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Panel from "@/shared/Panel/Panel";
import Uploader from "@/shared/Uploader/Uploader";
import { TrashIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useQuery } from "react-query";

export default function Page() {
    const { id } = useParams();

    const { data: data, isLoading: isLoading } = useQuery({
        queryKey: [`product_image`],
        queryFn: () => getByProductId(Number(id)),
        staleTime: 5000,
    });

    async function submit(e: FormData) { 
        await upload({ product_id: Number(id), image: e.get("image") as File })
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
                title: "ویرایش رنگ محصول",
                href: "product/color/" + id
            }
        ]} />
        <Panel>
            <ProductTab id={id + ""} />
            <div className="flex flex-col gap-y-4">
                <form action={submit}>
                    <Uploader name={"image"} />
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
                            src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/product/${item.url}`}

                            alt={"image"} width={720} height={100} className="w-full h-full" />
                            <TrashIcon className="w-8 h-8 text-red-500" />
                        </div>
                    </>))
                }
            </div>

        </Panel>

    </>)
} 