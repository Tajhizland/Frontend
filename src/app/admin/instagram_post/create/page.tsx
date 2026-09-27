"use client";

import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Label from "@/shared/Label/Label";
import Form, {InstagramPostFormValues} from "@/app/admin/instagram_post/Form";
import MediaPicker from "@/app/admin/instagram_post/MediaPicker";
import {store} from "@/services/api/admin/instagramPost";
import toast from "react-hot-toast";
import React, {useState} from "react";
import {useMutation} from "@tanstack/react-query";
import {useRouter} from "next/navigation";

export default function Page() {
    const router = useRouter();
    const [media, setMedia] = useState<File[]>([]);
    const [progress, setProgress] = useState(0);

    const mutation = useMutation({
        mutationKey: ["store-instagram-post"],
        mutationFn: async (values: InstagramPostFormValues) => {
            if (!media.length) {
                toast.error("حداقل یک تصویر یا ویدیو انتخاب کنید");
                throw new Error("no-media");
            }
            return store({
                caption: values.caption,
                url: values.url,
                status: values.status,
                media,
            }, setProgress);
        },
        onSuccess: (response) => {
            setProgress(0);
            if (!response.success) return;
            toast.success(response.message as string);
            // بعد از ثبت به صفحه‌ی ویرایش می‌رویم تا ترتیب فایل‌ها قابل تنظیم باشد
            router.push(`/admin/instagram_post/edit/${response.result.data.id}`);
        },
        onError: () => setProgress(0),
    });

    return (
        <>
            <Breadcrump
                breadcrumb={[
                    {title: "پست های اینستاگرام", href: "instagram_post"},
                    {title: "افزودن پست جدید", href: "instagram_post/create"},
                ]}
            />
            <Panel>
                <PageTitle>افزودن پست جدید</PageTitle>
                <Form onSubmit={mutation.mutateAsync} loading={mutation.isPending} saveText="انتشار پست">
                    <Label>تصاویر و ویدیوها</Label>
                    <MediaPicker name="instagram-media" value={media} onChange={setMedia}/>
                </Form>
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
