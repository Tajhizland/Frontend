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
import {vlogList, sortVlog} from "@/services/api/admin/vlog";
import {VlogResponse} from "@/services/types/vlog";
import Image from "next/image";

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
    vlogs: VlogResponse[];
    setVlogs: React.Dispatch<React.SetStateAction<VlogResponse[]>>;
}> = ({vlogs, setVlogs}) => {
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const {active, over} = event;

        if (over && active.id !== over.id) {
            setVlogs((items) => {
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
                items={vlogs.map(vlog => String(vlog.id))}
                strategy={verticalListSortingStrategy}
            >
                <div className={"grid grid-cols-1 md:grid-cols-3 gap-5"}>
                    {vlogs.map((vlog) => (
                        <SortableItem key={String(vlog.id)} id={String(vlog.id)}>
                            <div className={"container   flex items-center justify-between"}>
                                <div className={"max-w-xs w-full h-full bg-red-100"}>
                                    <div
                                        className={`relative w-full aspect-w-16 aspect-h-9   rounded-2xl overflow-hidden group border`}
                                    >
                                        <Image
                                            alt=""
                                            fill
                                            className="w-full h-full object-cover"
                                            src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/vlog/${vlog.poster}`}
                                        />
                                    </div>
                                </div>
                                {vlog.title}

                            </div>

                        </SortableItem>
                    ))}
                </div>
            </SortableContext>
        </DndContext>
    );
};

export default function Page() {

    const queryClient = useQueryClient();
    const [vlogs, setVlogs] = useState<VlogResponse[]>([]);

    const {data, isLoading} = useQuery({
        queryKey: [`vlogList`],
        queryFn: () => vlogList(),
        staleTime: 5000,
    });

    useEffect(() => {
        if (data) {
            setVlogs(data.data);
        }
    }, [data]);

    async function saveHandle() {
        let request: { id: number; sort: number }[] = [];
        vlogs.forEach((item, index) => {
            request.push({id: item.id, sort: index});
        });
        try {
            let response = await sortVlog({vlog: request});
            toast.success(response?.message as string);
            queryClient.invalidateQueries([`vlogList`]);
        } catch (error) {
            toast.error("خطایی رخ داد");
        }
    }


    return (
        <>
            <Breadcrump breadcrumb={[
                {
                    title: "ولاگ",
                    href: "vlog"
                },
                {
                    title: "سورت ولاگ",
                    href: "vlog/sort"
                }
            ]}/>
            <Panel>
                {isLoading && <Spinner/>}
                <div>
                    <ProductList vlogs={vlogs} setVlogs={setVlogs}/>
                    <ButtonPrimary onClick={saveHandle}>
                        ذخیره ترتیب
                    </ButtonPrimary>
                </div>
            </Panel>
        </>
    );
}
