"use client"
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Form from "@/app/admin/cast-category/Form";
import {store} from "@/services/api/admin/castCategory";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {useMutation} from "react-query";

export default function Page() {
    const router = useRouter();
    const [progress, setProgress] = useState(0);

    const storeCast = useMutation({
        mutationKey: [`store-cast-category`],
        mutationFn: async (formData: any) => {
            return store({...formData, setProgress: setProgress});
        },
        onSuccess: (response) => {
            if (response.success) {
                toast.success(response.message as string);
                router.push("/admin/cast-category");
            }
        },
    });

    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "دسته tajhizcast",
                href: "tajhizcast-category"
            },
            {
                title: "افزودن دسته tajhizcast جدید",
                href: "tajhizcast-category/create"
            }
        ]}/>
        <Panel>
            <PageTitle>
                ایجاد دسته cast جدید
            </PageTitle>
            <div>
                <Form submit={storeCast.mutateAsync} loading={storeCast.isLoading}/>
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
