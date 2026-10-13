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

import { useForumPosts } from '@/hooks/queries/useForumPosts'

const fetchPosts = vi.fn()

vi.mock('@/context/AuthContext', () => ({
    useAuth: () => ({ setNetworkError: vi.fn() })
}))
vi.mock('@/api/forum', () => ({
    fetchPosts: (query: unknown) => fetchPosts(query)
}))

const createWrapper = () => {
    const client = new QueryClient()

    return ({ children }: { children: React.ReactNode }) => (
        <QueryClientProvider client={client}>
            {children}
        </QueryClientProvider>
    )
}

const page = (ids: string[]) => ({
    items: ids.map(id => ({ id })),
    pagination: {
        total: 99,
        page: 1,
        limit: 2,
        hasMore: true,
        nextCursor: ids[ids.length - 1] ?? null
    }
})

const cursorLost = Object.assign(new Error('Request failed with status code 404'), {
    response: {
        status: 404,
        data: {
            message: 'Cursor not found! please check your inputs and try again!',
            error: [{ code: 'NOT_FOUND', params: { resource: 'Cursor' } }]
        }
    }
})

describe('useForumPosts paging', () => {
    beforeEach(() => {
        vi.resetAllMocks()
    })

    it('sends no cursor and no page on the first request', async () => {
        fetchPosts.mockResolvedValue(page(['a', 'b']))

        renderHook(
            () => useForumPosts({ limit: 2, filter: 'newest' }),
            { wrapper: createWrapper() }
        )

        await waitFor(() => expect(fetchPosts).toHaveBeenCalledTimes(1))
        expect(fetchPosts).toHaveBeenCalledWith({
            limit: 2,
            filter: 'newest'
        })
    })

    it('sends the last post id as the cursor for the next page', async () => {
        fetchPosts
            .mockResolvedValueOnce(page(['a', 'b']))
            .mockResolvedValueOnce(page(['c']))

        const { result } = renderHook(
            () => useForumPosts({ limit: 2, filter: 'newest' }),
            { wrapper: createWrapper() }
        )
        await waitFor(() => expect(result.current.hasNextPage).toBe(true))

        await act(async () => {
            await result.current.fetchNextPage()
        })

        expect(fetchPosts).toHaveBeenLastCalledWith({
            limit: 2,
            filter: 'newest',
            cursor: 'b'
        })
        await waitFor(() => expect(result.current.hasNextPage).toBe(false))
        expect(result.current.data?.pages).toHaveLength(2)
    })

    it('treats an empty page after a full one as the end', async () => {
        fetchPosts
            .mockResolvedValueOnce(page(['a', 'b']))
            .mockResolvedValueOnce(page([]))

        const { result } = renderHook(
            () => useForumPosts({ limit: 2, filter: 'newest' }),
            { wrapper: createWrapper() }
        )
        await waitFor(() => expect(result.current.hasNextPage).toBe(true))

        await act(async () => {
            await result.current.fetchNextPage()
        })

        await waitFor(() => expect(result.current.hasNextPage).toBe(false))
        expect(result.current.data?.pages).toHaveLength(2)
        expect(result.current.isError).toBe(false)
    })

    it('keeps the popular filter on page numbers', async () => {
        fetchPosts
            .mockResolvedValueOnce(page(['a', 'b']))
            .mockResolvedValueOnce(page(['c', 'd']))

        const { result } = renderHook(
            () => useForumPosts({ limit: 2, filter: 'popular' }),
            { wrapper: createWrapper() }
        )
        await waitFor(() => expect(result.current.hasNextPage).toBe(true))
        expect(fetchPosts).toHaveBeenLastCalledWith({
            limit: 2,
            filter: 'popular',
            page: 1
        })

        await act(async () => {
            await result.current.fetchNextPage()
        })

        expect(fetchPosts).toHaveBeenLastCalledWith({
            limit: 2,
            filter: 'popular',
            page: 2
        })
    })

    it('restarts from the first page when the cursor is gone', async () => {
        fetchPosts
            .mockResolvedValueOnce(page(['a', 'b']))
            .mockRejectedValueOnce(cursorLost)
            .mockResolvedValueOnce(page(['x', 'y']))

        const { result } = renderHook(
            () => useForumPosts({ limit: 2, filter: 'newest' }),
            { wrapper: createWrapper() }
        )
        await waitFor(() => expect(result.current.hasNextPage).toBe(true))

        await act(async () => {
            await result.current.fetchNextPage()
        })

        await waitFor(() => expect(fetchPosts).toHaveBeenCalledTimes(3))
        expect(fetchPosts).toHaveBeenLastCalledWith({
            limit: 2,
            filter: 'newest'
        })
        await waitFor(() =>
            expect(result.current.data?.pages).toEqual([
                [{ id: 'x' }, { id: 'y' }]
            ]))
        expect(result.current.isError).toBe(false)
    })
})
