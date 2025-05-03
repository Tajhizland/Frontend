import {CategoryResponse} from "@/services/types/category";
import Image from "next/image";
import Link from "next/link";

export default function CategoryCircleCard2({category }: {
    category: CategoryResponse,
}) {
    return (<>
        <Link
            href={"/category/" +category.url}
            className={`flex flex-col gap-y-2 cursor-pointer p-4 rounded hover:bg-stone-100 items-center  `}>
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
                <span className={`whitespace-nowrap text-xs  lg:text-sm font-bold dark:text-white`}>
                    {category.name}
                </span>
            </div>
        </Link>
    </>)
}
