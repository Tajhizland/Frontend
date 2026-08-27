"use client";

import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import { SortableList, SortablePreview } from "@/shared/SortableList";
import { getDesktopSliders, sortSlider } from "@/services/api/admin/slider";
import { SliderResponse } from "@/services/types/slider";

export default function Page() {
    return (
        <>
            <Breadcrump
                breadcrumb={[
                    { title: "اسلایدر", href: "slider" },
                    { title: "سورت اسلایدر", href: "slider/sort-desktop" },
                ]}
            />
            <Panel>
                <SortableList<SliderResponse>
                    queryKey={["slider-desktop"]}
                    queryFn={async () => (await getDesktopSliders())?.data}
                    mutationFn={(slider) => sortSlider({ slider })}
                    renderItem={(slider) => <SortablePreview src={`slider/${slider.image}`} />}
                />
            </Panel>
        </>
    );
}
