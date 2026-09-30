import type { Breadcrumb } from '@sentry/nextjs'

import { stripQueryString } from '@/lib/sentry/stripQueryString'

const URL_KEYS = [
    'url',
    'from',
    'to'
]

/** Navigation and fetch/xhr breadcrumbs record full URLs, query string
 * included. Keep the path, drop the query */
export const scrubBreadcrumb = (
    breadcrumb: Breadcrumb
): Breadcrumb => {
    if (!breadcrumb.data) return breadcrumb

    const data = { ...breadcrumb.data }

    URL_KEYS.forEach((key) => {
        if (typeof data[key] === 'string')
            data[key] = stripQueryString(data[key])
    })

    return {
        ...breadcrumb,
        data
    }
}
