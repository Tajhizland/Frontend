import AccordionInfo from "@/components/AccordionInfo";
import { getFaq } from "@/services/api/shop/faq";
import {Metadata} from "next";
import logo from "@/images/tajhizland/logo.png";


export async function generateMetadata(): Promise<Metadata> {

    return {
        title: "پرسش های متداول",
        description: "سایت رسمی تجهیزلند با هدف ایجاد فضایی  جهت خرید امن و مطمئن طراحی شده است و با دریافت نماد اعتماد تجارت الکترونیکی روند ارائه و ارسال خود را به صورت کاملا قانونی ثبت نموده و اطمینان و رضایت خاطر کاربران را برای خریدی موفق فراهم ساخته است",
        twitter: {
            title: "پرسش های متداول",
            description: "سایت رسمی تجهیزلند با هدف ایجاد فضایی  جهت خرید امن و مطمئن طراحی شده است و با دریافت نماد اعتماد تجارت الکترونیکی روند ارائه و ارسال خود را به صورت کاملا قانونی ثبت نموده و اطمینان و رضایت خاطر کاربران را برای خریدی موفق فراهم ساخته است",
            images:logo.src,
        },
        openGraph: {
            title: "پرسش های متداول",
            description: "سایت رسمی تجهیزلند با هدف ایجاد فضایی  جهت خرید امن و مطمئن طراحی شده است و با دریافت نماد اعتماد تجارت الکترونیکی روند ارائه و ارسال خود را به صورت کاملا قانونی ثبت نموده و اطمینان و رضایت خاطر کاربران را برای خریدی موفق فراهم ساخته است",
            images: logo.src,
            url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/faq`,
            type: "website",
        },
        robots: "index , follow",

    }
}

export default async function page() {
    let faq = await getFaq();
    function renderFaqData() {
        let data: { name: string, content: string }[] = [];
        faq.map((item) => {
            data.push({ name: item.question, content: item.answer })
        })
        return data;
    }
    return (<>

        <div className={`nc-PageCollection`}>
            <div className="container py-16 lg:pb-28 lg:pt-20 space-y-16 sm:space-y-20 lg:space-y-28">
                <div className="space-y-10 lg:space-y-14">
                    <div className="">
                        <h2 className="block text-2xl sm:text-3xl lg:text-4xl font-semibold">
                            پرسش های متداول
                        </h2>
                        <span className="block mt-5 text-neutral-500 dark:text-neutral-400 text-sm sm:text-base">
                        سایت رسمی تجهیزلند با هدف ایجاد فضایی  جهت خرید امن و مطمئن طراحی شده است و با دریافت نماد اعتماد تجارت الکترونیکی روند ارائه و ارسال خود را به صورت کاملا قانونی ثبت نموده و اطمینان و رضایت خاطر کاربران را برای خریدی موفق فراهم ساخته است ،
                        </span>
                    </div>
                    <hr className="border-slate-200 dark:border-slate-700" />
                    <main>
                        <AccordionInfo data={renderFaqData()} />
                    </main>
                </div>
            </div>
        </div>
    </>)
}
