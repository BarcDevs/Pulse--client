import {
    beforeEach,
    describe,
    expect,
    it,
    vi
} from 'vitest'

vi.mock('@/lib/time', () => ({
    toRelative: vi.fn(() => '2 hours ago')
}))

import type { Locale } from 'date-fns'

import type { CommunityActivityItem } from '@/types/community'

import {
    getAuthorDisplayName,
    getReplyAuthorView,
    mapActivityItems
} from '@/utils/community'

const makeItem = (
    overrides: Partial<CommunityActivityItem> = {}
): CommunityActivityItem => ({
    id: 'item-1',
    userId: 'u1',
    username: 'johndoe',
    firstName: 'John',
    lastName: 'Doe',
    actionKey: 'community.activity.posted',
    timestamp: '2026-01-01T00:00:00.000Z',
    ...overrides
})

const t = (key: string) => key
const locale = {} as Locale

describe('getAuthorDisplayName', () => {
    it('returns full name when firstName and lastName present', () => {
        const author = {
            user: {
                firstName: 'Jane',
                lastName: 'Smith',
                username: 'janesmith'
            }
        } as Parameters<typeof getAuthorDisplayName>[0]
        expect(getAuthorDisplayName(author)).toBe('Jane Smith')
    })

    it('falls back to username when names are missing', () => {
        const author = {
            user: {
                firstName: '',
                lastName: '',
                username: 'janesmith'
            }
        } as Parameters<typeof getAuthorDisplayName>[0]
        expect(getAuthorDisplayName(author)).toBe('janesmith')
    })

    it('returns fallback string when author is undefined', () => {
        expect(getAuthorDisplayName(undefined)).toBe('Unknown')
    })

    it('accepts custom fallback string', () => {
        expect(getAuthorDisplayName(undefined, 'Anonymous')).toBe('Anonymous')
    })
})

describe('mapActivityItems', () => {
    beforeEach(() => { vi.clearAllMocks() })

    it('returns empty array when input is empty', () => {
        expect(mapActivityItems([], t, locale, 10)).toEqual([])
    })


    it('maps items to display shape', () => {
        const items = [makeItem()]
        const result = mapActivityItems(items, t, locale, 10)
        expect(result).toHaveLength(1)
        expect(result[0]).toMatchObject({
            id: 'item-1',
            user: 'John',
            action: 'community.activity.posted',
            time: '2 hours ago'
        })
    })

    it('respects limit', () => {
        const items = [makeItem({ id: 'a' }), makeItem({ id: 'b' }), makeItem({ id: 'c' })]
        expect(mapActivityItems(items, t, locale, 2)).toHaveLength(2)
    })

    it('uses initials as avatar when firstName and lastName present', () => {
        const result = mapActivityItems([makeItem()], t, locale, 10)
        expect(result[0].avatar).toBe('JD')
    })

    it('uses first char of username as avatar when no name', () => {
        const item = makeItem({ firstName: '', lastName: '' })
        const result = mapActivityItems([item], t, locale, 10)
        expect(result[0].avatar).toBe('J')
    })

    it('translates category in actionParams', () => {
        const item = makeItem({
            actionKey: 'community.activity.postedIn',
            actionParams: { category: 'fractures' }
        })
        const result = mapActivityItems([item], t, locale, 10)
        expect(result[0].action).toBeTruthy()
    })
})

describe('getReplyAuthorView', () => {
    const author = {
        id: 'p1',
        image: 'https://lh3.googleusercontent.com/a/x',
        user: {
            firstName: 'John',
            lastName: 'Doe',
            username: 'johndoe'
        }
    } as never

    it('shows the localized label and no initials for a purged author', () => {
        const placeholder = {
            id: '',
            image: null,
            user: { firstName: '', lastName: '', username: 'deleted-user' }
        } as never

        const view = getReplyAuthorView(
            { authorId: null, author: placeholder },
            'Deleted user'
        )

        expect(view).toEqual({
            name: 'Deleted user',
            initials: undefined,
            imageSrc: undefined,
            isDeleted: true
        })
    })

    it('never shows the raw placeholder username', () => {
        const placeholder = {
            id: '',
            user: { firstName: '', lastName: '', username: 'deleted-user' }
        } as never

        const view = getReplyAuthorView(
            { authorId: null, author: placeholder },
            'משתמש שנמחק'
        )

        expect(view.name).toBe('משתמש שנמחק')
        expect(view.name).not.toContain('deleted-user')
    })

    it('shows the name, initials and image of a normal author', () => {
        const view = getReplyAuthorView(
            { authorId: 'u1', author },
            'Deleted user'
        )

        expect(view).toEqual({
            name: 'John Doe',
            initials: 'JD',
            imageSrc: 'https://lh3.googleusercontent.com/a/x',
            isDeleted: false
        })
    })

    it('has no initials when the author was not loaded', () => {
        const view = getReplyAuthorView(
            { authorId: 'u1', author: undefined },
            'Deleted user'
        )

        expect(view.initials).toBeUndefined()
        expect(view.isDeleted).toBe(false)
    })
})

