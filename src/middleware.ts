import {NextResponse} from 'next/server'
import type {NextRequest} from 'next/server'
export async function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value;
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_API_URL + "auth/me", {
            headers: {
                "Authorization": 'Bearer ' + token
            }
        });
        const res = await response.json();
        if (!res.success) {
            return NextResponse.rewrite(new URL('/503', request.url));
        }
        if(res.result.data.role!="admin") {
            return NextResponse.rewrite(new URL('/503', request.url));
        }
        return NextResponse.next();

    } catch (err) {
        console.error(err);
        return NextResponse.rewrite(new URL('/503', request.url));
    }
}

export const config = {
    matcher: ['/admin/:path*'],
}
