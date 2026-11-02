import {
    beforeEach,
    describe,
    expect,
    it,
    vi
} from 'vitest'

import * as Sentry from '@sentry/nextjs'

import { sentryDataCollection } from '@/lib/sentry/dataCollection'
import { scrubEvent } from '@/lib/sentry/scrubEvent'
import { scrubSpan } from '@/lib/sentry/scrubSpan'

vi.mock('@sentry/nextjs', () => ({ init: vi.fn() }))

const inits = [
    {
        name: 'server',
        load: () => import('../../../../sentry.server.config')
    },
    {
        name: 'edge',
        load: () => import('../../../../sentry.edge.config')
    }
]

describe.each(inits)('$name Sentry init', ({ load }) => {
    beforeEach(() => {
        vi.mocked(Sentry.init).mockClear()
    })

    it('scrubs events and spans and uses shared dataCollection', async () => {
        await load()

        const options = vi.mocked(Sentry.init).mock.calls[0][0]

        expect(options?.beforeSend).toBe(scrubEvent)
        expect(options?.beforeSendSpan).toBe(scrubSpan)
        expect(options?.dataCollection)
            .toBe(sentryDataCollection)
    })
})
