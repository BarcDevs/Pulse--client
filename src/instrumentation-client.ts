import * as Sentry from '@sentry/nextjs'

import { scrubBreadcrumb } from '@/lib/sentry/scrubBreadcrumb'
import { scrubEvent } from '@/lib/sentry/scrubEvent'

Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    environment: process.env.NODE_ENV,
    tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
    beforeBreadcrumb: scrubBreadcrumb,
    beforeSend: scrubEvent,
    beforeSendTransaction: scrubEvent
})
