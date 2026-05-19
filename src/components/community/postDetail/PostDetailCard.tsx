'use client'

import { Post } from '@/types/community'

import { PostHeader }
    from '@/components/community/posts/postList/PostHeader'

type PostDetailCardProps = {
    post: Post | undefined
    sanitizedBody: string
    author: string
    timeAgo: string
}

export const PostDetailCard = ({
    post,
    sanitizedBody,
    author,
    timeAgo
}: PostDetailCardProps) => {
    if (!post) return null

    return (
        <article className={'bg-white rounded-t-lg shadow-sm p-6 border border-b-0 border-border'}>
            <div className={'mb-4'}>
                <PostHeader
                    category={post.category}
                    author={author}
                    timeAgo={timeAgo}
                />
            </div>

            <h1 className={'text-2xl font-bold mb-4'}>
                {post.title}
            </h1>

            <div
                className={'prose prose-sm max-w-none mb-6'}
                dangerouslySetInnerHTML={{
                    __html: sanitizedBody
                }}
            />
        </article>
    )
}
