import {BreadcrumbType} from "@/components/Breadcrumb/BreadcrumbType";
import Link from "next/link";

export default function ShopBreadcrump({breadcrumb}: { breadcrumb: BreadcrumbType[] }) {
    return (<>
             <div
                className="p-3 bg-white ">
                <nav className="flex bg-white  rounded-lg flex-wrap" aria-label="Breadcrumb">
                    <ol className="inline-flex items-center space-x-1  flex-wrap ">
                        <li className="inline-flex items-center">
                            <Link href={"/"}
                               className="inline-flex items-center text-xs font-bold text-gray-700 hover:text-[#fcb415] ">
                                <svg className="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                     fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
                                </svg>
                                تجهیزلند
                            </Link>
                        </li>
                        {
                            breadcrumb.map((item: BreadcrumbType , index) => (<>
                                <li key={index}>
                                    <div className="flex items-center">
                                        <svg className="rtl:rotate-180 block w-3 h-3 mx-1 text-gray-400 "
                                             aria-hidden="true"
                                             xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                                  stroke-width="2"
                                                  d="m1 9 4-4-4-4"/>
                                        </svg>
                                        {
                                            index==breadcrumb.length-1?<div className="ms-1 text-xs font-bold text-gray-700 hover:text-[#fcb415] md:ms-2 cursor-pointer">
                                                    {item.title}
                                            </div>
                                                :
                                                <Link     href={{ pathname: "/admin/" + item.href }}
                                                          className="ms-1 text-xs font-bold text-gray-700 hover:text-[#fcb415] md:ms-2  ">{item.title}</Link>

                                        }
                                    </div>
                                </li>
                            </>))
                        }
                    </ol>
                </nav>
         </div>
    </>)
}
