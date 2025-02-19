 import {getSpecialProductsPaginate} from "@/services/api/shop/product";
 import SpecialListing from "@/components/Linsting/SpecialListing";
 import {Metadata} from "next";
 //@ts-ignore
 import logo from "@/images/lightLogo.png";

interface PageProps {
    searchParams: Promise<{
        page?: string;
    }>
}
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
export default async function Page(props: PageProps) {
    const searchParams = await props.searchParams;
    const page = searchParams.page ? parseInt(searchParams.page, 10) : 1;
    let response = await getSpecialProductsPaginate(page);
    return (<>
        <SpecialListing response={response}/>
    </>)
}
