"use client";

import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import { SortableList, SortablePreview } from "@/shared/SortableList";
import { getBannerList, sortBanner } from "@/services/api/admin/banner";
import { BannerResponse } from "@/services/types/banner";

export default function Page() {
    return (
        <>
            <Breadcrump
                breadcrumb={[
                    { title: "بنر", href: "banner" },
                    { title: "سورت بنر", href: "banner/sort" },
                ]}
            />
            <Panel>
                <SortableList<BannerResponse>
                    queryKey={["banner-list"]}
                    queryFn={async () => (await getBannerList())?.data}
                    mutationFn={(banner) => sortBanner({ banner })}
                    renderItem={(banner) => <SortablePreview src={`banner/${banner.image}`} />}
                />
            </Panel>
        </>
    );
}
