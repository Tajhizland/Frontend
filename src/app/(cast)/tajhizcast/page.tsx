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
        <div >
            <CastListing response={response}/>
        </div>
    )
}
