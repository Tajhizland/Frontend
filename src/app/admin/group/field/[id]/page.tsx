"use client"
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import {findById, update} from "@/services/api/admin/product";
import {useState} from "react";
import {useParams} from "next/navigation";
import {useQuery, useQueryClient} from "react-query";
import toast from "react-hot-toast";
import GroupTab from "@/components/Tabs/GroupTab";
import {addField, deleteField, getField} from "@/services/api/admin/productGroup";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import {FaTrash} from "react-icons/fa";
import Input from "@/shared/Input/Input";

export default function Page() {
    const queryClient = useQueryClient();
    const [title, setTitle] = useState("")
    const {id} = useParams();

    const {data} = useQuery({
        queryKey: [`group-field`],
        queryFn: () => getField(Number(id)),
        staleTime: 5000,
    });

    async function submit(e: FormData) {
        let response = await addField(
            {
                groupId: Number(id),
                title: title
            }
        )
        queryClient.refetchQueries(['group-field']);

        setTitle("");
        toast.success(response?.message as string)
    }

    async function removeHandler(id: number) {
        let response = await deleteField(id);
        queryClient.refetchQueries(['group-field']);
        toast.success(response?.message as string)
    }

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
                <ButtonPrimary onClick={submit}>
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
                                removeHandler(item.id)
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
