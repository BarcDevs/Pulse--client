import { describe, expect, it } from 'vitest'

import {
    getFirstListPageParam,
    getNextListPageParam,
    usesCursorPaging
} from '../listPaging'

const items = (ids: string[]) => ids.map(id => ({ id }))

describe('usesCursorPaging', () => {
    it('uses the cursor for newest, unanswered and no filter', () => {
        expect(usesCursorPaging('newest')).toBe(true)
        expect(usesCursorPaging('unanswered')).toBe(true)
        expect(usesCursorPaging(undefined)).toBe(true)
    })

    it('keeps hot and popular on page numbers', () => {
        expect(usesCursorPaging('hot')).toBe(false)
        expect(usesCursorPaging('popular')).toBe(false)
    })
})

describe('getFirstListPageParam', () => {
    it('sends neither cursor nor page on the first cursor request', () => {
        expect(getFirstListPageParam(true)).toEqual({})
    })

    it('starts page mode at page 1', () => {
        expect(getFirstListPageParam(false)).toEqual({ page: 1 })
    })
})

describe('getNextListPageParam', () => {
    const full = items(['a', 'b'])

    it('returns the last item id as the cursor after a full page', () => {
        expect(getNextListPageParam(full, [full], 2, true))
            .toEqual({ cursor: 'b' })
    })

    it('returns the next page number in page mode', () => {
        expect(getNextListPageParam(full, [full, full], 2, false))
            .toEqual({ page: 3 })
    })

    it('stops on a short page', () => {
        expect(getNextListPageParam(items(['a']), [full], 2, true))
            .toBeUndefined()
    })

    it('treats an empty page after a full one as the end', () => {
        expect(getNextListPageParam([], [full, []], 2, true))
            .toBeUndefined()
    })
})
