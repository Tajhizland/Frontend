import {getVlogPaginated} from "@/services/api/shop/vlog"
import VlogListing from "@/components/Linsting/VlogListing";
import {Metadata} from "next";
import logo from "@/images/lightLogo.png";

interface PageProps {
    searchParams: Promise<{
        page?: string;
        search?: string;
    }>
}
export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "ولاگ تجهیزلند",
        description: "فروشگاه اینترنتی تجهیزات آشپزخانه صنعتی،رستوران،فست فود،کافی شاپ و...",
        twitter: {
            title: "ولاگ تجهیزلند",
            description: "فروشگاه اینترنتی تجهیزات آشپزخانه صنعتی،رستوران،فست فود،کافی شاپ و...",
            images: logo.src,
        },
        openGraph: {
            title: "ولاگ تجهیزلند",
            description: "فروشگاه اینترنتی تجهیزات آشپزخانه صنعتی،رستوران،فست فود،کافی شاپ و...",
            images: logo.src,
            url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}`,
            type: "website",
        },
        robots: "index , follow",
        alternates: {
            canonical: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/vlog`,
        }
    }
}
export default async function Page(props: PageProps) {
    const searchParams = await props.searchParams;
    const page = searchParams.page ? parseInt(searchParams.page, 10) : 1;
    const search=searchParams.search?.toString();
    const response = await getVlogPaginated(page,search?("filter[search]="+search):"");

    return (<>
        <VlogListing response={response} search={search}/>
    </>)
}
