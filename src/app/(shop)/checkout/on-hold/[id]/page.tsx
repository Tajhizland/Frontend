"use client";

import React, {useEffect, useMemo, useState} from "react";
import Image from "next/image";
import Link from "next/link";
import {useParams, useRouter} from "next/navigation";
import {useQuery} from "react-query";
import {BarLoader} from "react-spinners";
import {toast} from "react-hot-toast";
import {CheckIcon, ExclamationTriangleIcon, NoSymbolIcon} from "@heroicons/react/24/outline";
import {IoMdDownload} from "react-icons/io";

import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import ShippingAddress from "@/components/Checkout/ShippingAddress";
import ShippingMethod from "@/components/Checkout/ShippingMethod";
import ContactInfo from "@/components/Checkout/ContactInfo";
import Prices from "@/components/Price/Prices";
import Badge from "@/shared/Badge/Badge";
import Checkbox from "@/shared/Checkbox/Checkbox";
import Input from "@/shared/Input/Input";
import Label from "@/shared/Label/Label";
import MySwitch from "@/shared/Switch/MySwitch";
import Counter2 from "@/components/Counter/Counter2";
import {Alert} from "@/shared/Alert/Alert";
import {useUser} from "@/services/globalState/GlobalState";
import {isLoggedIn} from "@/services/cart/cartActions";
import {findActive} from "@/services/api/shop/address";
import {snappayEligible} from "@/services/api/shop/payment";
import {
    onHoldCheckCoupon,
    onHoldCheckout,
    onHoldCheckoutPayment,
    onHoldDelivery,
} from "@/services/api/shop/onHoldOrder";
import {OnHoldCheckoutItem} from "@/services/types/onHoldOrder";
import {CouponResponse} from "@/services/types/coupon";
import snappBoxLogo from "@/images/snappayLogo.svg";
import walletIcon from "@/images/walletIcon.png";
import digipayIcon from "@/images/digipayIcon.png";

// سقف مبلغی که درگاه بانکی اجازه‌ی پرداختش را می‌دهد (تومان)
const GATEWAY_LIMIT = 200000000;

