import { dayInMs, minuteInMs } from '@/constants/time'

type Config = {
    serverUrl: string
    hostname: string
    appDomain: string
    serverApiVersion: string
    loginDuration: number
    isDev: boolean

    communityDraftTtl: number
    communityDraftTtlMinutes: number

    replaysSessionSampleRate: number

    sentryDsn: string
}

const config: Config = {
    serverUrl: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:4001',
    hostname: process.env.NEXT_PUBLIC_HOSTNAME || 'http://localhost:5173',
    appDomain: process.env.NEXT_PUBLIC_APP_DOMAIN || 'https://pulse.app',
    serverApiVersion: process.env.NEXT_PUBLIC_SERVER_API_VERSION || 'v1',
    isDev: process.env.NODE_ENV === 'development',
    loginDuration: 7 * dayInMs,
    communityDraftTtlMinutes: 5,
    get communityDraftTtl() {
        return this.communityDraftTtlMinutes * minuteInMs
    },

    replaysSessionSampleRate: (() => {
        const raw = process.env.NEXT_PUBLIC_SENTRY_REPLAYS_SESSION_SAMPLE_RATE
        const parsed = Number(raw)

        if (isNaN(parsed)) {
            throw new Error(
                'NEXT_PUBLIC_SENTRY_REPLAYS_SESSION_SAMPLE_RATE must be a valid number'
            )
        }

        return parsed
    })(),

    sentryDsn: process.env.NEXT_PUBLIC_SENTRY_DSN || ''
}

export const isDev = config.isDev

export default config
