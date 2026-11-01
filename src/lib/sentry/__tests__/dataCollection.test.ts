import {
    describe,
    expect,
    it
} from 'vitest'

import { sentryDataCollection } from '@/lib/sentry/dataCollection'

describe('sentryDataCollection', () => {
    it('collects no user info, cookies, bodies or query strings', () => {
        expect(sentryDataCollection).toEqual({
            userInfo: false,
            cookies: false,
            httpBodies: [],
            urlQueryParams: false
        })
    })
})
