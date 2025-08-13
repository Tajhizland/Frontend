"use client"
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Label from "@/shared/Label/Label";
import ProductTab from "@/components/Tabs/ProductTab";
import {findByProductId, set} from "@/services/api/admin/option";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Input from "@/shared/Input/Input";
import Spinner from "@/shared/Loading/Spinner";
import Panel from "@/shared/Panel/Panel";
import {useParams} from "next/navigation";
import {useState} from "react";
import {toast} from "react-hot-toast";
import {useQuery, useQueryClient} from "react-query";
import {findById as productFindById} from "@/services/api/admin/product";

export default function Page() {
    const {id} = useParams();
    const queryClient = useQueryClient();
    const [searchQuery, setSearchQuery] = useState("");

    const {data: data, isLoading: isLoading} = useQuery({
        queryKey: [`option-info`, Number(id)],
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
            queryClient.refetchQueries(['option-info', Number(id)]);
            toast.success(response?.message as string);
        }
    }

    const {data: productInfo} = useQuery({
        queryKey: [`product-info`],
        queryFn: () => productFindById(Number(id)),
        staleTime: 5000,
    });

    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "محصولات",
                href: "product"
            },
            {
                title: "ویرایش محصول" + " ( " + productInfo?.name + " )",
                href: "product/edit/" + id
            },
            {
                title: "ویرایش آپشن محصول",
                href: "product/option/" + id
            }
        ]}/>
        <Panel>

            <ProductTab id={id + ""} url={productInfo?.url ?? ""}/>
            {
                isLoading ? <Spinner/> : <>
                    <div className="mb-5">
                        <Label>جستجو بر اساس عنوان ویژگی</Label>
                        <Input
                            type="text"
                            placeholder="جستجو..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <form action={submit}>
                        {data?.map((option) => (
                            <div key={option.title}>
                                <div className={"flex flex-col gap-y-5"}>
                                    <div>
                                        <Label>{option.title}</Label>
                                    </div>
                                    <div className={"grid grid-cols-1 md:grid-cols-2 gap-5"}>
                                        {option.optionItems?.data.map((item) => {
                                            // بررسی مطابقت با عبارت جستجو
                                            const isVisible = item.title
                                                .toLowerCase()
                                                .includes(searchQuery.toLowerCase());
                                            return (
                                                <div
                                                    key={item.id}
                                                    className={isVisible ? "" : "hidden"} // مخفی کردن با CSS
                                                >
                                                    <Label>{item.title}</Label>
                                                    <Input
                                                        type={"hidden"}
                                                        name={`option[${item.id}][item_id]`}
                                                        value={item.id}
                                                    />
                                                    <Input
                                                        name={`option[${item.id}][value]`}
                                                        defaultValue={item.productOption?.value}
                                                    />
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                                <hr className="my-5"/>
                            </div>
                        ))}
                        {data?.every((option) =>
                            option.optionItems?.data.every(
                                (item) =>
                                    !item.title.toLowerCase().includes(searchQuery.toLowerCase())
                            )
                        ) && (
                            <div className="text-center text-gray-500">
                                هیچ آپشنی با این عنوان یافت نشد.
                            </div>
                        )}
                        <div className={"flex justify-center my-5"}>
                            <ButtonPrimary type={"submit"}>ذخیره</ButtonPrimary>
                        </div>
                    </form>
                </>
            }
        </Panel>

    </>)
}
