"use client"
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import {findById, store} from "@/services/api/admin/permission";
import {useParams} from "next/navigation";
import {useMutation, useQuery} from "react-query";
import Form from "@/app/admin/permission/Form";
import {toast} from "react-hot-toast";

export default function Page() {
    const {id} = useParams();
    const {data} = useQuery({
        queryKey: [`permission-info`, id],
        queryFn: () => findById(Number(id)),
        staleTime: 5000,
    });
    const updatePermission = useMutation({
        mutationKey: [`update-permission`, id],
        mutationFn: async (formData: any) => {
            return store({...formData});
        },
        onSuccess: (response) => {
            if (response.success) {
                toast.success(response.message as string);

            }
        },
    });

    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "دسترسی",
                href: "permission"
            },
            {
                title: "ویرایش دسترسی  ",
                href: "permission/edit/" + id
            }
        ]}/>
        <Panel>
            <PageTitle>
                ویرایش دسترسی
            </PageTitle>
            <div>
                <Form data={data} submit={updatePermission.mutateAsync}/>
            </div>
        </Panel>
    </>)
}
