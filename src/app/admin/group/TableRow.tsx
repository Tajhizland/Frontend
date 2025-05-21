import {Column, DataTableButtons} from "@/shared/DataTable/type";
import {HiMiniPencil} from "react-icons/hi2";
import Badge from "@/shared/Badge/Badge";
import {UrlObject} from "node:url";
import {ProductResponse} from "@/services/types/product";
import {BsCoin} from "react-icons/bs";
import {useState} from "react";

export const columns: Column<ProductResponse>[] = [

    {key: 'id', header: 'شناسه', filterType: 'input', editable: false},
    {key: 'name', header: 'نام محصول', filterType: 'input', editable: true},
    {key: 'view', header: 'تعداد بازدید', filterType: 'input', editable: false},
    {key: 'url', header: 'آدرس محصول', filterType: 'input', editable: true},
    {
        key: 'status',
        header: 'وضعیت',
        editable: true,
        filterType: 'select',
        selectOptions: [
            {
                label: "فعال",
                value: 1
            },
            {
                label: "غیر فعال",
                value: 0
            }],
        render: (value) => value == 1 ? <Badge name={"فعال"} color={"green"}/> :
            <Badge name={"غیر‌‌فعال"} color={"red"}/>,

    },
    {key: 'category', header: 'دسته محصول', filterType: 'input', editable: true},
    {key: 'brand_name', header: 'برند محصول', filterType: 'input', editable: true},
    {key: 'created_at', header: 'تاریخ ایجاد', filterType: 'input', editable: false},

];
export const buttons: DataTableButtons[] = [
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
        label: <BsCoin   className={"text-black w-5 h-5"} title={"ویرایش قیمت"}/>,
        type: "link",
        colorClass: "bg-white text-white border border-slate-900 outline-none ",
        href: (value: any): UrlObject => {
            return {
                pathname: 'product/color/' + value,
            };
        }
    }, {
        label: <BsCoin   className={"text-black w-5 h-5"} title={"ویرایش قیمت"}/>,
        type: "action",
        colorClass: "bg-white text-white border border-slate-900 outline-none ",
        action:(id:number)=>{
            console.log(id);
        }
    },
]
