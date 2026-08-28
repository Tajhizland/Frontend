"use client"
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import FormActions from "@/shared/Form/FormActions";
import Label from "@/shared/Label/Label";
import ProductTab from "@/components/Tabs/ProductTab";
import {findById, set} from "@/services/api/admin/filter";
import Input from "@/shared/Input/Input";
import Spinner from "@/shared/Loading/Spinner";
import Panel from "@/shared/Panel/Panel";
import Select from "@/shared/Select/Select";
import {useParams} from "next/navigation";
import {useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {useApiMutation} from "@/hooks/useApiMutation";
import {findById as productFindById} from "@/services/api/admin/product";

export default function Page() {
    const {id} = useParams();

    const {data: data, isLoading: isLoading} = useQuery({
        queryKey: [`filter-info`, Number(id)],
        queryFn: () => findById(Number(id)),
        staleTime: 5000,
    });
    const {data: productInfo} = useQuery({
        queryKey: [`product-info`, Number(id)],
        queryFn: () => productFindById(Number(id)),
        staleTime: 5000,
    });

    const saveMutation = useApiMutation(
        (form: FormData) =>
            set({
                product_id: Number(id),
                filter: (data ?? []).map((filter) => ({
                    id: form.get(`filter[${filter.id}][id]`) as string,
                    item_id: form.get(`filter[${filter.id}][item_id]`) as string,
                })),
            }),
        {invalidate: [["filter-info"]]}
    );

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
                title: "ویرایش فیلتر محصول",
                href: "product/filter/" + id
            }
        ]}/>
        <Panel>

            <ProductTab id={id + ""} url={productInfo?.url ?? ""}/>
            {
                isLoading ? <Spinner/> : <>
                    <form action={(form) => saveMutation.mutate(form)}>
                        <div className={"grid grid-cols-1 md:grid-cols-2 gap-5"}>

                            {
                                data?.map((filter) => (<>
                                    <div>
                                        <Label>{filter.name}</Label>
                                        <Select name={`filter[${filter.id}][item_id]`}>
                                            <option value={""}>انتخاب کنید</option>

                                            {
                                                filter.items.map((item) => (<>
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

                        <FormActions />
                    </form>
                </>
            }
        </Panel>

    </>)
}
