import {Column, DataTableButtons} from "@/shared/DataTable/type";
import {HiMiniPencil} from "react-icons/hi2";
import Badge from "@/shared/Badge/Badge";
import {UrlObject} from "node:url";
import {CampaignSliderResponse} from "@/services/types/campaignSlider";

export const columns: Column<CampaignSliderResponse>[] = [

    {key: 'id', header: 'شناسه', filterType: 'input', editable: false},
    {key: 'title', header: 'عنوان', filterType: 'input', editable: false},
    {key: 'url', header: 'آدرس ', filterType: 'input', editable: false},
    {key: 'type', header: 'نمایش برای ', filterType: 'input', editable: false},
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

    {key: 'created_at', header: 'تاریخ ایجاد', filterType: 'input', editable: false},


];
