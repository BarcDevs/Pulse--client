import * as Sentry from '@sentry/react'

import { router } from '@/utils/router'

import config from '@/config'

export const sentryInit = () => {
    Sentry.init({
        dsn: config.sentryDsn,
        integrations: [
            Sentry.tanstackRouterBrowserTracingIntegration(router),
            Sentry.browserTracingIntegration(),
            Sentry.replayIntegration({
                maskAllText: false,
                blockAllMedia: false
            })
        ],
        // Performance Monitoring
        tracesSampleRate: 1.0,
        tracePropagationTargets: [config.hostname, config.serverUrl + '/api/*'],
        // Session Replay
        replaysSessionSampleRate: config.replaysSessionSampleRate,
        replaysOnErrorSampleRate: 1.0
    })
}
