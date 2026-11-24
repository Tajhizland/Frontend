"use client";

import {useState} from "react";
import Image from "next/image";
import fallbackLogo from "@/images/samandehi.webp";

export default function SamandehiLogo() {
    const [failed, setFailed] = useState(false);

    return (
        <Image
            className="h-[100px] w-[100px] object-contain"
            referrerPolicy="origin"
            id="rgvjjxlzsizprgvjnbqejzpe"
            src={failed ? fallbackLogo : "https://logo.samandehi.ir/logo.aspx?id=319327&p=qftinbpdbsiyqftiodrfyndt"}
            alt="samandehi"
            width={100}
            height={100}
            unoptimized
            onError={failed ? undefined : () => setFailed(true)}
        />
    );
}
