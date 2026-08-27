"use client";

import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import ProductTab from "@/components/Tabs/ProductTab";
import Input from "@/shared/Input/Input";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import NcImage from "@/shared/NcImage/NcImage";
import { AttachedList } from "@/shared/AttachedList";
import { SearchPickerItem, SearchPickerModal } from "@/shared/SearchPicker";
import { deleteProductVideo, findById, setProductVideo } from "@/services/api/admin/productVideo";
import { findById as productFindById } from "@/services/api/admin/product";
import { search } from "@/services/api/admin/vlog";
import { VlogResponse } from "@/services/types/vlog";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

export default function Page() {
    const { id } = useParams();
    const productId = Number(id);
    const queryClient = useQueryClient();

    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState("");
    const [picked, setPicked] = useState<VlogResponse>();

    const queryKey = ["product-video", productId];

    const { data: productInfo } = useQuery({
        queryKey: ["product-info", productId],
        queryFn: () => productFindById(productId),
        staleTime: 5000,
    });

    const saveMutation = useMutation({
        mutationFn: () => setProductVideo({ product_id: productId, vlogId: Number(picked?.id), title }),
        onSuccess: (response) => {
                toast.success(response?.message as string);
                queryClient.invalidateQueries({ queryKey: queryKey });
                setTitle("");
                setPicked(undefined);
            },
            onError: () => {
                toast.error("ذخیره ویدیو انجام نشد");
            },
    });

    return (
        <>
            <Breadcrump
                breadcrumb={[
                    { title: "محصولات", href: "product" },
                    { title: "ویرایش محصول", href: `product/edit/${id}` },
                    { title: "ویدیو های محصول", href: `product/video/${id}` },
                ]}
            />
            <SearchPickerModal<VlogResponse>
                open={showModal}
                onClose={() => setShowModal(false)}
                queryKey={["product-video-search"]}
                placeholder="جستجوی نام ویدیو"
                closeOnPick
                searchFn={(query) => search(query)}
                onPick={async (item) => setPicked(item)}
                itemKey={(item) => item.id}
                renderItem={(item) => <SearchPickerItem src={`vlog/${item.poster}`} title={item.title} />}
            />
            <Panel>
                <ProductTab id={String(id)} url={productInfo?.url ?? ""} />

                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <label>عنوان</label>
                        <Input name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <span className="text-sm text-slate-500">
                        {picked ? picked.title : "ولاگی انتخاب نشده"}
                    </span>
                    <div>
                        <ButtonSecondary onClick={() => setShowModal(true)}>انتخاب ولاگ</ButtonSecondary>
                    </div>
                    <div>
                        <ButtonPrimary
                            disabled={!picked || saveMutation.isPending}
                            loading={saveMutation.isPending}
                            onClick={() => saveMutation.mutate()}
                        >
                            ذخیره
                        </ButtonPrimary>
                    </div>
                </div>
                <hr />

                <AttachedList
                    queryKey={queryKey}
                    queryFn={() => findById(productId)}
                    itemKey={(item) => item.id}
                    removeFn={(item) => deleteProductVideo(item.id)}
                    renderItem={(item) => (
                        <div className="flex items-center gap-5 flex-wrap">
                            <div className="relative w-32">
                                <NcImage
                                    containerClassName="flex aspect-w-16 aspect-h-9 w-full h-0"
                                    src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/vlog/${item?.vlog?.poster}`}
                                    className="object-cover w-full h-full"
                                    fill
                                    alt="vlog"
                                />
                            </div>
                            <span>{item.title}</span>
                        </div>
                    )}
                />
            </Panel>
        </>
    );
}
