import {
    describe,
    expect,
    it
} from 'vitest'

import type { Breadcrumb, Event } from '@sentry/nextjs'

import { scrubBreadcrumb } from '@/lib/sentry/scrubBreadcrumb'
import { scrubEvent } from '@/lib/sentry/scrubEvent'
import { scrubSpan } from '@/lib/sentry/scrubSpan'
import { stripQueryString } from '@/lib/sentry/stripQueryString'

const nominatim =
    'https://nominatim.openstreetmap.org/search?q=Tel%20Aviv&format=json'

describe('stripQueryString', () => {
    it('drops the query string and fragment', () => {
        expect(stripQueryString('/reset-password?email=a%40b.com#x'))
            .toBe('/reset-password')
        expect(stripQueryString(nominatim))
            .toBe('https://nominatim.openstreetmap.org/search')
    })

    it('leaves a url without a query untouched', () => {
        expect(stripQueryString('/community/post/1'))
            .toBe('/community/post/1')
    })
})

describe('scrubBreadcrumb', () => {
    it('strips the query from fetch urls', () => {
        const breadcrumb: Breadcrumb = {
            category: 'fetch',
            data: {
                url: nominatim,
                method: 'GET'
            }
        }

        expect(scrubBreadcrumb(breadcrumb).data).toEqual({
            url: 'https://nominatim.openstreetmap.org/search',
            method: 'GET'
        })
    })

    it('strips the query from navigation from/to', () => {
        const breadcrumb: Breadcrumb = {
            category: 'navigation',
            data: {
                from: '/forgot-password',
                to: '/login?redirect=%2Fdashboard'
            }
        }

        expect(scrubBreadcrumb(breadcrumb).data).toEqual({
            from: '/forgot-password',
            to: '/login'
        })
    })

    it('keeps breadcrumbs without data as they are', () => {
        const breadcrumb: Breadcrumb = { message: 'clicked' }

        expect(scrubBreadcrumb(breadcrumb)).toEqual(breadcrumb)
    })

    it('does not mutate the original breadcrumb', () => {
        const breadcrumb: Breadcrumb = {
            data: { url: '/a?email=x' }
        }

        scrubBreadcrumb(breadcrumb)

        expect(breadcrumb.data?.url).toBe('/a?email=x')
    })
})

describe('scrubEvent', () => {
    it('strips the request url and drops the query string field', () => {
        const event: Event = {
            request: {
                url: 'https://pulserehab.app/reset-password?email=a%40b.com',
                query_string: 'email=a%40b.com'
            }
        }

        const scrubbed = scrubEvent(event)

        expect(scrubbed.request?.url)
            .toBe('https://pulserehab.app/reset-password')
        expect(scrubbed.request?.query_string).toBeUndefined()
    })

    it('strips the fragment from the request url', () => {
        const event: Event = {
            request: { url: 'https://pulserehab.app/a?x=1#section' }
        }

        expect(scrubEvent(event).request?.url)
            .toBe('https://pulserehab.app/a')
    })

    it('keeps headers, cookies and user fields as they are', () => {
        const event: Event = {
            user: { id: '1' },
            request: {
                url: '/a?x=1',
                headers: { accept: 'text/html' },
                cookies: { theme: 'dark' }
            }
        }

        const scrubbed = scrubEvent(event)

        expect(scrubbed.user).toEqual({ id: '1' })
        expect(scrubbed.request?.headers)
            .toEqual({ accept: 'text/html' })
        expect(scrubbed.request?.cookies)
            .toEqual({ theme: 'dark' })
    })

    it('does not mutate the original event', () => {
        const event: Event = {
            request: { url: '/a?x=1', query_string: 'x=1' }
        }

        scrubEvent(event)

        expect(event.request?.url).toBe('/a?x=1')
        expect(event.request?.query_string).toBe('x=1')
    })

    it('leaves an event without a request unchanged', () => {
        const event: Event = { message: 'boom' }

        expect(scrubEvent(event)).toEqual(event)
    })
})

describe('scrubSpan', () => {
    const baseSpan = {
        trace_id: 'b',
        span_id: 'a',
        start_timestamp: 1,
        status: 'ok' as const,
        is_segment: false
    }

    it('strips the query from the span name and url attributes', () => {
        const scrubbed = scrubSpan({
            ...baseSpan,
            name: `GET ${nominatim}`,
            attributes: {
                'http.url': nominatim,
                'url.full': nominatim,
                'url.query': 'q=Tel%20Aviv',
                'url.fragment': 'top',
                'http.query': '?q=Tel%20Aviv',
                'http.method': 'GET'
            }
        })

        expect(scrubbed.name)
            .toBe('GET https://nominatim.openstreetmap.org/search')
        expect(scrubbed.attributes).toEqual({
            'http.url': 'https://nominatim.openstreetmap.org/search',
            'url.full': 'https://nominatim.openstreetmap.org/search',
            'http.method': 'GET'
        })
    })

    it('scrubs segment spans too', () => {
        const scrubbed = scrubSpan({
            ...baseSpan,
            is_segment: true,
            name: '/reset-password?email=a%40b.com',
            attributes: {}
        })

        expect(scrubbed.name).toBe('/reset-password')
    })

    it('does not mutate the original span', () => {
        const span = {
            ...baseSpan,
            name: '/a?x=1',
            attributes: { 'http.url': '/a?x=1' }
        }

        scrubSpan(span)

        expect(span.name).toBe('/a?x=1')
        expect(span.attributes['http.url']).toBe('/a?x=1')
    })
})
