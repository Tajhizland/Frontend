"use client"
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import {findById, store} from "@/services/api/admin/role";
import {useParams} from "next/navigation";
import {useMutation, useQuery} from "react-query";
import Form from "@/app/admin/role/Form";
import {toast} from "react-hot-toast";

export default function Page() {
    const {id} = useParams();
    const {data} = useQuery({
        queryKey: [`role-info`, id],
        queryFn: () => findById(Number(id)),
        staleTime: 5000,
    });
    const storeRole = useMutation({
        mutationKey: [`update-role`, id],
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
                title: "نقش",
                href: "role"
            },
            {
                title: "ویرایش نقش  ",
                href: "role/edit/" + id
            }
        ]}/>
        <Panel>
            <PageTitle>
                ویرایش نقش
            </PageTitle>
            <div>
                <Form data={data} submit={storeRole.mutateAsync}/>
            </div>
        </Panel>
    </>)
}
