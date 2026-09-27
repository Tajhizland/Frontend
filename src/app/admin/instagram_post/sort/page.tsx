"use client";

import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import {SortableList, SortablePreview} from "@/shared/SortableList";
import {getList, sortPost} from "@/services/api/admin/instagramPost";
import {InstagramPostResponse} from "@/services/types/instagramPost";

export default function Page() {
    return (
        <>
            <Breadcrump
                breadcrumb={[
                    {title: "پست های اینستاگرام", href: "instagram_post"},
                    {title: "سورت پست ها", href: "instagram_post/sort"},
                ]}
            />
            <Panel>
                <PageTitle>ترتیب نمایش پست ها در فید</PageTitle>
                <SortableList<InstagramPostResponse>
                    queryKey={["instagram-post-list"]}
                    queryFn={() => getList()}
                    mutationFn={(post) => sortPost({post})}
                    renderItem={(post) => (
                        <SortablePreview
                            // اولین رسانه‌ی تصویری به‌عنوان کاور؛ پستِ فقط‌ویدیو کاوری ندارد
                            src={post.media?.find((item) => item.type === "image")
                                ? `instagram/${post.media.find((item) => item.type === "image")!.file}`
                                : null}
                            title={post.caption?.slice(0, 60) || post.url}
                            ratio="square"
                        />
                    )}
                />
            </Panel>
        </>
    );
}
