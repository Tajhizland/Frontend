import {defineColumns, defineActions} from "@/shared/Table/types";
import {FaEye} from "react-icons/fa";
import { ContactResponse } from "@/services/types/contact";

export const columns = defineColumns<ContactResponse>([

    {key: 'id', header: 'شناسه', editable: false},
    {key: 'name', header: 'نام', editable: false},
    {key: 'mobile', header: 'موبایل', editable: false},
    {key: 'concept', header: 'کانسپت', editable: false},
    {key: 'created_at', header: 'تاریخ ایجاد', editable: false},

]);
export const actions = defineActions<ContactResponse>([
    {
        label: <FaEye/>,
        href: (row) => `contact/show/${row.id}`,
    },
])
