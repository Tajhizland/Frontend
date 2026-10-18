import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {toFormData} from "@/services/http";
import {InstagramProfileResponse, InstagramProfileUpdateDto} from "@/services/types/instagramProfile";

export const getInstagramProfile = async () => {
    const response = await axios.get<ServerResponse<InstagramProfileResponse>, SuccessResponseType<ServerResponse<InstagramProfileResponse>>>("admin/instagram-profile");
    return response.data.result.data;
};

export const updateInstagramProfile = async (dto: InstagramProfileUpdateDto) => {
    const response = await axios.post<ServerResponse<InstagramProfileResponse>, SuccessResponseType<ServerResponse<InstagramProfileResponse>>>(
        "admin/instagram-profile", toFormData(dto, "PUT")
    );
    return response.data;
};
