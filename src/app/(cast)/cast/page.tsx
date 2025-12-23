import {paginatedCast} from "@/services/api/shop/cast";
import CastCard from "@/components/Card/CastCard";
import LogoIco from "@/images/logoTajhizcast.jpg";
import Link from "next/link";
import Image from "next/image";
import React from "react";

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
        <div className={"container py-2 lg:pb-28 lg:pt-5 space-y-5 max-w-7xl "}>

            <div className={"w-full max-w-14 md:max-w-32 flex items-center mx-auto"}>
                <Link
                    href="/"
                    className={`ttnc-logo inline-block text-slate-600  aspect-h-1 aspect-w-1 sm:aspect-w-1 w-full h-0 `}
                >
                    <Image
                        className={`   h-full w-full  `}
                        src={LogoIco}
                        alt="Logo"
                        priority
                    />
                </Link>
            </div>
            <hr/>
            <div className={"flex flex-col gap-10"}>
                {
                    response.data.map((item, index) => (<CastCard cast={item} key={index}/>))
                }

            </div>
        </div>
    )
}