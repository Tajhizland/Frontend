"use client"
import React, {useState} from "react";
import {useQueryClient} from "react-query";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Input from "@/shared/Input/Input";
import {Alert} from "@/shared/Alert/Alert";
import {useUser} from "@/services/globalState/GlobalState";
import Prices from "@/components/Price/Prices";
import {chargeRequest} from "@/services/api/shop/charge";
import walletIcon from "@/images/wallet.png"
import Image from "next/image";
import toman from "@/images/toman.svg";

const AccountOrder = () => {
    const [user] = useUser();
    const queryClient = useQueryClient();
    const [price, setPrice] = useState(0);

    async function charge() {
        let response = await chargeRequest({amount: price});
        if (response) {
            window.location.href = response.path;
        }
    }

    return (
        <>
            <div className="space-y-10  dark:text-white">

                <div className={"flex flex-col gap-8"}>
                    <div className={"flex flex-col-reverse sm:flex-row items-center gap-2"}>
                        <div className={"flex-[3] flex flex-col gap-8"}>
                            <div>
                                <Alert type={"success"}>
                                    <div className={"flex items-center justify-between w-full"}>
                        <span>
                        اعتبار کیف پول
                            </span>
                                        <Prices price={user?.wallet ?? 0}/>

                                    </div>
                                </Alert>
                            </div>
                            <h2 className={"text-xl font-bold"}>شارژ کیف پول </h2>
                            <div className={"flex flex-wrap gap-2 items-center justify-between"}>
                                <div className={"cursor-pointer"}
                                     onClick={() => {
                                         setPrice(200000000)
                                     }}
                                >
                                    <Alert type={"success"}>
                                           <span
                                               className={`text-green-500 !leading-none text-xs sm:text-sm flex items-center gap-1 font-bold  priceFont`}>
                                               {new Intl.NumberFormat('en-US').format(200)}
                                               ملیون
                                                <Image src={toman} alt={"تومان"} width={20} height={20}
                                                       className={"w-4 h-4"}/>

                                           </span>
                                    </Alert>
                                </div>
                                <div className={"cursor-pointer"}
                                     onClick={() => {
                                         setPrice(100000000)
                                     }}
                                >

                                    <Alert type={"success"}>
                                           <span
                                               className={`text-green-500 !leading-none text-xs sm:text-sm flex items-center gap-1 font-bold  priceFont`}>
                                               {new Intl.NumberFormat('en-US').format(100)}
                                               ملیون
                                                <Image src={toman} alt={"تومان"} width={20} height={20}
                                                       className={"w-4 h-4"}/>

                                           </span>
                                    </Alert>
                                </div>
                                <div className={"cursor-pointer"}
                                     onClick={() => {
                                         setPrice(50000000)
                                     }}
                                >

                                    <Alert type={"success"}>
                                           <span
                                               className={`text-green-500 !leading-none text-xs sm:text-sm flex items-center gap-1 font-bold  priceFont`}>
                                               {new Intl.NumberFormat('en-US').format(50)}
                                               ملیون
                                                <Image src={toman} alt={"تومان"} width={20} height={20}
                                                       className={"w-4 h-4"}/>

                                           </span>
                                    </Alert>
                                </div>
                            </div>
                            <div>
                                <label>
                                    مبلغ
                                </label>
                                <Input
                                    value={price ? price.toLocaleString('en-US') : ''} // فرمت کردن مقدار به صورت 1,234,567
                                    onChange={(e) => {
                                        // حذف کاما و تبدیل به عدد
                                        const rawValue = e.target.value.replace(/,/g, '');
                                        setPrice(Number(rawValue) || 0); // تبدیل به عدد یا 0 اگر معتبر نباشد
                                    }}
                                />
                            </div>
                            <ButtonPrimary disabled={price < 1000} onClick={charge}>
                                شارژ کیف پول
                            </ButtonPrimary>
                        </div>
                        <div className={"flex-[2]"}>
                            <Image src={walletIcon} alt={"walletIcon"}/>
                        </div>
                    </div>

                    <p className={"text-sm font-bold"}>
                        کاربر گرامی، به منظور رعایت قوانین بانک مرکزی جمهوری اسلامی ایران، سقف مجاز برای هر تراکنش بانکی
                        آنلاین، مبلغ 200 میلیون تومان می‌باشد. به همین دلیل برای خریدهای بالا 200 میلیون تومان شما
                        می‌توانید با استفاده از کارت‌های بانکی مختلف، کیف پول خود را به دفعات شارژ نمایید و سپس از
                        موجودی آن برای پرداخت‌های خود در تجهیزلند استفاده نمایید.
                    </p>
                </div>
            </div>
        </>
    );
};

export default AccountOrder;
