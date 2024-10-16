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
                title: "افزودن محصول",
                url: "/product/create",
                icon: <PencilIcon className="h-6 w-6 text-gray-500" />,

            }
        ]
    },
    {
        title: "دسته بندی ها",
        url: "/",
        icon: <InboxIcon className="h-6 w-6 text-gray-500" />,
        sub: [
            {
                title: "مدیریت دسته بندی ها",
                url: "/category",
                icon: <ChartBarSquareIcon className="h-6 w-6 text-gray-500" />,

            },
            {
                title: "افزودن دسته بندی",
                url: "/category/create",
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
                url: "/brand",
                icon: <ChartBarSquareIcon className="h-6 w-6 text-gray-500" />,

            },
            {
                title: "افزودن برند",
                url: "/brand/create",
                icon: <PencilIcon className="h-6 w-6 text-gray-500" />,

            }
        ]
    },
    {
        title: "بلاگ ها",
        url: "/",
        icon: <NewspaperIcon className="h-6 w-6 text-gray-500" />,
        sub: [
            {
                title: "مدیریت بلاگ ها",
                url: "/news",
                icon: <ChartBarSquareIcon className="h-6 w-6 text-gray-500" />,

            },
            {
                title: "افزودن بلاگ",
                url: "/news/create",
                icon: <PencilIcon className="h-6 w-6 text-gray-500" />,

            }
        ]
    }, {
        title: "منو ها",
        url: "/",
        icon: <NewspaperIcon className="h-6 w-6 text-gray-500" />,
        sub: [
            {
                title: "مدیریت منو ها",
                url: "/menu",
                icon: <ChartBarSquareIcon className="h-6 w-6 text-gray-500" />,

            },
            {
                title: "افزودن منو",
                url: "/menu/create",
                icon: <PencilIcon className="h-6 w-6 text-gray-500" />,

            }
        ]
    },
    {
        title: "صفحات",
        url: "/",
        icon: <NewspaperIcon className="h-6 w-6 text-gray-500" />,
        sub: [
            {
                title: "مدیریت صفحات",
                url: "/page",
                icon: <ChartBarSquareIcon className="h-6 w-6 text-gray-500" />,

            },
            {
                title: "افزودن صفحه جدید",
                url: "/page/create",
                icon: <PencilIcon className="h-6 w-6 text-gray-500" />,

            }
        ]
    },
    {
        title: "پرسش های متداول",
        url: "/",
        icon: <NewspaperIcon className="h-6 w-6 text-gray-500" />,
        sub: [
            {
                title: "مدیریت پرسش های متداول",
                url: "/faq",
                icon: <ChartBarSquareIcon className="h-6 w-6 text-gray-500" />,

            },
            {
                title: "افزودن پرسش های متداول",
                url: "/faq/create",
                icon: <PencilIcon className="h-6 w-6 text-gray-500" />,

            }
        ]
    },
    {
        title: "concept",
        url: "/",
        icon: <NewspaperIcon className="h-6 w-6 text-gray-500" />,
        sub: [
            {
                title: "مدیریت concept",
                url: "/concept",
                icon: <ChartBarSquareIcon className="h-6 w-6 text-gray-500" />,

            },
            {
                title: "افزودن concept",
                url: "/concept/create",
                icon: <PencilIcon className="h-6 w-6 text-gray-500" />,

            }
        ]
    },
    {
        title: "اسلابدر",
        url: "/slider",
        icon: <ChartBarSquareIcon className="h-6 w-6 text-gray-500" />,
        sub: [
            {
                title: "مدیریت اسلابدر",
                url: "/slider",
                icon: <ChartBarSquareIcon className="h-6 w-6 text-gray-500" />,

            },
            {
                title: "افزودن اسلابدر",
                url: "/slider/create",
                icon: <PencilIcon className="h-6 w-6 text-gray-500" />,

            }
        ]
    },
    {
        title: "مدیریت کاربران",
        url: "/user",
        icon: <NewspaperIcon className="h-6 w-6 text-gray-500" />,

    },{
        title: "مدیریت پیام ها",
        url: "/contact",
        icon: <NewspaperIcon className="h-6 w-6 text-gray-500" />,

    },
    {
        title: "سفارشات",
        url: "/order",
        icon: <ShoppingBagIcon className="h-6 w-6 text-gray-500" />,
     },
    {
        title: "مدیریت مرجوعی ها",
        url: "/returned",
        icon: <ShoppingBagIcon className="h-6 w-6 text-gray-500" />,
     },
    {
        title: "مدیریت تراکنش ها",
        url: "/transaction",
        icon: <ShoppingBagIcon className="h-6 w-6 text-gray-500" />,
     },
    {
        title: "اعلان ها",
        url: "/notification",
        icon: <ShoppingBagIcon className="h-6 w-6 text-gray-500" />,
     },
    {
        title: "مدیریت کامنت ها",
        url: "/comment",
        icon: <ShoppingBagIcon className="h-6 w-6 text-gray-500" />,
     },
    {
        title: "صفحه اصلی",
        url: "/",
        icon: <ShoppingBagIcon className="h-6 w-6 text-gray-500" />,
        sub: [


            {
                title: "محصولات ویژه",
                url: "/special_product",
                icon: <ChartBarSquareIcon className="h-6 w-6 text-gray-500" />,
             },
            {
                title: "محصولات تخفیف دار",
                url: "/popular_product",
                icon: <ChartBarSquareIcon className="h-6 w-6 text-gray-500" />,
             },
            {
                title: "دسته بندی های محبوب",
                url: "/popular_category",
                icon: <ChartBarSquareIcon className="h-6 w-6 text-gray-500" />,
             },
            {
                title: "دسته بندی های جدید",
                url: "/homepage_category",
                icon: <ChartBarSquareIcon className="h-6 w-6 text-gray-500" />,
             },
        ]

    },
    {
        title: "تنظیمات",
        url: "/",
        icon: <ShoppingBagIcon className="h-6 w-6 text-gray-500" />,
        sub: [
            {
                title: "درگاه پرداخت",
                url: "/gateway",
                icon: <ChartBarSquareIcon className="h-6 w-6 text-gray-500" />,

            },
            {
                title: "روش ارسال ",
                url: "/delivery",
                icon: <PencilIcon className="h-6 w-6 text-gray-500" />,

            }
        ]

    },

];
