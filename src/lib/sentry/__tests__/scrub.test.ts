import {
    describe,
    expect,
    it
} from 'vitest'

import type { Breadcrumb, Event } from '@sentry/nextjs'

import { scrubBreadcrumb } from '@/lib/sentry/scrubBreadcrumb'
import { scrubEvent } from '@/lib/sentry/scrubEvent'
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

    it('strips query strings from span descriptions and data', () => {
        const event: Event = {
            spans: [
                {
                    span_id: 'a',
                    trace_id: 'b',
                    start_timestamp: 1,
                    description: `GET ${nominatim}`,
                    data: { 'http.url': nominatim }
                } as NonNullable<Event['spans']>[number]
            ]
        }

        const [span] = scrubEvent(event).spans!

        expect(span.description).not.toContain('Tel')
        expect(span.description).not.toContain('?')
        expect(span.data['http.url'])
            .toBe('https://nominatim.openstreetmap.org/search')
    })

    it('leaves an event without request or spans unchanged', () => {
        const event: Event = { message: 'boom' }

        expect(scrubEvent(event)).toEqual(event)
    })
})
