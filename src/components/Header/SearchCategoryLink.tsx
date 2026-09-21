import Link from "next/link";
import {FiChevronLeft, FiSearch} from "react-icons/fi";
import {CategoryResponse} from "@/services/types/category";

type Props = {
    category: Pick<CategoryResponse, "name" | "url">;
    onClick?: () => void;
};

export default function SearchCategoryLink({category, onClick}: Props) {
    return (
        <Link
            href={"/category/" + category.url}
            onClick={onClick}
            className="flex min-h-10 w-full min-w-0 items-center gap-2 px-3 py-2 text-right text-xs leading-5 transition-colors hover:bg-stone-100 focus-visible:bg-stone-100 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-orange-400 dark:hover:bg-neutral-800 dark:focus-visible:bg-neutral-800 sm:px-5 sm:text-sm"
        >
            <FiSearch aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-neutral-400"/>
            <span className="min-w-0 flex-1 whitespace-normal break-words text-neutral-500 dark:text-neutral-400">
                جستجو در دسته‌بندی{" "}
                <span className="font-semibold text-neutral-800 dark:text-white">{category.name}</span>
            </span>
            <FiChevronLeft aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-neutral-400"/>
        </Link>
    );
}
