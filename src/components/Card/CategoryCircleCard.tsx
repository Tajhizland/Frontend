import {CategoryResponse} from "@/services/types/category";
import Image from "next/image";

export default function CategoryCircleCard({category, active, onClick}: {
    category: CategoryResponse,
    active?: boolean,
    onClick?: (id:number) => {}
}) {
    return (<>
        <div
            onClick={() => {
                onClick && onClick(category.id)
            }}
            className={`flex flex-col gap-y-2 cursor-pointer p-4 rounded hover:bg-stone-100 items-center ${active ? "bg-stone-100 dark:bg-black/20 " : ""}`}>
            <div className={"rounded-full border flex !w-[60px] !h-[60px] lg:!w-[100px] lg:!h-[100px] overflow-hidden whitespace-nowrap"}>
                <Image
                    width={100}
                    height={100}
                    src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/category/${category.image}`}
                    alt={category.name}
                    className="h-full w-full object-cover object-center"
                />
            </div>
            <div>
                <span className={`whitespace-nowrap text-xs  lg:text-sm font-bold  ${active ? "text-green-500" : "dark:text-white"}`}>
                    {category.name}
                </span>
            </div>
        </div>
    </>)
}
