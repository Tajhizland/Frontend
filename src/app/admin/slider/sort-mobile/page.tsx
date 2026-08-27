"use client";

import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import { SortableList, SortablePreview } from "@/shared/SortableList";
import { getMobileSliders, sortSlider } from "@/services/api/admin/slider";
import { SliderResponse } from "@/services/types/slider";

export default function Page() {
    return (
        <>
            <Breadcrump
                breadcrumb={[
                    { title: "اسلایدر", href: "slider" },
                    { title: "سورت اسلایدر", href: "slider/sort-mobile" },
                ]}
            />
            <Panel>
                <SortableList<SliderResponse>
                    queryKey={["slider-mobile"]}
                    queryFn={async () => (await getMobileSliders())?.data}
                    mutationFn={(slider) => sortSlider({ slider })}
                    renderItem={(slider) => <SortablePreview src={`slider/${slider.image}`} />}
                />
            </Panel>
        </>
    );
}
