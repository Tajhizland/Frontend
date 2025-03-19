"use client"
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import toast from "react-hot-toast";
import {useQuery, useQueryClient} from "react-query";
import {find, set} from "@/services/api/admin/sample";
import SampleTab from "@/components/Tabs/SampleTab";
import Textarea from "@/shared/Textarea/Textarea";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";

export default function Page() {
    const queryClient = useQueryClient();
    const {data: data} = useQuery({
        queryKey: [`sample-info`],
        queryFn: () => find(),
        staleTime: 5000,
    });

    async function submit(e: FormData) {
        let response = await set(
            e.get("content") as string,
        )
        queryClient.refetchQueries(['sample-info']);

        toast.success(response?.message as string)
    }

    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "پروژه های تجهیز شده",
                href: "sample"
            }
        ]}/>
        <Panel>
            <PageTitle>
                پروژه های تجهیز شده
            </PageTitle>
            <SampleTab/>
            <div>
                <form action={submit}>
                    <label>محتوا</label>
                    <Textarea name={"content"} defaultValue={data?.content}>

                    </Textarea>
                    <ButtonSecondary>
                        ذخیره
                    </ButtonSecondary>
                </form>
            </div>
        </Panel>

    </>)
}
