"use client";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import PageLink from "@/shared/PageLink/PageLink";
import ToolbarButton from "@/shared/Toolbar/ToolbarButton";
import { LuFileText } from "react-icons/lu";
import Table from "@/shared/Table/Table";
import {columns} from "@/app/admin/order/TableRow";
import {registerTapin, updateStatus, orderTable} from "@/services/api/admin/order";
import {OrderResponse} from "@/services/types/order";
import {toast} from "react-hot-toast";
import {defineActions} from "@/shared/Table/types";
import {FaEye} from "react-icons/fa";
import {useMutation} from "@tanstack/react-query";
import {useState} from "react";
import NcModal from "@/shared/NcModal/NcModal";
import TapinForm from "@/app/admin/order/TapinForm";

export default function Page() {
    const [tapinModal, setTapinModal] = useState<boolean>(false);
    const [orderId, setOrderId] = useState<number>();

    const changeStatus = (e: OrderResponse) => updateStatus(e.id, {status: e.status});

    const tapinRegisterMutation = useMutation({
        mutationKey: [`tapin-register`],
        mutationFn: async (formData: any) => {
            return registerTapin(orderId ?? 0, {...formData});
        },
        onSuccess: (response) => {
            toast.success(response?.message as string)
        },
    });

    const actions = defineActions<OrderResponse>([
        {
            label: <FaEye/>,
            href: (row) => `order/view/${row.id}`
        },
        {
            label: "ثبت تاپین",
            color: "primary",
            onClick: (row) => {
                setOrderId(row.id)
                setTapinModal(true)
            }
        },
    ])

    const renderContent = () => {
        return <div className={"text-right "}>
            {orderId && <TapinForm loading={tapinRegisterMutation.isPending}
                                   onClose={() => setTapinModal(false)}
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

            <PageLink>
                <ToolbarButton href="/admin/order/digipay" icon={<LuFileText className="w-4 h-4" />}>
                    گزارش دیجی پی
                </ToolbarButton>
            </PageLink>

            <Table
                onEdit={changeStatus}
                fetcher={orderTable}
                columns={columns}
                actions={actions}
            />
        </Panel>
    </>)
}
