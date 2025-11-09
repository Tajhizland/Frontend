import {paginatedCast} from "@/services/api/shop/cast";
import CastCard from "@/components/Card/CastCard";

interface CastPageProps {

    searchParams: Promise<{
        page?: string;
    }>
}
export default async function page(props: CastPageProps) {
    const searchParams = await props.searchParams;

    const page = searchParams.page ? parseInt(searchParams.page, 10) : 1;
    let response = await paginatedCast(page);
    return (
        <div className={"container py-2 lg:pb-28 lg:pt-5 space-y-5 "}>
            <h1 className={"text-lg lg:text-3xl font-bold"}>
                تجهیزکست
            </h1>
            <div className={"grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 gap-10"}>
                {
                    response.data.map((item, index) => (<CastCard cast={item} key={index}/>))
                }

            </div>
        </div>
    )
}