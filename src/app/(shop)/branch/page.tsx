import Content from "./Content";
import JsonLd from "@/components/Seo/JsonLd";
import {buildMetadata} from "@/utils/seo";
import {localBusinessSchema} from "@/utils/localBusinessSeo";
export const metadata = buildMetadata({title: "آدرس و شعب تجهیزلند", description: "آدرس فروشگاه تجهیزلند در خیابان جمهوری تهران، شماره تماس و راه‌های ارتباط برای مشاوره خرید تجهیزات کافه و رستوران.", path: "/branch"});
export default function Page() {
    return <><JsonLd data={localBusinessSchema} /><Content /></>;
}
