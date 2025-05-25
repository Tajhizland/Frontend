//@ts-nocheck
"use client"
import {useEffect} from "react";
import {chatInfo} from "@/services/api/auth/me";
import {useUser} from "@/services/globalState/GlobalState";

export default function GoftinoContainer() {
    const [user] = useUser();

    useEffect(() => {
        window.addEventListener('goftino_ready', function () {
            if(!Goftino.getUserId() || !user)
                return;
            let response = chatInfo({token:Goftino.getUserId()});
            response.then((res) => {
                Goftino.setUserId(res.token);
                Goftino.setUser({
                    name: user.name + " " + user.last_name,
                    email: user.email,
                    about: user.national_code,
                    phone: user.username,
                    forceUpdate: true,
                });
            })
        });
    },[user])
    return (<></>)
}
