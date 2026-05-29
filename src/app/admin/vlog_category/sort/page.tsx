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
import {VlogCategoryResponse} from "@/services/types/vlogCategory";
import {getList, sortVlogCategory} from "@/services/api/admin/vlogCategory";

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
    vlogCategorys: VlogCategoryResponse[];
    setVlogCategorys: React.Dispatch<React.SetStateAction<VlogCategoryResponse[]>>;
}> = ({vlogCategorys, setVlogCategorys}) => {
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const {active, over} = event;

        if (over && active.id !== over.id) {
            setVlogCategorys((items) => {
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
                items={vlogCategorys.map(brand => String(brand.id))}
                strategy={verticalListSortingStrategy}
            >
                <div>
                    {vlogCategorys.map((brand) => (
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
    const [vlogCategorys, setVlogCategorys] = useState<VlogCategoryResponse[]>([]);

    const {data, isLoading} = useQuery({
        queryKey: [`vlogCategoryList` ],
        queryFn: () => getList(),
        staleTime: 5000,
    });

    useEffect(() => {
        if (data) {
            setVlogCategorys(data);
        }
    }, [data]);

    async function saveHandle() {
        let request: { id: number; sort: number }[] = [];
        vlogCategorys.forEach((item, index) => {
            request.push({id: item.id, sort: index});
        });
        try {
            let response = await sortVlogCategory({vlogs: request});
            toast.success(response?.message as string);
            queryClient.invalidateQueries([`vlogCategoryList`]);
        } catch (error) {
            toast.error("خطایی رخ داد");
        }
    }


    return (
        <>
            <Breadcrump breadcrumb={[
                {
                    title: "دسته بندی ولاگ",
                    href: "vlog_category",
                },
                {
                    title: "سورت دسته بندی ولاگ",
                    href: "vlog_category/sort"
                }
            ]}/>
            <Panel>
                {isLoading && <Spinner/>}
                <div>
                    <ProductList vlogCategorys={vlogCategorys} setVlogCategorys={setVlogCategorys}/>
                    <ButtonPrimary onClick={saveHandle}>
                        ذخیره ترتیب
                    </ButtonPrimary>
                </div>
            </Panel>
        </>
    );
}
