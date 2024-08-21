import {
    ArrowTrendingUpIcon, ChartBarSquareIcon,
    CreditCardIcon,
    CubeIcon,
    InboxIcon,
    NewspaperIcon, PencilIcon,
    ShoppingBagIcon
} from "@heroicons/react/24/outline";

export  interface MENU_ITEM_INTERFACE {
    title: string,
    url: string ,
    icon: JSX.Element;
    sub?: MENU_ITEM_INTERFACE[]
}

export const MENU_ITEM: MENU_ITEM_INTERFACE[] = [
    {
        title: "داشبورد",
        url: "/dashboard",
        icon: <ArrowTrendingUpIcon className="h-6 w-6 text-gray-500" />,
     },
    {
        title: "محصولات",
        url: "/product",
        icon: <CubeIcon className="h-6 w-6 text-gray-500"/>,
        sub: [
            {
                title: "مدیریت محصولات",
                url: "/product",
                icon: <ChartBarSquareIcon className="h-6 w-6 text-gray-500" />,

            },
            {
                title: "افزودن محصول جدید",
                url: "/product",
                icon: <PencilIcon className="h-6 w-6 text-gray-500" />,

            }
        ]
    },
    {
        title: "دسته بندی ها",
        url: "/product",
        icon: <InboxIcon className="h-6 w-6 text-gray-500" />,
        sub: [
            {
                title: "مدیریت ",
                url: "/product",
                icon: <ChartBarSquareIcon className="h-6 w-6 text-gray-500" />,

            },
            {
                title: "افزودن ",
                url: "/product",
                icon: <PencilIcon className="h-6 w-6 text-gray-500" />,

            }
        ]
    },
    {
        title: "برند ها",
        url: "/product",
        icon: <CreditCardIcon className="h-6 w-6 text-gray-500" />,
        sub: [
            {
                title: "مدیریت برند ها",
                url: "/product",
                icon: <ChartBarSquareIcon className="h-6 w-6 text-gray-500" />,

            },
            {
                title: "افزودن برند جدید",
                url: "/product",
                icon: <PencilIcon className="h-6 w-6 text-gray-500" />,

            }
        ]
    },
    {
        title: "بلاگ",
        url: "/product",
        icon: <NewspaperIcon className="h-6 w-6 text-gray-500" />,
        sub: [
            {
                title: "مدیریت بلاگ ها",
                url: "/product",
                icon: <ChartBarSquareIcon className="h-6 w-6 text-gray-500" />,

            },
            {
                title: "افزودن بلاگ جدید",
                url: "/product",
                icon: <PencilIcon className="h-6 w-6 text-gray-500" />,

            }
        ]
    },
    {
        title: "سفارشات",
        url: "/product",
        icon: <ShoppingBagIcon className="h-6 w-6 text-gray-500" />,
     },

];
