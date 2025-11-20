// import {NextResponse} from 'next/server'
// import type {NextRequest} from 'next/server'
// export async function middleware(request: NextRequest) {
//     const token = request.cookies.get('token')?.value;
//     try {
//         const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_API_URL + "auth/me", {
//             headers: {
//                 "Authorization": 'Bearer ' + token
//             }
//         });
//         const res = await response.json();
//         if (!res.success) {
//             return NextResponse.rewrite(new URL('/403', request.url));
//         }
//         if(res.result.data.role!="admin") {
//             return NextResponse.rewrite(new URL('/403', request.url));
//         }
//         return NextResponse.next();
//
//     } catch (err) {
//         console.error(err);
//         return NextResponse.rewrite(new URL('/403', request.url));
//     }
// }
//
// export const config = {
//     matcher: ['/admin/:path*'],
// }


import {NextResponse} from 'next/server'
import type {NextRequest} from 'next/server'

export async function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value;
    return NextResponse.next();

    try {
        const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_API_URL + "auth/me", {
            headers: {"Authorization": 'Bearer ' + token}
        });

        const res = await response.json();
        if (!res.success) return NextResponse.rewrite(new URL('/403', request.url));
        if (res.result.data.role != "admin") return NextResponse.rewrite(new URL('/403', request.url));

        const url = request.nextUrl.clone();
        const pathname = url.pathname;
        const user = res.result.data;
        const permissions = user.roles?.permissions?.data?.map((p: any) => p.value) || [];

        // مسیر واقعی بدون "/admin"
        const currentPath = pathname.replace(/^\/admin\//, "");

        // بررسی تطبیق دقیق یا بر اساس الگو
        const hasAccess = permissions.some((perm: string) => {
            // تبدیل perm به regex pattern — مثل product/edit/[row] → ^product/edit/[^/]+$
            const pattern = "^" + perm.replace(/\[.*?\]/g, "[^/]+") + "$";
            const regex = new RegExp(pattern);
            return regex.test(currentPath);
        });


        if (!hasAccess) {
            return NextResponse.rewrite(new URL('/403', request.url));
        }

        return NextResponse.next();

    } catch (err) {
        console.error(err);
        return NextResponse.rewrite(new URL('/403', request.url));
    }
}

export const config = {
    matcher: ['/admin/:path*'],
};
