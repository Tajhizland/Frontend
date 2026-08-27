"use client";

import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import { SortableList, SortablePreview } from "@/shared/SortableList";
import { getBannerList, sortBanner } from "@/services/api/admin/campaignBanner";
import { CampaignBannerResponse } from "@/services/types/campaignBanner";
import { useParams } from "next/navigation";

export default function Page() {
    const { id } = useParams();

    return (
        <>
            <Breadcrump
                breadcrumb={[
                    { title: "جشنواره", href: "campaign" },
                    { title: "بنر ها", href: `campaign/${id}/banner` },
                    { title: "سورت بنر ها", href: `campaign/${id}/banner/sort` },
                ]}
            />
            <Panel>
                <SortableList<CampaignBannerResponse>
                    queryKey={["campaign-banner", "home_page"]}
                    queryFn={async () => (await getBannerList("home_page"))?.data}
                    mutationFn={(banner) => sortBanner({ banner })}
                    renderItem={(banner) => <SortablePreview src={`banner/${banner.image}`} />}
                />
            </Panel>
        </>
    );
}
