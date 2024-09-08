"use client"
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import {findById} from "@/services/api/admin/order";
import { useParams } from "next/navigation";
import {useQuery} from "react-query";

export default   function Page() {
    const { id } = useParams();

    const { data: data } = useQuery({
        queryKey: [`order-info`],
        queryFn: () => findById(Number(id)),
        staleTime: 5000,
    });

    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "سفارشات",
                href: "order"
            },
            {
                title: "مشاهده سفارش",
                href: "order/view/"+id
            }
        ]}/>
        <Panel>
            <PageTitle>
                مشاهده سفارش
            </PageTitle>
            <div>
             </div>
        </Panel>

    </>)
}
