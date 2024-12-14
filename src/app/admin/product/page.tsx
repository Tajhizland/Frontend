"use client";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import PageLink from "@/shared/PageLink/PageLink";
import Link from "next/link";
import DataTable from "@/shared/DataTable/DataTable";
import {buttons, columns} from "@/app/admin/product/TableRow";
import {update} from "@/services/api/admin/product";
import {toast} from "react-hot-toast";
import {ProductResponse} from "@/services/types/product";
import {DataTableButtons} from "@/shared/DataTable/type";
import {HiMiniPencil} from "react-icons/hi2";
import {UrlObject} from "node:url";
import {BsCoin} from "react-icons/bs";
import {Fragment, useState} from "react";
import NcModal from "@/shared/NcModal/NcModal";
import {findById, updateColorPrice} from "@/services/api/admin/color";
import Input from "@/shared/Input/Input";
import {Label} from "@headlessui/react";
import {useQuery} from "react-query";
import Spinner from "@/shared/Loading/Spinner";

export default function Page() {
    const [modal, setModal] = useState(false)
    const [productId, setProductID] = useState<number>()
    const [sumColorSize, setSumColorSize] = useState<number>(0)

    async function submit(e: ProductResponse) {

        let response = await update(
            {
                id: e.id,
                name: e.name,
                url: e.url,
                status: e.status,
                brand_id: e.brand_id,
                description: e.description,
                meta_description: e.meta_description,
                meta_title: e.meta_title,
                guaranty_id: e.guaranty_id,
                study: e.study,
                guaranty_time:e.guaranty_time,
                categoryId: e.category_id + "" as string,
            }
        )
        toast.success(response?.message as string)
    }

    async function updateColor(e: FormData) {
        let colors = [];

        for (let i = 0; i < sumColorSize; i++) {
            const colorData = {
                id: Number(e.get(`color[${i}][id]`)),
                price: Number(e.get(`color[${i}][price]`)),
                discount: Number(e.get(`color[${i}][discount]`)),
            };

            colors.push(colorData);
        }

        const response = await updateColorPrice({
            color: colors,
        });

        toast.success(response?.message as string)
    }

    const buttons: DataTableButtons[] = [
        {
            label: <HiMiniPencil className={"text-black w-5 h-5"} title={"ویرایش"}/>,
            type: "link",
            colorClass: "bg-white text-white border border-slate-900 outline-none ",
            href: (value: any): UrlObject => {
                return {
                    pathname: 'product/edit/' + value,
                };
            }
        },  {
            label: <BsCoin className={"text-black w-5 h-5"} title={"ویرایش قیمت"}/>,
            type: "action",
            colorClass: "bg-white text-white border border-slate-900 outline-none ",
            action: (id: number) => {
                setProductID(id);
                setModal(true);
            }
        },
    ]
    const {data: colors, isLoading: isLoading} = useQuery({
        queryKey: [`color-info`, productId],
        queryFn: () => findById(productId ?? 0),
        staleTime: 5000,
        enabled: !!productId
    });

    const renderContent = () => {
        if (!productId)
            return;

        if (isLoading)
            return <Spinner/>
        setSumColorSize(colors?.length ?? 0);
        return (<>
            <form action={updateColor}>
                {colors && colors.map((item, index) => (
                    <Fragment key={index}>
                        <div className={"flex flex-col text-right gap-y-5"}>
                            <h4>{item.color_name}</h4>
                            <div className={"grid grid-cols-1 lg:grid-cols-2 gap-x-5"}>
                                <Input defaultValue={item.id} name={`color[${index}][id]`} type={"hidden"}/>
                                <div>
                                    <label>قیمت</label>
                                    <Input name={`color[${index}][price]`} defaultValue={item.price}/>
                                </div>
                                <div>
                                    <label>تخفیف</label>
                                    <Input name={`color[${index}][discount]`} defaultValue={item.discount}/>
                                </div>
                            </div>
                        </div>
                        <hr className="border-slate-200 my-5"/>

                    </Fragment>
                ))}
                <ButtonPrimary>ذخیره</ButtonPrimary>
            </form>
        </>)
    }

    return (<>
        <NcModal
            isOpenProp={modal}
            onCloseModal={() => {
                setModal(false)
            }}
            contentExtraClass="max-w-4xl"
            renderContent={renderContent}
            triggerText={""}
            modalTitle="تغییر قیمت"
            hasButton={false}

        />

        <Breadcrump breadcrumb={[
            {
                title: "محصولات",
                href: "product"
            }
        ]}/>

        <Panel>
            <PageTitle>
                مدیریت محصولات
            </PageTitle>
            <PageLink>
                <Link href={"/admin/product/create"}>
                    <ButtonPrimary> ایجاد</ButtonPrimary>
                </Link>
            </PageLink>
            <DataTable
                onEdit={submit}
                apiUrl={"admin/product/dataTable"}
                columns={columns}
                buttons={buttons}
            />
        </Panel>
    </>)
}
