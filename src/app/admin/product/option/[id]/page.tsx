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
import ProductOptionForm from "@/app/admin/product/option/ProductOptionForm";

export default function Page() {
    const {id} = useParams();
    const queryClient = useQueryClient();
    const [searchQuery, setSearchQuery] = useState("");

    const {data: data, isLoading: isLoading} = useQuery({
        queryKey: [`option-info`, Number(id)],
        queryFn: () => findByProductId(Number(id)),
        staleTime: 5000,
    });

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
                    <div className={"flex flex-col gap-5"}>
                        {data?.map((option, index) => (
                            <ProductOptionForm productId={Number(id)} data={option} key={index}/>
                        ))}

                    </div>
                </>
            }
        </Panel>

    </>)
}
