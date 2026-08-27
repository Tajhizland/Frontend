"use client"
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import {findById, update} from "@/services/api/admin/product";
import {useState} from "react";
import {useParams} from "next/navigation";
import {useQuery} from "react-query";
import {useApiMutation} from "@/hooks/useApiMutation";
import toast from "react-hot-toast";
import GroupTab from "@/components/Tabs/GroupTab";
import {addField, deleteField, getField} from "@/services/api/admin/productGroup";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import {FaTrash} from "react-icons/fa";
import Input from "@/shared/Input/Input";

export default function Page() {
    const [title, setTitle] = useState("")
    const {id} = useParams();

    const {data} = useQuery({
        queryKey: ["group-field", Number(id)],
        queryFn: () => getField(Number(id)),
        staleTime: 5000,
    });

    const queryKey = ["group-field", Number(id)];

    const addMutation = useApiMutation(() => addField({groupId: Number(id), title}), {
        invalidate: [queryKey],
        onSuccess: () => setTitle(""),
    });

    const removeMutation = useApiMutation((fieldId: number) => deleteField(fieldId), {invalidate: [queryKey]});

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
                <Input value={title} onChange={(e) => {
                    setTitle(e.target.value)
                }}/>
                <ButtonPrimary onClick={() => addMutation.mutate()}>
                    ثبت
                </ButtonPrimary>
            </div>
            <hr/>
            <div className={"flex flex-col gap-2"}>
                {
                    data && data.map((item, index) => (
                        <div key={index} className={"flex justify-between items-center"}>
                            <span>
                                {item.title}
                            </span>
                            <ButtonPrimary onClick={() => {
                                removeMutation.mutate(item.id)
                            }}>
                                <FaTrash/>
                            </ButtonPrimary>
                        </div>
                    ))
                }
            </div>
        </Panel>

    </>)
}
