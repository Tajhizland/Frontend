import Link from "next/link";
import Image from "next/image";
import {CastResponse} from "@/services/types/cast";
import Badge from "@/shared/Badge/Badge";

export default function CastCard({cast}: { cast: CastResponse }) {
    return (<Link href={"/cast/" + cast.url} className={` hover:opacity-95 transition-all `}>
        <div className={"flex flex-col gap-2 border rounded-2xl overflow-hidden  "}>
            <div className={"aspect-w-2 aspect-h-1 w-full h-0"}>
                <Image
                    src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/cast/image/${cast.image}`}
                    alt={"cast"} fill/>
            </div>

        </div>
        <div className={"p-2 flex flex-col gap-2"}>
            <h2 className={"font-bold text-slate-800 dark:text-slate-400  text-sm  md:text-base "}>{cast.title}</h2>
            <div className=" ">
              <span className="text-slate-500 dark:text-slate-400 text-xs lg:text-sm line-clamp-2">
                  <div dangerouslySetInnerHTML={{
                      __html: cast.description
                  }}/>
              </span>
            </div>
            <Badge className={"w-fit"} name={"مشاهده بیشتر"} color={"blue"} />
        </div>
    </Link>)

}
