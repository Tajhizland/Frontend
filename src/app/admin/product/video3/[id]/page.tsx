"use client";

import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import ProductTab from "@/components/Tabs/ProductTab";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import { SearchPickerItem, SearchPickerModal } from "@/shared/SearchPicker";
import { findById, setVideo } from "@/services/api/admin/product";
import { search } from "@/services/api/admin/vlog";
import { VlogResponse } from "@/services/types/vlog";
import { TrashIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

const SLOTS = [
    { type: "intro", title: "ویدیوی معرفی" },
    { type: "usage", title: "ویدیوی استفاده" },
    { type: "unboxing", title: "ویدیوی آنباکسینگ" },
] as const;

type SlotType = (typeof SLOTS)[number]["type"];

export default function Page() {
    const { id } = useParams();
    const productId = Number(id);
    const queryClient = useQueryClient();

    const [pickingType, setPickingType] = useState<SlotType>();

    const queryKey = ["product-video3", productId];

    const { data } = useQuery({
        queryKey,
        queryFn: () => findById(productId),
        staleTime: 5000,
    });

    const setMutation = useMutation({
        mutationFn: ({ type, vlogId }: { type: SlotType; vlogId: number | null }) =>
            setVideo({ productId, vlogId, type }),
        onSuccess: (response) => {
                toast.success(response?.message as string);
                queryClient.invalidateQueries({ queryKey: queryKey });
                setPickingType(undefined);
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
                    { title: `ویرایش محصول ( ${data?.name ?? ""} )`, href: `product/edit/${id}` },
                    { title: "ویدیو های محصول", href: `product/video3/${id}` },
                ]}
            />
            <SearchPickerModal<VlogResponse>
                open={!!pickingType}
                onClose={() => setPickingType(undefined)}
                queryKey={["product-video3-search"]}
                placeholder="جستجوی نام ویدیو"
                searchFn={(query) => search(query)}
                onPick={async (item) => setMutation.mutate({ type: pickingType!, vlogId: item.id })}
                itemKey={(item) => item.id}
                renderItem={(item) => <SearchPickerItem src={`vlog/${item.poster}`} title={item.title} />}
            />
            <Panel>
                <ProductTab id={String(id)} url={data?.url ?? ""} />
                <div className="flex flex-col gap-y-10">
                    {SLOTS.map((slot) => {
                        const video = data?.[slot.type];
                        return (
                            <div key={slot.type}>
                                <div className="flex flex-col gap-y-4">
                                    <h1>{slot.title}</h1>
                                    <ButtonPrimary onClick={() => setPickingType(slot.type)}>ویرایش</ButtonPrimary>
                                </div>
                                {video && (
                                    <div className="flex flex-col gap-5 mt-10 justify-center items-center">
                                        <Image
                                            src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/vlog/${video.poster}`}
                                            alt="image"
                                            width={720}
                                            height={100}
                                            className="w-full h-full"
                                        />
                                        <ButtonPrimary
                                            disabled={setMutation.isPending}
                                            onClick={() => setMutation.mutate({ type: slot.type, vlogId: null })}
                                        >
                                            <TrashIcon className="w-6 h-6" />
                                        </ButtonPrimary>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </Panel>
        </>
    );
}
