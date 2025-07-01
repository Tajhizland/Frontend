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
import {useParams} from "next/navigation";
import {getImageSortByProductId, sortImage} from "@/services/api/admin/productImage";
import {ProductImageResponse} from "@/services/types/productImage";

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
    images: ProductImageResponse[];
    setImages: React.Dispatch<React.SetStateAction<ProductImageResponse[]>>;
}> = ({images, setImages}) => {
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const {active, over} = event;

        if (over && active.id !== over.id) {
            setImages((items) => {
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
                items={images.map(image => String(image.id))}
                strategy={verticalListSortingStrategy}
            >
                <div>
                    {images.map((image, index) => (
                        <SortableItem key={String(image.id)} id={String(image.id)}>
                            <div className={"container max-w-xl flex gap-4 items-center"}>
                                <div className={"flex flex-col gap-1 text-sm"}>
                                    <strong>
                                        {index + 1}
                                    </strong>
                                    <strong className={"text-xs"}>
                                        {index == 2 ? "تصویر دوم محصول" : ""}
                                    </strong>
                                </div>
                                <div
                                    className={`relative w-full aspect-w-16 aspect-h-11 lg:aspect-h-9  rounded-2xl overflow-hidden group border`}
                                >
                                    <Image
                                        alt=""
                                        fill
                                        className="w-full h-full object-cover"
                                        src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/product/${image.url}`}
                                    />
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
    const [images, setImages] = useState<ProductImageResponse[]>([]);

    const {data, isLoading} = useQuery({
        queryKey: [`get-image-sort`],
        queryFn: () => getImageSortByProductId(Number(id)),
        staleTime: 5000,
    });

    useEffect(() => {
        if (data) {
            setImages(data.data);
        }
    }, [data]);

    async function saveHandle() {
        let request: { id: number; sort: number }[] = [];
        images.forEach((item, index) => {
            request.push({id: item.id, sort: index});
        });
        try {
            let response = await sortImage({image: request});
            toast.success(response?.message as string);
            queryClient.invalidateQueries([`get-image-sort`]);
        } catch (error) {
            toast.error("خطایی رخ داد");
        }
    }


    return (
        <>
            <Breadcrump breadcrumb={[
                {
                    title: "محصولات",
                    href: "product"
                },
                {
                    title: "ویرایش تصویر",
                    href: "product/image/" + id
                },
                {
                    title: "ویرایش رنگ محصول",
                    href: "product/image/sort/" + id
                }
            ]}/>
            <Panel>
                {isLoading && <Spinner/>}
                <div>
                    <ProductList images={images} setImages={setImages}/>
                    <ButtonPrimary onClick={saveHandle}>
                        ذخیره ترتیب
                    </ButtonPrimary>
                </div>
            </Panel>
        </>
    );
}
