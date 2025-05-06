"use client"
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Form from "@/app/admin/trusted-brand/Form";
import {store} from "@/services/api/admin/trustedBrand";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";

export default function Page() {
    const router = useRouter();

    async function submit(e: FormData) {
        let response = await store(
            {
                logo: e.get("logo") as File,
            }
        )
        toast.success(response?.message as string)
        router.push("/admin/trusted-brand");
    }

    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "برند های تجهیز شده",
                href: "trusted-brand"
            },
            {
                title: "ایجاد",
                href: "trusted-brand/edit/"
            }
        ]}/>
        <Panel>
            <PageTitle>
                افزودن برند تجهیز شده
            </PageTitle>
            <div>
                <Form submit={submit}/>
            </div>
        </Panel>
    </>)
}
