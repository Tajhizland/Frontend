import {paginatedCast} from "@/services/api/shop/cast";
import CastCard from "@/components/Card/CastCard";
import LogoIco from "@/images/logoTajhizcast.jpg";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import CastListing from "@/components/Linsting/CastListing";

interface PageProps {
    searchParams: Promise<{
        page?: string;
        search?: string;
    }>
}

export default async function page(props: PageProps) {
    const searchParams = await props.searchParams;
    const search = searchParams.search?.toString();
    const page = searchParams.page ? parseInt(searchParams.page, 10) : 1;

    let response = await paginatedCast(page, search ? ("filter[search]=" + search) : "");
    return (
        <div className={"  py-2 lg:pb-28 lg:pt-5 space-y-5   "}>

            <div className={" flex items-center mx-auto containe w-24"}>
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
            <CastListing response={response}/>
        </div>
    )
}