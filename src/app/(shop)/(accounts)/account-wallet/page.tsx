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

const AccountOrder = () => {
    const [user] = useUser();
    const queryClient = useQueryClient();

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
                        <Input/>
                    </div>
                    <ButtonPrimary disabled={true}>
                        شارژ کیف پول
                    </ButtonPrimary>
                </div>
            </div>
        </>
    );
};

export default AccountOrder;
