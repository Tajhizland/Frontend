"use client";

import React, {useState} from "react";
import {Controller, useForm} from "react-hook-form";
import {useMutation, useQuery} from "react-query";
import toast from "react-hot-toast";
import {LuCircleCheck, LuLoaderCircle, LuTriangleAlert} from "react-icons/lu";

import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Label from "@/shared/Label/Label";
import Input from "@/shared/Input/Input";
import Select from "@/shared/Select/Select";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import SunEditors from "@/shared/Editor/SunEditors";
import ImageField from "@/shared/Uploader/ImageField";
import VideoUploader from "@/shared/Uploader/VideoUploader";

import useLiveUploader from "@/hooks/useLiveUploader";
import {getList} from "@/services/api/admin/vlogCategory";
import {storeDirect, videoStatus} from "@/services/api/admin/vlog";
import {VideoStatus} from "@/services/types/upload";

type FormValues = {
    title: string;
    url: string;
    status: string;
    categoryId: string;
    description: string;
    poster?: File | null;
};

/**
 * افزودن ولاگ با آپلود مستقیم به فضای ابری.
 *
 * تفاوت کلیدی با صفحه‌ی /vlog/create: ویدیو از سرور اپلیکیشن عبور نمی‌کند و
 * هم‌زمان با پر کردن فرم آپلود می‌شود. ثبت نهایی فقط کلید فایل را می‌فرستد،
 * بنابراین محدودیت post_max_size و تایم‌اوت nginx بی‌اثر است.
 */
