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
import {BannerResponse} from "@/services/types/banner";
import Image from "next/image";
import {getDesktopSliders, sortSlider} from "@/services/api/admin/campaignSlider";
import {SliderResponse} from "@/services/types/slider";
import {useParams} from "next/navigation";

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
    sliders: BannerResponse[];
    setSliders: React.Dispatch<React.SetStateAction<SliderResponse[]>>;
}> = ({sliders, setSliders}) => {
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const {active, over} = event;

        if (over && active.id !== over.id) {
            setSliders((items) => {
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
                items={sliders.map(banner => String(banner.id))}
                strategy={verticalListSortingStrategy}
            >
                <div>
                    {sliders.map((banner) => (
                        <SortableItem key={String(banner.id)} id={String(banner.id)}>
                            <div className={"container max-w-lg"}>
                                <div
                                    className={`relative w-full aspect-w-16 aspect-h-11 lg:aspect-h-9  rounded-2xl overflow-hidden group border`}
                                >
                                    <Image
                                        alt=""
                                        fill
                                        className="w-full h-full object-cover"
                                        src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/slider/${banner.image}`}
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

    const queryClient = useQueryClient();
    const [sliders, setSliders] = useState<SliderResponse[]>([]);

    const {data, isLoading} = useQuery({
        queryKey: [`bannerList`],
        queryFn: () => getDesktopSliders(),
        staleTime: 5000,
    });

    useEffect(() => {
        if (data) {
            setSliders(data.data);
        }
    }, [data]);

    async function saveHandle() {
        let request: { id: number; sort: number }[] = [];
        sliders.forEach((item, index) => {
            request.push({id: item.id, sort: index});
        });
        try {
            let response = await sortSlider({slider: request});
            toast.success(response?.message as string);
            queryClient.invalidateQueries([`bannerList`]);
        } catch (error) {
            toast.error("خطایی رخ داد");
        }
    }

    const {id} = useParams();

    return (
        <>
            <Breadcrump breadcrumb={[
                {
                    title: "جشنواره",
                    href: "campaign"
                },
                {
                    title: "اسلایدر ها",
                    href: "campaign/" + id + "/slider"
                },
                {
                    title: "سورت اسلایدر ها",
                    href: "campaign/" + id + "/slider/sort-desktop"
                },
            ]}/>
            <Panel>
                {isLoading && <Spinner/>}
                <div>
                    <ProductList sliders={sliders} setSliders={setSliders}/>
                    <ButtonPrimary onClick={saveHandle}>
                        ذخیره ترتیب
                    </ButtonPrimary>
                </div>
            </Panel>
        </>
    );
}
