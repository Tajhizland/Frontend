"use client";

import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import { LuArrowDownUp } from "react-icons/lu";
import ToolbarButton from "@/shared/Toolbar/ToolbarButton";
import Panel from "@/shared/Panel/Panel";
import PageLink from "@/shared/PageLink/PageLink";
import SampleTab from "@/components/Tabs/SampleTab";
import { AttachedList } from "@/shared/AttachedList";
import { SearchPickerItem } from "@/shared/SearchPicker";
import { deleteVideo, getVideo, setVideo } from "@/services/api/admin/sample";
import { search } from "@/services/api/admin/vlog";
import { VlogResponse } from "@/services/types/vlog";
import Image from "next/image";

export default function Page() {
    return (
        <>
            <Breadcrump
                breadcrumb={[
                    { title: "پروژه های تجهیز شده", href: "sample" },
                    { title: "ویدیو ها", href: "sample/video" },
                ]}
            />
            <Panel>
                <SampleTab />
                <PageLink>
                    <ToolbarButton href="/admin/sample/video/sort" icon={<LuArrowDownUp className="w-4 h-4" />}>سورت کردن</ToolbarButton>
                </PageLink>
                <AttachedList
                    layout="grid"
                    addPosition="before"
                    queryKey={["sample-video"]}
                    queryFn={() => getVideo()}
                    itemKey={(item) => item.id}
                    removeFn={(item) => deleteVideo(item.id)}
                    renderItem={(item) => (
                        <Image
                            src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/vlog/${item?.vlog?.poster}`}
                            alt="image"
                            width={720}
                            height={100}
                            className="w-full h-full"
                        />
                    )}
                    picker={{
                        placeholder: "جستجوی نام ویدیو",
                        searchFn: (query) => search(query),
                        onPick: (item: VlogResponse) => setVideo(item.id),
                        itemKey: (item: VlogResponse) => item.id,
                        renderItem: (item: VlogResponse) => (
                            <SearchPickerItem src={`vlog/${item.poster}`} title={item.title} />
                        ),
                    }}
                />
            </Panel>
        </>
    );
}
