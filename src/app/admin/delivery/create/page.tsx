"use client"
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Form from "@/app/admin/delivery/Form";
import {store} from "@/services/api/admin/delivery";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";

export default function Page()
{
        const router = useRouter();

    async function submit(e: FormData) {
        let response=await store(
            {
                name: e.get("name") as string,
                description: e.get("description") as string,
                status: e.get("status") as string,
                logo: e.get("logo") as File,
                price: e.get("price") as string,
            }
        )
        toast.success(response?.message as string)
                router.push("/admin/delivery");

    }

    return(<>
        <Breadcrump breadcrumb={[
            {
                title: "تنظیمات سرویس ارسال",
                href: "delivery"
            },
            {
                title: "افزودن سرویس ارسال",
                href: "delivery/create"
            }
        ]}/>
        <Panel>
            <PageTitle>
                افزودن سرویس ارسال
            </PageTitle>
            <div>
                <Form submit={submit} />
            </div>
        </Panel>
    </>)
}
