import {
    NextRequest,
    NextResponse
} from 'next/server'

import {authRoutes} from '@/constants/proxyRoutes'

/**
 * Redirects authenticated users away from auth routes
 * @param request - Next.js request object
 * @param next - Next.js response object to modify
 * @returns Modified response or redirect to dashboard if authenticated on /login or /signup
 */
export const authRouteMiddleware = (
    request: NextRequest,
    next: NextResponse
): NextResponse => {
    const sessionCookie = request.cookies.get(
        'accessToken'
    )?.value

    const pathname = request.nextUrl.pathname
    const isAuthRoute = authRoutes.includes(
        pathname
    )

    if (
        isAuthRoute &&
        sessionCookie
    ) {
        return NextResponse.redirect(
            new URL('/dashboard', request.url)
        )
    }

    return next
}
