"use client";

import {Controller, useForm, useWatch} from "react-hook-form";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {useRouter} from "next/navigation";
import {isAxiosError} from "axios";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Input from "@/shared/Input/Input";
import Textarea from "@/shared/Textarea/Textarea";
import ImageField from "@/shared/Uploader/ImageField";
import FormActions from "@/shared/Form/FormActions";
import {useApiMutation} from "@/hooks/useApiMutation";
import {getInstagramProfile, updateInstagramProfile} from "@/services/api/admin/instagramProfile";
import {InstagramProfileResponse, InstagramProfileUpdateDto} from "@/services/types/instagramProfile";
import {instagramAvatarUrl} from "@/components/Instagram/helpers";

const queryKey = ["instagram-profile"];
const formValues = (profile: InstagramProfileResponse): InstagramProfileUpdateDto => ({
    name: profile.name,
    url: profile.url,
    bio: profile.bio ?? "",
    avatar: null,
    remove_avatar: false,
});

function ProfileForm({profile}: {profile: InstagramProfileResponse}) {
    const router = useRouter();
    const queryClient = useQueryClient();
    const {register, control, handleSubmit, reset, setValue, setError, formState: {errors}} = useForm<InstagramProfileUpdateDto>({
        values: formValues(profile),
    });
    const removeAvatar = useWatch({control, name: "remove_avatar"});
    const mutation = useApiMutation(updateInstagramProfile, {
        invalidate: [["instagram-posts"]],
        onSuccess: (response) => {
            queryClient.setQueryData(queryKey, response.result.data);
            reset(formValues(response.result.data));
            router.refresh();
        },
        onError: (error) => {
            if (!isAxiosError(error)) return;
            const fields = error.response?.data?.errors;
            if (!fields || typeof fields !== "object") return;
            for (const key of ["name", "url", "bio", "avatar", "remove_avatar"] as const) {
                if (Array.isArray(fields[key])) setError(key, {message: fields[key][0]});
            }
        },
    });

    return (
        <form onSubmit={handleSubmit(async (values) => {
            try {
                await mutation.mutateAsync(values);
            } catch {
                // Validation errors stay on the form; the shared handler displays other failures.
            }
        })}>
            <fieldset disabled={mutation.isPending} className="grid gap-6 md:grid-cols-[220px_minmax(0,1fr)]">
                <div className="space-y-3">
                    <p className="text-sm font-medium">تصویر پروفایل</p>
                    <Controller name="avatar" control={control} rules={{validate: (file) => {
                        if (!file) return true;
                        if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) return "تصویر باید JPG، PNG یا WebP باشد.";
                        return file.size <= 5 * 1024 * 1024 || "حجم تصویر نباید بیشتر از ۵ مگابایت باشد.";
                    }}} render={({field}) => (
                        <ImageField name="instagram-profile-avatar" value={field.value} onBlur={field.onBlur}
                                    previousSrc={removeAvatar ? undefined : instagramAvatarUrl(profile.avatar)}
                                    accept="image/jpeg,image/png,image/webp" disabled={mutation.isPending}
                                    onChange={(file) => {
                                        field.onChange(file);
                                        if (file) setValue("remove_avatar", false);
                                    }}/>
                    )}/>
                    {errors.avatar && <p role="alert" className="text-xs text-rose-600">{errors.avatar.message}</p>}
                    <p className="text-xs leading-6 text-neutral-500">JPG، PNG یا WebP تا ۵ مگابایت. در صورت نداشتن تصویر، لوگوی سایت نمایش داده می‌شود.</p>
                    {profile.avatar && (
                        <button type="button" className="text-xs text-rose-600 hover:underline" onClick={() => {
                            setValue("avatar", null, {shouldValidate: true});
                            setValue("remove_avatar", !removeAvatar);
                        }}>{removeAvatar ? "انصراف از حذف تصویر" : "حذف تصویر فعلی"}</button>
                    )}
                    {removeAvatar && <p role="status" className="text-xs text-neutral-500">تصویر پس از ذخیره حذف می‌شود.</p>}
                </div>
                <div className="space-y-5">
                    <div className="space-y-2">
                        <label htmlFor="instagram-profile-name" className="text-sm font-medium">نام نمایشی</label>
                        <Input id="instagram-profile-name" dir="auto" maxLength={255} aria-invalid={!!errors.name}
                               {...register("name", {required: "نام نمایشی را وارد کنید.", validate: (value) => !!value.trim() || "نام نمایشی را وارد کنید."})}/>
                        {errors.name && <p role="alert" className="text-xs text-rose-600">{errors.name.message}</p>}
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="instagram-profile-url" className="text-sm font-medium">آدرس اصلی اینستاگرام برای دنبال کردن</label>
                        <Input id="instagram-profile-url" type="url" dir="ltr" maxLength={2048}
                               placeholder="https://www.instagram.com/username/" aria-invalid={!!errors.url}
                               {...register("url", {
                                   required: "آدرس اینستاگرام را وارد کنید.",
                                   pattern: {value: /^https?:\/\/(?:www\.)?instagram\.com\/[a-z0-9._]{1,30}\/?(?:\?[^\s#]*)?(?:#[^\s]*)?$/i,
                                       message: "آدرس کامل پروفایل اینستاگرام را وارد کنید."},
                               })}/>
                        <p className="text-xs leading-6 text-neutral-500">دکمه «دنبال کردن» به این آدرس می‌رود و شناسهٔ پیج از همین لینک نمایش داده می‌شود.</p>
                        {errors.url && <p role="alert" className="text-xs text-rose-600">{errors.url.message}</p>}
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="instagram-profile-bio" className="text-sm font-medium">بایو</label>
                        <Textarea id="instagram-profile-bio" dir="auto" rows={6} maxLength={1000}
                                  aria-invalid={!!errors.bio} {...register("bio")}/>
                        <p className="text-xs text-neutral-500">حداکثر ۱۰۰۰ کاراکتر؛ سطرهای جدید در صفحه حفظ می‌شوند.</p>
                        {errors.bio && <p role="alert" className="text-xs text-rose-600">{errors.bio.message}</p>}
                    </div>
                </div>
            </fieldset>
            <hr className="my-5"/>
            <FormActions loading={mutation.isPending} saveText="ذخیره پروفایل" backHref="/admin/instagram_post"/>
        </form>
    );
}

export default function Page() {
    const query = useQuery({queryKey, queryFn: getInstagramProfile, refetchOnWindowFocus: false});

    return <>
        <Breadcrump breadcrumb={[
            {title: "پست های اینستاگرام", href: "instagram_post"},
            {title: "تنظیمات پروفایل", href: "instagram_post/profile"},
        ]}/>
        <Panel>
            <PageTitle>تنظیمات پروفایل اینستاگرام</PageTitle>
            <p className="mb-6 text-sm leading-7 text-neutral-500">این اطلاعات در بالای صفحه اینستاگرام و کنار پست‌ها نمایش داده می‌شود.</p>
            {query.isPending ? <p role="status" className="py-8 text-center text-sm">در حال دریافت پروفایل…</p>
                : query.isError ? <div role="alert" className="py-8 text-center text-sm">
                    دریافت پروفایل انجام نشد.
                    <button type="button" className="ms-2 text-sky-600" onClick={() => query.refetch()}>تلاش دوباره</button>
                </div> : <ProfileForm profile={query.data}/>}
        </Panel>
    </>;
}
