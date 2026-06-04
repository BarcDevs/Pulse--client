import {
    beforeEach,
    describe,
    expect,
    it,
    vi
} from 'vitest'

vi.mock(
    '@/api/index',
    () => ( {
        api: {
            get: vi.fn(),
            post: vi.fn(),
            put: vi.fn(),
            delete: vi.fn()
        }
    } ))

import { ENDPOINTS } from '@/api/routes'
import {
    createPost,
    createReply,
    deletePost,
    fetchPost,
    fetchPosts,
    fetchReplies,
    updatePost,
    updateReply
} from '@/api/forum'
import { api } from '@/api/index'

// ==================== forum API ====================
describe(
    'forum API',
    () => {
        beforeEach(() => {
            vi.clearAllMocks()
        })

        // ==================== fetchPosts ====================
        describe(
            'fetchPosts',
            () => {
                it(
                    'should GET /forum/posts with query params',
                    async () => {
                        const query = {
                            page: 1,
                            limit: 10
                        }
                        vi.mocked(api.get)
                            .mockResolvedValueOnce({
                                data: {
                                    data: []
                                }
                            })

                        await fetchPosts(query)
                        expect(api.get)
                            .toHaveBeenCalledWith(
                                ENDPOINTS.forum.posts,
                                { params: query }
                            )
                    })

                it(
                    'should pass empty query params',
                    async () => {
                        vi.mocked(api.get)
                            .mockResolvedValueOnce({
                                data: {
                                    data: []
                                }
                            })

                        await fetchPosts({})
                        expect(api.get)
                            .toHaveBeenCalledWith(
                                ENDPOINTS.forum.posts,
                                { params: {} }
                            )
                    })
            })

        // ==================== fetchPost ====================
        describe(
            'fetchPost',
            () => {
                it(
                    'should GET /forum/posts/:id',
                    async () => {
                        vi.mocked(api.get)
                            .mockResolvedValueOnce({
                                data: {
                                    data: {}
                                }
                            })

                        await fetchPost('post-123')
                        expect(api.get)
                            .toHaveBeenCalledWith(
                                ENDPOINTS.forum.post('post-123')
                            )
                    })
            })

        // ==================== createPost ====================
        describe(
            'createPost',
            () => {
                it(
                    'should POST to /forum/posts with post data',
                    async () => {
                        const post = {
                            category: 'fractures',
                            title: 'Test Post Title',
                            body: 'Test body content here that is long enough',
                            tags: ['TAG']
                        }
                        vi.mocked(api.post)
                            .mockResolvedValueOnce({
                                data: {
                                    data: {}
                                }
                            })

                        await createPost(post)
                        expect(api.post)
                            .toHaveBeenCalledWith(
                                ENDPOINTS.forum.posts,
                                { ...post }
                            )
                    })
            })

        // ==================== updatePost ====================
        describe(
            'updatePost',
            () => {
                it(
                    'should PUT to /forum/posts/:id with updated data',
                    async () => {
                        const post = {
                            category: 'fractures',
                            title: 'Updated Title',
                            body: 'Updated body content that is long enough for validation',
                            tags: ['TAG']
                        }
                        vi.mocked(api.put)
                            .mockResolvedValueOnce({
                                data: {
                                    data: {}
                                }
                            })

                        await updatePost(
                            'post-123',
                            post
                        )
                        expect(api.put)
                            .toHaveBeenCalledWith(
                                ENDPOINTS.forum.post('post-123'),
                                { ...post }
                            )
                    })
            })

        // ==================== deletePost ====================
        describe(
            'deletePost',
            () => {
                it(
                    'should DELETE /forum/posts/:id',
                    async () => {
                        vi.mocked(api.delete)
                            .mockResolvedValueOnce({
                                data: {}
                            })

                        await deletePost('post-123')
                        expect(api.delete)
                            .toHaveBeenCalledWith(
                                ENDPOINTS.forum.post('post-123')
                            )
                    })
            })

        // ==================== fetchReplies ====================
        describe(
            'fetchReplies',
            () => {
                it(
                    'should GET /forum/posts/:id/replies',
                    async () => {
                        vi.mocked(api.get)
                            .mockResolvedValueOnce({
                                data: {
                                    data: { replies: [] }
                                }
                            })

                        await fetchReplies('post-123')
                        expect(api.get)
                            .toHaveBeenCalledWith(
                                ENDPOINTS.forum.replies('post-123'),
                                { params: undefined }
                            )

                    })

                it(
                    'should pass limit and offset params',
                    async () => {
                        vi.mocked(api.get)
                            .mockResolvedValueOnce({
                                data: {
                                    data: { replies: [] }
                                }
                            })

                        await fetchReplies(
                            'post-123',
                            {
                                limit: 5,
                                page: 2
                            }
                        )
                        expect(api.get)
                            .toHaveBeenCalledWith(
                                ENDPOINTS.forum.replies('post-123'),
                                { params: { limit: 5, page: 2 } }
                            )
                    })
            })

        // ==================== createReply ====================
        describe(
            'createReply',
            () => {
                it(
                    'should POST to /forum/posts/:id/replies with reply data',
                    async () => {
                        const reply = {
                            id: 'reply-1',
                            body: 'Test reply content',
                            createdAt: new Date('2025-01-01'),
                            updatedAt: null,
                            authorId: 'user-1',
                            votes: {
                                upvotes: 0,
                                upvotedBy: []
                            }
                        }
                        vi.mocked(api.post)
                            .mockResolvedValueOnce({
                                data: {
                                    data: { reply }
                                }
                            })

                        await createReply(
                            'post-123',
                            reply
                        )
                        expect(api.post)
                            .toHaveBeenCalledWith(
                                ENDPOINTS.forum.replies('post-123'),
                                { ...reply }
                            )
                    })
            })

        // ==================== updateReply ====================
        describe(
            'updateReply',
            () => {
                it(
                    'should PUT to /forum/posts/:postId/replies/:replyId',
                    async () => {
                        const reply = {
                            id: 'reply-1',
                            body: 'Updated reply content',
                            createdAt: new Date('2025-01-01'),
                            updatedAt: null,
                            authorId: 'user-1',
                            votes: {
                                upvotes: 0,
                                upvotedBy: []
                            }
                        }
                        vi.mocked(api.put)
                            .mockResolvedValueOnce({
                                data: {
                                    data: { reply }
                                }
                            })

                        await updateReply(
                            'post-123',
                            'reply-1',
                            reply
                        )
                        expect(api.put)
                            .toHaveBeenCalledWith(
                                ENDPOINTS.forum.reply('post-123', 'reply-1'),
                                { ...reply }
                            )
                    })
            })
    })
