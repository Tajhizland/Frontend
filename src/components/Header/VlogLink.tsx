import Link from "next/link";
import {MdOutlineOndemandVideo} from "react-icons/md";

export default function VlogLink() {
    return (<>
        <Link
            title={"ولاگ تجهیزلند"}
            className={`  group w-10 h-10 sm:w-12 sm:h-12 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full lg:inline-flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 relative`}
            href={"/vlog"}>
            <MdOutlineOndemandVideo className={"w-6 h-6"}/>
        </Link>
    </>)
}