export default function Page() {
    const [createdId, setCreatedId] = useState<number | null>(null);

    const {data: categoryList} = useQuery({
        queryKey: [`vlog_category-list`],
        queryFn: () => getList(),
        staleTime: 5000,
    });

    const uploader = useLiveUploader({profile: "vlog_video"});

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: {errors},
    } = useForm<FormValues>({
        defaultValues: {
            title: "",
            url: "",
            status: "1",
            categoryId: "",
            description: "",
            poster: null,
        },
    });

    const mutation = useMutation({
        mutationKey: ["store-vlog-direct"],
        mutationFn: async (values: FormValues) => {
            if (!uploader.key) throw new Error("ابتدا باید آپلود ویدیو کامل شود.");
            if (!values.poster) throw new Error("انتخاب پوستر الزامی است.");

            return storeDirect({
                title: values.title,
                url: values.url,
                categoryId: values.categoryId,
                status: values.status,
                description: values.description,
                videoKey: uploader.key,
                poster: values.poster,
            });
        },
        onSuccess: (response) => {
            if (!response?.success) return;

            toast.success(response.message as string);
            setCreatedId(response.result?.data?.id ?? null);
            reset();
            uploader.reset();
        },
        onError: (e: any) => {
            toast.error(e?.message ?? "ثبت ولاگ ناموفق بود");
        },
    });

    // پردازش HLS سمت سرور طول می‌کشد؛ تا وقتی تمام نشود وضعیت را می‌پرسیم
    const {data: status} = useQuery({
        queryKey: ["vlog-video-status", createdId],
        queryFn: () => videoStatus(createdId as number),
        enabled: createdId !== null,
        refetchInterval: (data) => {
            const value = data?.videoStatus as VideoStatus | null | undefined;
            return value === "ready" || value === "failed" ? false : 5000;
        },
    });

    const canSubmit = uploader.isDone && !mutation.isLoading;

    return (
        <>
            <Breadcrump
                breadcrumb={[
                    {title: "ولاگ", href: "vlog"},
                    {title: "افزودن ولاگ (آپلود مستقیم)", href: "vlog/live-create"},
                ]}
            />
            <Panel>
                <PageTitle>افزودن ولاگ جدید — آپلود مستقیم</PageTitle>

                <form onSubmit={handleSubmit((values) => mutation.mutate(values))}>
                    <div className="grid grid-cols-1 gap-5 mt-5">
                        <div>
                            <Label>ویدیو</Label>
                            <VideoUploader
                                phase={uploader.phase}
                                progress={uploader.progress}
                                error={uploader.error}
                                file={uploader.file}
                                onSelect={(file) => uploader.upload(file)}
                                onCancel={uploader.cancel}
                                onReset={uploader.reset}
                            />
                            <p className="text-[11px] text-neutral-400 mt-2">
                                می‌توانید همین حالا بقیه‌ی فرم را پر کنید؛ آپلود در پس‌زمینه ادامه دارد.
                            </p>
                        </div>
                    </div>

                    <hr className="my-5" />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <Label>عنوان ولاگ</Label>
                            <Input {...register("title", {required: "عنوان ولاگ الزامی است"})} />
                            {errors.title && <p className="text-rose-500 text-xs mt-1">{errors.title.message}</p>}
                        </div>
                        <div>
                            <Label>ادرس ولاگ</Label>
                            <Input {...register("url", {required: "ادرس ولاگ الزامی است"})} />
                            {errors.url && <p className="text-rose-500 text-xs mt-1">{errors.url.message}</p>}
                        </div>
                        <div>
                            <Label>وضعیت ولاگ</Label>
                            <Select {...register("status")}>
                                <option value={1}>فعال</option>
                                <option value={0}>غیر فعال</option>
                            </Select>
                        </div>
                        <div>
                            <Label>دسته ولاگ</Label>
                            <Select {...register("categoryId", {required: "انتخاب دسته الزامی است"})}>
                                <option value="">انتخاب کنید</option>
                                {categoryList &&
                                    categoryList.map((item, index) => (
                                        <option key={index} value={item.id}>
                                            {item.name}
                                        </option>
                                    ))}
                            </Select>
                            {errors.categoryId && (
                                <p className="text-rose-500 text-xs mt-1">{errors.categoryId.message}</p>
                            )}
                        </div>
                    </div>

                    <hr className="my-5" />

                    <div className="grid grid-cols-1 gap-5">
                        <div>
                            <Label>توضیحات ولاگ</Label>
                            <Controller
                                name="description"
                                control={control}
                                render={({field}) => (
                                    <SunEditors
                                        name="description"
                                        value={field.value}
                                        onChange={field.onChange}
                                        onBlur={field.onBlur}
                                    />
                                )}
                            />
                        </div>

                        <div>
                            <Label>پوستر</Label>
                            <Controller
                                name="poster"
                                control={control}
                                rules={{required: "انتخاب پوستر الزامی است"}}
                                render={({field}) => (
                                    <ImageField
                                        name="poster"
                                        value={field.value}
                                        onChange={field.onChange}
                                        onBlur={field.onBlur}
                                    />
                                )}
                            />
                            {errors.poster && <p className="text-rose-500 text-xs mt-1">{errors.poster.message}</p>}
                        </div>
                    </div>

                    <hr className="my-5" />

                    <div className="flex flex-col items-center gap-2 my-5">
                        <ButtonPrimary type="submit" loading={mutation.isLoading} disabled={!canSubmit}>
                            ذخیره
                        </ButtonPrimary>
                        {!uploader.isDone && (
                            <p className="text-xs text-neutral-500">
                                {uploader.isUploading
                                    ? "ثبت پس از پایان آپلود ویدیو فعال می‌شود"
                                    : "ابتدا ویدیو را انتخاب کنید"}
                            </p>
                        )}
                    </div>
                </form>

                {createdId !== null && <ProcessingBox status={status?.videoStatus} error={status?.videoError} />}
            </Panel>
        </>
    );
}

/** وضعیت ترنسکد؛ همان چیزی که قبلاً به‌صورت نوار ۱۰۰٪ یخ‌زده دیده می‌شد */
function ProcessingBox({status, error}: { status?: VideoStatus | null; error?: string | null }) {
    if (status === "ready") {
        return (
            <div className="mt-6 flex items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">
                <LuCircleCheck className="w-5 h-5 shrink-0" />
                ویدیو پردازش شد و آماده‌ی پخش است.
            </div>
        );
    }

    if (status === "failed") {
        return (
            <div className="mt-6 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
                <div className="flex items-center gap-2">
                    <LuTriangleAlert className="w-5 h-5 shrink-0" />
                    پردازش ویدیو ناموفق بود. ولاگ ثبت شده ولی نسخه‌ی HLS ساخته نشد.
                </div>
                {error && <p className="mt-2 text-xs opacity-80 break-words">{error}</p>}
            </div>
        );
    }

    return (
        <div className="mt-6 flex items-center gap-2 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-700">
            <LuLoaderCircle className="w-5 h-5 shrink-0 animate-spin" />
            ولاگ ثبت شد. ویدیو در حال پردازش و ساخت کیفیت‌های مختلف است — می‌توانید این صفحه را ببندید.
        </div>
    );
}
