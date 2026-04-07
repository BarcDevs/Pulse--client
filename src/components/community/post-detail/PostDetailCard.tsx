'use client'

import { Post } from '@/types/community'

import { PostHeader }
    from '@/components/community/posts/postList/PostHeader'

type PostDetailCardProps = {
    post: Post | undefined
    sanitizedBody: string
    categoryColor: string
    author: string
    timeAgo: string
}

export const PostDetailCard = ({
    post,
    sanitizedBody,
    categoryColor,
    author,
    timeAgo
}: PostDetailCardProps) => {
    if (!post) return null

    return (
        <article className={'bg-white rounded-lg shadow-sm p-6 border border-border'}>
            <div className={'mb-4'}>
                <PostHeader
                    category={post.category}
                    categoryColor={categoryColor}
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

            <div className={'flex flex-wrap gap-2 items-center'}>
                {post.tags && post.tags.length > 0 && (
                    <div className={'flex flex-wrap gap-2'}>
                        {Array.isArray(post.tags)
                            ? post.tags.map(
                                (tag) => (
                                    <span
                                        key={tag.id}
                                        className={'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground'}
                                    >
                                        {tag.name}
                                    </span>
                                )
                            ) : null
                        }
                    </div>
                )}
            </div>
        </article>
    )
}
