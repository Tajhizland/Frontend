import {getVlogPaginated} from "@/services/api/shop/vlog"
import Listing from "@/app/(shop)/vlog/Listing";

interface PageProps {
    searchParams: {
        page?: string;
        search?: string;
    }
}

export default async function Page({searchParams}: PageProps) {
    const page = searchParams.page ? parseInt(searchParams.page, 10) : 1;
    const search=searchParams.search?.toString();
    let response = await getVlogPaginated(page,search?("filter[search]="+search):"");

    return (<>
        <Listing response={response} search={search}/>
    </>)
}
