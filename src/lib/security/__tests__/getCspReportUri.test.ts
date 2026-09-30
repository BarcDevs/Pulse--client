import {
    describe,
    expect,
    it
} from 'vitest'

import { getCspReportUri } from '@/lib/security/getCspReportUri'

describe('getCspReportUri', () => {
    it('builds the Sentry security endpoint from the DSN', () => {
        expect(getCspReportUri(
            'https://94ccf213e00340996348fa63f2605456@o4506954726703104.ingest.us.sentry.io/4506954741055488'
        )).toBe(
            'https://o4506954726703104.ingest.us.sentry.io/api/4506954741055488/security/?sentry_key=94ccf213e00340996348fa63f2605456'
        )
    })

    it('keeps the port of a self-hosted or local DSN', () => {
        expect(getCspReportUri('http://abc@127.0.0.1:4998/7'))
            .toBe('http://127.0.0.1:4998/api/7/security/?sentry_key=abc')
    })

    it('returns null for an empty, malformed or incomplete DSN', () => {
        ;[
            '',
            'not a url',
            'https://host.example/123',
            'https://key@host.example/',
            'https://key@host.example/not-a-number'
        ].forEach((dsn) => expect(getCspReportUri(dsn)).toBeNull())
    })
})
