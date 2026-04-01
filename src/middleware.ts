import {
    NextRequest,
    NextResponse
} from 'next/server'

//todo: extract
const PROTECTED_ROUTES = [
    '/dashboard',
    '/profile',
    '/check-in',
    '/insights',
    '/progress',
    '/community',
    '/chat'
]

const AUTH_ROUTES = ['/login', '/signup']

// todo - extract middleware
export const middleware = (
    request: NextRequest
) => {
    const path = request.nextUrl.pathname
    const sessionCookie = request.cookies.get(
        'accessToken'
    )?.value

    const isProtectedRoute =
        PROTECTED_ROUTES.some(
            (route) => path.startsWith(route)
        )

    if (isProtectedRoute && !sessionCookie) {
        return NextResponse.redirect(
            new URL('/login', request.url)
        )
    }

    const isAuthRoute = AUTH_ROUTES.includes(
        path
    )

    if (isAuthRoute && sessionCookie) {
        return NextResponse.redirect(
            new URL('/dashboard', request.url)
        )
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)'
    ]
}
