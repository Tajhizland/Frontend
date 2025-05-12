"use client"
import React, {useState} from "react";
import {SampleVideoResponse} from "@/services/types/sampleVideo";
import VlogCard2 from "@/components/Card/VlogCard2";
import {VlogResponse} from "@/services/types/vlog";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";

export default function SectionLeadingVideo({video}: { video: VlogResponse[] }) {
    const [showAll, setShowAll] = useState(false);
    return (<div className={"flex flex-col items-center w-full gap-5"}>
        <div className={"grid grid-cols-2 md:grid-cols-3 gap-5  w-full"}>

            {
                (showAll ? video : video.slice(0, 6)).map((item, index) => (
                    <div key={index}>
                        <VlogCard2 data={item}/>
                    </div>
                ))
            }
        </div>
        <ButtonPrimary className={"w-fit"} onClick={() => {
            setShowAll(!showAll)
        }}>

            {
                showAll ? "بستن" : "مشاهده همه"
            }
        </ButtonPrimary>
    </div>)
}
