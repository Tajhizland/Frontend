import {buildMetadata} from "@/utils/seo";
import {notFound, redirect} from "next/navigation";
import Image from "next/image";
import smallLogo from "@/images/lightSmallLogo.png";
import {getInstagramPostPaginated} from "@/services/api/shop/instagramPost";
import InstagramFeed from "@/components/Instagram/InstagramFeed";
import {INSTAGRAM_ACCOUNT, instagramPostPath, POST_QUERY_PARAM} from "@/components/Instagram/helpers";

// فید باید همیشه تازه باشد؛ بدون این، صفحه در زمان build پرِرندر و منجمد می‌شود
export const dynamic = "force-dynamic";

export const metadata = buildMetadata({title: "اینستاگرام تجهیزلند", description: "ویدیوها و محتوای اینستاگرام تجهیزلند؛ آشنایی با تجهیزات کافه و رستوران.", path: "/instagram"});

export default async function Page({searchParams}: {
    searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
    const sharedId = (await searchParams)[POST_QUERY_PARAM];
    if (sharedId !== undefined) {
        if (typeof sharedId !== "string" || !/^[1-9]\d*$/.test(sharedId)) notFound();
        redirect(instagramPostPath(sharedId));
    }
    const response = await getInstagramPostPaginated(1);

    // نوار ناوبری دسکتاپ داخل هدرِ sticky با `absolute` و `top:100%` می‌نشیند،
    // پس جایی در جریان صفحه نمی‌گیرد و روی ۴۰ پیکسل اول محتوا می‌افتد؛ مثل
    // بقیه‌ی صفحات فقط در `lg` به بالا فضایش رزرو می‌شود تا فید موبایل باز نشود.
    return (
        <main dir="rtl" className="mx-auto mt-6 mb-10 w-full max-w-[960px] lg:mt-16">
            <header className="mb-7 grid grid-cols-[80px_minmax(0,1fr)] items-center gap-x-5 gap-y-4 px-4 sm:grid-cols-[180px_minmax(0,1fr)] sm:gap-x-10 sm:px-10 sm:py-6">
                <span
                    className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-linear-to-tr from-yellow-400 via-rose-500 to-purple-600 p-[3px] sm:row-span-2 sm:mx-auto sm:h-36 sm:w-36">
                    <span
                        className="flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-white p-1 dark:bg-neutral-900">
                        <Image src={smallLogo} alt={INSTAGRAM_ACCOUNT} className="h-full w-full object-contain"/>
                    </span>
                </span>
                <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-5">
                    <h1 dir="ltr" className="w-fit max-w-full truncate text-lg font-medium sm:text-2xl">{INSTAGRAM_ACCOUNT}</h1>
                    <a href={`https://www.instagram.com/${INSTAGRAM_ACCOUNT}/`} target="_blank" rel="noopener noreferrer"
                       className="w-fit rounded-lg bg-sky-500 px-5 py-2 text-xs font-semibold text-white transition hover:bg-sky-600 sm:text-sm">
                        دنبال کردن
                    </a>
                </div>
                <div className="col-span-2 space-y-2 text-sm leading-6 sm:col-span-1 sm:col-start-2">
                    <p><strong className="font-semibold">{response.listing.meta.total.toLocaleString("fa-IR")}</strong> پست</p>
                    <p className="font-semibold">تجهیزلند | تجهیزات کافه و رستوران</p>
                    <p className="text-neutral-600 dark:text-neutral-400">دنیای تجهیزات حرفه‌ای آشپزخانه، کافه و رستوران</p>
                </div>
            </header>
            <InstagramFeed response={response}/>
        </main>
    );
}
