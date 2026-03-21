import * as Sentry from '@sentry/react'

import ErrorPage from '@/pages/error/ErrorPage'

export const routeError = {
    errorComponent: ErrorPage,
    onError: (error: any) => {
        console.error('Route error:', error)
        Sentry.captureException(error)
    }
}
