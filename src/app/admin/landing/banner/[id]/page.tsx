"use client";

import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import LandingTab from "@/components/Tabs/LandingTab";
import Input from "@/shared/Input/Input";
import Select from "@/shared/Select/Select";
import Uploader from "@/shared/Uploader/Uploader";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import NcImage from "@/shared/NcImage/NcImage";
import Badge from "@/shared/Badge/Badge";
import { AttachedList } from "@/shared/AttachedList";
import { deleteLandingBanner, getLandingBanner, setLandingBanner } from "@/services/api/admin/landing";
import { useParams } from "next/navigation";
import { useMutation } from "react-query";
import { toast } from "react-hot-toast";

export default function Page() {
    const { id } = useParams();
    const landingId = Number(id);

    return (
        <>
            <Breadcrump
                breadcrumb={[
                    { title: "لندینگ", href: "landing" },
                    { title: "ویرایش لندینگ", href: `landing/edit/${id}` },
                    { title: "ویرایش بنر ها", href: `landing/banner/${id}` },
                ]}
            />
            <Panel>
                <LandingTab id={String(id)} />
                <AttachedList
                    layout="grid"
                    addPosition="before"
                    queryKey={["landing-banner", landingId]}
                    queryFn={() => getLandingBanner(landingId)}
                    itemKey={(item) => item.id}
                    removeFn={(item) => deleteLandingBanner(item.id)}
                    renderItem={(item) => (
                        <>
                            <div className="relative flex-shrink-0 bg-slate-50 dark:bg-slate-300 rounded-3xl overflow-hidden z-1 group w-full">
                                <NcImage
                                    alt="banner"
                                    containerClassName="flex aspect-w-11 aspect-h-12 w-full h-full"
                                    className="object-cover w-full h-full drop-shadow-xl"
                                    fill
                                    sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 40vw"
                                    src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/landing-banner/${item.image}`}
                                />
                            </div>
                            <span className="break-all text-center text-xs">{item.url}</span>
                            {!!item.slider && <Badge name="اسلایدر" />}
                        </>
                    )}
                    renderAdd={({ invalidate }) => <AddBanner landingId={landingId} onAdded={invalidate} />}
                />
            </Panel>
        </>
    );
}

function AddBanner({ landingId, onAdded }: { landingId: number; onAdded: () => void }) {
    const mutation = useMutation(
        (form: FormData) =>
            setLandingBanner({
                url: form.get("url") as string,
                slider: Number(form.get("slider")),
                image: form.get("image") as File,
                landing_id: landingId,
            }),
        {
            onSuccess: (response) => {
                toast.success(response?.message as string);
                onAdded();
            },
            onError: () => {
                toast.error("افزودن بنر انجام نشد");
            },
        }
    );

    return (
        <form action={(form) => mutation.mutate(form)}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 justify-between items-center gap-x-10">
                <div>
                    <label>آدرس</label>
                    <Input name="url" />
                </div>
                <div>
                    <label>اسلایدر</label>
                    <Select name="slider">
                        <option value={1}>بله</option>
                        <option value={0}>خیر</option>
                    </Select>
                </div>
                <div className="sm:col-span-2">
                    <Uploader name="image" />
                </div>
            </div>
            <ButtonPrimary className="w-full mt-5" loading={mutation.isLoading}>
                آپلود
            </ButtonPrimary>
        </form>
    );
}
