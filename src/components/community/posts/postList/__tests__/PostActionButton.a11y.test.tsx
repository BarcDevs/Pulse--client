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

import { Heart } from 'lucide-react'

import { PostActionButton } from '@/components/community/posts/postList/PostActionButton'

describe('PostActionButton a11y', () => {
    it('uses the given aria label when icon-only', () => {
        render(
            <PostActionButton
                icon={Heart}
                count={2}
                ariaLabel={'Showed support'}
                onClick={vi.fn()}
            />
        )

        expect(
            screen.getByRole('button', { name: 'Showed support' })
        ).toBeTruthy()
    })
})
