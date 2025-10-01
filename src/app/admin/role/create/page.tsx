"use client"
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import {store} from "@/services/api/admin/role";
import {useRouter} from "next/navigation";
import {useMutation} from "react-query";
import Form from "@/app/admin/role/Form";
import {toast} from "react-hot-toast";

export default function Page() {
    const router = useRouter();

    const storeRole = useMutation({
        mutationKey: [`store-role`],
        mutationFn: async (formData: any) => {
            return store({...formData});
        },
        onSuccess: (response) => {
            if (response.success)
            {
                toast.success(response.message as string);
                router.push("/admin/role");
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
                title: "افزودن نقش جدید",
                href: "role/create"
            }
        ]}/>
        <Panel>
            <PageTitle>
                ایجاد نقش جدید
            </PageTitle>
            <div>
                <Form submit={storeRole.mutateAsync} />
            </div>
        </Panel>
    </>)
}
