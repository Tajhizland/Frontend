"use client";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import {useQuery, useQueryClient} from "react-query";
import React, {useEffect, useState} from "react";
import {toast} from "react-hot-toast";
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    useSortable,
} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Spinner from "@/shared/Loading/Spinner";
import Image from "next/image";
import {DiscountItemResponse} from "@/services/types/discountItem";
import {getTop, sortTop} from "@/services/api/admin/discount";
import {useParams} from "next/navigation";
import Prices from "@/components/Price/Prices";

interface SortableItemProps {
    id: string;
    children: React.ReactNode;
}

const SortableItem: React.FC<SortableItemProps> = ({id, children}) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({id});

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        padding: "16px",
        margin: "0 0 8px 0",
        backgroundColor: "#ffffff",
        border: "1px solid #ccc",
        borderRadius: "4px",
        cursor: "grab",
        userSelect: "none" as const,
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            {children}
        </div>
    );
};

const ProductList: React.FC<{
    discounts: DiscountItemResponse[];
    setDiscounts: React.Dispatch<React.SetStateAction<DiscountItemResponse[]>>;
}> = ({discounts, setDiscounts}) => {
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const {active, over} = event;

        if (over && active.id !== over.id) {
            setDiscounts((items) => {
                const oldIndex = items.findIndex((item) => String(item.id) === active.id);
                const newIndex = items.findIndex((item) => String(item.id) === over.id);
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    };

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
        >
            <SortableContext
                items={discounts.map(discount => String(discount.id))}
                strategy={verticalListSortingStrategy}
            >
                <div>
                    {discounts.map((discount) => (
                        <SortableItem key={String(discount.id)} id={String(discount.id)}>
                            <div className={"container max-w-lg"}>

                                <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl">
                                    <Image
                                        fill
                                        src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/product/${discount.productColor?.product?.images?.data?.[0]?.url}`}
                                        alt={discount.productColor?.product?.name ?? ""}
                                        sizes="300px"
                                        className="h-full w-full object-contain object-center"
                                    />
                                </div>
                                <div className={"py-5 flex flex-col gap-2"}>
                                    <div className="font-medium">{discount.productColor?.product?.name}</div>
                                    <div
                                        className={"flex items-center gap-4 w-full"}
                                        key={discount.productColor?.id}
                                    >
                                        {discount.productColor?.color_name}
                                        <del className={"text-red-600"}>
                                            {discount.productColor?.price}
                                        </del>
                                        <Prices price={discount.discount_price ?? 0}/>

                                    </div>
                                </div>
                            </div>
                        </SortableItem>
                    ))}
                </div>
            </SortableContext>
        </DndContext>
    );
};

export default function Page() {
    const {id} = useParams();

    const queryClient = useQueryClient();
    const [discounts, setDiscounts] = useState<DiscountItemResponse[]>([]);

    const {data, isLoading} = useQuery({
        queryKey: [`discountItemList`],
        queryFn: () => getTop(Number(id)),
        staleTime: 5000,
    });

    useEffect(() => {
        if (data) {
            setDiscounts(data);
        }
    }, [data]);

    async function saveHandle() {
        let request: { id: number; sort: number }[] = [];
        discounts.forEach((item, index) => {
            request.push({id: item.id, sort: index});
        });
        try {
            let response = await sortTop({discounts: request});
            toast.success(response?.message as string);
            queryClient.invalidateQueries([`discountItemList`]);
        } catch (error) {
            toast.error("خطایی رخ داد");
        }
    }


    return (
        <>
            <Breadcrump breadcrumb={[
                {
                    title: "تحفیف",
                    href: "discount"
                },
                {
                    title: "مشاهده تخفیف",
                    href: "discount/item/" + id
                },
                {
                    title: "سورت تخفیف",
                    href: "discount/item/" + id + "/sort"
                }
            ]}/>
            <Panel>
                {isLoading && <Spinner/>}
                <div>
                    <ProductList discounts={discounts} setDiscounts={setDiscounts}/>
                    <ButtonPrimary onClick={saveHandle}>
                        ذخیره ترتیب
                    </ButtonPrimary>
                </div>
            </Panel>
        </>
    );
}
