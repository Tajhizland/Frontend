import {getVlogPaginated} from "@/services/api/shop/vlog"
import Listing from "@/app/(shop)/vlog/Listing";

interface PageProps {
    searchParams: {
        page?: string;
    }
}

export default async function Page({searchParams}: PageProps) {
    const page = searchParams.page ? parseInt(searchParams.page, 10) : 1;
    let response = await getVlogPaginated(page);

    return (<>
        <Listing response={response}/>
    </>)
}
