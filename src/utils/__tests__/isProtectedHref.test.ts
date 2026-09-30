import {
    describe,
    expect,
    it
} from 'vitest'

import { isProtectedHref } from '@/utils/isProtectedHref'

import { ROUTES } from '@/constants/routes'

describe('isProtectedHref', () => {
    it.each([
        ROUTES.CHECK_IN,
        ROUTES.PROGRESS,
        ROUTES.INSIGHTS,
        ROUTES.COMMUNITY,
        ROUTES.PROFILE_SETTINGS,
        `${ROUTES.PROFILE_SETTINGS}?tab=preferences`,
        `${ROUTES.DASHBOARD}#top`
    ])('treats %s as sign-in only', (href) => {
        expect(isProtectedHref(href)).toBe(true)
    })

    it.each([
        ROUTES.HOME,
        ROUTES.SUPPORT,
        `${ROUTES.SUPPORT}#contact`,
        ROUTES.PRIVACY,
        ROUTES.TERMS,
        '/profiles-are-not-profile'
    ])('treats %s as public', (href) => {
        expect(isProtectedHref(href)).toBe(false)
    })
})
