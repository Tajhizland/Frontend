"use client";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import {useParams} from "next/navigation";
import {useQuery, useQueryClient} from "react-query";
import React, {useEffect, useState} from "react";
import {productOfCategory, sort} from "@/services/api/admin/category";
import {ProductResponse} from "@/services/types/product";
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
import CategoryTab from "@/components/Tabs/CategoryTab";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Spinner from "@/shared/Loading/Spinner";
import {BrandResponse} from "@/services/types/brand";
import {brandList, sortBrands} from "@/services/api/admin/brand";

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
    brands: BrandResponse[];
    setBrands: React.Dispatch<React.SetStateAction<BrandResponse[]>>;
}> = ({brands, setBrands}) => {
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const {active, over} = event;

        if (over && active.id !== over.id) {
            setBrands((items) => {
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
                items={brands.map(brand => String(brand.id))}
                strategy={verticalListSortingStrategy}
            >
                <div>
                    {brands.map((brand) => (
                        <SortableItem key={String(brand.id)} id={String(brand.id)}>
                            {brand.name}
                        </SortableItem>
                    ))}
                </div>
            </SortableContext>
        </DndContext>
    );
};

export default function Page() {

    const queryClient = useQueryClient();
    const [brands, setBrands] = useState<BrandResponse[]>([]);

    const {data, isLoading} = useQuery({
        queryKey: [`brandList` ],
        queryFn: () => brandList(),
        staleTime: 5000,
    });

    useEffect(() => {
        if (data) {
            setBrands(data.data);
        }
    }, [data]);

    async function saveHandle() {
        let request: { id: number; sort: number }[] = [];
        brands.forEach((item, index) => {
            request.push({id: item.id, sort: index});
        });
        try {
            let response = await sortBrands({brand: request});
            toast.success(response?.message as string);
            queryClient.invalidateQueries([`brandList`]);
        } catch (error) {
            toast.error("خطایی رخ داد");
        }
    }


    return (
        <>
            <Breadcrump breadcrumb={[
                {
                    title: "برند",
                    href: "brand"
                },
                {
                    title: "سورت برند",
                    href: "brand/sort"
                }
            ]}/>
            <Panel>
                {isLoading && <Spinner/>}
                <div>
                    <ProductList brands={brands} setBrands={setBrands}/>
                    <ButtonPrimary onClick={saveHandle}>
                        ذخیره ترتیب
                    </ButtonPrimary>
                </div>
            </Panel>
        </>
    );
}
