import Link from "next/link"
import { usePathname } from "next/navigation"
import {FaFile, FaFilter, FaRegImage, FaSort} from "react-icons/fa"
import { IoIosColorPalette, IoMdOptions } from "react-icons/io"
import { SiBasicattentiontoken } from "react-icons/si"

export default function CategoryTab({id}:{id:string}) {
    const TABS = [
        {
            title: "دسته بندی",
            link: "/admin/category/edit/"+id,
            icon: <SiBasicattentiontoken className="w-5 h-5" />
        },
        {
            title: "فیلتر",
            link: "/admin/category/filter/"+id,
            icon: <FaFilter className="w-5 h-5" />
        },
        {
            title: "ویژگی",
            link: "/admin/category/option/"+id,
            icon: <IoMdOptions className="w-5 h-5" />
        },
        {
            title: "سورت",
            link: "/admin/category/sort/"+id,
            icon: <FaSort className="w-5 h-5" />
        },
    ]
    const pathname = usePathname();

    return (<>
        <div className="border-b border-gray-200 dark:border-gray-700">
            <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                {
                    TABS.map((item) => (<>
                        <li className="me-2">
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
