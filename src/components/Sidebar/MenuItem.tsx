import {
    ChartBarSquareIcon,
    CubeIcon,
    InboxIcon,
    NewspaperIcon, PencilIcon,
} from "@heroicons/react/24/outline";
import {GiSevenPointedStar, GiTargetPoster} from "react-icons/gi";
import {VscLayoutMenubar} from "react-icons/vsc";
import {TbAlignBoxCenterTop, TbBrandApple, TbLanguage} from "react-icons/tb";
import {SiElectronbuilder, SiPagespeedinsights, SiWayland} from "react-icons/si";
import {
    FaBell,
    FaCcPaypal,
    FaCommentDots,
    FaFileVideo,
    FaHome,
    FaQuestionCircle,
    FaTruckMoving,
    FaUsers
} from "react-icons/fa";
import {MdCoffeeMaker, MdFolderSpecial, MdOutlineDashboardCustomize, MdOutlineWaterfallChart} from "react-icons/md";
import {TfiLayoutSlider} from "react-icons/tfi";
import {FaMessage} from "react-icons/fa6";
import {PiShippingContainerDuotone} from "react-icons/pi";
import {ImCoinDollar, ImImages} from "react-icons/im";
import {IoMdSettings} from "react-icons/io";
import {RiDiscountPercentFill} from "react-icons/ri";

import type {JSX} from "react";

export interface MENU_ITEM_INTERFACE {
    title: string,
    url: string,
    icon: JSX.Element;
    sub?: MENU_ITEM_INTERFACE[]
}

