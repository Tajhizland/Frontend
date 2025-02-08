"use client"
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import FormComponent from "@/components/Form/Product/ColorForm";
import Label from "@/components/Label/Label";
import ProductTab from "@/components/Tabs/ProductTab";
import {findById, set} from "@/services/api/admin/filter";
import ButtonCircle from "@/shared/Button/ButtonCircle";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Input from "@/shared/Input/Input";
import Spinner from "@/shared/Loading/Spinner";
import Panel from "@/shared/Panel/Panel";
import Select from "@/shared/Select/Select";
import {useParams} from "next/navigation";
import {useState} from "react";
import {toast} from "react-hot-toast";
import {useQuery, useQueryClient} from "react-query";
import {findById as productFindById} from "@/services/api/admin/product";

export default function Page() {
    const {id} = useParams();
    const queryClient = useQueryClient();

    const {data: data, isLoading: isLoading} = useQuery({
        queryKey: [`filter-info`],
        queryFn: () => findById(Number(id)),
        staleTime: 5000,
    });
    const { data: productInfo } = useQuery({
        queryKey: [`product-info`],
        queryFn: () => productFindById(Number(id)),
        staleTime: 5000,
    });

    async function submit(e: FormData) {
        let size = data?.length;
        let filters: {
            id: string,
            item_id: string,

        }[] = [];
        data?.map((filter) => {
            filters.push({
                id: e.get(`filter[${filter.id}][id]`) as string,
                item_id: e.get(`filter[${filter.id}][item_id]`) as string,
            })
        })

        let response = await set({
            product_id: Number(id),
            filter: filters
        })
        if (response?.success) {
            queryClient.refetchQueries(['filter-info']);
            toast.success(response.message as string)
        }
    }

    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "محصولات",
                href: "product"
            },
            {
                title: "ویرایش محصول"+" ( "+productInfo?.name+" )",
                href: "product/edit/" + id
            },
            {
                title: "ویرایش فیلتر محصول",
                href: "product/filter/" + id
            }
        ]}/>
        <Panel>

            <ProductTab id={id + ""}/>
            {
                isLoading ? <Spinner/> : <>
                    <form action={submit}>
                        <div className={"grid grid-cols-1 md:grid-cols-2 gap-5"}>

                            {
                                data?.map((filter) => (<>
                                    <div>
                                        <Label>{filter.name}</Label>
                                        <Select name={`filter[${filter.id}][item_id]`}>
                                            <option value={""}>انتخاب کنید</option>

                                            {
                                                filter.items.data.map((item) => (<>
                                                    <option value={item.id}
                                                            selected={filter.productFilters != undefined && filter.productFilters.filter_item_id == item.id}>
                                                        {item.value}
                                                    </option>
                                                </>))
                                            }
                                        </Select>
                                    </div>
                                    <Input type={"hidden"} name={`filter[${filter.id}][id]`} value={filter.id}/>
                                </>))
                            }

                        </div>

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
