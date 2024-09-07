import {NextResponse} from 'next/server'
import type {NextRequest} from 'next/server'
import {me} from "@/services/api/auth/me";
import axios, {SuccessResponseType} from "@/services/axios";
import {getCookie} from "cookies-next";
import {env} from "@headlessui/react/dist/utils/env";
export async function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value;
    console.log("TOOKEn",token)

    const me =await fetch(process.env.NEXT_PUBLIC_BACKEND_API_URL+"auth/me",{
        headers:{
            "Authorization": 'Bearer '+token
        }
    })
    let response=me.json();
    response.then((res)=>{
        if(res.success!=true)
        {
            return NextResponse.redirect(new URL('/503', request.url))

        }
    })
    response.catch((err)=>{

    })
    // if (ME.success!=true) {
    //     return NextResponse.redirect(new URL('/auth/login', request.url))
    // }

}
export const config = {
    matcher: ['/admin/:path*'],
}
