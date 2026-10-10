import {buildMetadata} from "@/utils/seo";
import {Metadata} from "next";
import logo from "@/images/lightLogo.png";
import {findSample} from "@/services/api/shop/sample";
import SectionSampleInfo from "@/components/Section/SectionSampleInfo";
import SectionSampleVideo from "@/components/Section/SectionSampleVideo";
import SectionSampleImage from "@/components/Section/SectionSampleImage";
export const dynamic = 'force-dynamic';

export const metadata = buildMetadata({title: "پروژه‌های تجهیزشده تجهیزلند", description: "تصاویر و ویدیوهای پروژه‌های کافه، رستوران و آشپزخانه صنعتی تجهیزشده توسط تجهیزلند.", path: "/sample"});

export default async function page() {
    let response = await findSample();
    return (<>
        <div className={"mt-14 container "}>
            <SectionSampleInfo info={response.info} poster={response.poster}/>
        </div>
        <div className={"mt-14 container space-y-5"}>
            <div className={"text-lg text-center mx-auto"}>
                نمونه پروژه های تجهیز شده
            </div>
            <SectionSampleVideo video={response.video.data}/>
        </div>
        <div className={"my-14 container "}>
            <SectionSampleImage data={response.image.data}/>
        </div>
    </>)
}
