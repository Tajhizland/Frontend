"use client"
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import FormComponent from "@/components/Form/Product/ColorForm";
import Label from "@/components/Label/Label";
import ProductTab from "@/components/Tabs/ProductTab";
import { findByProductId, set } from "@/services/api/admin/option";
import ButtonCircle from "@/shared/Button/ButtonCircle";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Input from "@/shared/Input/Input";
import Spinner from "@/shared/Loading/Spinner";
import Panel from "@/shared/Panel/Panel";
import Select from "@/shared/Select/Select";
import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";
import {useQuery, useQueryClient} from "react-query";

export default function Page() {
    const { id } = useParams();
    const queryClient = useQueryClient();

    const { data: data, isLoading: isLoading } = useQuery({
        queryKey: [`option-info`],
        queryFn: () => findByProductId(Number(id)),
        staleTime: 5000,
    });
    async function submit(e: FormData) {
         let options: {
            value: string,
            item_id: string,

        }[] = [];
        data?.map((option) => {
            option.optionItems?.data.map((item) => {

            options.push({
                item_id: e.get(`option[${item.id}][item_id]`) as string,
                value: e.get(`option[${item.id}][value]`) as string,
            })
        })
        })

        let response = await set({
            product_id: Number(id),
            option: options
        })
        if (response?.success) {
            queryClient.refetchQueries(['option-info']);
            toast.success(response?.message as string);
        }
     }
    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "محصولات",
                href: "product"
            },
            {
                title: "ویرایش محصول",
                href: "product/edit/" + id
            },
            {
                title: "ویرایش آپشن محصول",
                href: "product/option/" + id
            }
        ]} />
        <Panel>

            <ProductTab id={id + ""} />
            {
                isLoading ? <Spinner /> : <>
                    <form action={submit}>
                        {
                            data?.map((option) => (<>
                                <div className={"flex flex-col gap-y-5"}>
                                    <div>
                                        <Label>{option.title}</Label>
                                    </div>
                                    <div className={"grid grid-cols-1 md:grid-cols-2 gap-5"}>
                                        {
                                            option.optionItems?.data.map((item) => (<>
                                                <div>
                                                    <Label>
                                                        {item.title}
                                                    </Label>
                                                    <Input type={"hidden"} name={`option[${item.id}][item_id]`} value={item.id} />

                                                    <Input name={`option[${item.id}][value]`} defaultValue={item.productOption?.value} />
                                                </div>
                                            </>))
                                        }
                                    </div>
                                </div>
                                <hr className="my-5" />
                            </>))
                        }
                        <div className={"flex justify-center my-5"}>
                            <ButtonPrimary type={"submit"}>
                                ذخیره
                            </ButtonPrimary>
                        </div>
                    </form>
                </>
            }
        </Panel>

    </>)
}
