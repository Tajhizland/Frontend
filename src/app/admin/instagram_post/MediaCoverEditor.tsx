"use client";

import {InstagramPostMediaResponse} from "@/services/types/instagramPost";
import {updateMediaCover} from "@/services/api/admin/instagramPost";
import {useApiMutation} from "@/hooks/useApiMutation";
import CoverPicker from "./CoverPicker";

export default function MediaCoverEditor({media}: {media: InstagramPostMediaResponse}) {
    const mutation = useApiMutation((cover: File) => updateMediaCover(media.id, cover), {
        invalidate: [["instagram-post-media", media.postId], ["instagram-post-info", media.postId], ["instagram-posts"], ["instagram-post"]],
    });

    return (
        <CoverPicker image={media.cover ? `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/instagram/${media.cover}` : undefined}
                     disabled={mutation.isPending} onChange={(cover) => {
            if (cover) mutation.mutate(cover);
        }}/>
    );
}
