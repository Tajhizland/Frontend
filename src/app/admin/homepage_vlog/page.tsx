"use client";

import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { getHomepageVlog, updateHomepageVlog } from "@/services/api/admin/homepageVlog";
import { search } from "@/services/api/admin/vlog";
import { VlogResponse } from "@/services/types/vlog";
import NcImage from "@/shared/NcImage/NcImage";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Panel from "@/shared/Panel/Panel";
import Select from "@/shared/Select/Select";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import { SearchPickerItem, SearchPickerModal } from "@/shared/SearchPicker";

const SLOTS = [1, 2, 3, 4];
const QUERY_KEY = ["homepage-vlog-list"];

export default function Page() {
    const queryClient = useQueryClient();
    const [showModal, setShowModal] = useState(false);
    const [slot, setSlot] = useState(1);
    const [picked, setPicked] = useState<VlogResponse>();

    const { data } = useQuery({
        queryKey: QUERY_KEY,
        queryFn: () => getHomepageVlog(),
        staleTime: 5000,
    });

    const saveMutation = useMutation({
        mutationFn: () => updateHomepageVlog(slot, { vlogId: Number(picked?.id) }),
        onSuccess: (response) => {
            toast.success(response?.message as string);
            queryClient.invalidateQueries({ queryKey: QUERY_KEY });
        },
        onError: () => {
            toast.error("ذخیره انجام نشد");
        },
    });

    return (
        <Panel>
            <SearchPickerModal<VlogResponse>
                open={showModal}
                onClose={() => setShowModal(false)}
                queryKey={["homepage-vlog-search"]}
                placeholder="جستجوی نام ویدیو"
                closeOnPick
                searchFn={(query) => search(query)}
                onPick={async (item) => setPicked(item)}
                itemKey={(item) => item.id}
                renderItem={(item) => <SearchPickerItem src={`vlog/${item.poster}`} title={item.title} />}
            />

            <PageTitle>مدیریت ولاگ صفحه اصلی</PageTitle>
            <hr />

            <div className="flex flex-wrap justify-between items-center gap-4">
                <div className="flex items-center gap-4">
                    <label>شماره ویدیو</label>
                    <Select value={slot} onChange={(e) => setSlot(Number(e.target.value))}>
                        {SLOTS.map((item) => (
                            <option key={item} value={item}>
                                {item}
                            </option>
                        ))}
                    </Select>
                </div>
                <span className="text-sm text-slate-500">{picked ? picked.title : "ولاگی انتخاب نشده"}</span>
                <ButtonSecondary onClick={() => setShowModal(true)}>انتخاب ولاگ</ButtonSecondary>
                <ButtonPrimary
                    disabled={!picked || saveMutation.isPending}
                    loading={saveMutation.isPending}
                    onClick={() => saveMutation.mutate()}
                >
                    ذخیره
                </ButtonPrimary>
            </div>

            <hr />

            {data && (
                <div className="max-w-2xl">
                    <div className="grid lg:grid-cols-4 gap-6 md:gap-8">
                        <div className="relative rounded-xl overflow-hidden group lg:col-span-3">
                            <Slot item={data[0]} index={1} />
                        </div>
                        <div className="grid gap-6 md:gap-8">
                            {data.slice(1, 4).map((item, index) => (
                                <div key={index} className="relative rounded-xl overflow-hidden group">
                                    <Slot item={item} index={index + 2} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </Panel>
    );
}

function Slot({ item, index }: { item?: { vlog?: { poster?: string } }; index: number }) {
    if (!item?.vlog) return null;

    return (
        <>
            <NcImage
                containerClassName="flex aspect-w-16 aspect-h-9 w-full h-0"
                src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/vlog/${item.vlog.poster}`}
                className="object-cover w-full h-full"
                fill
                alt="vlog"
            />
            <div className="absolute top-0 start-0 text-3xl bg-black/80 flex items-center justify-center w-full h-full text-white">
                {index}
            </div>
        </>
    );
}
