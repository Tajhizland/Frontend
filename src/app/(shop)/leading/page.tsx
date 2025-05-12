import SectionPromo3 from "@/components/Section/SectionPromo3";
import SectionSampleVideo from "@/components/Section/SectionSampleVideo";
import SectionHomepageBlog from "@/components/Section/SectionHomepageBlog";
import React from "react";
import {findLeading} from "@/services/api/shop/leading";
import SectionLeadingVideo from "@/components/Section/SectionLeadingVideo";

export default async function page() {
    let response = await findLeading();
    return (<div className={"flex flex-col gap-14 mt-14"}>
        <div className={" container "}>
            <SectionPromo3 logo={response.poster.image}/>
        </div>
        <div className={"container space-y-5"}>
            <div className={"text-lg text-center mx-auto"}>
                نکته ها و طرفند ها
            </div>
            <SectionLeadingVideo video={response.vlog.data}/>
        </div>
        <SectionHomepageBlog data={response.blog.data}/>
    </div>)
}
