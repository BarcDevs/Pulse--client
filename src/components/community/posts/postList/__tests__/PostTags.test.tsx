import {
    describe,
    expect,
    it,
    vi
} from 'vitest'

import {
    render,
    screen
} from '@testing-library/react'

import { PostTags } from '@/components/community/posts/postList/PostTags'

vi.mock('next-intl', () => ({
    useLocale: () => 'en-US'
}))

vi.mock('@/hooks/queries/useForumTags', () => ({
    useForumTags: () => ({
        data: [
            {
                id: '1',
                slug: 'success-story',
                label: { en: 'Success Story', he: 'סיפור הצלחה' }
            },
            {
                id: '2',
                slug: 'chronic-pain',
                label: { en: 'Chronic Pain', he: 'כאב כרוני' }
            }
        ]
    })
}))

const tags = [
    { id: '1', slug: 'success-story' },
    { id: '2', slug: 'chronic-pain' }
]

describe('PostTags', () => {
    it('shows label from useForumTags lookup, not raw slug', () => {
        render(<PostTags tags={tags}/>)

        expect(screen.getByText('Success Story')).toBeInTheDocument()
        expect(screen.getByText('Chronic Pain')).toBeInTheDocument()
        expect(screen.queryByText('success-story')).not.toBeInTheDocument()
        expect(screen.queryByText('chronic-pain')).not.toBeInTheDocument()
    })

    it('falls back to slug when tag not found in useForumTags', () => {
        render(<PostTags tags={[{ id: '99', slug: 'unknown-tag' }]}/>)

        expect(screen.getByText('unknown-tag')).toBeInTheDocument()
    })
})
