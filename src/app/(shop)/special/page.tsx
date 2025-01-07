 import {getSpecialProductsPaginate} from "@/services/api/shop/product";
 import Listing from "@/app/(shop)/special/Listing";

interface PageProps {
    searchParams: Promise<{
        page?: string;
    }>
}
export default async function Page(props: PageProps) {
    const searchParams = await props.searchParams;
    const page = searchParams.page ? parseInt(searchParams.page, 10) : 1;
    let response = await getSpecialProductsPaginate(page);
    return (<>
        <Listing response={response}/>
    </>)
}
