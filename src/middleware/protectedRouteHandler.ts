import {
    NextRequest,
    NextResponse
} from 'next/server'

import {protectedRoutes} from '@/constants/proxyRoutes'

export const handleProtectedRoute = (
    request: NextRequest,
    sessionCookie: string | undefined
): NextResponse | null => {
    const pathname = request.nextUrl.pathname

    const isProtectedRoute = protectedRoutes.some(
        (route) => pathname.startsWith(route)
    )

    if (
        isProtectedRoute &&
        !sessionCookie
    ) return NextResponse.redirect(
        new URL('/login', request.url)
    )

    return null
}
