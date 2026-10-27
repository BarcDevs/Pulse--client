import {
    describe,
    expect,
    it,
    vi
} from 'vitest'

import { render } from '@testing-library/react'

import { PostFormHeader } from '@/components/community/postForm/PostFormHeader'

vi.mock('next-intl', () => ({
    useTranslations: () => (key: string) => key
}))

describe('PostFormHeader', () => {
    it('labels the icon-only cancel button', () => {
        const { getByRole } = render(
            <PostFormHeader
                isReply={false}
                onCancelAction={vi.fn()}
            />
        )

        const button = getByRole('button', { name: 'community.postForm.cancel' })

        expect(button.getAttribute('aria-label')).toBe('community.postForm.cancel')
    })
})
