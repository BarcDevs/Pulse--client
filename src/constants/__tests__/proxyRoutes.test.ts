import { describe, expect, it } from 'vitest'

import {
    authRoutes,
    protectedRoutes
} from '@/constants/proxyRoutes'
import { ROUTES } from '@/constants/routes'

describe('protectedRoutes', () => {
    it('includes core authenticated routes', () => {
        const expected = [
            ROUTES.DASHBOARD,
            ROUTES.PROFILE,
            ROUTES.CHECK_IN,
            ROUTES.INSIGHTS,
            ROUTES.PROGRESS,
            ROUTES.CHAT,
            ROUTES.COMMUNITY,
            ROUTES.RECOVERY_GOALS,
            ROUTES.DAILY_CHECKIN
        ]
        expected.forEach((route) => {
            expect(protectedRoutes).toContain(route)
        })
    })
})

describe('authRoutes', () => {
    it('includes login and signup', () => {
        expect(authRoutes).toContain(ROUTES.LOGIN)
        expect(authRoutes).toContain(ROUTES.SIGNUP)
    })
})
