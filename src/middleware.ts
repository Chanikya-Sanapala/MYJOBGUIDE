import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Redirect legacy category URL: /category/Service%20Desk%20Jobs -> /category/Graduates
    // Browsers usually decode the %20 automatically in the address bar, but the request pathname might still have it or spaces.
    // We handle both encoded and decoded versions just in case.

    if (pathname.includes('/category/Service%20Desk%20Jobs') || pathname.includes('/category/Service Desk Jobs')) {
        const url = request.nextUrl.clone();
        url.pathname = '/category/Graduates';
        return NextResponse.redirect(url, 301); // 301 Permanent Redirect
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        // Match all request paths except for the ones starting with:
        // - api (API routes)
        // - _next/static (static files)
        // - _next/image (image optimization files)
        // - favicon.ico (favicon file)
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
