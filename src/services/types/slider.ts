import {BaseSlider} from "@/services/types/baseSlider";

export interface SliderResponse extends BaseSlider {}

export interface SliderStoreDto {
    title: string;
    url: string;
    type: string;
    status: number | string;
    image: File | null;
}

export interface SliderUpdateDto {
    title: string;
    url: string;
    type: string;
    status: number | string;
    image: File | null;
}
