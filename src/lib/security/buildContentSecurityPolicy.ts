import { getCspReportUri } from '@/lib/security/getCspReportUri'
import { getOrigin } from '@/lib/security/getOrigin'

import { TRUSTED_IMAGE_HOSTS } from '@/constants/trustedImageHosts'

const LOCATION_SEARCH_ORIGIN = 'https://nominatim.openstreetmap.org'

const DIRECTIVE = {
    defaultSrc: 'default-src',
    scriptSrc: 'script-src',
    styleSrc: 'style-src',
    imgSrc: 'img-src',
    fontSrc: 'font-src',
    connectSrc: 'connect-src',
    frameAncestors: 'frame-ancestors',
    baseUri: 'base-uri',
    formAction: 'form-action',
    objectSrc: 'object-src',
    reportUri: 'report-uri'
} as const

type PolicyOptions = {
    nonce: string
    isDev: boolean
    sentryDsn: string
}

/** Enforced Content-Security-Policy, built per request because scripts are
 * allowed by nonce. `strict-dynamic` lets a nonced script load the scripts it
 * needs, so no script host is allowlisted and inline scripts without the
 * nonce are blocked. Styles keep `unsafe-inline`: UI libraries write style
 * attributes and a runtime <style> tag (toasts), which a style nonce cannot
 * cover, and style injection is not script execution.
 * Image hosts come from `TRUSTED_IMAGE_HOSTS`; the Sentry origin and the
 * violation report endpoint (report-uri) from the DSN */
export const buildContentSecurityPolicy = ({
    nonce,
    isDev,
    sentryDsn
}: PolicyOptions): string => {
    const sentryOrigin = getOrigin(sentryDsn)
    const reportUri = getCspReportUri(sentryDsn)

    const directives: Record<string, string[]> = {
        [DIRECTIVE.defaultSrc]: ["'self'"],
        [DIRECTIVE.scriptSrc]: [
            "'self'",
            `'nonce-${nonce}'`,
            "'strict-dynamic'",
            // React reconstructs server error stacks with eval in development
            ...(isDev ? ["'unsafe-eval'"] : [])
        ],
        [DIRECTIVE.styleSrc]: ["'self'", "'unsafe-inline'"],
        [DIRECTIVE.imgSrc]: [
            "'self'",
            'data:',
            'blob:',
            ...TRUSTED_IMAGE_HOSTS.map((host) => `https://${host}`)
        ],
        [DIRECTIVE.fontSrc]: ["'self'", 'data:'],
        [DIRECTIVE.connectSrc]: [
            "'self'",
            LOCATION_SEARCH_ORIGIN,
            ...(sentryOrigin ? [sentryOrigin] : [])
        ],
        [DIRECTIVE.frameAncestors]: ["'none'"],
        [DIRECTIVE.baseUri]: ["'self'"],
        [DIRECTIVE.formAction]: ["'self'"],
        [DIRECTIVE.objectSrc]: ["'none'"],
        ...(reportUri && { [DIRECTIVE.reportUri]: [reportUri] })
    }

    return Object.entries(directives)
        .map(([directive, sources]) => `${directive} ${sources.join(' ')}`)
        .join('; ')
}
