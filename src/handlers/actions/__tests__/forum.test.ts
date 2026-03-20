import {
    beforeEach,
    describe,
    expect,
    it,
    vi
} from 'vitest'

const { mockCreatePost, mockUpdatePost } = vi.hoisted(() => ({
    mockCreatePost: vi.fn(),
    mockUpdatePost: vi.fn()
}))

vi.mock('@/api/forum', () => ({
    createPost: mockCreatePost,
    updatePost: mockUpdatePost,
    getPost: vi.fn(),
    getPosts: vi.fn(),
    createReply: vi.fn(),
    updateReply: vi.fn(),
    deleteReply: vi.fn(),
    getPostReplies: vi.fn(),
    deletePost: vi.fn(),
    upvotePost: vi.fn(),
    downvotePost: vi.fn(),
    removeVote: vi.fn(),
    upvoteReply: vi.fn(),
    downvoteReply: vi.fn(),
    removeReplyVote: vi.fn()
}))

import { submitForm } from '@/handlers/actions/forum'

// ==================== forum actions ====================
describe(
    'forum actions',
    () => {
        const mockPost = {
            category: 'fractures',
            title: 'Test Post Title',
            body: 'This is test body content that should be long enough for validation',
            tags: ['TEST']
        }

        const mockCreatedPost = {
            id: 'post-123',
            ...mockPost,
            createdAt: new Date('2025-01-01'),
            updatedAt: null,
            authorId: 'user-1',
            votes: {
                upvotes: 0,
                downvotes: 0,
                upvotedBy: [],
                downvotedBy: []
            }
        }

        beforeEach(() => {
            vi.clearAllMocks()
        })

        // ==================== submitForm ====================
        describe('submitForm',
            () => {
                // -------------------- creating a new post --------------------
                describe('creating a new post',
                    () => {
                        it(
                            'should call createPost when no postId is provided',
                            async () => {
                                mockCreatePost
                                    .mockResolvedValueOnce({
                                        data: {
                                            message: 'Post created successfully',
                                            data: mockCreatedPost
                                        }
                                    })

                                await submitForm(mockPost)

                                expect(mockCreatePost)
                                    .toHaveBeenCalledWith(mockPost)
                                expect(mockUpdatePost)
                                    .not.toHaveBeenCalled()
                            })

                        it(
                            'should return response data from createPost',
                            async () => {
                                const expectedResponse = {
                                    message: 'Post created successfully',
                                    data: mockCreatedPost
                                }

                                mockCreatePost
                                    .mockResolvedValueOnce({
                                        data: expectedResponse
                                    })

                                const result = await submitForm(mockPost)

                                expect(result).toEqual(expectedResponse)
                            })

                        it(
                            'should call createPost when postId is undefined',
                            async () => {
                                mockCreatePost
                                    .mockResolvedValueOnce({
                                        data: {
                                            message: 'ok',
                                            data: mockCreatedPost
                                        }
                                    })

                                await submitForm(
                                    mockPost,
                                    undefined
                                )

                                expect(mockCreatePost)
                                    .toHaveBeenCalledWith(mockPost)
                                expect(mockUpdatePost)
                                    .not.toHaveBeenCalled()
                            })
                    })

                // -------------------- updating an existing post --------------------
                describe('updating an existing post',
                    () => {
                        it(
                            'should call updatePost when postId is provided',
                            async () => {
                                const updatedPost = {
                                    ...mockCreatedPost,
                                    title: 'Updated Title'
                                }

                                mockUpdatePost
                                    .mockResolvedValueOnce({
                                        data: {
                                            message: 'Post updated successfully',
                                            data: updatedPost
                                        }
                                    })

                                await submitForm(
                                    mockPost,
                                    'post-123'
                                )

                                expect(mockUpdatePost)
                                    .toHaveBeenCalledWith(
                                        'post-123',
                                        mockPost
                                    )
                                expect(mockCreatePost)
                                    .not.toHaveBeenCalled()
                            })

                        it(
                            'should return response data from updatePost',
                            async () => {
                                const updatedPost = {
                                    ...mockCreatedPost,
                                    title: 'Updated Title'
                                }

                                const expectedResponse = {
                                    message: 'Post updated successfully',
                                    data: updatedPost
                                }

                                mockUpdatePost
                                    .mockResolvedValueOnce({
                                        data: expectedResponse
                                    })

                                const result = await submitForm(
                                    mockPost,
                                    'post-123'
                                )

                                expect(result).toEqual(expectedResponse)
                            })

                        it(
                            'should pass correct postId to updatePost',
                            async () => {
                                mockUpdatePost
                                    .mockResolvedValueOnce({
                                        data: {
                                            message: 'ok',
                                            data: mockCreatedPost
                                        }
                                    })

                                await submitForm(
                                    mockPost,
                                    'different-post-id'
                                )

                                expect(mockUpdatePost)
                                    .toHaveBeenCalledWith(
                                        'different-post-id',
                                        mockPost
                                    )
                            })
                    })

                // -------------------- error handling --------------------
                describe('error handling',
                    () => {
                        it(
                            'should propagate errors from createPost',
                            async () => {
                                const error =
                                    new Error('Network error')
                                mockCreatePost
                                    .mockRejectedValueOnce(error)

                                expect(
                                    submitForm(mockPost)
                                ).rejects.toThrow('Network error')
                            })

                        it(
                            'should propagate errors from updatePost',
                            async () => {
                                const error =
                                    new Error('Post not found')
                                mockUpdatePost
                                    .mockRejectedValueOnce(error)

                                expect(
                                    submitForm(
                                        mockPost,
                                        'invalid-id'
                                    )
                                ).rejects.toThrow('Post not found')
                            })
                    })
            })
    })
