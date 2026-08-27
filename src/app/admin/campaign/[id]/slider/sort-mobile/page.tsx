"use client";

import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import { SortableList, SortablePreview } from "@/shared/SortableList";
import { getMobileSliders, sortSlider } from "@/services/api/admin/campaignSlider";
import { CampaignSliderResponse } from "@/services/types/campaignSlider";
import { useParams } from "next/navigation";

export default function Page() {
    const { id } = useParams();

    return (
        <>
            <Breadcrump
                breadcrumb={[
                    { title: "جشنواره", href: "campaign" },
                    { title: "اسلایدر ها", href: `campaign/${id}/slider` },
                    { title: "سورت اسلایدر ها", href: `campaign/${id}/slider/sort-mobile` },
                ]}
            />
            <Panel>
                <SortableList<CampaignSliderResponse>
                    queryKey={["campaign-slider-mobile"]}
                    queryFn={async () => (await getMobileSliders())?.data}
                    mutationFn={(slider) => sortSlider({ slider })}
                    renderItem={(slider) => <SortablePreview src={`slider/${slider.image}`} />}
                />
            </Panel>
        </>
    );
}
