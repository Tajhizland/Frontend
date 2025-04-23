"use client";

import { Disclosure } from "@headlessui/react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { ReactNode } from "react";

interface AccordionItem {
    name: string;
    content: string | ReactNode;
}

interface Props {
    panelClassName?: string;
    data?: AccordionItem[];
}

export default function Accordion({
                                      panelClassName = "p-4 pt-3 last:pb-0 text-slate-600 text-sm leading-6",
                                      data = [],
                                  }: Props) {
    return (
        <div className="w-full rounded-2xl space-y-2.5">
            {data.map((item, index) => (
                <Disclosure key={index} defaultOpen={index > 1}>
                    {({ open }) => (
                        <div>
                            <Disclosure.Button
                                className="flex items-center justify-between w-full px-4 py-2 font-medium text-left bg-slate-100/80 hover:bg-slate-200/60  rounded-lg focus:outline-none focus-visible:ring focus-visible:ring-slate-500 focus-visible:ring-opacity-75 ">
                                <span>{item.name}</span>
                                {open ? (
                                    <FaMinus className="w-4 h-4 text-slate-600 " />
                                ) : (
                                    <FaPlus className="w-4 h-4 text-slate-600 " />
                                )}
                            </Disclosure.Button>
                            <Disclosure.Panel className={panelClassName} as="div">
                                { typeof item.content === "string" ? (
                                    <div dangerouslySetInnerHTML={{ __html: item.content }} />
                                ) : (
                                    item.content
                                )}
                            </Disclosure.Panel>
                        </div>
                    )}
                </Disclosure>
            ))}
        </div>
    );
}
