"use client"
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import {store} from "@/services/api/admin/permission";
import {useRouter} from "next/navigation";
import {useMutation} from "react-query";
import Form from "@/app/admin/permission/Form";
import {toast} from "react-hot-toast";

export default function Page() {
    const router = useRouter();

    const storePermission = useMutation({
        mutationKey: [`store-permission`],
        mutationFn: async (formData: any) => {
            return store({...formData});
        },
        onSuccess: (response) => {
            if (response.success)
            {
                toast.success(response.message as string);
                router.push("/admin/permission");
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
                title: "افزودن دسترسی جدید",
                href: "permission/create"
            }
        ]}/>
        <Panel>
            <PageTitle>
                ایجاد دسترسی جدید
            </PageTitle>
            <div>
                <Form submit={storePermission.mutateAsync} />
            </div>
        </Panel>
    </>)
}
