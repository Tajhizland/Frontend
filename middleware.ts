import {NextResponse} from 'next/server'
import type {NextRequest} from 'next/server'
import {me} from "@/services/api/auth/me";

 export async function middleware(request: NextRequest) {

    const ME = await me();
    if (ME.status != 200 ) {
        return NextResponse.redirect(new URL('/auth/login', request.url))
    }

}
export const config = {
    matcher: ['/admin/:path*'],
}
