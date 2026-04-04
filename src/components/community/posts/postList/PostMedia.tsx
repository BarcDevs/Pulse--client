import { Play } from 'lucide-react'

import { communityPageTexts } from '@/constants/componentTexts/community'

export const PostMedia = () => (
    <div className={'mt-3 relative rounded-xl overflow-hidden bg-surface-section aspect-video'}>
        <div className={'absolute inset-0 flex items-center justify-center'}>
            <div className={'h-14 w-14 rounded-full bg-primary/90 flex items-center justify-center'}>
                <Play
                    className={'h-6 w-6 text-primary-foreground ml-1'}
                    fill={'currentColor'}
                />
            </div>
        </div>
        <div className={'absolute bottom-3 left-3 bg-black/60 rounded px-2 py-1 text-xs text-white'}>
            {communityPageTexts.posts.videoDuration}
        </div>
    </div>
)
