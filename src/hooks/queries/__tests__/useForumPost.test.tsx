import type { ReactNode } from 'react'
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
    renderHook,
    waitFor
} from '@testing-library/react'

import { useForumPost } from '@/hooks/queries/useForumPost'

import { forumQueryKeys } from '@/constants/queryKeys'

const fetchPost = vi.fn()

vi.mock('@/context/AuthContext', () => ({
    useAuth: () => ({ setNetworkError: vi.fn() })
}))
vi.mock('@/api/forum', () => ({
    fetchPost: (postId: string) => fetchPost(postId)
}))

const postId = 'post-1'
const cachedPost = {
    id: postId,
    title: 'cached title'
}
const fetchedPost = {
    id: postId,
    title: 'fetched title'
}

describe('useForumPost', () => {
    beforeEach(() => {
        vi.resetAllMocks()
    })

    it('fetches the post even when the forum list cache holds it', async () => {
        fetchPost.mockResolvedValue(fetchedPost)
        const client = new QueryClient()
        client.setQueryData(
            [
                ...forumQueryKeys.posts,
                'newest',
                20
            ],
            {
                pages: [[cachedPost]],
                pageParams: [undefined]
            }
        )
        const wrapper = ({
            children
        }: {
            children: ReactNode
        }) => (
            <QueryClientProvider client={client}>
                {children}
            </QueryClientProvider>
        )

        const { result } = renderHook(
            () => useForumPost(postId),
            { wrapper }
        )

        expect(result.current.data).toBeUndefined()
        await waitFor(() => expect(result.current.data).toEqual(fetchedPost))
        expect(fetchPost).toHaveBeenCalledTimes(1)
        expect(fetchPost).toHaveBeenCalledWith(postId)
    })
})
