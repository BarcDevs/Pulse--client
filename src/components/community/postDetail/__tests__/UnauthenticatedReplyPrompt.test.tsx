import {
    describe,
    expect,
    it,
    vi
} from 'vitest'

import { render, screen } from '@testing-library/react'

vi.mock('next-intl', () => ({
    useTranslations: () => (key: string) => key
}))

vi.mock('next/navigation', () => ({
    usePathname: () => '/community/post/abc-123',
    useRouter: () => ({ push: vi.fn() }),
    useSearchParams: () => new URLSearchParams()
}))

import { UnauthenticatedReplyPrompt }
    from '@/components/community/postDetail/UnauthenticatedReplyPrompt'

describe('UnauthenticatedReplyPrompt', () => {
    it('login link redirects back to current page after login', () => {
        render(<UnauthenticatedReplyPrompt/>)

        const link = screen.getByRole('link')
        const expectedRedirect = encodeURIComponent('/community/post/abc-123')

        expect(link.getAttribute('href')).toBe(
            `/login?redirect=${expectedRedirect}`
        )
    })

    it('login link points to /login', () => {
        render(<UnauthenticatedReplyPrompt/>)

        const link = screen.getByRole('link')

        expect(link.getAttribute('href')).toMatch(/^\/login/)
    })
})