const OnHoldCheckoutPage = () => {
    const router = useRouter();
    const params = useParams();
    const onHoldId = Number(params?.id);
    const [user] = useUser();

    const [acceptRule, setAcceptRule] = useState(false);
    const [useWallet, setUseWallet] = useState(false);
    const [coupon, setCoupon] = useState<CouponResponse>();
    const [code, setCode] = useState("");
    const [shippingMethod, setShippingMethod] = useState(0);
    const [gateway, setGateway] = useState(1);
    const [expired, setExpired] = useState(false);
    const [paying, setPaying] = useState(false);
    const [tabActive, setTabActive] = useState<
        "ContactInfo" | "ShippingAddress" | "ShippingMethod" | "PaymentMethod"
    >("ContactInfo");

    // کاربر مهمان باید ابتدا وارد شود و پس از ورود به همین صفحه برگردد
    const [authorized, setAuthorized] = useState<boolean | null>(null);
    useEffect(() => {
        const ok = isLoggedIn();
        if (!ok) {
            router.replace("/login?callbackUrl=" + encodeURIComponent(`/checkout/on-hold/${onHoldId}`));
        }
        setAuthorized(ok);
    }, []);

    const {data, isLoading} = useQuery({
        queryKey: ['on-hold-checkout', onHoldId],
        queryFn: () => onHoldCheckout(onHoldId),
        staleTime: 5000,
        enabled: authorized === true && !!onHoldId,
    });

    const {data: address} = useQuery({
        queryKey: ['address'],
        queryFn: () => findActive(),
        staleTime: 5000,
        enabled: authorized === true,
    });

    // روش‌های ارسال روی اقلام همین سفارش حساب می‌شوند، نه سبد خرید فعلی
    const {data: deliveries} = useQuery({
        queryKey: ['on-hold-shipping-methods', onHoldId],
        queryFn: () => onHoldDelivery(onHoldId),
        staleTime: 5000,
        enabled: authorized === true && !!onHoldId,
    });

    const items: OnHoldCheckoutItem[] = useMemo(() => data?.items ?? [], [data]);

    // اولین روش ارسالِ در دسترس به‌عنوان پیش‌فرض انتخاب می‌شود
    useEffect(() => {
        if (deliveries?.length && !shippingMethod) {
            setShippingMethod(deliveries[0].id);
        }
    }, [deliveries]);

    // هزینه‌ی ارسال همیشه از روی روش انتخاب‌شده خوانده می‌شود تا با رفرش لیست از مبلغ واقعی جدا نیفتد
    const shippingPrice = useMemo(
        () => deliveries?.find((item) => item.id === shippingMethod)?.price ?? 0,
        [deliveries, shippingMethod]
    );

    useEffect(() => {
        if (useWallet) {
            setGateway(1);
        }
    }, [useWallet]);

    useEffect(() => {
        // پرداخت قسطی/اعتباری با کیف پول ترکیب نمی‌شود
        if (gateway == 3 || gateway == 4) {
            setUseWallet(false);
        }
    }, [gateway]);

    const allowDigipay = useMemo(
        () => items.length > 0 && items.every((item) => item.product?.allow_digipay != 0),
        [items]
    );
    const allowSnappay = useMemo(
        () => items.length > 0 && items.every((item) => item.product?.allow_snappay != 0),
        [items]
    );

    // ---- محاسبه‌ی مبالغ؛ دقیقاً همان فرمولی که بک‌اند روی قیمت‌های فریزشده اجرا می‌کند ----

    const sumPrice = useMemo(
        () => items.reduce((sum, item) => sum + item.color.price * item.count, 0),
        [items]
    );
    const sumGuarantyPrice = useMemo(
        () => items.reduce((sum, item) => sum + (item.guaranty?.price ?? 0) * item.count, 0),
        [items]
    );
    // دیجی‌پی تخفیف محصول را اعمال نمی‌کند
    const sumDiscount = useMemo(
        () => (gateway == 3 ? 0 : items.reduce((sum, item) => sum + item.color.discount * item.count, 0)),
        [items, gateway]
    );
    // کارمزد پرداخت قسطی: درصدِ هر محصول روی مبلغ همان قلم، بدون تخفیف
    const sumExtraPrice = useMemo(() => {
        let base = 0;
        let withFee = 0;
        items.forEach((item) => {
            const itemPrice = (item.color.price + (item.guaranty?.price ?? 0)) * item.count;
            base += itemPrice;
            withFee += Math.round(itemPrice + (itemPrice * (item.product.digipay_extra_price || 0)) / 100);
        });
        return withFee - base;
    }, [items]);

    const sumDiscountedPrice = sumPrice - sumDiscount + sumGuarantyPrice + shippingPrice;
    // مبلغی که کد تخفیف روی آن اعمال می‌شود (برای دیجی‌پی شامل کارمزد هم هست)
    const couponBase = gateway == 3 ? sumDiscountedPrice + sumExtraPrice : sumDiscountedPrice;
    const couponDiscount = useMemo(() => {
        if (!coupon) return 0;
        if (coupon.price > 0) return coupon.price;
        if (coupon.percent > 0) return (coupon.percent / 100) * couponBase;
        return 0;
    }, [coupon, couponBase]);

    // مثل بک‌اند به عدد صحیح گرد می‌شود تا مبلغ نمایشی با مبلغ درگاه یکی باشد
    const totalPayable = Math.max(0, Math.round(couponBase - couponDiscount));
    const walletDeduction = useWallet ? Math.min(user?.wallet ?? 0, totalPayable) : 0;
    const gatewayPayable = Math.max(0, totalPayable - walletDeduction);
    const exceedsGatewayLimit = gatewayPayable > GATEWAY_LIMIT;

    const maxDeliveryDelay = useMemo(
        () => items.reduce((max, item) => Math.max(max, item.color.delivery_delay ?? 0), 0),
        [items]
    );
    const allow = useMemo(
        () => items.length > 0 && items.every((item) => item.color.status != 0 && item.hasStock),
        [items]
    );

    // اسنپ‌پی با کیف پول ترکیب نمی‌شود، پس مبلغ قبل از کسر کیف پول ملاک است
    const {data: snappay} = useQuery({
        queryKey: ['snappay-eligible', totalPayable],
        queryFn: () => snappayEligible({amount: totalPayable}),
        staleTime: 5000,
        enabled: authorized === true && allowSnappay && totalPayable > 0,
    });

    const remainingSeconds = data?.expire_date_time
        ? Math.floor((data.expire_date_time * 1000 - Date.now()) / 1000)
        : 0;

    async function checkCode() {
        const response = await onHoldCheckCoupon(onHoldId, code);
        if (response) {
            setCoupon(response);
        }
    }

    async function payment() {
        if (paying) return;
        setPaying(true);
        try {
            const response = await onHoldCheckoutPayment(onHoldId, {
                wallet: useWallet,
                shippingMethod: shippingMethod,
                code: coupon ? code : undefined,
                gateway: gateway,
            });
            if (!response) return;
            if (response.type == "payment") {
                window.location.href = response.path;
                return;
            }
            router.push("/thank_you_page");
        } catch (e) {
            toast.error("خطایی در پرداخت رخ داد");
        } finally {
            setPaying(false);
        }
    }

    const handleScrollToEl = (id: string) => {
        const element = document.getElementById(id);
        setTimeout(() => {
            element?.scrollIntoView({behavior: "smooth"});
        }, 80);
    };

    const renderStatusSoldout = () => (
        <div
            className="rounded-full flex items-center justify-center px-2.5 py-1.5 text-xs text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
            <NoSymbolIcon className="w-3.5 h-3.5"/>
            <span className="mr-1 leading-none">ناموجود</span>
        </div>
    );

    const renderStatusInstock = () => (
        <div
            className="rounded-full flex items-center justify-center px-2.5 py-1.5 text-xs text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
            <CheckIcon className="w-3.5 h-3.5"/>
            <span className="mr-1 leading-none">  موجود</span>
        </div>
    );

    const renderProduct = (item: OnHoldCheckoutItem, index: number) => {
        // با انتخاب دیجی‌پی تخفیف اعمال نمی‌شود
        const hasDiscount = gateway != 3 && item.color.discount > 0;
        return (
            <div key={index} className="relative flex py-7 first:pt-0 last:pb-0">
                <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
                    <Image
                        src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/product/${item.product.image}`}
                        fill
                        alt={item.product.name}
                        className="h-full w-full object-contain object-center"
                        sizes="150px"
                    />
                    <Link href={{pathname: "/product/" + item.product.url}} className="absolute inset-0"></Link>
                </div>

                <div className="mr-3 sm:ml-6 flex flex-1 flex-col">
                    <div className="flex justify-between gap-1 flex-col">
                        <div className="flex-[1.5]">
                            <h3 className="text-xs md:text-sm font-semibold">
                                <Link href={{pathname: "/product/" + item.product.url}}>{item.product.name}</Link>
                            </h3>
                            <div className="mt-1.5 sm:mt-2.5 flex text-sm text-slate-600 dark:text-slate-300">
                                <div className="flex items-center gap-x-1.5">
                                    <span>{item.color.title}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-x-1">
                            <span className="text-xs text-slate-500 dark:text-slate-400">
                                {item.guaranty?.name}
                            </span>
                            {(item.guaranty?.free == null || item.guaranty?.free)
                                ? <span className="text-xs text-slate-500 dark:text-slate-400">(رایگان)</span>
                                : <span className="text-xs text-slate-500 dark:text-slate-400">
                                    {(item.guaranty?.price ?? 0).toLocaleString()} تومان
                                </span>}
                        </div>

                        <div className="flex flex-1 sm:flex justify-end">
                            <div className="flex items-center gap-2">
                                {hasDiscount &&
                                    <del className="text-xs text-red-500">
                                        {item.color.price.toLocaleString()} تومان
                                    </del>
                                }
                                <Prices
                                    price={hasDiscount ? item.color.discountedPrice : item.color.price}
                                    className="mt-0.5"/>
                            </div>
                        </div>
                    </div>

                    <div className="flex mt-auto pt-4 items-center justify-between text-sm gap-1">
                        {/* اقلام سفارش معلق قفل‌اند و قابل تغییر نیستند */}
                        <span className="text-slate-600 dark:text-slate-300">تعداد: {item.count}</span>
                        {!item.hasStock ? renderStatusSoldout() : renderStatusInstock()}
                    </div>
                </div>
            </div>
        );
    };

    if (authorized !== true || isLoading) {
        return (
            <div className="nc-CheckoutPage dark:text-white dark:bg-slate-900">
                <div className="container flex items-center justify-center py-40">
                    <BarLoader color="#fcb415"/>
                </div>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="nc-CheckoutPage dark:text-white dark:bg-slate-900">
                <div className="container py-32 flex flex-col items-center gap-6">
                    <Alert type={"error"}>
                        این سفارش معلق قابل پرداخت نیست. ممکن است تایید نشده باشد یا مهلت پرداختش گذشته باشد.
                    </Alert>
                    <Link href={"/account-order-on-hold"}>
                        <ButtonPrimary>بازگشت به سفارش‌های معلق</ButtonPrimary>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="nc-CheckoutPage dark:text-white dark:bg-slate-900">
            <main className="container py-16 lg:pb-28 lg:pt-20">
                <div className="mb-16">
                    <h2 className="block text-2xl sm:text-3xl lg:text-4xl font-semibold">
                        پرداخت سفارش معلق
                    </h2>
                    <div className="block mt-3 sm:mt-5 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-400">
                        <Link href={"/"}>صفحه اصلی</Link>
                        <span className="text-xs mx-1 sm:mx-1.5">/</span>
                        <Link href={"/account-order-on-hold"}>سفارش‌های معلق</Link>
                        <span className="text-xs mx-1 sm:mx-1.5">/</span>
                        <span className="underline">پرداخت سفارش {data.order_id}</span>
                    </div>
                </div>

                <div className="mb-8">
                    <Alert type={"warning"}>
                        <div className="flex flex-wrap items-center gap-2">
                            <span>
                                اقلام این سفارش پس از تایید مدیریت قفل شده و قابل تغییر نیست؛ اما می‌توانید آدرس،
                                روش ارسال، کد تخفیف و روش پرداخت را انتخاب کنید.
                            </span>
                            {remainingSeconds > 0 && !expired &&
                                <span className="flex items-center gap-1 font-semibold">
                                    مهلت پرداخت:
                                    <Counter2 initialSeconds={remainingSeconds} end={() => setExpired(true)}/>
                                </span>}
                        </div>
                    </Alert>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-start">
                    {/* ستون راست: آدرس، محصولات و توضیحات */}
                    <div className="space-y-8">
                        <div id="ShippingAddress" className="scroll-mt-24">
                            <ShippingAddress
                                isActive={tabActive === "ShippingAddress"}
                                onOpenActive={() => {
                                    setTabActive("ShippingAddress");
                                    handleScrollToEl("ShippingAddress");
                                }}
                                onCloseActive={() => {
                                    setTabActive("ShippingMethod");
                                    handleScrollToEl("ShippingMethod");
                                }}
                            />
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold">مشخصات سفارش</h3>
                            <div className="mt-8 divide-y divide-slate-200/70 dark:divide-slate-700">
                                {items.map(renderProduct)}
                            </div>
                        </div>

                        {address &&
                            <div className={"border rounded-2xl flex flex-col w-full gap-5 p-5 bg-slate-100 dark:bg-black/20"}>
                                <p className={"text-xs sm:text-sm text-slate-800 dark:text-white"}>
                                    سفارش شما پس از پرداخت در بازه زمانی {maxDeliveryDelay} روز کاری ، با توجه به
                                    شرایط ارسال اعلامی به ادرس {address?.province?.name} , {address?.city?.name} ,
                                    {" "}{address?.address} به کد پستی {address?.zip_code} ارسال خواد شد.
                                </p>
                            </div>}
                    </div>

                    {/* ستون چپ: روش ارسال، خلاصه و پرداخت */}
                    <div className="w-full">
                        <div className="space-y-8">
                            <ShippingMethod
                                fetcher={() => onHoldDelivery(onHoldId)}
                                queryKey={['on-hold-shipping-methods', onHoldId]}
                                setShippingMethod={setShippingMethod}
                                setShippingPrice={() => {
                                }}
                                shippingMethod={shippingMethod}
                                isActive={tabActive === "ShippingMethod"}
                                onOpenActive={() => {
                                    setTabActive("ShippingMethod");
                                    handleScrollToEl("ShippingMethod");
                                }}
                                onCloseActive={() => {
                                    setTabActive("ShippingAddress");
                                    handleScrollToEl("ShippingAddress");
                                }}
                            />

                            {user && (user.name == null || user.last_name == null || user.national_code == null) &&
                                <div id="ContactInfo" className="scroll-mt-24">
                                    <ContactInfo
                                        isActive={tabActive === "ContactInfo"}
                                        onOpenActive={() => {
                                            setTabActive("ContactInfo");
                                            handleScrollToEl("ContactInfo");
                                        }}
                                        onCloseActive={() => {
                                            setTabActive("PaymentMethod");
                                            handleScrollToEl("PaymentMethod");
                                        }}
                                    />
                                </div>}
                        </div>

                        <div className="mt-10 pt-6 text-sm text-slate-500 dark:text-slate-400 border-t border-slate-200/70 dark:border-slate-700">
                            <div className="mt-4 flex justify-end py-2.5">
                                {allow &&
                                    <Link href={"/checkout/prefactor"} className={"flex gap-2 items-center"}>
                                        <IoMdDownload/>
                                        <span>دریافت پیش فاکتور</span>
                                    </Link>}
                            </div>
                            <div className="mt-4 flex justify-between py-2.5">
                                <span>شماره سفارش</span>
                                <span className="font-semibold text-slate-900 dark:text-slate-200">{data.order_id}</span>
                            </div>
                            <div className="flex justify-between py-2.5">
                                <span>نام </span>
                                <span className="font-semibold text-slate-900 dark:text-slate-200">{user?.name}</span>
                            </div>
                            <div className="flex justify-between py-2.5">
                                <span>نام خانوادگی</span>
                                <span className="font-semibold text-slate-900 dark:text-slate-200">{user?.last_name}</span>
                            </div>
                            <div className="flex justify-between py-2.5">
                                <span>زمان آماده سازی</span>
                                <span className="font-semibold text-slate-900 dark:text-slate-200">{maxDeliveryDelay} روز</span>
                            </div>
                            <div className="flex justify-between py-2.5">
                                <span>محصولات</span>
                                <span className="font-semibold text-slate-900 dark:text-slate-200">
                                    {sumPrice.toLocaleString()} تومان
                                </span>
                            </div>
                            <div className="flex justify-between py-2.5">
                                <span> هزینه ارسال  </span>
                                <span className="font-semibold text-slate-900 dark:text-slate-200">
                                    {shippingPrice == 0 ? "(هزینه ارسال با مشتری)" : shippingPrice.toLocaleString() + " تومان "}
                                </span>
                            </div>
                            <div className="flex justify-between py-2.5">
                                <span> تخفیف  </span>
                                <span className="font-semibold text-slate-900 dark:text-slate-200">
                                    {sumDiscount.toLocaleString()} تومان
                                </span>
                            </div>
                            <div className="flex justify-between py-4">
                                <span>مجموع قیمت گارانتی</span>
                                <span className="font-semibold text-slate-900 dark:text-slate-200">
                                    {sumGuarantyPrice.toLocaleString()} تومان
                                </span>
                            </div>
                            {gateway == 3 &&
                                <div className="flex justify-between py-4">
                                    <span> هزینه پرداخت قسطی    </span>
                                    <span className="font-semibold text-slate-900 dark:text-slate-200">
                                        {sumExtraPrice.toLocaleString()} تومان
                                    </span>
                                </div>}
                            <div className="flex justify-between font-semibold text-slate-900 dark:text-slate-200 text-base pt-4">
                                <span> مجموع  </span>
                                <span>{couponBase.toLocaleString()} تومان</span>
                            </div>
                            <div className="flex justify-between font-semibold text-slate-900 dark:text-slate-200 text-base pt-4">
                                <div className={"flex items-center gap-1"}>
                                    موجودی کیف پول
                                    <Link className={"text-green-600 text-xs"} href={"/account-wallet"}>
                                        ( افزایش موجودی )
                                    </Link>
                                </div>
                                <span>{(user?.wallet ?? 0).toLocaleString()} تومان</span>
                            </div>
                            <hr className={"mt-4"}/>

                            <div className={"mt-4"}>
                                <Label className="text-sm">کد تخفیف</Label>
                                <div className="flex mt-1.5">
                                    <Input sizeClass="h-10 px-4 py-3" className="flex-1" value={code}
                                           onChange={(e) => setCode(e.target.value)}/>
                                    <button
                                        onClick={checkCode}
                                        className="text-neutral-700 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 rounded-2xl px-4 mr-3 font-medium text-sm bg-neutral-200/70 dark:bg-neutral-700 dark:hover:bg-neutral-800 w-24 flex justify-center items-center transition-colors">
                                        اعمال
                                    </button>
                                </div>
                                {(coupon && couponDiscount > 0) &&
                                    <div className={"mt-1.5"}>
                                        <Alert type={"success"}>
                                            کد تخفیف اعمال شد و مبلغ {couponDiscount.toLocaleString()} از سفارش شما کم شد
                                        </Alert>
                                    </div>}
                            </div>

                            <div className="flex justify-between font-semibold text-slate-900 dark:text-slate-200 text-base pt-8">
                                <div className={"flex items-center gap-2"}>
                                    <Image src={walletIcon} alt="کیف پول" className="w-8 h-8 object-contain"/>
                                    پرداخت با موجودی کیف پول
                                </div>
                                <span>
                                    <MySwitch
                                        label=" "
                                        desc=" "
                                        enabled={!useWallet}
                                        disabled={gateway == 3 || gateway == 4}
                                        onChange={() => setUseWallet(!useWallet)}
                                    />
                                </span>
                            </div>
                            {gateway == 3 &&
                                <div className="mt-3">
                                    <Alert type={"warning"}>
                                        در صورت انتخاب پرداخت با دیجی پی، امکان استفاده از موجودی کیف پول وجود ندارد
                                    </Alert>
                                </div>}
                            {gateway == 4 &&
                                <div className="mt-3">
                                    <Alert type={"warning"}>
                                        در صورت انتخاب پرداخت با اسنپ پی، امکان استفاده از موجودی کیف پول وجود ندارد
                                    </Alert>
                                </div>}
                            {useWallet &&
                                <div>
                                    مبلغ {walletDeduction.toLocaleString()} تومان از سفارش شما کسر میگردد
                                </div>}
                            <div className="mt-1 font-semibold text-slate-900 dark:text-slate-200">
                                مبلغ قابل پرداخت : {gatewayPayable.toLocaleString()} تومان
                            </div>
                        </div>

                        {allowDigipay &&
                            <div className="flex justify-between font-semibold text-slate-900 dark:text-slate-200 text-base pt-8">
                                <div className={"flex items-center gap-2"}>
                                    <Image src={digipayIcon} alt="دیجی پی" className="w-8 h-8 object-contain"/>
                                    پرداخت با دیجی پی
                                </div>
                                <span>
                                    <MySwitch
                                        label=" "
                                        desc=" "
                                        enabled={gateway == 1 || gateway == 4}
                                        onChange={() => setGateway(gateway != 3 ? 3 : 1)}
                                    />
                                </span>
                            </div>}

                        {allowSnappay && snappay?.eligible && (
                            <div className="flex items-center justify-between gap-3 mt-8 p-4 rounded-2xl border border-[#5a2d82]/20 bg-[#f6f2fb] dark:bg-white/5">
                                <div className="flex items-center gap-3">
                                    <div className="relative w-14 h-14 flex-shrink-0">
                                        <Image src={snappBoxLogo} alt="اسنپ‌پی" fill className="object-contain"/>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <strong className="text-sm text-slate-900 dark:text-slate-100">
                                            {snappay.title_message}
                                        </strong>
                                        <span className="text-xs leading-5 text-slate-600 dark:text-slate-300">
                                            {snappay.description}
                                        </span>
                                    </div>
                                </div>
                                <span className="flex-shrink-0">
                                    <MySwitch
                                        label=" "
                                        desc=" "
                                        enabled={gateway == 1 || gateway == 3}
                                        onChange={() => setGateway(gateway != 4 ? 4 : 1)}
                                    />
                                </span>
                            </div>
                        )}

                        <ButtonPrimary
                            className="mt-8 w-full"
                            onClick={payment}
                            disabled={
                                !allow || !acceptRule || paying || expired || remainingSeconds <= 0 ||
                                !shippingMethod || couponBase <= 0 || exceedsGatewayLimit
                            }
                        >
                            پرداخت
                        </ButtonPrimary>

                        {exceedsGatewayLimit &&
                            <div className="mt-6 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-500/30 dark:bg-amber-500/10">
                                <ExclamationTriangleIcon className="mt-0.5 h-6 w-6 flex-shrink-0 text-amber-500"/>
                                <p className="text-xs leading-6 text-amber-800 dark:text-amber-200 sm:text-sm">
                                    برای سفارش‌های با مبلغ بیش از ۲۰۰ میلیون تومان، به دلیل محدودیت سقف درگاه بانکی،
                                    امکان پرداخت مستقیم از طریق بانک وجود ندارد. لطفاً کیف پول خود را در هر نوبت تا سقف
                                    ۲۰۰ میلیون تومان شارژ کنید و سپس پرداخت را با استفاده از موجودی کیف پول انجام دهید.
                                </p>
                            </div>}

                        <div className={"flex items-center gap-2 mt-5 justify-center"}>
                            <Checkbox name={"rule"} onChange={() => setAcceptRule(!acceptRule)}/>
                            <p>با <Link className={"text-[#fcb415] font-bold"} href={"/page/rule"}>قوانین</Link> سایت موافقم</p>
                        </div>
                        <div className={"flex justify-center mt-5"}>
                            {!acceptRule &&
                                <Badge color={"red"} name={" برای ثبت سفارش ابتدا باید با قوانین سایت موافقت کنید"}/>}
                        </div>
                        {!allow &&
                            <Alert containerClassName={"justify-center mt-4"} type={"error"}>
                                محصول غیرفعال یا ناموجود در این سفارش وجود دارد
                            </Alert>}
                        {(expired || remainingSeconds <= 0) &&
                            <Alert containerClassName={"justify-center mt-4"} type={"error"}>
                                مهلت پرداخت این سفارش به پایان رسیده است
                            </Alert>}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default OnHoldCheckoutPage;
