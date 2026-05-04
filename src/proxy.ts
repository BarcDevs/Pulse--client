import { NextRequest, NextResponse } from 'next/server'

import { authRouteMiddleware } from '@/middleware/authRouteMiddleware'
import { localeMiddleware } from '@/middleware/locale'
import { protectedRouteMiddleware } from '@/middleware/protectedRouteMiddleware'

export const proxy = (
    request: NextRequest
) => {
    let next = NextResponse.next()
    next = localeMiddleware(request, next)
    next = protectedRouteMiddleware(request, next)
    next = authRouteMiddleware(request, next)

    return next
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)'
    ]
}
