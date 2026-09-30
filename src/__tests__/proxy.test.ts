// @vitest-environment node
import { NextRequest } from 'next/server'

import {
    describe,
    expect,
    it,
    vi
} from 'vitest'

vi.mock(
    '@/config',
    () => ({
        default: {
            sentryDsn: 'https://key@o1.ingest.us.sentry.io/1'
        },
        isDev: false
    })
)

import { config, proxy } from '@/proxy'

const CSP = 'content-security-policy'

const run = (path = '/dashboard', headers = {}) =>
    proxy(new NextRequest(`https://pulserehab.app${path}`, { headers }))

const nonceOf = (policy: string) =>
    /'nonce-([^']+)'/.exec(policy)?.[1]

describe('proxy', () => {
    it('sets an enforced policy with a nonce on the response', () => {
        const policy = run().headers.get(CSP)!

        expect(nonceOf(policy)).toBeTruthy()
        expect(policy).toContain("script-src 'self' 'nonce-")
        expect(policy).toContain("'strict-dynamic'")
        expect(policy).not.toContain("script-src 'self' 'unsafe-inline'")
    })

    it('never uses the report-only header, so the policy is enforced', () => {
        expect(run().headers.get('content-security-policy-report-only'))
            .toBeNull()
    })

    it('forwards the same nonce and policy to Next on the request', () => {
        const response = run()
        const policy = response.headers.get(CSP)!
        const nonce = nonceOf(policy)

        // Next turns overridden request headers into x-middleware-request-*
        expect(response.headers.get('x-middleware-request-x-nonce'))
            .toBe(nonce)
        expect(response.headers.get(`x-middleware-request-${CSP}`))
            .toBe(policy)
    })

    it('generates a different nonce for every request', () => {
        const nonces = new Set(
            Array.from(
                { length: 20 },
                () => nonceOf(run().headers.get(CSP)!)
            )
        )

        expect(nonces.size).toBe(20)
    })

    it('ignores a nonce or policy supplied by the client', () => {
        const response = run('/dashboard', {
            'x-nonce': 'attacker',
            [CSP]: "script-src 'unsafe-inline'"
        })
        const policy = response.headers.get(CSP)!

        expect(policy).not.toContain('attacker')
        expect(response.headers.get('x-middleware-request-x-nonce'))
            .not.toBe('attacker')
        expect(response.headers.get(`x-middleware-request-${CSP}`))
            .toBe(policy)
    })

    it('still sets the default locale cookie', () => {
        expect(run().cookies.get('NEXT_LOCALE')?.value).toBe('he-IL')
    })

    it('allows the configured Sentry host for connections', () => {
        expect(run().headers.get(CSP))
            .toContain('https://o1.ingest.us.sentry.io')
    })
})

describe('proxy matcher', () => {
    const [matcher] = config.matcher
    const source = new RegExp(`^${matcher.source}$`)

    it('runs on pages and skips api, static assets and the favicon', () => {
        expect(source.test('/dashboard')).toBe(true)
        expect(source.test('/community/post/1')).toBe(true)
        expect(source.test('/api/v2/auth/me')).toBe(false)
        expect(source.test('/_next/static/chunk.js')).toBe(false)
        expect(source.test('/favicon.ico')).toBe(false)
    })

    it('skips router prefetch requests', () => {
        const missing = matcher.missing.map((rule) => rule.key)

        expect(missing).toContain('next-router-prefetch')
        expect(missing).toContain('purpose')
    })
})
