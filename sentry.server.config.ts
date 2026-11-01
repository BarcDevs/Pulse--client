import * as Sentry from '@sentry/nextjs'

import { sentryDataCollection } from '@/lib/sentry/dataCollection'
import { scrubEvent } from '@/lib/sentry/scrubEvent'
import { scrubSpan } from '@/lib/sentry/scrubSpan'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
  beforeSend: scrubEvent,
  beforeSendSpan: scrubSpan,
  dataCollection: sentryDataCollection,
})
