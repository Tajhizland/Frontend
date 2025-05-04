import React, {FC} from "react";
import {VlogResponse} from "@/services/types/vlog";
import VlogCard from "@/components/Card/VlogCard";
import VlogVideoCard from "@/components/Card/VlogVideoCard";
import BackgroundSection from "@/components/Section/BackgroundSection";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import Heading from "@/components/Heading/Heading";

export interface SectionMagazine5Props {
    data: VlogResponse[]
}

const SectionHomepageVlog: FC<SectionMagazine5Props> = ({data}) => {
    return (
        <div className="relative py-5 lg:py-10">
            <BackgroundSection/>
            <div>
                <Heading>
                    تجهیزلند ولاگ
                </Heading>
                <div>
                    <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
                        <VlogVideoCard data={data[0]}/>
                        <div className="grid gap-6 md:gap-8">
                            <VlogCard data={data[1]}/>
                            <VlogCard data={data[2]}/>
                            <VlogCard data={data[3]}/>
                        </div>
                    </div>
                </div>
                <div className="flex mt-5 sm:mt-10 justify-center">
                    <ButtonSecondary href={"/vlog"}> مشاهده همه ویدیوها</ButtonSecondary>
                </div>
            </div>
        </div>


    );
};

export default SectionHomepageVlog;
