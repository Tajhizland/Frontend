import { findVlogByUrl } from "@/services/api/shop/vlog";

interface  PageProps { 
    params: {
        url: [string];
    },
}

export default async function Page({params}: PageProps)
{ 
    let response = await findVlogByUrl(decodeURIComponent(params.url.join("/")));
    return(<>
    
    </>)
}
