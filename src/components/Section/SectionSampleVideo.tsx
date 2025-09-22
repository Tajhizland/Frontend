"use client"
import React, {useState} from "react";
import {SampleVideoResponse} from "@/services/types/sampleVideo";
import VlogCard2 from "@/components/Card/VlogCard2";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";

export default function SectionSampleVideo({video}: { video: SampleVideoResponse[] }) {
    const [showAll, setShowAll] = useState(false);
    return (<div className={"flex flex-col items-center w-full gap-5"}>
        <div className={"grid grid-cols-2 md:grid-cols-3 gap-5  w-full"}>
            {
                (showAll ? video : video.slice(0, 6)).map((item, index) => (
                    <div key={index}>
                        {item.vlog && <VlogCard2 data={item.vlog}/>}
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
