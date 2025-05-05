import {Metadata} from "next";
import logo from "@/images/lightLogo.png";
import {findSample} from "@/services/api/shop/sample";
import SectionSampleInfo from "@/components/Section/SectionSampleInfo";
import SectionSampleVideo from "@/components/Section/SectionSampleVideo";
import SectionSampleImage from "@/components/Section/SectionSampleImage";
export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "محصولات ویژه تجهیزلند",
        description: "فروشگاه اینترنتی تجهیزات آشپزخانه صنعتی،رستوران،فست فود،کافی شاپ و...",
        twitter: {
            title: "محصولات ویژه تجهیزلند",
            description: "فروشگاه اینترنتی تجهیزات آشپزخانه صنعتی،رستوران،فست فود،کافی شاپ و...",
            images: logo.src,
        },
        openGraph: {
            title: "محصولات ویژه تجهیزلند",
            description: "فروشگاه اینترنتی تجهیزات آشپزخانه صنعتی،رستوران،فست فود،کافی شاپ و...",
            images: logo.src,
            url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}`,
            type: "website",
        },
        robots: "index , follow",
        alternates: {
            canonical: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/special`,
        }

    }
}

export default async function page() {
    let response = await findSample();
    return (<>
        <div className={"mt-14 container "}>
            <SectionSampleInfo info={response.info}/>
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
