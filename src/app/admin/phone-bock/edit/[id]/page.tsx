"use client"
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import {useParams} from "next/navigation";
import {useMutation, useQuery} from "react-query";
import Form from "@/app/admin/phone-bock/Form";
import {toast} from "react-hot-toast";
import {findPhoneBockById, updatePhoneBock} from "@/services/api/admin/phoneBock";

export default function Page() {
    const {id} = useParams();
    const {data} = useQuery({
        queryKey: [`phone-bock-info`, id],
        queryFn: () => findPhoneBockById(Number(id)),
        staleTime: 5000,
    });
    const updatePhoneBockMutation = useMutation({
        mutationKey: [`update-phone-bock`, id],
        mutationFn: async (formData: any) => {
            return updatePhoneBock({id: Number(id), ...formData});
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
                title: "دفترچه تلفن",
                href: "phone-bock"
            },
            {
                title: "ویرایش مخاطب",
                href: "phone-bock/edit/" + id
            }
        ]}/>
        <Panel>
            <PageTitle>
                ویرایش مخاطب
            </PageTitle>
            <div>
                <Form data={data} submit={updatePhoneBockMutation.mutateAsync}/>
            </div>
        </Panel>
    </>)
}
