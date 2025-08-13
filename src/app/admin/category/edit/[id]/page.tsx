"use client"
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import toast from "react-hot-toast";
import Form from "@/app/admin/category/Form";
import {findById, update} from "@/services/api/admin/category";
import {useParams} from "next/navigation";
import {useMutation, useQuery, useQueryClient} from "react-query";
import CategoryTab from "@/components/Tabs/CategoryTab";

import Spinner from "@/shared/Loading/Spinner";

export default function Page() {
    const {id} = useParams();
    const queryClient = useQueryClient();
    const {data: data, isLoading} = useQuery({
        queryKey: [`category-info`, Number(id)],
        queryFn: () => findById(Number(id)),
        staleTime: 5000,
    });


    const mutation = useMutation({
        mutationKey: [`update-category`, id],
        mutationFn: async (formData: any) => {
            return update({
                id: Number(id),
                ...formData,
            });
        },
        onSuccess: (data) => {
            toast.success(data?.message ?? "")
            queryClient.invalidateQueries([`category-info`, Number(id)]);
        },
    });


    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "دسته بندی",
                href: "category"
            },
            {
                title: "ویرایش دسته بندی",
                href: "category/edit/" + id
            }
        ]}/>
        <Panel>
            <CategoryTab id={id + ""}/>
            {isLoading && <Spinner/>}

            <PageTitle>
                ویرایش دسته بندی
            </PageTitle>
            <div>
                <Form data={data} submit={mutation.mutateAsync}/>
            </div>
        </Panel>

    </>)
}
