import {Metadata} from "next";
import {Suspense} from "react";
import Image from "next/image";
import logo from "@/images/lightLogo.png";
import smallLogo from "@/images/lightSmallLogo.png";
import {getInstagramPostPaginated} from "@/services/api/shop/instagramPost";
import InstagramFeed from "@/components/Instagram/InstagramFeed";
import {INSTAGRAM_ACCOUNT} from "@/components/Instagram/helpers";

// فید باید همیشه تازه باشد؛ بدون این، صفحه در زمان build پرِرندر و منجمد می‌شود
export const dynamic = "force-dynamic";

const TITLE = "پست های اینستاگرام تجهیزلند";
const DESCRIPTION = "جدیدترین پست ها و ویدیوهای اینستاگرام تجهیزلند؛ تجهیزات آشپزخانه صنعتی، رستوران، فست فود و کافی شاپ.";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: TITLE,
        description: DESCRIPTION,
        twitter: {
            title: TITLE,
            description: DESCRIPTION,
            images: logo.src,
        },
        openGraph: {
            title: TITLE,
            description: DESCRIPTION,
            images: logo.src,
            url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/instagram`,
            type: "website",
        },
        robots: "index , follow",
        alternates: {
            canonical: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/instagram`,
        },
    };
}

export default async function Page() {
    const response = await getInstagramPostPaginated(1);

    // `container` یک padding افقی می‌گذارد که پست را از لبه‌ی صفحه جدا می‌کند؛
    // اینستاگرام چنین فاصله‌ای ندارد، پس ستون بدون آن ساخته می‌شود و فقط
    // هدر پروفایل padding خودش را می‌گیرد.
    //
    // نوار ناوبری دسکتاپ داخل هدرِ sticky با `absolute` و `top:100%` می‌نشیند،
    // پس جایی در جریان صفحه نمی‌گیرد و روی ۴۰ پیکسل اول محتوا می‌افتد؛ مثل
    // بقیه‌ی صفحات فقط در `lg` به بالا فضایش رزرو می‌شود تا فید موبایل باز نشود.
    return (
        <div className="mt-6 mb-10 lg:mt-14">
            <header className="mx-auto mb-6 flex w-full max-w-[470px] items-center gap-4 px-4">
                <span
                    className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-linear-to-tr from-yellow-400 via-rose-500 to-purple-600 p-[3px]">
                    <span
                        className="flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-white p-1 dark:bg-neutral-900">
                        <Image src={smallLogo} alt={INSTAGRAM_ACCOUNT} className="h-full w-full object-contain"/>
                    </span>
                </span>
                <div className="flex flex-col gap-1">
                    <h1 className="text-lg font-semibold">پست های اینستاگرام</h1>
                    <span className="text-sm text-neutral-500">{INSTAGRAM_ACCOUNT}</span>
                </div>
            </header>

            <Suspense>
                <InstagramFeed response={response}/>
            </Suspense>
        </div>
    );
}