export const MENU_ITEM: MENU_ITEM_INTERFACE[] = [
    {
        title: "داشبورد",
        url: "/dashboard",
        icon: <MdOutlineDashboardCustomize className="h-6 w-6 text-gray-500"/>,
    },
    {
        title: "محصولات",
        url: "/product",
        icon: <CubeIcon className="h-6 w-6 text-gray-500"/>,
        sub: [
            {
                title: "مدیریت محصولات",
                url: "/product",
                icon: <ChartBarSquareIcon className="h-6 w-6 text-gray-500"/>,

            },
            {
                title: "مدیریت محصولات تخفیفی",
                url: "/product/discounted",
                icon: <ChartBarSquareIcon className="h-6 w-6 text-gray-500"/>,

            },{
                title: "مدیریت محصولات محدود شده",
                url: "/product/limited",
                icon: <ChartBarSquareIcon className="h-6 w-6 text-gray-500"/>,

            },
            {
                title: "افزودن محصول",
                url: "/product/create",
                icon: <PencilIcon className="h-6 w-6 text-gray-500"/>,

            }
        ]
    },
    {
        title: "دسته بندی ها",
        url: "/",
        icon: <InboxIcon className="h-6 w-6 text-gray-500"/>,
        sub: [
            {
                title: "مدیریت دسته بندی ها",
                url: "/category",
                icon: <ChartBarSquareIcon className="h-6 w-6 text-gray-500"/>,

            },
            {
                title: "افزودن دسته بندی",
                url: "/category/create",
                icon: <PencilIcon className="h-6 w-6 text-gray-500"/>,

            }
        ]
    },
    {
        title: "سفارشات",
        url: "/order",
        icon: <PiShippingContainerDuotone className="h-6 w-6 text-gray-500"/>,
    },
    {
        title: "سفارشات معلق",
        url: "/onHoldOrder",
        icon: <PiShippingContainerDuotone className="h-6 w-6 text-gray-500"/>,
    },
    {
        title: "مدیریت تراکنش های کیف پول",
        url: "/wallet-transaction",
        icon: <ImCoinDollar className="h-6 w-6 text-gray-500"/>,
    },
    {
        title: "مدیریت تراکنش ها",
        url: "/transaction",
        icon: <ImCoinDollar className="h-6 w-6 text-gray-500"/>,
    },
    {
        title: "نمونه پروژه ها",
        url: "/sample",
        icon: <SiElectronbuilder className="h-6 w-6 text-gray-500"/>,
    },
    {
        title: "محصولات گروهی",
        url: "/group",
        icon: <CubeIcon className="h-6 w-6 text-gray-500"/>,
    },
    {
        title: "لندینگ ها",
        url: "/",
        icon: <SiWayland className="h-6 w-6 text-gray-500"/>,
        sub: [
            {
                title: "مدیریت لندینگ",
                url: "/landing",
                icon: <ChartBarSquareIcon className="h-6 w-6 text-gray-500"/>,

            },
            {
                title: "افزودن لندینگ ",
                url: "/landinf/create",
                icon: <PencilIcon className="h-6 w-6 text-gray-500"/>,

            }
        ]
    },
    {
        title: "برند ها",
        url: "/product",
        icon: <TbBrandApple className="h-6 w-6 text-gray-500"/>,
        sub: [
            {
                title: "مدیریت برند ها",
                url: "/brand",
                icon: <ChartBarSquareIcon className="h-6 w-6 text-gray-500"/>,

            },
            {
                title: "افزودن برند",
                url: "/brand/create",
                icon: <PencilIcon className="h-6 w-6 text-gray-500"/>,

            }
        ]
    },
    {
        title: "بنر ها",
        url: "/",
        icon: <ImImages className="h-6 w-6 text-gray-500"/>,
        sub: [
            {
                title: "مدیریت بنر ها",
                url: "/banner",
                icon: <ChartBarSquareIcon className="h-6 w-6 text-gray-500"/>,

            },
            {
                title: "افزودن بنر",
                url: "/banner/create",
                icon: <PencilIcon className="h-6 w-6 text-gray-500"/>,

            }
        ]
    }, {
        title: "ولاگ ها",
        url: "/",
        icon: <FaFileVideo className="h-6 w-6 text-gray-500"/>,
        sub: [
            {
                title: "مدیریت ولاگ ها",
                url: "/vlog",
                icon: <ChartBarSquareIcon className="h-6 w-6 text-gray-500"/>,

            },
            {
                title: "افزودن ولاگ",
                url: "/vlog/create",
                icon: <PencilIcon className="h-6 w-6 text-gray-500"/>,

            }
        ]
    }, {
        title: "دسته بندی ولاگ",
        url: "/",
        icon: <FaFileVideo className="h-6 w-6 text-gray-500"/>,
        sub: [
            {
                title: "مدیریت دسته بندی ولاگ ها",
                url: "/vlog_category",
                icon: <ChartBarSquareIcon className="h-6 w-6 text-gray-500"/>,

            },
            {
                title: "افزودن دسته بندی ولاگ",
                url: "/vlog_category/create",
                icon: <PencilIcon className="h-6 w-6 text-gray-500"/>,

            }
        ]
    }, {
        title: "بلاگ ها",
        url: "/",
        icon: <NewspaperIcon className="h-6 w-6 text-gray-500"/>,
        sub: [
            {
                title: "مدیریت بلاگ ها",
                url: "/news",
                icon: <ChartBarSquareIcon className="h-6 w-6 text-gray-500"/>,

            },
            {
                title: "افزودن بلاگ",
                url: "/news/create",
                icon: <PencilIcon className="h-6 w-6 text-gray-500"/>,

            }
        ]
    },
    {
        title: "دسته بندی بلاگ",
        url: "/",
        icon: <FaFileVideo className="h-6 w-6 text-gray-500"/>,
        sub: [
            {
                title: "مدیریت دسته بندی بلاگ ها",
                url: "/blog_category",
                icon: <ChartBarSquareIcon className="h-6 w-6 text-gray-500"/>,

            },
            {
                title: "افزودن دسته بندی بلاگ",
                url: "/blog_category/create",
                icon: <PencilIcon className="h-6 w-6 text-gray-500"/>,

            }
        ]
    },
    {
        title: "گارانتی",
        url: "/guaranty",
        icon: <GiSevenPointedStar className="h-6 w-6 text-gray-500"/>,
        sub: [
            {
                title: "مدیریت گارانتی ها",
                url: "/guaranty",
                icon: <ChartBarSquareIcon className="h-6 w-6 text-gray-500"/>,

            },
            {
                title: "افزودن گارانتی",
                url: "/guaranty/create",
                icon: <PencilIcon className="h-6 w-6 text-gray-500"/>,

            }
        ]
    },
    {
        title: "منو ها",
        url: "/",
        icon: <VscLayoutMenubar className="h-6 w-6 text-gray-500"/>,
        sub: [
            {
                title: "مدیریت منو ها",
                url: "/menu",
                icon: <ChartBarSquareIcon className="h-6 w-6 text-gray-500"/>,

            },
            {
                title: "افزودن منو",
                url: "/menu/create",
                icon: <PencilIcon className="h-6 w-6 text-gray-500"/>,

            }
        ]
    }, {
        title: "دیکشنری",
        url: "/",
        icon: <TbLanguage className="h-6 w-6 text-gray-500"/>,
        sub: [
            {
                title: "مدیریت دیکشنری",
                url: "/dictionary",
                icon: <ChartBarSquareIcon className="h-6 w-6 text-gray-500"/>,

            },
            {
                title: "افزودن دیکشنری",
                url: "/dictionary/create",
                icon: <PencilIcon className="h-6 w-6 text-gray-500"/>,

            }
        ]
    },
    {
        title: "صفحات",
        url: "/",
        icon: <SiPagespeedinsights className="h-6 w-6 text-gray-500"/>,
        sub: [
            {
                title: "مدیریت صفحات",
                url: "/page",
                icon: <ChartBarSquareIcon className="h-6 w-6 text-gray-500"/>,

            },
            {
                title: "افزودن صفحه جدید",
                url: "/page/create",
                icon: <PencilIcon className="h-6 w-6 text-gray-500"/>,

            }
        ]
    },
    {
        title: "پرسش های متداول",
        url: "/",
        icon: <FaQuestionCircle className="h-6 w-6 text-gray-500"/>,
        sub: [
            {
                title: "مدیریت پرسش های متداول",
                url: "/faq",
                icon: <ChartBarSquareIcon className="h-6 w-6 text-gray-500"/>,

            },
            {
                title: "افزودن پرسش های متداول",
                url: "/faq/create",
                icon: <PencilIcon className="h-6 w-6 text-gray-500"/>,

            }
        ]
    },
    {
        title: "concept",
        url: "/",
        icon: <MdCoffeeMaker className="h-6 w-6 text-gray-500"/>,
        sub: [
            {
                title: "مدیریت concept",
                url: "/concept",
                icon: <ChartBarSquareIcon className="h-6 w-6 text-gray-500"/>,

            },
            {
                title: "افزودن concept",
                url: "/concept/create",
                icon: <PencilIcon className="h-6 w-6 text-gray-500"/>,

            }
        ]
    },
    {
        title: "اسلابدر",
        url: "/slider",
        icon: <TfiLayoutSlider className="h-6 w-6 text-gray-500"/>,
        sub: [
            {
                title: "مدیریت اسلابدر",
                url: "/slider",
                icon: <ChartBarSquareIcon className="h-6 w-6 text-gray-500"/>,

            },
            {
                title: "افزودن اسلابدر",
                url: "/slider/create",
                icon: <PencilIcon className="h-6 w-6 text-gray-500"/>,

            }
        ]
    },
    {
        title: "مدیریت کاربران",
        url: "/user",
        icon: <FaUsers className="h-6 w-6 text-gray-500"/>,

    },
    {
        title: "مدیریت ادمین ها",
        url: "/admin",
        icon: <FaUsers className="h-6 w-6 text-gray-500"/>,

    }, {
        title: "مدیریت پیام ها",
        url: "/contact",
        icon: <FaMessage className="h-6 w-6 text-gray-500"/>,

    },
    // {
    //     title: "مدیریت مرجوعی ها",
    //     url: "/returned",
    //     icon: <ShoppingBagIcon className="h-6 w-6 text-gray-500" />,
    //  },

    {
        title: "اعلان ها",
        url: "/notification",
        icon: <FaBell className="h-6 w-6 text-gray-500"/>,
    },
    {
        title: "مدیریت کامنت ها",
        url: "/comment",
        icon: <FaCommentDots className="h-6 w-6 text-gray-500"/>,
    },
    {
        title: "صفحه اصلی",
        url: "/",
        icon: <FaHome className="h-6 w-6 text-gray-500"/>,
        sub: [
            {
                title: "مدیریت پوستر ها",
                url: "/poster",
                icon: <GiTargetPoster className="h-6 w-6 text-gray-500"/>,
            },
            {
                title: "مدیریت برند های تجهیز شده",
                url: "/trusted-brand",
                icon: <TbBrandApple className="h-6 w-6 text-gray-500"/>,
            },
            {
                title: "تجهیزات خاص",
                url: "/special_product",
                icon: <MdFolderSpecial className="h-6 w-6 text-gray-500"/>,
            },
            {
                title: "محصولات محصولات پر تخفیف",
                url: "/popular_product",
                icon: <RiDiscountPercentFill className="h-6 w-6 text-gray-500"/>,
            },
            {
                title: "ولاگ های صفحه اصلی",
                url: "/homepage_vlog",
                icon: <FaFileVideo className="h-6 w-6 text-gray-500"/>,

            },
            {
                title: "دسته بندی های پرطرفدار",
                url: "/homepage_category",
                icon: <MdOutlineWaterfallChart className="h-6 w-6 text-gray-500"/>,
            },
        ]

    },
    {
        title: "تنظیمات",
        url: "/",
        icon: <IoMdSettings className="h-6 w-6 text-gray-500"/>,
        sub: [
            {
                title: "درگاه پرداخت",
                url: "/gateway",
                icon: <FaCcPaypal className="h-6 w-6 text-gray-500"/>,

            },
            {
                title: "روش ارسال ",
                url: "/delivery",
                icon: <FaTruckMoving className="h-6 w-6 text-gray-500"/>,

            }
        ]

    },

];
