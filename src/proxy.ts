import { NextRequest, NextResponse } from 'next/server'

import { localeMiddleware } from '@/middleware/locale'

export const proxy = (
    request: NextRequest
) => {
    let next = NextResponse.next()
    next = localeMiddleware(request, next)

    return next
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)'
    ]
}
