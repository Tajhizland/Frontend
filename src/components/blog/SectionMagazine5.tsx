import React, {FC} from "react";
import Card12 from "./Card12";
import Card13 from "./Card13"; 
import {VlogResponse} from "@/services/types/vlog";

export interface SectionMagazine5Props {
    data:VlogResponse[]
}

const SectionMagazine5: FC<SectionMagazine5Props> = ({data}) => {
    return (
        <div className="nc-SectionMagazine5">
            <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
                <Card12 data={data[0]}/>
                <div className="grid gap-6 md:gap-8">
                    <Card13 data={data[1]}/>
                    <Card13 data={data[2]}/>
                    <Card13 data={data[3]}/>

                </div>
            </div>
        </div>
    );
};

export default SectionMagazine5;
