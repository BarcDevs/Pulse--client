import { StrictMode } from 'react'

import {
    beforeEach,
    describe,
    expect,
    it,
    vi
} from 'vitest'

import { renderHook } from '@testing-library/react'

import { useRecordPostView } from '@/hooks/queries/useRecordPostView'

const recordPostView = vi.fn()

vi.mock('@/api/forum', () => ({
    recordPostView: (postId: string) => recordPostView(postId)
}))

describe('useRecordPostView', () => {
    beforeEach(() => {
        vi.clearAllMocks()
        recordPostView.mockResolvedValue(undefined)
    })

    it('does nothing without a post id', () => {
        renderHook(() => useRecordPostView(undefined))

        expect(recordPostView).not.toHaveBeenCalled()
    })

    it('records the view once on mount', () => {
        const { rerender } = renderHook(
            () => useRecordPostView('p1')
        )
        rerender()

        expect(recordPostView).toHaveBeenCalledTimes(1)
        expect(recordPostView).toHaveBeenCalledWith('p1')
    })

    it('does not double fire under StrictMode', () => {
        renderHook(
            () => useRecordPostView('p1'),
            { wrapper: StrictMode }
        )

        expect(recordPostView).toHaveBeenCalledTimes(1)
    })

    it('records again when the post id changes', () => {
        const { rerender } = renderHook(
            ({ id }) => useRecordPostView(id),
            { initialProps: { id: 'p1' } }
        )
        rerender({ id: 'p2' })

        expect(recordPostView).toHaveBeenCalledTimes(2)
        expect(recordPostView).toHaveBeenLastCalledWith('p2')
    })

    it('ignores a failed request', async () => {
        recordPostView.mockRejectedValue(new Error('404'))

        expect(() => renderHook(
            () => useRecordPostView('p1')
        )).not.toThrow()
        await Promise.resolve()
    })
})
