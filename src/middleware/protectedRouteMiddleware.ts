import {
    NextRequest,
    NextResponse
} from 'next/server'

import { protectedRoutes } from '@/constants/proxyRoutes'

/**
 * Protects routes requiring authentication
 * @param request - Next.js request object
 * @param next - Next.js response object to modify
 * @returns Modified response or redirect to login if unauthenticated on protected route
 */
export const protectedRouteMiddleware = (
    request: NextRequest,
    next: NextResponse
): NextResponse => {
    const sessionCookie = request.cookies.get(
        'accessToken'
    )?.value

    const pathname = request.nextUrl.pathname
    const isProtectedRoute = protectedRoutes.some(
        (route) => pathname.startsWith(route)
    )

    if (
        isProtectedRoute
        && !sessionCookie
    ) {
        return NextResponse.redirect(
            new URL('/login', request.url)
        )
    }

    return next
}
