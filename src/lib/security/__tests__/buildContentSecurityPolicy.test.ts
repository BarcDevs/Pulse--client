import {
    describe,
    expect,
    it
} from 'vitest'

import { buildContentSecurityPolicy } from '@/lib/security/buildContentSecurityPolicy'

import { TRUSTED_IMAGE_HOSTS } from '@/constants/trustedImageHosts'

// The production DSN host has a region label (.us.), which the old
// wildcard https://*.ingest.sentry.io does not match
const productionDsn =
    'https://94ccf213e00340996348fa63f2605456@o4506954726703104.ingest.us.sentry.io/4506954741055488'
const sentryOrigin = 'https://o4506954726703104.ingest.us.sentry.io'

const build = (overrides = {}) =>
    buildContentSecurityPolicy({
        nonce: 'abc123',
        isDev: false,
        sentryDsn: productionDsn,
        ...overrides
    })

const directive = (policy: string, name: string) =>
    policy
        .split('; ')
        .find((part) => part.startsWith(`${name} `))
        ?.slice(name.length + 1)
        .split(' ') ?? []

describe('buildContentSecurityPolicy', () => {
    it('allows scripts only by nonce and never unsafe-inline', () => {
        const scripts = directive(build(), 'script-src')

        expect(scripts).toContain("'nonce-abc123'")
        expect(scripts).toContain("'strict-dynamic'")
        expect(scripts).not.toContain("'unsafe-inline'")
        expect(scripts).not.toContain("'unsafe-eval'")
    })

    it('puts the given nonce in the policy and nowhere else', () => {
        expect(build({ nonce: 'one' })).toContain("'nonce-one'")
        expect(build({ nonce: 'one' })).not.toContain('abc123')
        expect(build({ nonce: 'one' })).not.toBe(build({ nonce: 'two' }))
    })

    it('allows unsafe-eval in development only', () => {
        expect(directive(build({ isDev: true }), 'script-src'))
            .toContain("'unsafe-eval'")
        expect(directive(build({ isDev: false }), 'script-src'))
            .not.toContain("'unsafe-eval'")
    })

    it('allows the production Sentry host, which the old wildcard missed', () => {
        expect(directive(build(), 'connect-src')).toContain(sentryOrigin)
    })

    it('does not allow a Sentry origin without a usable DSN', () => {
        ;['', 'not a url'].forEach((sentryDsn) => {
            const connect = directive(build({ sentryDsn }), 'connect-src')

            expect(connect.some((source) => source.includes('sentry')))
                .toBe(false)
        })
    })

    it('reports violations to the Sentry security endpoint of the DSN', () => {
        expect(directive(build(), 'report-uri')).toEqual([
            `${sentryOrigin}/api/4506954741055488/security/?sentry_key=94ccf213e00340996348fa63f2605456`
        ])
    })

    it('adds no report-uri without a usable DSN', () => {
        ;['', 'not a url'].forEach((sentryDsn) => {
            expect(build({ sentryDsn })).not.toContain('report-uri')
        })
    })

    it('allows the location search host for fetch', () => {
        expect(directive(build(), 'connect-src'))
            .toContain('https://nominatim.openstreetmap.org')
    })

    it('allows exactly the trusted image hosts over https', () => {
        const images = directive(build(), 'img-src')

        TRUSTED_IMAGE_HOSTS.forEach((host) => {
            expect(images).toContain(`https://${host}`)
        })
        expect(images).not.toContain('https:')
        expect(images).not.toContain('*')
    })

    it('blocks framing, plugins and base/form hijacking', () => {
        const policy = build()

        expect(directive(policy, 'frame-ancestors')).toEqual(["'none'"])
        expect(directive(policy, 'object-src')).toEqual(["'none'"])
        expect(directive(policy, 'base-uri')).toEqual(["'self'"])
        expect(directive(policy, 'form-action')).toEqual(["'self'"])
        expect(directive(policy, 'default-src')).toEqual(["'self'"])
    })
})
