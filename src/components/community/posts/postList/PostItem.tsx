import { PostActions } from './PostActions'
import { PostHeader } from './PostHeader'
import { PostMedia } from './PostMedia'
import { PostVotes } from './PostVotes'
// todo: use real post type
type Post = {
    id: string
    votes: number
    category: string
    categoryColor: string
    author: string
    timeAgo: string
    title: string
    content?: string
    hasMedia?: boolean
    replies: number
}

type PostItemProps = {
    post: Post | any
}
{/*todo: use real data*/}

export const PostItem = ({
    post
}: PostItemProps) => (
    <div
        key={post.id}
        className={'p-6 hover:bg-surface-section/50 transition-colors'}
    >
        <div className={'flex gap-4'}>
            <PostVotes votes={post.votes}/>
            <div className={'flex-1 min-w-0'}>
                <PostHeader
                    category={post.category}
                    categoryColor={post.categoryColor}
                    author={post.author}
                    timeAgo={post.timeAgo}
                />
                <h3 className={'font-semibold text-foreground mb-2'}>
                    {post.title}
                </h3>
                {post.content && (
                    <p className={'text-sm text-muted-foreground line-clamp-2'}>
                        {post.content}
                    </p>
                )}
                {post.hasMedia && <PostMedia/>}
                <PostActions replies={post.replies}/>
            </div>
        </div>
    </div>
)
