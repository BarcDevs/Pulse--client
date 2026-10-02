import { describe, expect, it } from 'vitest'

import { getAppShellMode } from '@/lib/appShell'

describe('getAppShellMode', () => {
    it('has no shell on the landing page', () => {
        expect(getAppShellMode('/', false)).toBe('none')
        expect(getAppShellMode('/', true)).toBe('none')
    })

    it('has no shell on the auth pages', () => {
        expect(getAppShellMode('/login', false)).toBe('none')
        expect(getAppShellMode('/signup', false)).toBe('none')
        expect(getAppShellMode('/forgot-password', false)).toBe('none')
        expect(getAppShellMode('/reset-password', true)).toBe('none')
    })

    it('always shows the app shell on protected pages', () => {
        expect(getAppShellMode('/dashboard', false)).toBe('app')
        expect(getAppShellMode('/community/post/123', false)).toBe('app')
        expect(getAppShellMode('/recovery-goals', true)).toBe('app')
    })

    it('shows the app shell on other pages only when signed in', () => {
        expect(getAppShellMode('/privacy', true)).toBe('app')
        expect(getAppShellMode('/support', true)).toBe('app')
        expect(getAppShellMode('/network-error', true)).toBe('app')
        expect(getAppShellMode('/privacy', false)).toBe('bare')
        expect(getAppShellMode('/some-missing-page', false)).toBe('bare')
    })
})
