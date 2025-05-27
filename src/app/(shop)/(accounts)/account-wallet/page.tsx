"use client"
import {Fragment, useState} from "react";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {changeActiveAddress, getAllAddress} from "@/services/api/shop/address";
import {AddressResponse} from "@/services/types/address";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import {Switch} from "@headlessui/react";
import AddressForm from "@/components/Address/AddressForm";
import NcModal from "@/shared/NcModal/NcModal";
import Input from "@/shared/Input/Input";
import {Alert} from "@/shared/Alert/Alert";
import {useUser} from "@/services/globalState/GlobalState";
import Prices from "@/components/Price/Prices";
import {chargeRequest} from "@/services/api/shop/charge";

const AccountOrder = () => {
    const [user] = useUser();
    const queryClient = useQueryClient();
    const [price, setPrice] = useState(0);

    async function charge() {
        let response = await chargeRequest({amount: price});
        if(response)
        {
            window.location.href = response.path;
        }
    }

    return (
        <>
            <div className="space-y-10  dark:text-white">
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
                <hr/>
                <div className={"flex flex-col gap-8"}>
                    <h2 className={"text-xl font-bold"}>شارژ کیف پول </h2>
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
            </div>
        </>
    );
};

export default AccountOrder;
