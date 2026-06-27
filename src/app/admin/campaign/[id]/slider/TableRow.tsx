import {defineColumns} from "@/shared/Table/types";
import Badge from "@/shared/Badge/Badge";
import {CampaignSliderResponse} from "@/services/types/campaignSlider";

export const columns = defineColumns<CampaignSliderResponse>([

    {key: 'id', header: 'شناسه', editable: false},
    {key: 'title', header: 'عنوان', editable: false},
    {key: 'url', header: 'آدرس ', editable: false},
    {key: 'type', header: 'نمایش برای ', editable: false},
    {
        key: 'status',
        header: 'وضعیت',
        editable: true,
        filter: 'select',
        options: [
            {
                label: "فعال",
                value: 1
            },
            {
                label: "غیر فعال",
                value: 0
            }],
        render: (row) => Number(row.status) === 1 ? <Badge name={"فعال"} color={"green"}/> :
            <Badge name={"غیر‌‌فعال"} color={"red"}/>,

    },

    {key: 'created_at', header: 'تاریخ ایجاد', editable: false},


]);
