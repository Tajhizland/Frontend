"use client";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Table from "@/shared/Table/Table";
import {columns} from "@/app/admin/order/TableRow";
import {registerTapin, updateStatus, orderTable} from "@/services/api/admin/order";
import {OrderResponse} from "@/services/types/order";
import {toast} from "react-hot-toast";
import {defineActions} from "@/shared/Table/types";
import {FaEye} from "react-icons/fa";
import {useMutation} from "react-query";
import {useState} from "react";
import NcModal from "@/shared/NcModal/NcModal";
import TapinForm from "@/app/admin/order/TapinForm";
import Link from "next/link";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";

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

            <div>
                <Link href={"/admin/order/digipay"}>
                    <ButtonPrimary>
                    گزارش دیجی پی
                    </ButtonPrimary>
                </Link>
            </div>

            <Table
                onEdit={changeStatus}
                fetcher={orderTable}
                columns={columns}
                actions={actions}
            />
        </Panel>
    </>)
}
