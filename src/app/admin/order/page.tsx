"use client";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import DataTable from "@/shared/DataTable/DataTable";
import {columns} from "@/app/admin/order/TableRow";
import {registerTapin, updateStatus} from "@/services/api/admin/order";
import {OrderResponse} from "@/services/types/order";
import {toast} from "react-hot-toast";
import {DataTableButtons} from "@/shared/DataTable/type";
import {FaEye} from "react-icons/fa";
import {UrlObject} from "node:url";
import {useMutation} from "react-query";
import {useState} from "react";
import NcModal from "@/shared/NcModal/NcModal";
import TapinForm from "@/app/admin/order/TapinForm";

export default function Page() {
    const [tapinModal, setTapinModal] = useState<boolean>(false);
    const [orderId, setOrderId] = useState<number>();

    async function changeStatus(e: OrderResponse) {
        let response = await updateStatus({
            id: e.id,
            status: e.status
        })
        toast.success(response?.message as string);
    }

    const tapinRegisterMutation = useMutation({
        mutationKey: [`tapin-register`],
        mutationFn: async (formData: any) => {
            return registerTapin(orderId ?? 0, {...formData});
        },
        onSuccess: (response) => {
            toast.success(response?.message as string)
        },
    });

    const buttons: DataTableButtons[] = [
        {
            label: <FaEye/>,
            colorClass: "bg-slate-900 text-white",
            type: "link",
            href: (value: any): UrlObject => {
                return {
                    pathname: 'order/view/' + value,
                };
            }
        },
        {
            label: "ثبت تاپین",
            colorClass: "bg-slate-900 text-white !text-xs",
            type: "action",
            action: (id: number) => {
                setOrderId(id)
                setTapinModal(true)
            }
        },
    ]

    const renderContent = () => {
        return <div className={"text-right "}>
            {orderId && <TapinForm loading={tapinRegisterMutation.isLoading}
                                   submit={tapinRegisterMutation.mutateAsync}/>}
        </div>
    }
    return (<>
        <NcModal
            isOpenProp={tapinModal}
            onCloseModal={() => {
                setTapinModal(false)
            }}
            contentExtraClass="max-w-4xl"
            renderContent={renderContent}
            triggerText={""}
            modalTitle="ثبت در تاپین"
            hasButton={false}

        />
        <Breadcrump breadcrumb={[
            {
                title: "سفارشات",
                href: "order"
            }
        ]}/>
        <Panel>
            <PageTitle>
                مدیریت سفارشات
            </PageTitle>

            <DataTable
                onEdit={changeStatus}
                apiUrl={"admin/order/dataTable"}
                columns={columns}
                buttons={buttons}
            />
        </Panel>
    </>)
}
