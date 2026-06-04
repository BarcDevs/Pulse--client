import { describe, expect, it } from 'vitest'

import {
    authRoutes,
    protectedRoutes
} from '@/constants/proxyRoutes'

describe('protectedRoutes', () => {
    it('does not include /community', () => {
        expect(protectedRoutes).not.toContain('/community')
    })

    it('includes core authenticated routes', () => {
        const expected = [
            '/dashboard',
            '/profile',
            '/check-in',
            '/insights',
            '/progress',
            '/chat'
        ]
        expected.forEach((route) => {
            expect(protectedRoutes).toContain(route)
        })
    })
})

describe('authRoutes', () => {
    it('includes login and signup', () => {
        expect(authRoutes).toContain('/login')
        expect(authRoutes).toContain('/signup')
    })
})
