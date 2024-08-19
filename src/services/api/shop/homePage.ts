import axios, {ServerResponse} from "@/services/axios";
import {HomePageResponse} from "@/services/types/homePage";

export const homePage = async <T extends ServerResponse<HomePageResponse>>
() => {
    return axios.get("homepage")
        .then((res) => res?.data?.result)
};
