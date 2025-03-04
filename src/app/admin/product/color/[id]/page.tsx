"use client"
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import FormComponent from "@/components/Form/Product/ColorForm";
import ProductTab from "@/components/Tabs/ProductTab";
import { findById, set } from "@/services/api/admin/color";
import ButtonCircle from "@/shared/Button/ButtonCircle";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Spinner from "@/shared/Loading/Spinner";
import Panel from "@/shared/Panel/Panel";
import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useQuery, useQueryClient } from "react-query";
import { findById as productFindById  } from "@/services/api/admin/product";

export default function Page() {
    const [extraColor, setExtraColor] = useState(0);
    const { id } = useParams();
    const queryClient = useQueryClient();

    const { data: data, isLoading: isLoading } = useQuery({
        queryKey: [`color-info`],
        queryFn: () => findById(Number(id)),
        staleTime: 5000,
    });

    const { data: productInfo } = useQuery({
        queryKey: [`product-info`],
        queryFn: () => productFindById(Number(id)),
        staleTime: 5000,
    });


    function handleAddForm() {
        setExtraColor(extraColor + 1);
    }
    function sumColorSize() {
        let sum = (data?.length != undefined ? data.length : 0) + extraColor
        return sum;
    }
    async function submit(e: FormData) {
        const colors = [];
        for (let i = 0; i < (sumColorSize()); i++) {
            const colorData = {
                id: e.get(`color[${i}][id]`) as string,
                name: e.get(`color[${i}][name]`) as string,
                code: e.get(`color[${i}][code]`) as string,
                delivery_delay: e.get(`color[${i}][delivery_delay]`) as string,
                status: e.get(`color[${i}][status]`) as string,
                price: e.get(`color[${i}][price]`) as string,
                discount: e.get(`color[${i}][discount]`) as string,
                stock: e.get(`color[${i}][stock]`) as string,
                discount_expire_time: e.get(`color[${i}][discount_expire_time]`) as string,
            };
            colors.push(colorData);
        }
       let response = await set({
            product_id: Number(id),
            color: colors
        })
        if(response && response?.success) {
            toast.success(response.message as string)
            setExtraColor(0);
            queryClient.invalidateQueries(['color-info']);
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
                title: "ویرایش رنگ محصول",
                href: "product/color/" + id
            }
        ]} />
        <Panel>

             <ProductTab id={id+""} />
            {
                isLoading ? <Spinner /> : <>
                    <form action={submit}>
                        {
                            data?.map((item, index) => (<>
                                <FormComponent
                                    index={index}
                                    code={item.color_code}
                                    name={item.color_name}
                                    discount={item.simple_discount}
                                    id={item.id}
                                    status={item.status}
                                    price={item.price}
                                    stock={item.stock}
                                    deliveryDelay={item.delivery_delay}
                                    discount_expire_time={item.discount_expire_time}
                                    discount_expire_time_fa={item.discount_expire_time_fa}
                                />
                                <hr />
                            </>))
                        }

                        {Array.from({ length: extraColor }).map((_, index) => (
                            <>
                                <FormComponent
                                    key={index} index={index + (data?.length != undefined ? data?.length : 0)} />
                                <hr className={"my-5"} />
                            </>
                        ))}

                        <ButtonCircle type="button"  className={"w-48 bg-orange-600"} onClick={handleAddForm}>
                            +
                        </ButtonCircle>
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
