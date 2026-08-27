"use client"
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import ProductTab from "@/components/Tabs/ProductTab";
import {getByProductId, remove, setImageColor, upload} from "@/services/api/admin/productImage";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Panel from "@/shared/Panel/Panel";
import Uploader from "@/shared/Uploader/Uploader";
import {TrashIcon} from "@heroicons/react/24/solid";
import Image from "next/image";
import {useParams} from "next/navigation";
import {useQuery} from "react-query";
import {useApiMutation} from "@/hooks/useApiMutation";
import {toast} from "react-hot-toast";
import MultiUploader from "@/shared/Uploader/MultiUploader";
import {useState} from "react";
import {findById as productFindById} from "@/services/api/admin/product";
import {findById as colorFindById} from "@/services/api/admin/color";
import Select from "@/shared/Select/Select";
import Link from "next/link";

export default function Page() {
    const {id} = useParams();
    const [files, setFiles] = useState<File[]>([]);
    const [savingColorFor, setSavingColorFor] = useState<number | null>(null);
    const {data: data, isLoading: isLoading} = useQuery({
        queryKey: ["product-image", Number(id)],
        queryFn: () => getByProductId(Number(id)),
        staleTime: 5000,
    });

    const {data: colors} = useQuery({
        queryKey: [`color-info`, Number(id)],
        queryFn: () => colorFindById(Number(id)),
        staleTime: 5000,
    });

    const queryKey = ["product-image", Number(id)];

    const uploadMutation = useApiMutation(() => upload({product_id: Number(id), image: files}), {
        invalidate: [queryKey],
        onSuccess: () => setFiles([]),
    });

    const removeMutation = useApiMutation((imageId: number) => remove(imageId), {invalidate: [queryKey]});

    const colorMutation = useApiMutation(
        ({imageId, colorId}: {imageId: number; colorId: string}) =>
            setImageColor({
                product_id: Number(id),
                image: [{id: imageId, product_color_id: colorId ? Number(colorId) : null}],
            }),
        {
            invalidate: [queryKey],
            onSuccess: () => setSavingColorFor(null),
            onError: () => setSavingColorFor(null),
        }
    );

    const changeImageColor = (imageId: number, colorId: string) => {
        setSavingColorFor(imageId);
        colorMutation.mutate({imageId, colorId});
    };

    const { data: productInfo } = useQuery({
        queryKey: [`product-info`],
        queryFn: () => productFindById(Number(id)),
        staleTime: 5000,
    });
    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "محصولات",
                href: "product"
            },
            {
                title: "ویرایش محصول"+" ( "+productInfo?.name+" )",
                href: "product/edit/" + id
            },
            {
                title: "ویرایش رنگ محصول",
                href: "product/color/" + id
            }
        ]}/>
        <Panel>
            <ProductTab id={id + ""}   url={productInfo?.url??""} />
            <Link href={"/admin/product/image/sort/"+id}>
                <ButtonPrimary>
                    سورت کردن
                </ButtonPrimary>
            </Link>
            <div className="flex flex-col gap-y-4">
                <form action={() => uploadMutation.mutate()}>
                    {/*<Uploader name={"image"}/>*/}
                    <MultiUploader name={"image"}  onFilesSelected={setFiles}/>

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

                                alt={"image"} width={720} height={100} className="w-full h-full"/>

                            <div className="w-full px-2 flex flex-col gap-y-1">
                                <label className="text-xs text-neutral-600 dark:text-neutral-300">
                                    رنگ مرتبط
                                </label>
                                <div className="flex items-center gap-x-2">
                                    {item.product_color_id != null &&
                                        <span
                                            className="w-5 h-5 rounded-full border shrink-0"
                                            style={{
                                                backgroundColor: colors?.find(c => c.id === item.product_color_id)?.color_code
                                            }}
                                        />
                                    }
                                    <Select
                                        sizeClass="h-9"
                                        disabled={savingColorFor === item.id}
                                        value={item.product_color_id ?? ""}
                                        onChange={(e) => changeImageColor(item.id, e.target.value)}
                                    >
                                        <option value="">بدون رنگ</option>
                                        {colors?.map((color) => (
                                            <option key={color.id} value={color.id}>
                                                {color.color_name}
                                            </option>
                                        ))}
                                    </Select>
                                </div>
                            </div>

                            <TrashIcon className="w-8 h-8 text-red-500 cursor-pointer " onClick={()=>{removeMutation.mutate(item.id)}}/>
                        </div>
                    </>))
                }
            </div>

        </Panel>

    </>)
}
