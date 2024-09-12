import { OptionItemsResponse } from "./optionItem";

export type OptionResponse = {
    id: number;
    category_id: number;
    title: string;
    optionItems?:{data:OptionItemsResponse[]}
    status: number;
    created_at: string;
    updated_at: string;
};
