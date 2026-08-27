"use client";

import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import LandingTab from "@/components/Tabs/LandingTab";
import Select from "@/shared/Select/Select";
import ButtonCircle from "@/shared/Button/ButtonCircle";
import { AttachedList } from "@/shared/AttachedList";
import { deleteLandingCategory, getLandingCategory, setCategoryLanding } from "@/services/api/admin/landing";
import { categoryList } from "@/services/api/admin/category";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

export default function Page() {
    const { id } = useParams();
    const landingId = Number(id);
    const [selectedCategory, setSelectedCategory] = useState("");

    const { data: categoryLists } = useQuery({
        queryKey: ["category-list"],
        queryFn: () => categoryList(),
        staleTime: 5000,
    });

    return (
        <>
            <Breadcrump
                breadcrumb={[
                    { title: "لندینگ", href: "landing" },
                    { title: "ویرایش لندینگ", href: `landing/edit/${id}` },
                    { title: "ویرایش دسته بندی ها", href: `landing/category/${id}` },
                ]}
            />
            <Panel>
                <LandingTab id={String(id)} />
                <AttachedList
                    queryKey={["landing-category", landingId]}
                    queryFn={() => getLandingCategory(landingId)}
                    itemKey={(item) => item.id}
                    renderItem={(item) => <span>{item?.category?.name}</span>}
                    removeFn={(item) => deleteLandingCategory(item.id)}
                    renderAdd={({ invalidate }) => (
                        <AddCategory
                            landingId={landingId}
                            value={selectedCategory}
                            onChange={setSelectedCategory}
                            options={categoryLists?.data}
                            onAdded={invalidate}
                        />
                    )}
                />
            </Panel>
        </>
    );
}

function AddCategory({
    landingId,
    value,
    onChange,
    options,
    onAdded,
}: {
    landingId: number;
    value: string;
    onChange: (value: string) => void;
    options?: { id: number; name: string }[];
    onAdded: () => void;
}) {
    const mutation = useMutation({
        mutationFn: () => setCategoryLanding({ category_id: Number(value), landing_id: landingId }),
        onSuccess: (response) => {
                toast.success(response?.message as string);
                onAdded();
            },
            onError: () => {
                toast.error("افزودن دسته بندی انجام نشد");
            },
    });

    return (
        <div className="flex justify-between items-center gap-x-10 mt-5">
            <Select value={value} onChange={(e) => onChange(e.target.value)}>
                <option value="">انتخاب کنید</option>
                {options?.map((item) => (
                    <option key={item.id} value={item.id}>
                        {item.name}
                    </option>
                ))}
            </Select>
            <ButtonCircle
                type="button"
                className="w-48 bg-orange-600"
                disabled={!value || mutation.isPending}
                onClick={() => mutation.mutate()}
            >
                +
            </ButtonCircle>
        </div>
    );
}
