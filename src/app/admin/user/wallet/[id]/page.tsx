"use client"
import {useMutation, useQuery, useQueryClient} from "react-query";
import {adminUpdateWallet, findById} from "@/services/api/admin/user";
import {useParams} from "next/navigation";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Panel from "@/shared/Panel/Panel";
import UserTab from "@/components/Tabs/UserTab";
import {Alert} from "@/shared/Alert/Alert";
import Prices from "@/components/Price/Prices";
import {useForm} from "react-hook-form";
import React, {useEffect} from "react";
import Label from "@/shared/Label/Label";
import Input from "@/shared/Input/Input";
import {toast} from "react-hot-toast";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";

const Page = () => {
    const queryClient = useQueryClient();
    const {id} = useParams();
    const updateWallet = useMutation({
        mutationKey: [`update-wallet`],
        mutationFn: async (formData: any) => {
            return adminUpdateWallet({
                ...formData,
            });
        },
        onSuccess: (response) => {
            if (!response)
                return;
            queryClient.invalidateQueries([`user-info`]);
            toast.success(response?.message as string);
        },
    });
    const {data: data} = useQuery({
        queryKey: [`user-info`],
        queryFn: () => findById(Number(id)),
        staleTime: 5000,
    });
    const {register, handleSubmit, control, formState: {errors}, setValue} = useForm({
        defaultValues: {
            wallet: "",
            user_id: "1",
        },
    });
    useEffect(() => {
        if (data) {
            setValue("user_id", data.id.toString());
            setValue("wallet", data.wallet.toString());
        }
    }, [data, setValue]);

    const onSubmit = async (formData: any) => {
        await updateWallet.mutateAsync(formData);
    };


    return (
        <>
            <Breadcrump breadcrumb={[
                {
                    title: "کاربران",
                    href: "user"
                },
                {
                    title: "ویرایش کاربر",
                    href: "user/update/" + id
                }
            ]}/>
            <Panel>
                <PageTitle>
                    کیف پول
                </PageTitle>
                <UserTab id={id + ""}/>
                <div className="space-y-10  dark:text-white">
                    <div>
                        <Alert type={"success"}>
                            <div className={"flex items-center justify-between w-full"}>
                        <span>
                        اعتبار کیف پول
                            </span>
                                <Prices price={data?.wallet ?? 0}/>
                            </div>
                        </Alert>
                    </div>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* ============ */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-3 ">
                        <div>
                            <Label className="text-sm  dark:text-white">موجودی کیف پول  </Label>
                            <Input className="mt-1.5"  {...register("wallet")}/>
                        </div>
                    </div>

                    <ButtonPrimary className={"mt-4"}>
                        ذخیره
                    </ButtonPrimary>
                </form>
            </Panel>
        </>
    );
};

export default Page;
