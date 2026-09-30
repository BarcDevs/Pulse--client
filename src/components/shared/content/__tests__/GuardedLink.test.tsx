import {
    beforeEach,
    describe,
    expect,
    it,
    vi
} from 'vitest'

import { render } from '@testing-library/react'

import { GuardedLink } from '@/components/shared/content/GuardedLink'

const authState = vi.hoisted(() => ({ user: null as object | null }))

vi.mock('@/context/AuthContext', () => ({
    useAuth: () => authState
}))

describe('GuardedLink', () => {
    beforeEach(() => {
        authState.user = null
    })

    it('disables a sign-in-only link for a signed-out visitor', () => {
        const { container } = render(
            <GuardedLink href={'/profile/settings'}>Settings</GuardedLink>
        )

        expect(container.querySelector('a')).toBeNull()
        expect(container.querySelector('[aria-disabled="true"]')?.textContent)
            .toBe('Settings')
    })

    it('keeps a public link working for a signed-out visitor', () => {
        const { container } = render(
            <GuardedLink href={'/support'}>Support</GuardedLink>
        )

        expect(container.querySelector('a')?.getAttribute('href')).toBe('/support')
    })

    it('links a sign-in-only page for a signed-in user', () => {
        authState.user = { id: '1' }

        const { container } = render(
            <GuardedLink href={'/profile/settings'}>Settings</GuardedLink>
        )

        expect(container.querySelector('a')?.getAttribute('href'))
            .toBe('/profile/settings')
    })
})
