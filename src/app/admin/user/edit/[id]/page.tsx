"use client";

import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Form, {UserFormValues} from "@/app/admin/user/Form";
import {findById, update} from "@/services/api/admin/user";
import toast from "react-hot-toast";
import {useParams} from "next/navigation";
import {useMutation, useQuery} from "react-query";
import UserTab from "@/components/Tabs/UserTab";

export default function Page() {
    const {id} = useParams();

    const {data, isLoading} = useQuery({
        queryKey: [`user-info`, Number(id)],
        queryFn: () => findById(Number(id)),
        staleTime: 5000,
    });

    const mutation = useMutation({
        mutationKey: ["update-user", Number(id)],
        mutationFn: async (values: UserFormValues) => {
            return update({
                id: Number(id),
                name: values.name,
                last_name: values.last_name,
                national_code: values.national_code,
                gender: values.gender,
                email: values.email,
                username: values.username,
                role: values.role,
                role_id: values.role == "admin" ? Number(values.role_id) : undefined,
            });
        },
        onSuccess: (response) => {
            if (response.success) toast.success(response.message as string);
        },
    });

    return (
        <>
            <Breadcrump
                breadcrumb={[
                    {title: "کاربران", href: "user"},
                    {title: "ویرایش کاربر", href: "user/update/" + id},
                ]}
            />
            <Panel>
                <PageTitle>ویرایش کاربر</PageTitle>
                <UserTab id={id + ""} />
                <div>
                    {!isLoading && (
                        <Form data={data} onSubmit={mutation.mutateAsync} loading={mutation.isLoading} />
                    )}
                </div>
            </Panel>
        </>
    );
}
