import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import { ColorResponse } from "@/services/types/color";
import {ColorSetDto, ColorUpdateColorPriceDto} from "@/services/types/color";

export const set = async <T extends ServerResponse<unknown>>(dto: ColorSetDto) => {

    return axios.post<T, SuccessResponseType<T>>("admin/product/color", dto, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
        .then((res) => res?.data);
};
// PHP بدنه‌ی multipart/form-data را فقط برای POST پارس می‌کند؛ روی PUT بدنه خالی به
// کنترلر می‌رسد و درخواست بدون هیچ تغییری «موفق» برمی‌گردد. پس JSON می‌فرستیم.
export const updateColorPrice = async <T extends ServerResponse<unknown>>(dto: ColorUpdateColorPriceDto) => {

    return axios.put<T, SuccessResponseType<T>>("admin/product/color", dto)
        .then((res) => res?.data);
};

export const findById = async <T extends ServerResponse<ColorResponse[]>>
(
    id:number|string
) => {
    return axios.get<T, SuccessResponseType<T>>("admin/product/"+id+"/color" )
        .then((res) => res?.data?.result?.data)
};
