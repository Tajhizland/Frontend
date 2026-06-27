import {defineColumns, defineActions} from "@/shared/Table/types";
import {FaEye} from "react-icons/fa";
import {CommentResponse} from "@/services/types/comment";

export const columns = defineColumns<CommentResponse>([

    {key: 'id', header: 'شناسه', editable: false},
    {key: 'user', header: 'کاربر', editable: false},
    {key: 'product_id', header: 'شناسه محصول', editable: false},
    {key: 'rating', header: 'امتیاز', editable: false},
     {key: 'status', header: 'وضعیت', editable: false},
    {key: 'created_at', header: 'تاریخ ایجاد', editable: false},

]);
export const actions = defineActions<CommentResponse>([

    {
        label: <FaEye/>,
        href: (row) => `comment/show/${row.id}`,
    },
])
