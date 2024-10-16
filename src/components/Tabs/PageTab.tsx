import Link from "next/link"
import { usePathname } from "next/navigation"
import { FaFile } from "react-icons/fa"
import { SiBasicattentiontoken } from "react-icons/si"

export default function PageTab({id}:{id:string}) {
    const TABS = [
        {
            title: "صفحه",
            link: "/admin/page/edit/"+id,
            icon: <SiBasicattentiontoken className="w-5 h-5" />
        },
        {
            title: "مدیریت فایل",
            link: "/admin/page/file/"+id,
            icon: <FaFile className="w-5 h-5" />
        }
    ]
    const pathname = usePathname();

    return (<>
        <div className="border-b border-gray-200 dark:border-gray-700">
            <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                {
                    TABS.map((item) => (<>
                        <li className={`me-2 `}>
                            <Link  href={{pathname:  item.link}} className={`inline-flex items-center justify-center p-4 border-b-2   rounded-t-lg hover:text-gray-600 hover:border-gray-300  group gap-x-2 ${pathname==item.link?"border-b-2 border-primary-500 hover:border-primary-500":""}`}>
                                {item.icon}
                                {item.title}
                            </Link>
                        </li>
                    </>))
                }

            </ul>
        </div>
    </>)
}
