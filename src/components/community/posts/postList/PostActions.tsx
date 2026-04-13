import {
    Bookmark,
    MessageSquare,
    Share2
} from 'lucide-react'

import { PostActionButton } from '@/components/community/posts/postList/PostActionButton'

import { communityPageTexts } from '@/constants/componentTexts/community'

type PostActionsProps = {
    replies: number
}

export const PostActions = ({
    replies
}: PostActionsProps) => (
    <div className={'flex items-center gap-4 mt-4'}>
        <PostActionButton
            text={`${replies} ${communityPageTexts.posts.repliesLabel}`}
            onClick={() => {
            }}
            icon={MessageSquare}
        />
        <PostActionButton
            text={communityPageTexts.posts.share}
            onClick={() => {
            }}
            icon={Share2}
        />
        <PostActionButton
            text={communityPageTexts.posts.save}
            onClick={() => {
            }}
            icon={Bookmark}
        />
    </div>
)
