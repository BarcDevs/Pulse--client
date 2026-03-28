import {
    Bookmark,
    MessageSquare,
    Share2
} from 'lucide-react'

import {Button} from '@/components/ui/button'

import {communityPageTexts} from '@/constants/componentTexts/community'

type PostActionsProps = {
    replies: number
}

export const PostActions = ({
    replies
}: PostActionsProps) => (
    <div className={'flex items-center gap-4 mt-4'}>
        <Button
            variant={'ghost'}
            size={'sm'}
            className={'h-auto gap-1.5 p-0 text-xs text-muted-foreground hover:text-foreground'}
        >
            <MessageSquare className={'h-4 w-4'}/>
            {replies} {communityPageTexts.posts.repliesLabel}
        </Button>
        <Button
            variant={'ghost'}
            size={'sm'}
            className={'h-auto gap-1.5 p-0 text-xs text-muted-foreground hover:text-foreground'}
        >
            <Share2 className={'h-4 w-4'}/>
            {communityPageTexts.posts.share}
        </Button>
        <Button
            variant={'ghost'}
            size={'sm'}
            className={'h-auto gap-1.5 p-0 text-xs text-muted-foreground hover:text-foreground'}
        >
            <Bookmark className={'h-4 w-4'}/>
            {communityPageTexts.posts.save}
        </Button>
    </div>
)
