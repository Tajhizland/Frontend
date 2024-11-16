import Listing from "@/app/(shop)/vlog/Listing";
import {getSpecialProductsPaginate} from "@/services/api/shop/product";

interface PageProps {
    searchParams: {
        page?: string;
    }
}
export default async function Page({searchParams}: PageProps) {
    const page = searchParams.page ? parseInt(searchParams.page, 10) : 1;
    let response = await getSpecialProductsPaginate(page);
    return (<>
        <Listing response={response}/>
    </>)
}
