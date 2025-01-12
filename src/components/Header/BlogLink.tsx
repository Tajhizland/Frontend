import Link from "next/link";
import { PiNewspaper } from "react-icons/pi"; 

export default function BlogLink({className}:{className?:string}) {
    return (<>
        <Link
            title={"بلاگ تجهیزلند"}
            className={`group p-3 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full lg:inline-flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 relative ${className}`}
            href={"/news"}>
            <PiNewspaper className={"w-6 h-6"}/>
        </Link>
    </>)
}
