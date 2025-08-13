"use client"
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Form from "@/app/admin/product/Form";
import {findById, update} from "@/services/api/admin/product";
import {useState} from "react";
import {useParams} from "next/navigation";
import {useMutation, useQuery, useQueryClient} from "react-query";
import toast from "react-hot-toast";
import ProductTab from "@/components/Tabs/ProductTab";

export default function Page() {
    const [colorCount, setColorCount] = useState(1)
    const {id} = useParams();
    const queryClient = useQueryClient();

    const {data: data} = useQuery({
        queryKey: [`product-info`, Number(id)],
        queryFn: () => findById(Number(id)),
        staleTime: 5000,
    });


    const mutation = useMutation({
        mutationKey: [`update-product`, id],
        mutationFn: async (formData: any) => {
            return update({
                id: Number(id),
                ...formData,
            });
        },
        onSuccess: (data) => {
            toast.success(data?.message ?? "")
            queryClient.invalidateQueries([`product-info`, Number(id)]);
        },
    }); 
    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "محصولات",
                href: "product"
            },
            {
                title: "ویرایش محصول",
                href: "product/edit/" + id
            }
        ]}/>
        <Panel>
            <PageTitle>
                ویرایش محصول
            </PageTitle>
            <ProductTab id={id + ""} url={data?.url ?? ""}/>

            <div>
                <Form data={data} submit={mutation.mutateAsync} colorCount={colorCount} setColorCount={setColorCount}/>
            </div>
        </Panel>

    </>)
}
