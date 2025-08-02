"use client";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import {useParams} from "next/navigation";
import {useQuery, useQueryClient} from "react-query";
import React, {useEffect, useState} from "react";
import {OptionResponse} from "@/services/types/option";
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
import {findByCategoryId, sortOption} from "@/services/api/admin/option";

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

const OptionList: React.FC<{
    options: OptionResponse[];
    setOptions: React.Dispatch<React.SetStateAction<OptionResponse[]>>;
}> = ({options, setOptions}) => {
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const {active, over} = event;

        if (over && active.id !== over.id) {
            setOptions((items) => {
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
                items={options.map(option => String(option.id))}
                strategy={verticalListSortingStrategy}
            >
                <div>
                    {options.map((option) => (
                        <SortableItem key={String(option.id)} id={String(option.id)}>
                            {option.title}
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
    const [options, setOptions] = useState<OptionResponse[]>([]);

    const {data, isLoading} = useQuery({
        queryKey: [`optionOfCategory`, id],
        queryFn: () => findByCategoryId(Number(id)),
        staleTime: 5000,
    });

    useEffect(() => {
        if (data) {
            setOptions(data);
        }
    }, [data]);

    async function saveHandle() {
        let request: { id: number; sort: number }[] = [];
        options.forEach((item, index) => {
            request.push({id: item.id, sort: index});
        });
        try {
            let response = await sortOption({option: request});
            toast.success(response?.message as string);
            queryClient.invalidateQueries([`optionOfCategory`, id]);
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
                    {title: "ویرایش ویژگی ها", href: `category/option/${id}`},
                    {title: "سورت", href: `category/option/sort/${id}`},
                ]}
            />
            <Panel>
                <CategoryTab id={id + ""}/>
                {isLoading && <Spinner/>}
                <div>
                    <OptionList options={options} setOptions={setOptions}/>
                    <ButtonPrimary onClick={saveHandle}>
                        ذخیره ترتیب
                    </ButtonPrimary>
                </div>
            </Panel>
        </>
    );
}
