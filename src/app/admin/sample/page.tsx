"use client"
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import {useQuery} from "@tanstack/react-query";
import {useApiMutation} from "@/hooks/useApiMutation";
import {find, set} from "@/services/api/admin/sample";
import SampleTab from "@/components/Tabs/SampleTab";
import Textarea from "@/shared/Textarea/Textarea";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";

export default function Page() {
    const {data: data} = useQuery({
        queryKey: [`sample-info`],
        queryFn: () => find(),
        staleTime: 5000,
    });

    const saveMutation = useApiMutation((form: FormData) => set(form.get("content") as string), {
        invalidate: [["sample-info"]],
    });

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
                <form action={(form) => saveMutation.mutate(form)}>
                    <label>محتوا</label>
                    <Textarea name={"content"} defaultValue={data?.content}>

                    </Textarea>
                    <ButtonSecondary loading={saveMutation.isPending}>
                        ذخیره
                    </ButtonSecondary>
                </form>
            </div>
        </Panel>

    </>)
}
