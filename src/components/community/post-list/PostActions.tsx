import {
    Bookmark,
    MessageSquare,
    Share2
} from 'lucide-react'

import {Button} from '@/components/ui/button'

import * as CommunityTexts from '@/constants/communityTexts'

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
            {replies} {CommunityTexts.COMMUNITY_REPLIES_LABEL}
        </Button>
        <Button
            variant={'ghost'}
            size={'sm'}
            className={'h-auto gap-1.5 p-0 text-xs text-muted-foreground hover:text-foreground'}
        >
            <Share2 className={'h-4 w-4'}/>
            {CommunityTexts.COMMUNITY_SHARE}
        </Button>
        <Button
            variant={'ghost'}
            size={'sm'}
            className={'h-auto gap-1.5 p-0 text-xs text-muted-foreground hover:text-foreground'}
        >
            <Bookmark className={'h-4 w-4'}/>
            {CommunityTexts.COMMUNITY_SAVE}
        </Button>
    </div>
)
