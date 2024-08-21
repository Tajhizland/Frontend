import {BreadcrumbType} from "@/components/Breadcrumb/BreadcrumbType";
import Link from "next/link";

export default function Breadcrump({breadcrumb}: { breadcrumb: BreadcrumbType[] }) {
    return (<>
             <div
                className="p-3 my-1 mx-2 bg-white border-gray-200 border  rounded-lg ">
                <nav className="flex bg-white  rounded-lg" aria-label="Breadcrumb">
                    <ol className="inline-flex items-center space-x-1  ">
                        <li className="inline-flex items-center">
                            <Link href={"/admin/dashboard"}
                               className="inline-flex items-center text-sm font-bold text-gray-700 hover:text-orange-400 ">
                                <svg className="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                     fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
                                </svg>
                                داشبورد
                            </Link>
                        </li>
                        {
                            breadcrumb.map((item: BreadcrumbType) => (<>
                                <li>
                                    <div className="flex items-center">
                                        <svg className="rtl:rotate-180 block w-3 h-3 mx-1 text-gray-400 "
                                             aria-hidden="true"
                                             xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                                  stroke-width="2"
                                                  d="m1 9 4-4-4-4"/>
                                        </svg>
                                        <Link href={"/admin/"+item.href}
                                           className="ms-1 text-sm font-bold text-gray-700 hover:text-orange-400 md:ms-2  ">{item.title}</Link>
                                    </div>
                                </li>
                            </>))
                        }
                    </ol>
                </nav>
         </div>
    </>)
}
