'use client'

import { Post } from '@/types/community'

import { PostHeader }
    from '@/components/community/posts/postList/PostHeader'
import { PostTags }
    from '@/components/community/posts/postList/PostTags'

type PostDetailCardProps = {
    post: Post | undefined
    sanitizedBody: string
    author: string
    timeAgo: string
    onTagSelectAction: (tag: string | null) => void
}

export const PostDetailCard = ({
    post,
    sanitizedBody,
    author,
    timeAgo,
    onTagSelectAction
}: PostDetailCardProps) => {
    if (!post) return null

    const tags = Array.isArray(post.tags) ? post.tags : []

    return (
        <div className={'p-7'}>
            <PostHeader
                category={post.category}
                author={author}
                timeAgo={timeAgo}
                isEdited={post.updatedAt !== null}
            />
            <h1 className={'text-2xl font-bold text-foreground mt-2 mb-4'}>
                {post.title}
            </h1>
            <div
                className={'prose prose-sm max-w-none text-foreground leading-relaxed mb-2'}
                dangerouslySetInnerHTML={{ __html: sanitizedBody }}
            />
            {tags.length > 0 && (
                <PostTags
                    tags={tags}
                    onTagSelectAction={onTagSelectAction}
                />
            )}
        </div>
    )
}
