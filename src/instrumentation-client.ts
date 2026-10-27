import * as Sentry from '@sentry/nextjs'

import { scrubBreadcrumb } from '@/lib/sentry/scrubBreadcrumb'
import { scrubEvent } from '@/lib/sentry/scrubEvent'
import { scrubSpan } from '@/lib/sentry/scrubSpan'

Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    environment: process.env.NODE_ENV,
    ignoreErrors: [/Skipped ViewTransition due to document being hidden/],
    tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
    beforeBreadcrumb: scrubBreadcrumb,
    beforeSend: scrubEvent,
    beforeSendSpan: scrubSpan,
    dataCollection: {
        userInfo: false,
        cookies: false,
        httpBodies: []
    }
})
