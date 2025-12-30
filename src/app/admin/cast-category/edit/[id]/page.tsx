"use client"
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Form from "@/app/admin/cast-category/Form";
import {findById, update} from "@/services/api/admin/castCategory";
import toast from "react-hot-toast";
import {useParams} from "next/navigation";
import {useMutation, useQuery} from "react-query";
import {useState} from "react";

export default function Page() {
    const {id} = useParams();
    const [progress, setProgress] = useState(0);

    const {data: data} = useQuery({
        queryKey: [`cast-category-info`, Number(id)],
        queryFn: () => findById(Number(id)),
        staleTime: 5000,
    });

    const updateCast = useMutation({
        mutationKey: [`update-cast-category`],
        mutationFn: async (formData: any) => {
            return update({id: Number(id), ...formData, setProgress: setProgress});
        },
        onSuccess: (response) => {
            if (response.success) {
                toast.success(response.message as string);
            }
        },
    });

    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "دسته tajhizcast",
                href: "tajhizcast-category",
            },
            {
                title: "ویرایش tajhizcast",
                href: "tajhizcast-category/edit/" + id
            }
        ]}/>
        <Panel>
            <PageTitle>
                ویرایش دسته cast
            </PageTitle>
            <div>
                <Form submit={updateCast.mutateAsync} data={data} loading={updateCast.isLoading}/>
            </div>

            {progress > 0 && <div className="w-full bg-gray-200 rounded-md mt-4">
                <div
                    className="bg-[#fcb415] text-xs font-medium text-white text-center p-1 leading-none rounded-md"
                    style={{width: `${progress}%`}}
                >
                    {progress}%
                </div>
            </div>}
        </Panel>
    </>)
}
