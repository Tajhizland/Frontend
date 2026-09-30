"use client";

import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Label from "@/shared/Label/Label";
import ToolbarButton from "@/shared/Toolbar/ToolbarButton";
import Form, {InstagramPostFormValues} from "@/app/admin/instagram_post/Form";
import MediaPicker from "@/app/admin/instagram_post/MediaPicker";
import {SortableList} from "@/shared/SortableList";
import {addMedia, findById, getMedia, removeMedia, sortMedia, update} from "@/services/api/admin/instagramPost";
import {InstagramPostMediaResponse} from "@/services/types/instagramPost";
import {useApiMutation} from "@/hooks/useApiMutation";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {useParams} from "next/navigation";
import toast from "react-hot-toast";
import React, {useState} from "react";
import {LuTrash2, LuUpload} from "react-icons/lu";

const base = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

export default function Page() {
    const {id} = useParams();
    const postId = Number(id);
    const queryClient = useQueryClient();

    const [newMedia, setNewMedia] = useState<File[]>([]);
    const [progress, setProgress] = useState(0);

    const {data, isLoading} = useQuery({
        queryKey: ["instagram-post-info", postId],
        queryFn: () => findById(postId),
        staleTime: 5000,
    });

    const updateMutation = useMutation({
        mutationKey: ["update-instagram-post", postId],
        mutationFn: (values: InstagramPostFormValues) =>
            update(postId, {caption: values.caption, status: values.status}),
        onSuccess: (response) => {
            if (!response.success) return;
            queryClient.invalidateQueries({queryKey: ["instagram-post-info", postId]});
            toast.success(response.message as string);
        },
    });

    const addMediaMutation = useApiMutation(
        () => addMedia({postId, media: newMedia}, setProgress),
        {
            invalidate: [["instagram-post-media", postId], ["instagram-post-info", postId]],
            onSuccess: () => {
                setNewMedia([]);
                setProgress(0);
            },
            onError: () => setProgress(0),
        }
    );

    const removeMediaMutation = useApiMutation((mediaId: number) => removeMedia(mediaId), {
        invalidate: [["instagram-post-media", postId], ["instagram-post-info", postId]],
    });

    return (
        <>
            <Breadcrump
                breadcrumb={[
                    {title: "پست های اینستاگرام", href: "instagram_post"},
                    {title: "ویرایش پست", href: "instagram_post/edit/" + id},
                ]}
            />
            <Panel>
                <PageTitle>ویرایش پست</PageTitle>
                {!isLoading && (
                    <Form data={data} onSubmit={updateMutation.mutateAsync} loading={updateMutation.isPending}/>
                )}
            </Panel>

            <Panel>
                <PageTitle>فایل های پست</PageTitle>
                <p className="text-xs text-slate-500 mb-4">
                    با کشیدن و رها کردن، ترتیب اسلایدهای کاروسل را تغییر دهید و سپس ذخیره کنید.
                </p>

                <SortableList<InstagramPostMediaResponse>
                    queryKey={["instagram-post-media", postId]}
                    queryFn={() => getMedia(postId)}
                    mutationFn={(media) => sortMedia({media})}
                    layout="grid"
                    saveText="ذخیره ترتیب فایل ها"
                    emptyText="این پست هنوز فایلی ندارد"
                    renderItem={(media, index) => (
                        <div className="flex flex-col gap-2">
                            <div className="relative aspect-square overflow-hidden rounded-lg bg-black">
                                {media.type === "video" ? (
                                    <video src={`${base}/instagram/${media.file}`}
                                           className="w-full h-full object-contain"
                                           muted playsInline preload="metadata"/>
                                ) : (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img src={`${base}/instagram/${media.file}`} alt=""
                                         className="w-full h-full object-contain"/>
                                )}
                                <span className="absolute top-1 start-1 rounded-md bg-black/60 px-1.5 text-[11px] text-white">
                                    {index + 1}
                                </span>
                            </div>
                            <button
                                type="button"
                                disabled={removeMediaMutation.isPending}
                                onClick={() => removeMediaMutation.mutate(media.id)}
                                className="inline-flex items-center justify-center gap-1 rounded-lg border border-rose-100 bg-rose-50 px-2 py-1 text-xs text-rose-700 hover:bg-rose-100 disabled:opacity-50"
                            >
                                <LuTrash2 className="w-3.5 h-3.5"/>
                                حذف
                            </button>
                        </div>
                    )}
                />

                <hr className="my-6"/>

                <Label>افزودن فایل جدید</Label>
                <MediaPicker name="instagram-media-add" value={newMedia} onChange={setNewMedia}/>

                {newMedia.length > 0 && (
                    <div className="mt-4">
                        <ToolbarButton
                            onClick={() => addMediaMutation.mutate()}
                            loading={addMediaMutation.isPending}
                            disabled={addMediaMutation.isPending}
                            icon={<LuUpload className="w-4 h-4"/>}
                        >
                            آپلود {newMedia.length} فایل
                        </ToolbarButton>
                    </div>
                )}

                {progress > 0 && (
                    <div className="w-full bg-gray-200 rounded-md mt-4">
                        <div
                            className="bg-[#fcb415] text-xs font-medium text-white text-center p-1 leading-none rounded-md"
                            style={{width: `${progress}%`}}
                        >
                            {progress}%
                        </div>
                    </div>
                )}
            </Panel>
        </>
    );
}
