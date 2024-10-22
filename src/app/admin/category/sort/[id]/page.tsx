"use client";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import ProductTab from "@/components/Tabs/ProductTab";
import Panel from "@/shared/Panel/Panel";
import { useParams } from "next/navigation";
import { useQuery, useQueryClient } from "react-query";
import React, { useEffect, useState } from "react";
import { productOfCategory, sort } from "@/services/api/admin/category";
import { ProductResponse } from "@/services/types/product";
import { toast } from "react-hot-toast";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const ProductList: React.FC<{ products: ProductResponse[]; setProducts: React.Dispatch<React.SetStateAction<ProductResponse[]>> }> = ({ products, setProducts }) => {
    const handleOnDragEnd = (result: any) => {
        if (!result.destination) return;

        const items = Array.from(products);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setProducts(items);
    };

    return (
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="ProductDrag">
                {(provided) => (
                    <ul {...provided.droppableProps} ref={provided.innerRef} style={{ listStyleType: "none", padding: 0 }}>
                        {products.map((product, index) => (
                            <Draggable key={String(product.id)} draggableId={String(product.id)} index={index}>
                                {(provided, snapshot) => (
                                    <li
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}  // مهم برای فعال شدن drag
                                        style={{
                                            userSelect: "none",
                                            padding: "16px",
                                            margin: "0 0 8px 0",
                                            backgroundColor: snapshot.isDragging ? "#e0f7fa" : "#ffffff",
                                            border: "1px solid #ccc",
                                            display: "block", // اضافه کردن برای اطمینان از نمایش درست
                                            ...provided.draggableProps.style,
                                        }}
                                    >
                                        {product.name}
                                    </li>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </ul>
                )}
            </Droppable>
        </DragDropContext>
    );
};

export default function Page() {
    const { id } = useParams();
    const queryClient = useQueryClient();
    const [products, setProducts] = useState<ProductResponse[]>([]);

    const { data, isLoading } = useQuery({
        queryKey: [`productOfCategory`, id],
        queryFn: () => productOfCategory(Number(id)),
        staleTime: 5000,
    });

    useEffect(() => {
        if (data) {
            setProducts(data);
        }
    }, [data]);

    async function saveHandle() {
        let request: { id: number; sort: number }[] = [];
        products.forEach((item, index) => {
            request.push({ id: item.id, sort: index });
        });
        try {
            let response = await sort({ product: request });
            toast.success(response?.message as string);
            queryClient.invalidateQueries([`productOfCategory`, id]);
        } catch (error) {
            toast.error("خطایی رخ داد");
        }
    }

    if (isLoading) return <div>در حال بارگذاری...</div>;

    return (
        <>
            <Breadcrump breadcrumb={[
                { title: "دسته بندی", href: "category" },
                { title: "ویرایش دسته بندی", href: `category/edit/${id}` },
                { title: "ویرایش فایل دسته بندی", href: `category/file/${id}` }
            ]} />
            <Panel>
                <ProductTab id={id + ""} />
                <div>
                    <ProductList products={products} setProducts={setProducts} />
                    <button onClick={saveHandle}>Save Order</button>
                </div>
            </Panel>
        </>
    );
}
