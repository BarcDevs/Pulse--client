import { Post } from '@/types/community'

import { toRelative } from '@/lib/time'

import { PostActions } from './PostActions'
import { PostHeader } from './PostHeader'

type PostItemProps = {
    post: Post
}

const getAuthorName = (post: Post): string => {
    if (!post.author)
        return 'Anonymous'

    const { firstName, lastName } = post.author
    return firstName && lastName
        ? `${firstName} ${lastName}`
        : post.author.username
}

export const PostItem = ({
    post
}: PostItemProps) => (
    <div className={'p-6 hover:bg-surface-section/50 transition-colors'}>
        <div className={'flex gap-4'}>
            <div className={'flex-1 min-w-0'}>
                <div className={'flex items-start justify-between gap-4 mb-2'}>
                    <div className={'flex-1 min-w-0'}>
                        <PostHeader
                            category={post.category}
                            categoryColor={'bg-gray-100 text-gray-700'}
                            author={getAuthorName(post)}
                            timeAgo={toRelative(post.createdAt)}
                        />
                    </div>
                    <span className={'text-xs text-muted-foreground whitespace-nowrap'}>
                        {post.votes.upvotes} liked
                    </span>
                </div>
                <h3 className={'font-semibold text-foreground mb-2'}>
                    {post.title}
                </h3>
                <p className={'text-sm text-muted-foreground line-clamp-2'}>
                    {post.body}
                </p>
                <PostActions
                    replies={Array.isArray(post.replies)
                        ? post.replies.length
                        : post._count?.replies ?? 0}
                />
            </div>
        </div>
    </div>
)
