import type { Event } from '@sentry/nextjs'

import { stripQueryString } from '@/lib/sentry/stripQueryString'

/** Errors record the page URL and the query string. Keep the path, drop the
 * query string. Used for `beforeSend`. Spans are scrubbed by `scrubSpan` */
export const scrubEvent = <T extends Event>(event: T): T => {
    const { request } = event

    return {
        ...event,
        ...(request && {
            request: {
                ...request,
                url: request.url && stripQueryString(request.url),
                query_string: undefined
            }
        })
    }
}
