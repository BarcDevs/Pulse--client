import Link from 'next/link'

import { communityPageTexts } from '@/constants/componentTexts/community'

export const PostNotFound = () => (
    <div className={'rounded-md bg-destructive/10 border border-destructive/20 p-6 text-center'}>
        <h2 className={'text-lg font-semibold text-destructive mb-2'}>
            {communityPageTexts.postDetail.notFoundTitle}
        </h2>
        <p className={'text-sm text-muted-foreground mb-4'}>
            {communityPageTexts.postDetail.notFoundDescription}
        </p>
        <Link
            href={'/community'}
            className={'inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90'}
        >
            {communityPageTexts.postDetail.backToCommunity}
        </Link>
    </div>
)
