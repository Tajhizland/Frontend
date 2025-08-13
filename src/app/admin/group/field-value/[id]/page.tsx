"use client"
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import {useParams} from "next/navigation";
import {useQuery} from "react-query";
import GroupTab from "@/components/Tabs/GroupTab";
import {getFieldValue} from "@/services/api/admin/productGroup";
import Form from "@/app/admin/group/field-value/[id]/Form";

export default function Page() {
    const {id} = useParams();

    const {data} = useQuery({
        queryKey: [`group-field-value`, Number(id)],
        queryFn: () => getFieldValue(Number(id)),
        staleTime: 5000,
    });


    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "   محصول گروهی",
                href: "group"
            },
            {
                title: " ویرایش محصول گروهی",
                href: "/"
            }
        ]}/>

        <Panel>
            <PageTitle>
                 ویرایش محصول گروهی
            </PageTitle>
            <GroupTab id={id + ""}/>
            <div className={"flex flex-col gap-2"}>
                {
                    data && data.value.data.map((item, index) => (
                        <div key={index}
                             className={"grid grid-cols-1 md:grid-cols-2 gap-5 border-b py-2 items-center justify-items-center"}>
                            <span className={"text-sm"}>
                                {item.product?.name}
                            </span>
                            <div className={"flex flex-col gap-2"}>
                                {data.fields.data.map((field, index2) => (
                                    <Form field={field} value={item} key={index2}/>
                                ))}
                            </div>
                        </div>
                    ))
                }
            </div>
        </Panel>

    </>)
}
