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
import {createRef, Fragment, useEffect, useState} from "react";
import NcModal from "@/shared/NcModal/NcModal";
import {findById, updateColorPrice} from "@/services/api/admin/color";
import {findById as FindProduct} from "@/services/api/admin/product";

import Input from "@/shared/Input/Input";
import {useQuery, useQueryClient} from "react-query";
import Spinner from "@/shared/Loading/Spinner";
import Select from "@/shared/Select/Select";
import PersianDatePicker from "@/shared/DatePicker/PersianDatePicker";
import {FaEye} from "react-icons/fa";
import {useRouter} from "next/navigation";

export default function Page() {
    const [modal, setModal] = useState(false)
    const [productId, setProductID] = useState<number>()
    const [sumColorSize, setSumColorSize] = useState<number>(0)
    const queryClient = useQueryClient();
    const dateRef = createRef<HTMLInputElement>();
    const router = useRouter();

    async function submit(e: ProductResponse) {

        let response = await update(
            {
                id: e.id,
                name: e.name,
                url: e.url,
                status: e.status,
                type: e.type,
                brand_id: e.brand_id,
                is_stock: Number(e.is_stock),
                description: e.description,
                meta_description: e.meta_description,
                meta_title: e.meta_title,
                guaranty_id: JSON.stringify(e.guaranty_id,) as string,
                study: e.study,
                guaranty_time: e.guaranty_time,
                categoryId: JSON.stringify(e.category_ids) as string,
                review: e.review,
                stock_of: e.stock_of,
                testing_time: e.testing_time,
                weight: e.weight,
                length: e.length,
                height: e.height,
                width: e.width,
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
                status: Number(e.get(`color[${i}][status]`)),
                stock: Number(e.get(`color[${i}][stock]`)),
                delivery_delay: Number(e.get(`color[${i}][delivery_delay]`)),
                discount_expire_time: (e.get(`color[${i}][discount_expire_time]`)) + "",
            };

            colors.push(colorData);
        }

        const response = await updateColorPrice({
            color: colors,
        });
        toast.success(response?.message as string)
        setModal(false);
        queryClient.invalidateQueries(['color-info']);

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
        }, {
            label: <BsCoin className={"text-black w-5 h-5"} title={"ویرایش قیمت"}/>,
            type: "action",
            colorClass: "bg-white text-white border border-slate-900 outline-none ",
            action: (id: number) => {
                setProductID(id);
                setModal(true);
            }
        },
        {
            label: <FaEye className={"text-black w-5 h-5"} title={"مشاهده"}/>,
            type: "action",
            colorClass: "bg-white text-white border border-slate-900 outline-none ",
            action: async (id: number) => {
                let product = await FindProduct(id);
                if (product) {
                    window.open(`/product/${product.url}`, '_blank');
                }
            }
        },
    ]
    const {data: colors, isLoading: isLoading} = useQuery({
        queryKey: [`color-info`, productId, modal],
        queryFn: () => findById(productId ?? 0),
        staleTime: 5000,
        enabled: !!productId
    });


    const [discountExpires, setDiscountExpires] = useState<string[]>([]);

    useEffect(() => {
        if (colors) {
            setDiscountExpires(colors.map(c => c.discount_expire_time ?? ''));
        }
    }, [colors]);

    const handleChangeDiscountExpire = (index: number, date: string) => {
        setDiscountExpires(prev => {
            const newArr = [...prev];
            newArr[index] = date;
            return newArr;
        });
    };

    const renderContent = () => {
        if (!productId)
            return;

        if (isLoading)
            return <Spinner/>
        setSumColorSize(colors?.length ?? 0);
        return (<>
            <strong className={"text-center mx-auto flex justify-center"}>
                {colors && colors[0]?.product?.name}
            </strong>
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
                                    <label>زمان انقضای تخفیف</label>
                                    <PersianDatePicker
                                        value={discountExpires[index] ?? item.discount_expire_time_fa}
                                        onChange={(date) => handleChangeDiscountExpire(index, date)}
                                    />
                                    <input
                                        type="hidden"
                                        name={`color[${index}][discount_expire_time]`}
                                        value={discountExpires[index] ?? ''}
                                        readOnly
                                    />
                                </div>
                                <div>
                                    <label>قیمت پس از تخفیف</label>
                                    <Input name={`color[${index}][discount]`} defaultValue={item.simple_discount}/>
                                </div>

                                <div>
                                    <label>وضعیت رنگ</label>
                                    <Select name={`color[${index}][status]`}>
                                        <option value={1} selected={item.status == 1}>فعال</option>
                                        <option value={0} selected={item.status == 0}>غیر فعال</option>
                                        <option value={2} selected={item.status == 2}>محدودیت</option>
                                    </Select>
                                </div>
                                <div>
                                    <label>موجودی</label>
                                    <Input name={`color[${index}][stock]`}
                                           defaultValue={item.stock ?? 0}/>
                                </div>
                                <div>
                                    <label>زمان آماده سازی</label>
                                    <Input name={`color[${index}][delivery_delay]`}
                                           defaultValue={item.delivery_delay ?? 0}/>
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
