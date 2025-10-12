"use client"
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import {useRouter} from "next/navigation";
import {useMutation} from "react-query";
import Form from "@/app/admin/phone-bock/Form";
import {toast} from "react-hot-toast";
import {storePhoneBock} from "@/services/api/admin/phoneBock";

export default function Page() {
    const router = useRouter();

    const storePermission = useMutation({
        mutationKey: [`store-phone-bock`],
        mutationFn: async (formData: any) => {
            return storePhoneBock({...formData});
        },
        onSuccess: (response) => {
            if (response.success)
            {
                toast.success(response.message as string);
                router.push("/admin/phone-bock");
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
                title: "افزودن مخاطب",
                href: "phone-bock/create"
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
