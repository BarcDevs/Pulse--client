import {
    describe,
    expect,
    it,
    vi
} from 'vitest'

import { render, screen } from '@testing-library/react'

import { ROUTES } from '@/constants/routes'

vi.mock('next-intl', () => ({
    useTranslations: () => (key: string) => key
}))

vi.mock('next/navigation', () => ({
    usePathname: () => ROUTES.communityPost('abc-123'),
    useRouter: () => ({ push: vi.fn() }),
    useSearchParams: () => new URLSearchParams()
}))

import { UnauthenticatedReplyPrompt }
    from '@/components/community/postDetail/UnauthenticatedReplyPrompt'

describe('UnauthenticatedReplyPrompt', () => {
    it('login link redirects back to current page after login', () => {
        render(<UnauthenticatedReplyPrompt/>)

        const link = screen.getByRole('link')

        expect(link.getAttribute('href')).toBe(
            ROUTES.loginWithRedirect(ROUTES.communityPost('abc-123'))
        )
    })

    it('login link points to /login', () => {
        render(<UnauthenticatedReplyPrompt/>)

        const link = screen.getByRole('link')

        expect(link.getAttribute('href'))
            .toMatch(new RegExp(`^${ROUTES.LOGIN}`))
    })
})
