import { NextRequest, NextResponse } from 'next/server'

import { buildContentSecurityPolicy } from '@/lib/security/buildContentSecurityPolicy'

import appConfig, { isDev } from '@/config'

import { localeMiddleware } from '@/middleware/locale'

const CSP_HEADER = 'Content-Security-Policy'
const NONCE_HEADER = 'x-nonce'

export const proxy = (
    request: NextRequest
) => {
    const nonce = Buffer.from(crypto.randomUUID()).toString('base64')
    const policy = buildContentSecurityPolicy({
        nonce,
        isDev,
        sentryDsn: appConfig.sentryDsn
    })

    // Next reads the nonce from the CSP header of the request it renders
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set(NONCE_HEADER, nonce)
    requestHeaders.set(CSP_HEADER, policy)

    const next = localeMiddleware(
        request,
        NextResponse.next({ request: { headers: requestHeaders } })
    )
    next.headers.set(CSP_HEADER, policy)

    return next
}

export const config = {
    matcher: [
        {
            source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
            missing: [
                {
                    type: 'header',
                    key: 'next-router-prefetch'
                },
                {
                    type: 'header',
                    key: 'purpose',
                    value: 'prefetch'
                }
            ]
        }
    ]
}
