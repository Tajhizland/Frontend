"use client";

import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import PageLink from "@/shared/PageLink/PageLink";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import NcModal from "@/shared/NcModal/NcModal";
import Uploader from "@/shared/Uploader/Uploader";
import Table from "@/shared/Table/Table";
import { SearchPickerItem, SearchPickerModal } from "@/shared/SearchPicker";
import { defineActions } from "@/shared/Table/types";
import { columns } from "@/app/admin/homepage_category/TableRow";
import { homepageCategoryTable, remove, setIcon, store } from "@/services/api/admin/homepageCategory";
import { search } from "@/services/api/admin/category";
import { CategoryResponse } from "@/services/types/category";
import { HomepageCategoryResponse } from "@/services/types/homepageCategory";
import { IoLogoApple } from "react-icons/io";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-hot-toast";

export default function Page() {
    const queryClient = useQueryClient();
    const [showModal, setShowModal] = useState(false);
    const [iconModal, setIconModal] = useState(false);
    const [iconTargetId, setIconTargetId] = useState<number>();

    const iconMutation = useMutation(
        (form: FormData) => setIcon(Number(iconTargetId), { icon: form.get("icon") as File }),
        {
            onSuccess: (response) => {
                toast.success(response?.message as string);
                queryClient.invalidateQueries(["table"]);
                setIconModal(false);
            },
            onError: () => {
                toast.error("آپلود آیکن انجام نشد");
            },
        }
    );

    const actions = defineActions<HomepageCategoryResponse>([
        {
            label: <IoLogoApple className="text-black w-5 h-5" />,
            title: "ویرایش آیکن",
            onClick: (row) => {
                setIconTargetId(row.id);
                setIconModal(true);
            },
        },
    ]);

    return (
        <>
            <Breadcrump breadcrumb={[{ title: "دسته بندی های پرطرفدار", href: "homepage_category" }]} />
            <Panel>
                <PageTitle>دسته بندی های پرطرفدار</PageTitle>
                <PageLink>
                    <ButtonPrimary onClick={() => setShowModal(true)}>ایجاد</ButtonPrimary>
                </PageLink>

                {iconModal && (
                    <NcModal
                        isOpenProp={iconModal}
                        onCloseModal={() => setIconModal(false)}
                        contentExtraClass="max-w-4xl"
                        triggerText=""
                        modalTitle="ویرایش آیکن"
                        hasButton={false}
                        renderContent={() => (
                            <form action={(form) => iconMutation.mutate(form)} className="mt-5">
                                <Uploader name="icon" />
                                <ButtonPrimary className="mt-10" loading={iconMutation.isLoading}>
                                    آپلود
                                </ButtonPrimary>
                            </form>
                        )}
                    />
                )}

                <SearchPickerModal<CategoryResponse>
                    open={showModal}
                    onClose={() => setShowModal(false)}
                    queryKey={["homepage-category-search"]}
                    placeholder="جستجوی نام دسته بندی"
                    searchFn={(query) => search({ query })}
                    onPick={(item) => store({ category_id: item.id })}
                    itemKey={(item) => item.id}
                    renderItem={(item) => <SearchPickerItem src={`category/${item.image}`} title={item.name} />}
                />

                <Table onDelete={remove} fetcher={homepageCategoryTable} columns={columns} actions={actions} />
            </Panel>
        </>
    );
}
