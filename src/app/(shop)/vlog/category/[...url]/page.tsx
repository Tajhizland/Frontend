import { getVlogByCategoryPaginated, getVlogPaginated } from "@/services/api/shop/vlog"
import VlogListing from "@/components/Linsting/VlogListing";
import { Metadata } from "next";
import logo from "@/images/lightLogo.png";
import VlogCategoryListing from "@/components/Linsting/VlogCategoryListing";

interface PageProps {
    params: Promise<{
        url: [string];
    }>,
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
    const search = searchParams.search?.toString();

    const params = await props.params;
    const url = decodeURIComponent(params.url.join("/"));
    let response = await getVlogByCategoryPaginated(url, page, search ? ("filter[search]=" + search) : "");
    return (<>
        <VlogCategoryListing url={url} response={response} search={search} />
    </>)
}
