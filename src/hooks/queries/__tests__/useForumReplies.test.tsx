import {
    beforeEach,
    describe,
    expect,
    it,
    vi
} from 'vitest'

import {
    QueryClient,
    QueryClientProvider
} from '@tanstack/react-query'
import {
    act,
    renderHook,
    waitFor
} from '@testing-library/react'

import { useForumReplies } from '@/hooks/queries/useForumReplies'

import { appSettings } from '@/config/appSettings'

const fetchReplies = vi.fn()
const { repliesPageSize } = appSettings.community

vi.mock('@/context/AuthContext', () => ({
    useAuth: () => ({ setNetworkError: vi.fn() })
}))
vi.mock('@/api/forum', () => ({
    fetchReplies: (postId: string, params: unknown) =>
        fetchReplies(postId, params)
}))

const createWrapper = () => {
    const client = new QueryClient()

    return ({ children }: { children: React.ReactNode }) => (
        <QueryClientProvider client={client}>
            {children}
        </QueryClientProvider>
    )
}

const fullPage = (prefix: string) => ({
    items: Array.from(
        { length: repliesPageSize },
        (_, i) => ({ id: `${prefix}${i}` })
    ),
    pagination: {
        total: 99,
        page: 1,
        limit: repliesPageSize,
        hasMore: true,
        nextCursor: `${prefix}${repliesPageSize - 1}`
    }
})

describe('useForumReplies paging', () => {
    beforeEach(() => {
        vi.resetAllMocks()
    })

    it('sends no cursor and no page on the first request', async () => {
        fetchReplies.mockResolvedValue(fullPage('a'))

        renderHook(() => useForumReplies('p1'), { wrapper: createWrapper() })

        await waitFor(() => expect(fetchReplies).toHaveBeenCalledTimes(1))
        expect(fetchReplies).toHaveBeenCalledWith('p1', {
            limit: repliesPageSize
        })
    })

    it('sends the last reply id as the cursor and stops on an empty page', async () => {
        fetchReplies
            .mockResolvedValueOnce(fullPage('a'))
            .mockResolvedValueOnce({
                ...fullPage('b'),
                items: []
            })

        const { result } = renderHook(
            () => useForumReplies('p1'),
            { wrapper: createWrapper() }
        )
        await waitFor(() => expect(result.current.hasNextPage).toBe(true))

        await act(async () => {
            await result.current.fetchNextPage()
        })

        expect(fetchReplies).toHaveBeenLastCalledWith('p1', {
            limit: repliesPageSize,
            cursor: `a${repliesPageSize - 1}`
        })
        await waitFor(() => expect(result.current.hasNextPage).toBe(false))
        expect(result.current.data?.pages).toHaveLength(2)
        expect(result.current.isError).toBe(false)
    })

    it('restarts from the first page when the cursor is gone', async () => {
        fetchReplies
            .mockResolvedValueOnce(fullPage('a'))
            .mockRejectedValueOnce(Object.assign(
                new Error('Request failed with status code 404'),
                {
                    response: {
                        status: 404,
                        data: { message: 'Cursor not found' }
                    }
                }
            ))
            .mockResolvedValueOnce(fullPage('z'))

        const { result } = renderHook(
            () => useForumReplies('p1'),
            { wrapper: createWrapper() }
        )
        await waitFor(() => expect(result.current.hasNextPage).toBe(true))

        await act(async () => {
            await result.current.fetchNextPage()
        })

        await waitFor(() => expect(fetchReplies).toHaveBeenCalledTimes(3))
        expect(fetchReplies).toHaveBeenLastCalledWith('p1', {
            limit: repliesPageSize
        })
        await waitFor(() => expect(result.current.data?.pages).toHaveLength(1))
        expect(result.current.isError).toBe(false)
    })
})
