"use client";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import {useParams} from "next/navigation";
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
import CategoryTab from "@/components/Tabs/CategoryTab";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Spinner from "@/shared/Loading/Spinner";
import {OptionItemsResponse} from "@/services/types/optionItem";
import {getOptionItemByOption, sortOptionItem} from "@/services/api/admin/option";

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

const OptionItemList: React.FC<{
    OptionItems: OptionItemsResponse[];
    setOptionItems: React.Dispatch<React.SetStateAction<OptionItemsResponse[]>>;
}> = ({OptionItems, setOptionItems}) => {
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const {active, over} = event;

        if (over && active.id !== over.id) {
            setOptionItems((items) => {
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
                items={OptionItems.map(OptionItem => String(OptionItem.id))}
                strategy={verticalListSortingStrategy}
            >
                <div>
                    {OptionItems.map((OptionItem) => (
                        <SortableItem key={String(OptionItem.id)} id={String(OptionItem.id)}>
                            {OptionItem.title}
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
    const [OptionItems, setOptionItems] = useState<OptionItemsResponse[]>([]);

    const {data, isLoading} = useQuery({
        queryKey: [`OptionItemOfCategory`, id],
        queryFn: () => getOptionItemByOption(Number(id)),
        staleTime: 5000,
    });

    useEffect(() => {
        if (data) {
            setOptionItems(data);
        }
    }, [data]);

    async function saveHandle() {
        let request: { id: number; sort: number }[] = [];
        OptionItems.forEach((item, index) => {
            request.push({id: item.id, sort: index});
        });
        try {
            let response = await sortOptionItem({optionItem: request});
            toast.success(response?.message as string);
            queryClient.invalidateQueries([`OptionItemOfCategory`, id]);
        } catch (error) {
            toast.error("خطایی رخ داد");
        }
    }


    return (
        <>
            <Breadcrump
                breadcrumb={[
                    {title: "دسته بندی", href: "category"},
                    {title: "ویرایش دسته بندی", href: `category/edit/${id}`},
                    {title: "ویرایش ویژگی ها", href: `category/OptionItem/${id}`},
                    {title: "سورت", href: `category/OptionItem/sort/${id}`},
                ]}
            />
            <Panel>
                <CategoryTab id={id + ""}/>
                {isLoading && <Spinner/>}
                <div>
                    <OptionItemList OptionItems={OptionItems} setOptionItems={setOptionItems}/>
                    <ButtonPrimary onClick={saveHandle}>
                        ذخیره ترتیب
                    </ButtonPrimary>
                </div>
            </Panel>
        </>
    );
}
