
import React from "react";
import {SampleVideoResponse} from "@/services/types/sampleVideo";
import VlogCard2 from "@/components/Card/VlogCard2";

export default function SectionSampleVideo({video}: { video: SampleVideoResponse[] }) {
    return (<div className={"grid grid-cols-2 md:grid-cols-4 gap-5"}>

        {
            video.map((item, index) => (<div key={index}>
                {item.vlog && <VlogCard2 data={item.vlog}/>}
            </div>))
        }
    </div>)
}
