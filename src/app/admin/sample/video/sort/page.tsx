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
import {getVideo, sortSampleVideo} from "@/services/api/admin/sample";
import {SampleVideoResponse} from "@/services/types/sampleVideo";
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
    videos: SampleVideoResponse[];
    setVideos: React.Dispatch<React.SetStateAction<SampleVideoResponse[]>>;
}> = ({videos, setVideos}) => {
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const {active, over} = event;

        if (over && active.id !== over.id) {
            setVideos((items) => {
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
                items={videos.map(video => String(video.id))}
                strategy={verticalListSortingStrategy}
            >
                <div className={"grid grid-cols-1 gap-5"}>
                    {videos.map((video) => (
                        <SortableItem key={String(video.id)} id={String(video.id)}>
                            <div className={"container   flex items-center justify-between"}>
                                <div className={"max-w-xs w-full h-full bg-red-100"}>
                                    <div
                                        className={`relative w-full aspect-w-16 aspect-h-9   rounded-2xl overflow-hidden group border`}
                                    >
                                        <Image
                                            src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/vlog/${video?.vlog?.poster}`}
                                            alt={"image"} width={720} height={100} className="w-full h-full"
                                        />
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

    const queryClient = useQueryClient();
    const [videos, setVideos] = useState<SampleVideoResponse[]>([]);

    const {data: data, isLoading: isLoading} = useQuery({
        queryKey: [`sample_video`],
        queryFn: () => getVideo(),
        staleTime: 5000,
    });

    useEffect(() => {
        if (data) {
            setVideos(data);
        }
    }, [data]);

    async function saveHandle() {
        let request: { id: number; sort: number }[] = [];
        videos.forEach((item, index) => {
            request.push({id: item.id, sort: index});
        });
        try {
            let response = await sortSampleVideo({video: request});
            if (response?.success) {
                toast.success(response?.message as string);
                queryClient.invalidateQueries([`sample_video`]);
            }
        } catch (error) {
            toast.error("خطایی رخ داد");
        }
    }


    return (
        <>
            <Breadcrump breadcrumb={[
                {
                    title: "پروژه های تجهیز شده",
                    href: "sample"
                },
                {
                    title: "ویدیو ها",
                    href: "sample/video"
                },
                {
                    title: "سورت ویدیو",
                    href: ""
                }
            ]}/>
            <Panel>
                {isLoading && <Spinner/>}
                <div>
                    <ProductList videos={videos} setVideos={setVideos}/>
                    <ButtonPrimary onClick={saveHandle}>
                        ذخیره ترتیب
                    </ButtonPrimary>
                </div>
            </Panel>
        </>
    );
}
