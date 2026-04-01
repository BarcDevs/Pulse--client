import {
    NextRequest,
    NextResponse
} from 'next/server'

import {handleAuthRoute} from '@/middleware/authRouteHandler'
import {handleProtectedRoute} from '@/middleware/protectedRouteHandler'

export const middleware = (
    request: NextRequest
) => {
    const sessionCookie = request.cookies.get(
        'accessToken'
    )?.value

    const protectedRouteResponse =
        handleProtectedRoute(
            request,
            sessionCookie
        )

    if (protectedRouteResponse)
        return protectedRouteResponse

    const authRouteResponse = handleAuthRoute(
        request,
        sessionCookie
    )

    if (authRouteResponse)
        return authRouteResponse

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)'
    ]
}
