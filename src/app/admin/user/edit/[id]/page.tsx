"use client"
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Form from "@/app/admin/user/Form";
import {findById, update} from "@/services/api/admin/user";
import toast from "react-hot-toast";
import {useParams} from "next/navigation";
import {useQuery} from "react-query";
import UserTab from "@/components/Tabs/UserTab";

export default function Page() {
    const {id} = useParams();
    const {data: data} = useQuery({
        queryKey: [`user-info`, Number(id)],
        queryFn: () => findById(Number(id)),
        staleTime: 5000,
    });

    async function submit(e: FormData) {
        let response = await update(
            {
                id: Number(id),
                name: e.get("name") as string,
                last_name: e.get("last_name") as string,
                national_code: e.get("national_code") as string,
                gender: e.get("gender") as string,
                email: e.get("email") as string,
                username: e.get("username") as string,
                role: e.get("role") as string,
                role_id: Number(e.get("role_id")),
            }
        )
        toast.success(response?.message as string)
    }

    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "کاربران",
                href: "user"
            },
            {
                title: "ویرایش کاربر",
                href: "user/update/" + id
            }
        ]}/>
        <Panel>
            <PageTitle>
                ویرایش کاربر
            </PageTitle>
            <UserTab id={id + ""}/>

            <div>
                {data && <Form submit={submit} data={data}/>
                }
            </div>
        </Panel>
    </>)
}
