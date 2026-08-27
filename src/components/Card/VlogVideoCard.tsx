import React, {FC} from "react";
import Link from "next/link";
import {stripHTML} from "@/hooks/StripHtml";
import {VlogCardResponse} from "@/services/types/vlog";
import MetaCard from "@/components/Card/MetaCard";
import AdaptiveVideoPlayer from "@/shared/VideoPlayer/AdaptiveVideoPlayer";

export interface Card12Props {
    className?: string;
    data: VlogCardResponse
}

const VlogVideoCard: FC<Card12Props> = ({className = "h-full", data}) => {
    if (!data) return null;

    return (
        <div className={` group relative flex flex-col ${className}`}>
            {/*
              ارتفاع قاب محدود شده تا ویدیوی عمودی ستون کنارِ خودش (سه کارت روی هم)
              را بیش از حد بلند نکند؛ خود پلیر جهت ویدیو را تشخیص می‌دهد.
            */}
            <AdaptiveVideoPlayer
                className="max-h-[420px] lg:max-h-[460px]"
                hls={data.hls ? `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/hls/${data.hls}` : null}
                src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/vlog/${data.video}`}
                poster={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/vlog/${data.poster}`}
            />

            <div className=" mt-8  flex flex-col">
                <h2
                    className={`nc-card-title block font-semibold text-neutral-900 dark:text-neutral-100 transition-colors text-lg sm:text-2xl`}
                >
                    <Link
                        aria-label={"vlog"}
                        href={"/vlog/" + data.url}
                        className="line-clamp-2 capitalize"
                        title={"vlog"}
                    >
                        {data.title}
                    </Link>
                </h2>
                <span className="hidden sm:block mt-4 text-neutral-500 dark:text-neutral-400">
          <span className="line-clamp-2">
               <div dangerouslySetInnerHTML={{__html: stripHTML(data.description)}}/>

          </span>
        </span>
                <MetaCard  date={data.created_at} author={data.author}  className="mt-5"/>
            </div>
        </div>
    );
};

export default VlogVideoCard;
