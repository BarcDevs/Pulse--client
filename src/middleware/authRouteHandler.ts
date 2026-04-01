import {
    NextRequest,
    NextResponse
} from 'next/server'

import {authRoutes} from '@/constants/proxyRoutes'

export const handleAuthRoute = (
    request: NextRequest,
    sessionCookie: string | undefined
): NextResponse | null => {
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

    return null
}
